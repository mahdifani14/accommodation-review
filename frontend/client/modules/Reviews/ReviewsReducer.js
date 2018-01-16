import { ADD_REVIEWS, ADD_REVIEWS_RATING_AVERAGES } from './ReviewsActions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({ list: [] });

const ReviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REVIEWS :
      return state
        .set('list', Immutable.fromJS(action.reviews.reviews))
        .set('total', action.reviews.total);

    case ADD_REVIEWS_RATING_AVERAGES:
      return state
        .set('ratingAverages', Immutable.fromJS(action.ratingAverages));

    default:
      return state;
  }
};

export const getReviews = state => {
  return state.getIn(['reviews', 'list']);
};

export const getReviewsTotal = state => {
  return state.getIn(['reviews', 'total']);
};

export const getReviewsRatingAverage = state => {
  return state.get(['reviews', 'ratingAverages']);
};

export default ReviewsReducer;
