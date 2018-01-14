'use strict';

const Joi = require('joi');
const constants = require('../../constants');
const reviewsService = require('../services/reviews-service');
const Review = require('../models/review-model');
const utils = require('../../utils');

const validate = {
    headers: Joi.object({'authorization': Joi.string().required()}).unknown(),
    query: {
        search: Joi.string().optional()
            .description('Filter by traveledWith'),
        numberPerPage: Joi.number().min(1).required(),
        pageNumber: Joi.number().min(0).required()
    }
};

function handler(request, reply) {
    return Promise.resolve()
        .then(function() {
            const filters = {};

            filters.numberPerPage = request.query.numberPerPage;
            filters.pageNumber = request.query.pageNumber;
            filters.search = request.query.search || null;

            return reviewsService.getReviews(filters);
        })
        .then(result => {
            reply(result);
        })
        .catch(err => {
            console.log(err);
            utils.handleRouteError(err, request, reply);
        });
}

module.exports = {
    method: 'GET',
    path: '/get-reviews',
    config: {
        description: 'Get all or filtered reviews',
        validate: validate,
        handler: handler,
        auth: {
            strategy: 'jwt',
            scope: [
                constants.USER_TYPE.ADMIN
            ]
        },
        plugins: {
            'hapi-swagger': {
                responses: {
                    '200': {
                        description: 'Success',
                        schema: Joi.object({
                            reviews: Joi.array().items(Review.schema()),
                            total: Joi.number().min(0)
                        })
                    },
                    '400': {description: 'Bad Request'},
                    '401': {description: 'Unauthorized'}
                }
            }
        },
        tags: ['api']
    }
};
