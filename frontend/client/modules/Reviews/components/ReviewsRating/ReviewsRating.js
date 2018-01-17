import React, { PropTypes } from 'react';
import StarRatings from 'react-star-ratings';
import styles from './ReviewsRating.css';

const RatingDisply = (title, rate) => (
  <div className={'row-xs-12'}>
    <div className={styles.main}>
      <p>{title}</p>
      <StarRatings
        starWidthAndHeight={'15px'}
        starRatedColor={'yellow'}
        rating={(rate / 10) * 5}
        numOfStars={5}
      />
    </div>
  </div>
);
const ReviewsRating = ({ ratings }) => (
  <div>
    <div className={'row'}>
      {RatingDisply('General',ratings.get('generalRatingAverage'))}
      {RatingDisply('Apres Ski',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'apresSki']))}
      {RatingDisply('Size',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'size']))}
      {RatingDisply('Atmosphere',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'atmosphere']))}
      {RatingDisply('Beach',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'beach']))}
      {RatingDisply('Surrounding',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'surrounding']))}
      {RatingDisply('Child Friendly',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'childFriendly']))}
      {RatingDisply('Novice Ski Area',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'noviceSkiArea']))}
      {RatingDisply('Entertainment',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'entertainment']))}
      {RatingDisply('Activities',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'activities']))}
      {RatingDisply('Accessibility',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'accessibility']))}
      {RatingDisply('Culture',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'culture']))}
      {RatingDisply('Interior',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'interior']))}
      {RatingDisply('Terrace',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'terrace']))}
      {RatingDisply('Sanitary State',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'sanitaryState']))}
      {RatingDisply('Nightlife',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'nightlife']))}
      {RatingDisply('Service',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'service']))}
      {RatingDisply('Location',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'location']))}
      {RatingDisply('Restaurants',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'restaurants']))}
      {RatingDisply('Price',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'price']))}
      {RatingDisply('Room',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'room']))}
      {RatingDisply('Pool',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'pool']))}
      {RatingDisply('Advanced Ski Area',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'advancedSkiArea']))}
      {RatingDisply('Food',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'food']))}
      {RatingDisply('Environmental',ratings.getIn(['aspectsRatingAverage', 'onlyVoted', 'environmental']))}
    </div>
  </div>
);

ReviewsRating.propTypes = {
  ratings: PropTypes.object.isRequired
};

export default ReviewsRating;
