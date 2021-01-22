import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import AppLayout from '../../../components/layout/AppLayout';
import { PrimaryButton } from '../../../components/common/buttons';
import BotModal from '../../../components/dashboard/Bots/Modal';
import { getBots } from '../../../apis/bots';
import Pagination from '../../../components/common/Pagination/index';
import Table from '../../../components/common/Table';
import { TableWrapper } from '../../../components/common/Table/styles';
import { DropdownWrapper } from '../../../components/common/Dropdown/styles';
import { HiDotsVertical } from 'react-icons/hi';
import DeleteModal from '../../../components/dashboard/Bots/DeleteModal';
import { useModal } from '../../../services/Modal/ModalProvider';
import Flows from '../Flows/index';
import { ProtectedRoute } from '../../../routes/ProtectedRoute';

type BotType = {
  id: string;
  name: string;
  last_modified: string;
};

const Bots = () => {
  const { showModal, hideModal } = useModal();
  const [bots, setBots] = useState<Array<BotType>>();
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [lastPage, setLastPage] = useState(1);
  const [refreshPage, setRefreshPage] = useState(false);

  const getBotsData = (pageNumber: number) => {
    getBots(pageNumber)
      .then((response) => {
        setBots(response.data);
        setPageNumber(response.meta.current_page);
        setLastPage(response.meta.last_page);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getBotsData(pageNumber);
  }, [pageNumber, lastPage, refreshPage]);

  const handleRefresh = () => {
    setRefreshPage(true);
    setRefreshPage(false);
  };
  const handleCreateOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    showModal(() => (
      <BotModal hideModal={hideModal} reloadPage={handleRefresh} />
    ));
  };

  const handleEditOpen = (data: BotType) => {
    showModal(() => (
      <BotModal hideModal={hideModal} bots={data} reloadPage={handleRefresh} />
    ));
  };

  const handleDeleteConfirmation = (data: BotType) => {
    showModal(() => (
      <DeleteModal
        hideModal={hideModal}
        bot={data}
        reloadPage={handleRefresh}
      />
    ));
  };

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  return (
    <React.Fragment>
      <div className="page-header">
        <h1 className="heading">Bots</h1>
        <PrimaryButton onClick={handleCreateOpen}>Add Bot</PrimaryButton>
      </div>
      <TableWrapper>
        <div className="table-row">
          <p className="table-col-1"></p>
          <p className="table-col-3">Name</p>
          <p className="table-col-3">Channels</p>
          <p className="table-col-3">Modified</p>
          <p className="table-col-1">Action</p>
        </div>

        <Router>
        {bots &&
          bots.map((data: BotType) => {
            return (
              <Link to={"bot/"+data.id} className="table-row table-row-data">
                <p className="table-col-1"></p>
                <p className="table-col-3">{data.name}</p>
                <p className="table-col-3">-</p>
                <p className="table-col-3">{data.last_modified}</p>
                <p className="table-col-1">
                  <DropdownWrapper>
                    <label className="dropbtn">
                      <HiDotsVertical />
                    </label>
                    <div className="dropdown-content">
                      <a
                        href="#"
                        onClick={() => {
                          handleEditOpen(data);
                        }}>
                        Edit
                      </a>
                      <a href="#">Configure</a>
                      <a
                        href="#"
                        onClick={() => {
                          handleDeleteConfirmation(data);
                        }}>
                        Delete
                      </a>
                    </div>
                  </DropdownWrapper>
                </p>
              </Link>
            );
          })}
        </Router>
      </TableWrapper>

      <Pagination
        activePage={pageNumber}
        total={lastPage}
        onChange={handlePageChange}
      />
    </React.Fragment>
  );
};

export default Bots;
