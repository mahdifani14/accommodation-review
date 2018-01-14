'use strict';

const assert = require('assert');
const Promise = require('bluebird');
const Review = require('../models/review-model');
const Config = require('../../config');
const MongoClient = require('mongodb').MongoClient;

class ReviewsDao {

    constructor() {
        const dbUrl = `${Config.get('/mongodb/url')}/${Config.get('/mongodb/name')}`;
        this.collection = MongoClient.connect(dbUrl)
            .then(db => db.db('accommodation').collection('reviews'));
    }

    findReviewsWithFilter(search, from, to) {

        assert(from < to, `'from' (${from}) must be less than 'to' (${to})`);

        const query = {};

        if (search) {
            query.traveledWith = search.toUpperCase();
        }

        return this.collection
            .then((reviewsCollection) => {
                let firstCursor = reviewsCollection.find(query);

                if (from) {
                    firstCursor = firstCursor.skip(from);
                }
                if (to) {
                    firstCursor = firstCursor.limit(to - (from || 0));
                }

                return Promise.fromCallback(function (cb) {
                    return firstCursor.toArray(cb);
                })
                    .then((docs) => {
                        const secondCursor = reviewsCollection.find(query);
                        return Promise.fromCallback(function (cb) {
                            return secondCursor.count(cb);
                        })
                            .then((count) => {
                                return {
                                    reviews: docs.map(doc => Review.fromDocument(doc)),
                                    total: count
                                };
                            });
                    });
            });
    }

    findReviews() {
        return this.collection
            .then((reviewsCollection) => {
                const firstCursor = reviewsCollection.find({});

                return Promise.fromCallback(function (cb) {
                    return firstCursor.toArray(cb);
                })
                    .then((docs) => {
                        const secondCursor = reviewsCollection.find({});
                        return Promise.fromCallback(function (cb) {
                            return secondCursor.count(cb);
                        })
                            .then((count) => {
                                return {
                                    reviews: docs.map(doc => Review.fromDocument(doc)),
                                    total: count
                                };
                            });
                    });
            });
    }
}

module.exports = ReviewsDao;
