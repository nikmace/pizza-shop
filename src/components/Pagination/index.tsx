import React from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch } from 'react-redux';

import { setCurrentPage } from '../../redux/filter/slice';
import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
};

const Pagination: React.FC<PaginationProps> = React.memo(({ currentPage }) => {
  const dispatch = useDispatch();

  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event: { selected: number }) => {
        dispatch(setCurrentPage(event.selected + 1));
      }}
      pageRangeDisplayed={2}
      pageCount={2}
      forcePage={currentPage - 1}
    />
  );
});

export default Pagination;
