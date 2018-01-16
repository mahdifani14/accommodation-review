import { openErrorMessage } from '../App/AppActions';
export const ADD_REVIEWS = 'ADD_REVIEWS';
export const ADD_REVIEWS_RATING_AVERAGES = 'ADD_REVIEWS_RATING_AVERAGES';

export function addReviews(reviews) {
  return {
    type: ADD_REVIEWS,
    reviews
  };
}

export function addReviewsRatingAverages(ratingAverages) {
  return {
    type: ADD_REVIEWS_RATING_AVERAGES,
    ratingAverages
  };
}

export function fetchReviews(searchQuery, numPerPage, pageNum) {
  return (dispatch, getState, { reviewsApi }) => {
    return reviewsApi.getReviews(searchQuery, numPerPage, pageNum)
      .then((response) => {
        dispatch(addReviews(response));
      })
      .catch(ex => dispatch(openErrorMessage(ex)));
  };
}

export function fetchReviewsRatingAverages() {
  return (dispatch, getState, { reviewsApi }) => {
    return reviewsApi.getReviewsRatingAverages()
      .then(ratingAverages => {
        dispatch(addReviewsRatingAverages(ratingAverages));
      })
      .catch(ex => dispatch(openErrorMessage(ex)));
  };
}
