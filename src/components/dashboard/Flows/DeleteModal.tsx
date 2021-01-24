import React from 'react';
import { FormHeader, FormSubHeader } from '../../common/typography';
import { FormButton } from '../../common/buttons';
import { deleteFlow } from '../../../apis/flows';
import { toast } from 'react-toastify';

const FlowDeleteModal = ({ hideModal, flow, handleDeleteFlow }) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    deleteFlow(flow.id)
      .then((response) => {
        handleDeleteFlow(flow.id)
        hideModal();
        toast.success("Flow deleted successfully");

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
              Are you sure you want to delete flow "{ flow.name }"?
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

export default FlowDeleteModal;
