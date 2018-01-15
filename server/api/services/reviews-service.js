'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const Constants = require('../../constants');
const ReviewsDao = require('../dao/reviews-dao');
const reviewsDao = new ReviewsDao();

const _computeAverage = (array, total) => {
    const accumulator = (sum, item) => sum + (item.rate * item.weight);

    if (array.length < 1) return 0;

    return parseInt((array.reduce(accumulator, 0)) / total);
};

const _getGeneralRatingAverage = (reviews, total) => {
    const reviewsGeneralRates = reviews.map(review => ({weight: review.weight, rate: parseInt(review.ratings.general.general)}));

    return _computeAverage(reviewsGeneralRates, total);
};

const _getAspectsRatingAverage = (reviews, total) => {
    const reviewsAspectsRates = reviews.map(review => ({weight: review.weight, aspects: review.ratings.aspects}));
    const aspects = Constants.RATING_ASPECTS;
    const aspectsRateAveragesTotal = {};
    const aspectsRateAveragesVoted = {};

    aspects.forEach(aspect => {
        const aspectRatesTotal = reviewsAspectsRates.map(review => ({weight: review.weight, rate: parseInt(review.aspects[aspect])}));
        const aspectRateVoted = aspectRatesTotal.filter(review => review.rate > 0);
        const numberOfVoted = aspectRateVoted.length;

        aspectsRateAveragesTotal[aspect] = _computeAverage(aspectRatesTotal, total) || 0;
        aspectsRateAveragesVoted[aspect] = _computeAverage(aspectRateVoted, numberOfVoted) || 0;
    });

    return {
      total: aspectsRateAveragesTotal,
      onlyVoted: aspectsRateAveragesVoted
    };
};

const _getAveragesForEachTraveledWith = (reviews) => {
    const traveledWithTypes = Constants.TRAVELED_WITH;
    const averages = {};

    traveledWithTypes.forEach(travelType => {
        const currentTypeReviews = reviews.filter(review => review.traveledWith === travelType);
        const numberOfReviews = currentTypeReviews.length;

        averages[travelType] = {
            generalRatingAverage: numberOfReviews > 0 ? _getGeneralRatingAverage(currentTypeReviews, numberOfReviews) : 0,
            aspectsRatingAverage: numberOfReviews > 0 ? _getAspectsRatingAverage(currentTypeReviews, numberOfReviews) : 0
        };
    });

    return averages;
};

exports.getReviews = (filters) => {
    return Promise.resolve()
        .then(function() {
            const numberPerPage = filters.numberPerPage;
            const pageNumber = filters.pageNumber;
            const from = pageNumber * numberPerPage;
            const to = from + numberPerPage;
            const search = filters.search;
            return reviewsDao.findReviewsWithFilter(search, from, to);
        })
        .then((reviewsInfo) => {
            return ({
                reviews: reviewsInfo.reviews.map(review => _.omit(review, ['parents'])),
                total: reviewsInfo.total
            });
        });
};

exports.getReviewsAverages = () => {
    return Promise.resolve()
        .bind({})
        .then(function() {
            return reviewsDao.findReviews();
        })
        .then(function(reviewsInfo) {
            this.reviews = reviewsInfo.reviews;
            this.total = reviewsInfo.total;
        })
        .then(function () {
            this.generalRatingAverage = this.total > 0 ? _getGeneralRatingAverage(this.reviews, this.total) : 0;
            this.aspectsRatingAverage = this.total > 0 ? _getAspectsRatingAverage(this.reviews, this.total) : 0;
            this.averagesForEachTraveledWith = this.total > 0 ? _getAveragesForEachTraveledWith(this.reviews, this.total) : 0;
        })
        .then(function() {
            return _.omit(this, ['reviews', 'total']);
        });
};
