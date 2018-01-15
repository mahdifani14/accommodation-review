'use strict';

const Joi = require('joi');

const schema = Joi.object({
    generalRatingAverage: Joi.number().min(0).max(10).required(),
    aspectsRatingAverage: Joi.object({
        total: Joi.object().required(),
        onlyVoted: Joi.object().required()
    }).required(),
    averagesForEachTraveledWith: Joi.object().required()
});

exports.schema = schema;
