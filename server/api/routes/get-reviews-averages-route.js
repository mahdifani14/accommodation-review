'use strict';

const Joi = require('joi');
const constants = require('../../constants');
const reviewsService = require('../services/reviews-service');
const reviewRating = require('../models/reviews-rating-averages-model');
const utils = require('../../utils');

const validate = {
	headers: Joi.object({'authorization': Joi.string().required()}).unknown()
};

function handler(request, reply) {
	return Promise.resolve()
		.then(function () {
			return reviewsService.getReviewsAverages();
		})
		.then(result => {
			return reply.response(result);
		})
		.catch(err => {
			console.log(err);
			utils.handleRouteError(err, request, reply.response);
		});
}

module.exports = {
	method: 'GET',
	path: '/get-reviews-averages',
	options: {
		cors: true,
		description: 'Get different types of reviews averages',
		validate: validate,
		handler: handler,
		auth: {
			strategy: 'jwt',
			scope: [
				constants.USER_TYPE.USER
			]
		},
		plugins: {
			'hapi-swagger': {
				responses: {
					'200': {
						description: 'Success',
						schema: reviewRating.schema
					},
					'400': {description: 'Bad Request'},
					'401': {description: 'Unauthorized'}
				}
			}
		},
		tags: ['api']
	}
};
