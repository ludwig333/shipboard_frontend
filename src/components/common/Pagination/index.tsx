import React, { useState, useEffect } from 'react';
import { PaginationItem, PaginationWrapper } from './styles';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import pagination from '../../../utils/pagination';

interface PaginationPropsInteface {
  total: number;
  activePage: number;
  onChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationPropsInteface> = (props) => {
  const pageBtns = pagination(props.activePage, props.total);

  return (
    <PaginationWrapper>
      <PaginationItem>
        <BiChevronLeft
          onClick={() => {
            if (props.activePage != 0) {
              props.onChange(props.activePage - 1);
            }
          }}
        />
      </PaginationItem>
      {pageBtns &&
        pageBtns.map((page, index) => {
          if (typeof page !== 'string') {
            var isActive = page === props.activePage ? 1 : 0;
            return (
              <PaginationItem
                isActive={isActive}
                onClick={() => {
                  props.onChange(page);
                }}
              key={index}>
                {page}
              </PaginationItem>
            );
          } else {
            return <PaginationItem>...</PaginationItem>;
          }
        })}
      <PaginationItem>
        <BiChevronRight
          onClick={() => {
            if (props.activePage != props.total) {
              props.onChange(props.activePage + 1);
            }
          }}
        />
      </PaginationItem>
    </PaginationWrapper>
  );
};

export default Pagination;
