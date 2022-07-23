import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../../hooks/usePagination';
import arrowBack from '../../img/icons8-back-24.png'
import arrowNext from '../../img/icons8-forward-24.png'
import './pagination.css';

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 2,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
    window.scrollTo(0, 0)
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
    window.scrollTo(0, 0)
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <li
        className='pagination-item'
        onClick={onPrevious}
        hidden={currentPage === 1}
      >
        <img src={arrowBack} alt='back'></img>

      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return <li key={index + Math.random} className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li key={index}
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => {
              onPageChange(pageNumber)
              window.scrollTo(0, 0)}}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className='pagination-item'
        hidden={currentPage === lastPage}
        onClick={onNext}
      >
        <img src={arrowNext} alt='next'></img>
      </li>
    </ul>
  );
};

export default Pagination;