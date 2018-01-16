import ReviewsApi from './ReviewsApi';
import config from '../config';

export default function build() {
  return {
    reviewsApi: new ReviewsApi(config.reviews.api)
  };
}
