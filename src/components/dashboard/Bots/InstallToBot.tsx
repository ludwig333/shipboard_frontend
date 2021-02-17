import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { getBots } from '../../../apis/bots';
import { GridWrapper } from '../../common/grid';
import Pagination from '../../common/Pagination/index';
import { InstallToBotWrapper } from './styles';
import { installBookingTemplate } from '../../../apis/flows';

type BotType = {
  id: string;
  name: string;
  last_modified: string;
};

const InstallToBot = ({ hideModal}) => {
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


  const handlePageChange = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };

  const handleInstallBookingTemplate = (id) => {
    installBookingTemplate(id)
      .then((response) => {
        toast.success("Booking template installed successfully");
        hideModal();
      }).catch((err) => {
        toast.error("Something went wrong");
    })
  }

  useEffect(() => {
    getBotsData(pageNumber);
  }, [pageNumber, lastPage]);

  const getBotGrid = () => {
    if (bots.length > 0) {
      return bots.map((data) => {
        return (
          <React.Fragment key={data.id}>
              <div className="grid-item" onClick={() => handleInstallBookingTemplate(data.id)}>
                <div className="grid-item-wrapper">
                <div className="grid-item-container">
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
    <InstallToBotWrapper>
      <div className="modal-body">
        <button className="modal-exit" onClick={hideModal}></button>
        <div className="modal-title">
         Connect Modal
        </div>
        <div className="modal-content">
          <GridWrapper>
            <div className="grid-row">
              {bots && getBotGrid()}
            </div>
          </GridWrapper>
          {(bots && bots.length > 0) && 
            <Pagination
            activePage={pageNumber}
            total={lastPage}
            onChange={handlePageChange}
          />}
        </div>
      </div>
    </InstallToBotWrapper>
  );
};

export default InstallToBot;
