import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  onChangePage,
}) => (
  <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(event: { selected: number }) => {
      onChangePage(event.selected + 1);
    }}
    pageRangeDisplayed={2}
    pageCount={2}
    forcePage={currentPage - 1}
  />
);

export default Pagination;
