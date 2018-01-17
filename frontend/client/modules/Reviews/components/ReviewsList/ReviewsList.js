import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';

const ReviewsList = ({ reviews }) => (
  <Table selectable={false}>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>User</TableHeaderColumn>
        <TableHeaderColumn>General Rate</TableHeaderColumn>
        <TableHeaderColumn>Traveled with</TableHeaderColumn>
        <TableHeaderColumn>Travel Date</TableHeaderColumn>
        <TableHeaderColumn>Review Submission Date</TableHeaderColumn>
        <TableHeaderColumn>Review</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {
        reviews.map((review, index) => {
          const userName = review.get('user') ? review.get('user') : 'Unknown';
          const generalRate = review.getIn(['ratings', 'general', 'general']);
          const travelWith = review.get('traveledWith');
          const comment = review.getIn(['texts', 'nl']) ? review.getIn(['texts', 'nl']) : '';
          const travel = review.get('travelDate').substr(0, 10);
          const submission = review.get('entryDate').substr(0, 10);

          return (
            <TableRow key={index}>
              <TableRowColumn>
                {userName}
              </TableRowColumn>
              <TableRowColumn>
                {generalRate}
              </TableRowColumn>
              <TableRowColumn>
                {travelWith}
              </TableRowColumn>
              <TableRowColumn>
                {travel}
              </TableRowColumn>
              <TableRowColumn>
                {submission}
              </TableRowColumn>
              <TableRowColumn>
                {comment}
              </TableRowColumn>
            </TableRow>
          );
        })
      }
    </TableBody>
  </Table>
);

ReviewsList.propTypes = {
  reviews: ImmutablePropTypes.list.isRequired
};

export default ReviewsList;
