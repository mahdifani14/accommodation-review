'use strict';

const expect = require('code').expect;
const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('get-reviews-route.js', () => {

    let sandbox, reviewsServiceMock, getReviewsRoute;

    beforeEach((done) => {
        sandbox = sinon.sandbox.create();

        const getReviewsFunction = function () {
            throw new Error('Not expected')
        };

        const reviewsService = {
            getReviews: getReviewsFunction
        };

        reviewsServiceMock = sandbox.mock(reviewsService);

        getReviewsRoute = proxyquire('../../../../server/api/routes/get-reviews-route', {
            '../services/reviews-service': reviewsService
        });

        done();
    });

    afterEach((done) => {
        sandbox.restore();
        done();
    });

    it('returns reviews and total with status code 200', done => {

        const responseSample = {
            reviews: [{
                "parents": [
                    {
                        "id": "string"
                    }
                ],
                "id": "string",
                "traveledWith": "SINGLE",
                "entryDate": "2018-01-15",
                "travelDate": "2018-01-15",
                "ratings": {
                    "general": {
                        "general": 0
                    },
                    "aspects": {
                        "location": 0,
                        "service": 0,
                        "priceQuality": 0,
                        "food": 0,
                        "room": 0,
                        "childFriendly": 0,
                        "interior": 0,
                        "size": 0,
                        "activities": 0,
                        "restaurants": 0,
                        "sanitaryState": 0,
                        "accessibility": 0,
                        "nightlife": 0,
                        "culture": 0,
                        "surrounding": 0,
                        "atmosphere": 0,
                        "noviceSkiArea": 0,
                        "advancedSkiArea": 0,
                        "apresSki": 0,
                        "beach": 0,
                        "entertainment": 0,
                        "environmental": 0,
                        "pool": 0,
                        "terrace": 0
                    }
                },
                "titles": {},
                "texts": {},
                "user": "string",
                "locale": "nl",
                "reviewWeight": 0
            }],
            total: 1
        };

        const request = {
            'query': {
                'search': 'SINGLE',
                'numberPerPage': 1,
                'pageNumber': 0
            }
        };

        reviewsServiceMock.expects('getReviews').once().withExactArgs({
            'search': 'SINGLE',
            'numberPerPage': 1,
            'pageNumber': 0
        }).returns(Promise.resolve(responseSample));

        getReviewsRoute.config.handler(request, response => {

            try {
                expect(response).to.deep.equals(responseSample);
                done();
            } catch (err) {
                done(err);
            }
        });
    });
});
