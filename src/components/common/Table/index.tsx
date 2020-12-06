import React from 'react';
import { TableHeader, TableWrapper } from './styles';
import { HiDotsVertical } from 'react-icons/hi';

const Table = () => {
  return (
    <TableWrapper>
      {/* <table className="table">
        <tr className="tr">
          <td className="td"></td>
          <td className="td">Shipboard Ecommerce Bot</td>
          <td className="td">2+</td>
          <td className="td">6days ago</td>
          <td className="td"></td>
        </tr>
        <tr className="tr">
        <td className="td"></td>
          <td className="td">Shipboard Restaurant Bot</td>
          <td className="td">2+</td>
          <td className="td">6days ago</td>
          <td className="td"></td>
        </tr>
        <tr className="tr">
          <td className="td"></td>
          <td className="td">Shipboard Ecommerce Bot</td>
          <td className="td">2+</td>
          <td className="td">6days ago</td>
          <td className="td"></td>
        </tr>
        <tr className="tr">
        <td className="td"></td>
          <td className="td">Shipboard Restaurant Bot</td>
          <td className="td">2+</td>
          <td className="td">6days ago</td>
          <td className="td"></td>
        </tr>
      </table> */}

      <div className="table-row">
        <p className="table-col-1"></p>
        <p className="table-col-3">Name</p>
        <p className="table-col-3">Channels</p>
        <p className="table-col-3">Modified</p>
        <p className="table-col-1">Action</p>
      </div>
      <div className="table-row table-row-data">
        <p className="table-col-1"></p>
        <p className="table-col-3">Bot 1 shipboard</p>
        <p className="table-col-3">Channels</p>
        <p className="table-col-3">5 days ago</p>
        <p className="table-col-1">
          <HiDotsVertical />
        </p>
      </div>
      <div className="table-row table-row-data">
        <p className="table-col-1"></p>
        <p className="table-col-3">Bot 2 shipboard</p>
        <p className="table-col-3">Channels</p>
        <p className="table-col-3">8 days ago</p>
        <p className="table-col-1">
        <HiDotsVertical />
        </p>
      </div>
      <div className="table-row table-row-data">
        <p className="table-col-1"></p>
        <p className="table-col-3">Bot 3 shipboard</p>
        <p className="table-col-3">Channels</p>
        <p className="table-col-3">10 days ago</p>
        <p className="table-col-1">
        <HiDotsVertical />
        </p>
      </div>
      <div className="table-row table-row-data">
        <p className="table-col-1"></p>
        <p className="table-col-3">Bot 4 shipboard</p>
        <p className="table-col-3">Channels</p>
        <p className="table-col-3">last month</p>
        <p className="table-col-1">
        <HiDotsVertical />
        </p>
      </div>
    </TableWrapper>
  );
};

export default Table;
