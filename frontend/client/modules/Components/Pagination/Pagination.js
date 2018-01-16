import React, { Component, PropTypes } from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.css';

class Pagination extends Component {

  static propTypes = {
    total: PropTypes.number,
    pageClick:PropTypes.func,
  };

  render() {
    return (
      <ReactPaginate previousLabel={"previous"}
                     nextLabel={"next"}
                     breakLabel={<a href="">...</a>}
                     breakClassName={styles.break}
                     pageNum={this.props.total}
                     marginPagesDisplayed={2}
                     pageRangeDisplayed={5}
                     clickCallback={this.props.pageClick}
                     containerClassName={styles.pagination}
                     subContainerClassName={"pages pagination"}
                     activeClassName={styles.active}/>
    )
  }

}

export default Pagination;
