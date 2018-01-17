import { secure } from '../util/apiUtils';

class ReviewsApi {
  constructor(host) {
    this.secureCall = secure(host);
  }

  /**
   * @returns {Promise} all reviews with pagination
   */
  getReviews(searchQuery, numberPerPage = 1, pageNumber = 0) {
    const search = searchQuery.search || '';
    let query = `numberPerPage=${numberPerPage}&pageNumber=${pageNumber}`;

    if (search) query += `&search=${encodeURIComponent(search)}`;

    return this.secureCall('get', `/get-reviews?${query}`);
  }

  /**
   * @returns {Promise} reviews averages rating
   */
  getReviewsRatingAverages() {
    return this.secureCall('get', '/get-reviews-averages');
  }
}

export default ReviewsApi;
