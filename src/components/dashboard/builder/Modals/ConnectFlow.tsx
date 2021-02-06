import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getFlows } from '../../../../apis/flows';
import { GridWrapper } from '../../../common/grid';
import { ConnectFlowWrapper } from './styles';
import Pagination from '../../../common/Pagination/index';

type FlowType = {
  id: string;
  name: string;
  message_count: string
};

const ConnectFlowModal = ({bot, flow, hideModal, handleSelect}) => {
  const [flows, setFlows] = useState<Array<FlowType>>();
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [lastPage, setLastPage] = useState(1);

  const getFlowsData = (bot:string, pageNumber: number) => {
    getFlows(bot, pageNumber)
      .then((response) => {
        var otherFlowsThanOneInside = response.data.filter(item => (item.id != flow) && item.message_count > 0)
        setFlows(otherFlowsThanOneInside);
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


  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  useEffect(() => {
    getFlowsData(bot, pageNumber);
  }, [pageNumber, lastPage]);

  const getFlowGrid = () => {
    if (flows.length > 0) {
      return flows.map((data: FlowType) => {
        return (
          <React.Fragment key={data.id}>
              <div className="grid-item" onClick={ () => handleSelect(data.id, data.name)}>
                <div className="grid-item-wrapper">
                <div className="grid-item-container">
                  <div className="image">
                    Image
                  </div>
                  <div className="tag">
                    <p>{data.name}</p>
                  </div>           
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })
    } else {
     return  (<p>There are no other flows or they don't have messages</p>);
    }
  }

  return (
    <ConnectFlowWrapper>
      <div className="modal-body">
        <button className="modal-exit" onClick={hideModal}></button>
        <div className="modal-title">
         Connect Modal
        </div>
        <div className="modal-content">
          <GridWrapper>
            <div className="grid-row">
              {flows && getFlowGrid()}
            </div>
          </GridWrapper>
          {(flows && flows.length > 0) && 
            <Pagination
            activePage={pageNumber}
            total={lastPage}
            onChange={handlePageChange}
          />}
        </div>
      </div>
    </ConnectFlowWrapper>
  );
};

export default ConnectFlowModal;
