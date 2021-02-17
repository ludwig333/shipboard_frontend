import React from 'react';
import AppLayout from '../../../components/layout/AppLayout';
import { GridWrapper } from '../../../components/common/grid';
import flowCover from '../../../assets/images/flow-cover.png';
import { VerticalGap } from '../../../components/common/typography';
import InstallToBot from '../../../components/dashboard/Bots/InstallToBot';
import { useModal } from '../../../services/Modal/ModalProvider';

const Templates = (props: any) => {
  const { showModal, hideModal } = useModal();


  const openInstallTemplateModal = () => {
    showModal(() => (
      <InstallToBot hideModal={ hideModal } />
    ));
  }

  return (
    <React.Fragment>
      <div className="page-header">
        <h1 className="main-heading">Templates</h1>
      </div>
      <VerticalGap size="7" />
         <GridWrapper>
          <div className="grid-row">
          <div className="grid-item" onClick={openInstallTemplateModal}>
              <div className="grid-item-wrapper">
                <div className="grid-item-container">
                  <div className="image">
                    <img src={flowCover} alt="Flow Cover" />
                </div>
                <div className="tag">
                  <p>Booking Template</p>
                </div>
                </div>
              </div>
            </div>      
          </div>
        </GridWrapper>
    
    </React.Fragment>
  );
};

export default Templates;
