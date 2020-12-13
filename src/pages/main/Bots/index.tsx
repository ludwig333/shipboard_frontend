import React from 'react';
import AppLayout from '../../../components/layout/AppLayout';
import Table from '../../../components/common/Table/index';
import { PrimaryButton } from '../../../components/common/buttons';
import { useModalContext } from '../../../services/Modal/ModalProvider';
import BotModal from '../../../components/dashboard/Bots/Modal';


const Bots = () => {
  const { openModal } = useModalContext();

  const handleModalOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    openModal(BotModal)
  }
  return (
    <AppLayout>
      <div className="page-header">
        <h1 className="heading">Bots</h1>
        <PrimaryButton onClick={handleModalOpen}>
          Add Bot
        </PrimaryButton>
      </div>
      <Table />
    </AppLayout>
  );
};

export default Bots;
