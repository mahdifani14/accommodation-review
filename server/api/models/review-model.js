'use strict';

const Joi = require('joi');
const utils = require('../../utils');

const schema = Joi.object({
    parents: Joi.array().items(Joi.object({
        id: Joi.string().trim().required()
    })).required(),
    id: Joi.string().trim().required(),
    traveledWith: Joi.string().trim().uppercase().required().valid(['SINGLE', 'FAMILY', 'COUPLE', 'FRIENDS', 'OTHER']),
    entryDate: Joi.date().required(),
    travelDate: Joi.date().required(),
    ratings: Joi.object({
        general: Joi.object({
            general: Joi.number().min(0).max(10).required()
        }).required(),
        aspects: Joi.object({
            location: Joi.number().min(0).max(10).required(),
            service: Joi.number().min(0).max(10).required(),
            priceQuality: Joi.number().min(0).max(10).required(),
            food: Joi.number().min(0).max(10).required(),
            room: Joi.number().min(0).max(10).required(),
            childFriendly: Joi.number().min(0).max(10).required(),
            interior: Joi.number().min(0).max(10).required(),
            size: Joi.number().min(0).max(10).required(),
            activities: Joi.number().min(0).max(10).required(),
            restaurants: Joi.number().min(0).max(10).required(),
            sanitaryState: Joi.number().min(0).max(10).required(),
            accessibility: Joi.number().min(0).max(10).required(),
            nightlife: Joi.number().min(0).max(10).required(),
            culture: Joi.number().min(0).max(10).required(),
            surrounding: Joi.number().min(0).max(10).required(),
            atmosphere: Joi.number().min(0).max(10).required(),
            noviceSkiArea: Joi.number().min(0).max(10).required(),
            advancedSkiArea: Joi.number().min(0).max(10).required(),
            apresSki: Joi.number().min(0).max(10).required(),
            beach: Joi.number().min(0).max(10).required(),
            entertainment: Joi.number().min(0).max(10).required(),
            environmental: Joi.number().min(0).max(10).required(),
            pool: Joi.number().min(0).max(10).required(),
            terrace: Joi.number().min(0).max(10).required()
        }).required()
    }).required(),
    titles: Joi.object().allow(null),
    texts: Joi.object().allow(null),
    user: Joi.string().trim().allow('').required(),
    locale: Joi.string().trim().allow('', null).example('nl'),
    reviewWeight: Joi.number().min(0).max(1).allow(null)
});

class Review {

    static schema() {
        return schema;
    }

    /**
     * Validate object.
     *
     * @returns {Boolean} `true` if validation was successful
     * @throws {Error} if validation was unsuccessful
     */
    validate() {
        const err = Joi.validate(this, schema).error;
        if (err) throw err;
        return true;
    }

    static reviewWeight(entryDate) {
        const now = new Date();
        const reviewAge = now.getFullYear() - entryDate.getFullYear();

        if (reviewAge < 5) {
            return (1 - reviewAge * 0.1);
        }

        return 0.5;
    }

    /**
     * @param {Object} doc.parents
     * @param {String} doc.id
     * @param {String} doc.traveledWith
     * @param {String} doc.entryDate
     * @param {String} doc.travelDate
     * @param {Object} doc.ratings
     * @param {String} doc.user
     * @param {Object} doc.titles
     * @param {Object} doc.texts
     * @param {String} doc.locale
     * @returns {Object}
     */
    static fromDocument(doc) {
        if (!doc) {
            return null;
        }

        const review = new Review(doc.parents, doc.id, doc.traveledWith, doc.entryDate, doc.travelDate, doc.ratings, doc.user);
        review.titles = doc.titles || {};
        review.texts = doc.texts || {};
        review.locale = doc.locale || '';
        review.weight = parseFloat(this.reviewWeight(review.entryDate));

        return review;
    }


    constructor(parents, id, traveledWith, entryDate, travelDate, ratings, user) {
        utils.assertExists(parents, 'parents');
        utils.assertExists(id, 'id');
        utils.assertExists(traveledWith,'traveledWith');
        utils.assertExists(entryDate, 'entryDate');
        utils.assertExists(travelDate, 'travelDate');
        utils.assertExists(ratings, 'ratings');
        utils.assertExists(user, 'user');

        this.parents = parents;
        this.id = id;
        this.traveledWith = traveledWith;
        this.entryDate = new Date(entryDate);
        this.travelDate = new Date(travelDate);
        this.ratings = ratings;
        this.user = user;
    }
}

module.exports = Review;
