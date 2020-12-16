import React from 'react';
import { TableHeader, TableWrapper } from './styles';
import { HiDotsVertical } from 'react-icons/hi';
import DropDown from '../Dropdown';

const Table = (props: any) => {
  return (
    <TableWrapper>
      <div className="table-row">
        <p className="table-col-1"></p>
        <p className="table-col-3">Name</p>
        <p className="table-col-3">Channels</p>
        <p className="table-col-3">Modified</p>
        <p className="table-col-1">Action</p>
      </div>

      {props.bots &&
        props.bots.map((data: any) => {
          return (
            <div className="table-row table-row-data">
              <p className="table-col-1"></p>
              <p className="table-col-3">{data.name}</p>
              <p className="table-col-3">-</p>
              <p className="table-col-3">{data.last_modified}</p>
              <p className="table-col-1">
                <DropDown />
              </p>
            </div>
          );
        })}
    </TableWrapper>
  );
};

export default Table;
