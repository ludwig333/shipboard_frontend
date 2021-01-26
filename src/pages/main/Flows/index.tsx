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

  const botId = props.match.params.id;

  const getFlowsData = (bot:string, pageNumber: number) => {
    getFlows(bot, pageNumber)
      .then((response) => {
        setFlows(response.data);
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
    getFlowsData(botId, pageNumber);
  }, [pageNumber, lastPage]);


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
  
  return (
    <React.Fragment>
    <div className="page-header">
      <h1 className="main-heading">Flows</h1>
        <PrimaryButton onClick={handleCreateOpen}>Add Flow</PrimaryButton>
    </div>
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
                          Image
                        </div>
                        <div className="tag">
                          <p>{data.name}</p>
                          <DropdownWrapper>
                            <label className="dropbtn">
                              <HiDotsVertical />
                            </label>
                            <div className="dropdown-content">
                              <p
                                onClick={() => {
                                  handleEditOpen(data);
                                }}>
                                Edit
                              </p>
                              <p
                                onClick={() => {
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
};

export default withRouter(Flows);
