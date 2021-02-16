import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GridWrapper } from '../../../components/common/grid';
import { PrimaryButton } from './../../../components/common/buttons';
import { HiDotsVertical } from 'react-icons/hi';
import { DropdownWrapper } from '../../../components/common/Dropdown/styles';
import { useModal } from '../../../services/Modal/ModalProvider';
import { getFlows } from '../../../apis/flows';
import {withRouter} from 'react-router-dom'
import FlowCreateModal from '../../../components/dashboard/Flows/CreateModal';
import FlowEditModal from '../../../components/dashboard/Flows/EditModal';
import FlowDeleteModal from '../../../components/dashboard/Flows/DeleteModal';
import Pagination from '../../../components/common/Pagination/index';
import flowCover from '../../../assets/images/flow-cover.png';
import { PlatformWrapper } from './styles';
import messengerLogo from '../../../assets/images/platforms/messenger.png';
import telegramLogo from '../../../assets/images/platforms/telegram.png';
import slackLogo from '../../../assets/images/platforms/slack.png';
import MessengerConfigure from '../../../components/dashboard/Bots/Configure/Messenger';
import TelegramConfigure from '../../../components/dashboard/Bots/Configure/Telegram';
import SlackConfigure from '../../../components/dashboard/Bots/Configure/Slack';
import PuffLoader from "react-spinners/PuffLoader";
import { getPlatformConfigurations } from '../../../apis/bots';
import { toast } from 'react-toastify';


type FlowType = {
  id: string;
  name: string;
  last_modified: string;
};

const Flows = (props) => {
  const { showModal, hideModal } = useModal();
  const [flows, setFlows] = useState<Array<FlowType>>();
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [lastPage, setLastPage] = useState(1);
  const [messengerConfigurations, setMessengerConfigurations] = useState(null);
  const [telegramConfigurations, setTelegramConfigurations] = useState(null);
  const [slackConfigurations, setSlackConfigurations] = useState(null);

  const botId = props.match.params.id;

  const getFlowsData = (bot:string, pageNumber: number) => {
    getFlows(bot, pageNumber)
      .then((response) => {
        setFlows(response.data);
        setPageNumber(response.meta.current_page);
        setLastPage(response.meta.last_page);
      })
      .catch((err) => {
        console.log("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  /**
   * Flow Operations Starts
   */
  const handleCreateOpen = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    showModal(() => (
      <FlowCreateModal bot={botId} hideModal={hideModal} handleCreateFlow={ handleCreateFlow } />
    ));
  };

  const handleEditOpen = (data: FlowType) => {
    showModal(() => (
      <FlowEditModal hideModal={hideModal} flow={data} handleEditFlow={ handleEditFlow } />
    ));
  };

  const handleDeleteConfirmation = (data: FlowType) => {
    showModal(() => (
      <FlowDeleteModal hideModal={hideModal} flow={data} handleDeleteFlow={ handleDeleteFlow }/>
    ));
  };

  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const handleCreateFlow = (newFlow: FlowType) => { 
    const newFlowList = flows.concat(newFlow);
    setFlows(newFlowList)
  }

  const handleEditFlow = (data) => {
    const flowId = flows.findIndex(
      (obj) => obj.id == data.id
    );
    setFlows(flows.map((item, index) => {
      if (index == flowId) {
        item.name = data.name
      }
      return item;
    }));
  }

  const handleDeleteFlow = (id) => {
    const flowId = flows.findIndex(
      (obj) => obj.id == id
    );
    flows.splice(flowId, 1);
  }
  /**
   * Flow Operations Ends
   */

  /**
   * Configure Operations Starts
   */

  const handleMessengerConfigurationUpdate = (config) => {
    setMessengerConfigurations(config);
  }

  const handleTelegramConfigurationUpdate = (config) => {
    setTelegramConfigurations(config);
  }

  const handleSlackConfigurationUpdate = (config) => {
    setSlackConfigurations(config);
  }

  const openMessengerConfigure = () => {
    showModal(() => (
      <MessengerConfigure hideModal={hideModal} botId={botId} configuration={ messengerConfigurations } changeConfiguration={handleMessengerConfigurationUpdate} />
    ));
  }

  const openTelegramConfigure = () => {
    showModal(() => (
      <TelegramConfigure hideModal={hideModal} botId={botId} configuration={ telegramConfigurations } changeConfiguration={handleTelegramConfigurationUpdate}/>
    ));
  }

  const openSlackConfigure = () => {
    showModal(() => (
      <SlackConfigure hideModal={hideModal} botId={botId} configuration={ slackConfigurations} changeConfiguration={handleSlackConfigurationUpdate}/>
    ));
  }
  /**
   * Configure Operations Ends
   */
  
  
  useEffect(() => {
    getFlowsData(botId, pageNumber);
  }, [pageNumber, lastPage]);

  useEffect(() => {
    getPlatformConfigurations(botId)
      .then((response) => {
        console.log(response)
        var indexOfMessengerConfig = response.data.findIndex(config => config.platform === 'messenger');
        setMessengerConfigurations(response.data[indexOfMessengerConfig]);

        var indexOfTelegramConfig = response.data.findIndex(config => config.platform === 'telegram');
        setTelegramConfigurations(response.data[indexOfTelegramConfig]);

        var indexOfSlackConfig = response.data.findIndex(config => config.platform === 'slack');
        setSlackConfigurations(response.data[indexOfSlackConfig]);
      })
      .catch((err) => toast.error("Something went wrong"));   
  }, [])

  if (isLoading) {
    return (
      <div className="loader-wrapper">
          <PuffLoader color={' #5850EC'}  size={75} />
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div className="page-header">
          <h1 className="main-heading">Bot Details</h1>
            <PrimaryButton onClick={handleCreateOpen}>Add Flow</PrimaryButton>
          </div>
          <PlatformWrapper>
            <div className="platform_btn" onClick={openMessengerConfigure}>
              <img src={messengerLogo} alt="Messenger Logo" />
              <p>Messenger</p>
            </div>
            <div className="platform_btn" onClick={openTelegramConfigure}>
              <img src={telegramLogo} alt="Telegram Logo" />
              <p>Telegram</p>
            </div>
            <div className="platform_btn" onClick={openSlackConfigure}>
              <img src={slackLogo} alt="Slack Logo" />
              <p>Slack</p>
            </div>
          </PlatformWrapper>
          <GridWrapper>
            <div className="grid-row">
              {flows && flows.map((data: FlowType) => {
                return (
                  <React.Fragment key={data.id}>
                    <Link to={'flow/' + data.id}>
                      <div className="grid-item">
                        <div className="grid-item-wrapper">
                          <div className="grid-item-container">
                            <div className="image">
                              <img src={flowCover} alt="Flow Cover" />
                            </div>
                            <div className="tag">
                              <p>{data.name}</p>
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
                                      e.preventDefault();
                                      handleDeleteConfirmation(data);
                                    }}>
                                    Delete
                                  </p>
                                </div>
                              </DropdownWrapper>
                            </div>           
                        </div>
                      </div>
                    </div>
                    </Link>
                  </React.Fragment>
                );
              })}
          </div>
        </GridWrapper>
    
        <Pagination
          activePage={pageNumber}
          total={lastPage}
          onChange={handlePageChange}
        />
      </React.Fragment>
    );
  }
};

export default withRouter(Flows);
