'use strict';

const fs = require('fs');
const Joi = require('joi');
const MongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');
const Config = require('./config');
const logger = require('./logger');
const reviewModel = require('../server/api/models/review-model');

function initReviews(db) {

    function insertReviews(review, reviews) {

        try {
            const reviewId = review.id;
            const err = Joi.validate(review, reviewModel.schema()).error;

            if (err) {
                throw new Error(`Error validating reviews: ${err.message || err}`);
            }

            return Promise.resolve()
                .then(() => {
                    return reviews.find({'id': reviewId}).limit(1).next();
                })
                .then((foundReview) => {
                    if (!foundReview) {
                        return reviews.insertOne(review);
                    } else {
                        logger.logInfo(`Review ${foundReview.id} found, skipped.`);
                    }
                });

        }
        catch (err) {
            logger.logError(`Error importing file ${review}: ${err.message || err}`);
        }
    }

    logger.logInfo('Creating "accommodation" collection...');

    return Promise.resolve()
        .bind({})
        .then(function () {
            return db.collection('reviews');
        })
        .then(function (reviews) {
            this.reviews = reviews;
            logger.logInfo('Finished creating "reviews" collection');
            return reviews.createIndex({'id': 1}, {'unique': true});
        })
        .then(function () {
            logger.logInfo('Importing "reviews" documents');
            return JSON.parse(fs.readFileSync('./server/db/reviews.json').toString());
        })
        .map(function (review) {
            return insertReviews(review, this.reviews);
        })
        .then(function () {
            logger.logInfo('Finished importing "reviews" documents');
        })
        .catch(function (err) {
            return Promise.reject(`Error initializing "reviews" collection: ${err.message || err}`);
        });
}

module.exports = function () {

    const dbUrl = `${Config.get('/mongodb/url')}/${Config.get('/mongodb/name')}`;

    return Promise.resolve()
        .bind({})
        .then(function () {
            this.operation = `connecting to database ${dbUrl}`;
            return MongoClient.connect(dbUrl);
        })
        .then(function (db) {
            this.db = db;
            logger.logInfo(`Connected to ${db.s.databaseName}`);
            this.operation = 'reading collection names from database';
            return db.listCollections({}).toArray();
        })
        .then(function (collections) {
            // const collectionNames = collections.map(collection => collection.name);
            const promises = [];

            promises.push(initReviews(this.db));

            return promises;
        })
        .all()
        .catch(function (err) {
            return Promise.reject(new Error(`Error ${this.operation}: ${err.message || err}`));
        });
};
