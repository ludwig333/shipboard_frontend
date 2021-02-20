import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { PrimaryButton } from '../../../components/common/buttons';
import { getBots } from '../../../apis/bots';
import Pagination from '../../../components/common/Pagination/index';
import { TableWrapper } from '../../../components/common/table';
import { DropdownWrapper } from '../../../components/common/Dropdown/styles';
import { HiDotsVertical } from 'react-icons/hi';
import { useModal } from '../../../services/Modal/ModalProvider';
import BotCreateModal from '../../../components/dashboard/Bots/CreateModal';
import BotEditModal from '../../../components/dashboard/Bots/EditModal';
import BotDeleteModal from '../../../components/dashboard/Bots/DeleteModal';
import { toast } from 'react-toastify';
import ConfigureBot from '../../../components/dashboard/Bots/Configure/Messenger';
import PuffLoader from "react-spinners/PuffLoader";
import noData from '../../../assets/images/no-data.svg';



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

  const getBotsData = (pageNumber: number) => {
    getBots(pageNumber)
      .then((response) => {
        setBots(response.data);
        setPageNumber(response.meta.current_page);
        setLastPage(response.meta.last_page);
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getBotsData(pageNumber);
  }, [pageNumber, lastPage]);

  const handleCreateOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    showModal(() => (
      <BotCreateModal hideModal={hideModal} handleCreateBot={ handleCreateBot}  />
    ));
  };

  const handleEditOpen = (data: BotType) => {
    showModal(() => (
      <BotEditModal hideModal={hideModal} bot={data} handleEditBot={handleEditBot} />
    ));
  };

  const handleDeleteConfirmation = (data: BotType) => {
    showModal(() => (
      <BotDeleteModal
        hideModal={hideModal} bot={data} handleDeleteBot={handleDeleteBot}
      />
    ));
  };

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const handleCreateBot = (newBot: BotType) => { 
    const newBotList = bots.concat(newBot);
    setBots(newBotList)
  }

  const handleEditBot = (data) => {
    const botId = bots.findIndex(
      (obj) => obj.id == data.id
    );
    setBots(bots.map((item, index) => {
      if (index == botId) {
        item.name = data.name
      }
      return item;
    }));
  }

  const handleDeleteBot = (id) => {
    const botId = bots.findIndex(
      (obj) => obj.id == id
    );
    bots.splice(botId, 1);
  }
  
  const getContent = () => {
    if (bots.length < 1) {
      return (
        <div className="empty-data">
          <img className="no-data-image" src={noData} alt="Empty Bots"></img>
          <h3>No Bots</h3>
          </div>
      );
    } else {
      return (
        <React.Fragment>
           <div className="container">
          <TableWrapper>
            <li className="table-header">
              <div className="col col-1 flex-basis-50">Name</div>
              <div className="col col-2 flex-basis-20">Channels</div>
              <div className="col col-3 flex-basis-20">Modified</div>
              <div className="col col-4 flex-basis-10">Action</div>
            </li>
            {bots &&
              bots.map((data: BotType) => {
                return (
                  <React.Fragment key={data.id}>
                    <Link to={"bot/" + data.id} className="table-row table-row-data" >
                      <li className="table-row">
                        <div className="col col-1 flex-basis-50" data-label="name">{data.name}</div>
                        <div className="col col-2 flex-basis-20" data-label="channels">-</div>
                        <div className="col col-3 flex-basis-20" data-label="last_modified">{data.last_modified}</div>
                        <div className="col col-4 flex-basis-10" data-label="action">
                          <DropdownWrapper>
                            <label className="dropbtn">
                              <HiDotsVertical />
                            </label>
                            <div className="dropdown-content">
                              <p
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleEditOpen(data);
                                }}>
                                Edit
                        </p>
                              <p
                                onClick={(e) => {
                                  e.preventDefault()
                                  handleDeleteConfirmation(data);
                                }}>
                                Delete
                        </p>
                            </div>
                          </DropdownWrapper>
                        </div>
                      </li>
                    </Link>
                  </React.Fragment>
                );
              })}
          </TableWrapper>
        </div>

        <Pagination
          activePage={pageNumber}
          total={lastPage}
          onChange={handlePageChange}
        />
        </React.Fragment>
      );
    }
  }
  if (isLoading) {
    return (
      <div className="loader-wrapper">
        <PuffLoader color={' #5850EC'} size={75} />
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div className="page-header">
          <h1 className="main-heading">Bots</h1>
          <PrimaryButton onClick={handleCreateOpen}>Add Bots</PrimaryButton>
        </div>
       {getContent()}
      </React.Fragment>
    );
  }
};

export default Bots;
