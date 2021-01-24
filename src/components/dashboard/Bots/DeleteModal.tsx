import React from 'react';
import { FormHeader, FormSubHeader } from '../../common/typography';
import { FormButton } from '../../common/buttons';
import { deleteBot } from '../../../apis/bots';
import { toast } from 'react-toastify';

const BotDeleteModal = ({ hideModal, bot, handleDeleteBot }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    deleteBot(bot.id)
      .then((response) => {
        handleDeleteBot(bot.id)
        hideModal();
        toast.success("Bot deleted successfully");

      }).catch((err) => { 
        toast.error('Something went wrong')
      }).finally(() => { 
        setIsLoading(false);
      })
  }

  return (
    <React.Fragment>
      <div className="modal-body">
        <button className="modal-exit" onClick={hideModal}></button>
        <div className="modal-title">
          <FormHeader>Confirm Delete</FormHeader>
        </div>
        <div className="modal-content">
          <form className="bot-create-form" onSubmit={onSubmit}>
            <FormSubHeader className="last-input">
              Are you sure you want to delete bot "{ bot.name }"?
            </FormSubHeader>
            <FormButton type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Delete'}
            </FormButton>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BotDeleteModal;
