import React from 'react';
import { FormHeader, FormSubHeader } from '../../common/typography';
import { FormButton } from '../../common/buttons';
import { deleteBot } from '../../../apis/bots';
import { toast } from 'react-toastify';

const DeleteModal = ({ hideModal, bot, reloadPage }) => {
  const handleSubmit = () => {
    deleteBot(bot.id).then((response) => {
      hideModal();
      reloadPage();
      toast.success('Bot deleted successfully');
    });
  };

  return (
    <React.Fragment>
      <div className="modal-body">
        <button className="modal-exit" onClick={hideModal}></button>
        <div className="modal-title">
          <FormHeader>Confirm Delete</FormHeader>
        </div>
        <div className="modal-content">
          <form className="bot-create-form" onSubmit={handleSubmit}>
            <FormSubHeader className="last-input">
              Are you sure you want to delete?
            </FormSubHeader>
            <FormButton type="submit">Delete</FormButton>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DeleteModal;
