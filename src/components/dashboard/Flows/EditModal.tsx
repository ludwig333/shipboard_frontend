import React, { useState, useRef, useEffect } from 'react';
import { FormHeader } from '../../common/typography';
import { InputField } from '../../common/form';
import { FormButton } from '../../common/buttons';
import { useForm } from "react-hook-form";
import { updateFlow } from './../../../apis/flows';
import { toast } from 'react-toastify';

const FlowCreateModal = ({flow, hideModal, handleEditFlow}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, errors, setError } = useForm();  

  const onSubmit = data => {
    updateFlow({ name: data.name }, flow.id)
      .then((response) => {
        hideModal();
        toast.success(response.message);
        handleEditFlow(response.data)
      }).catch((err) => { 
        if (err.response.status === 422) {
          if (err.response.data.errors.name) {
            setError('name', {
              type: 'server',
              message: err.response.data.errors.name[0]
            })
          } 
        } else {
          toast.error('Something went wrong')
        }
      }).finally(() => { 
        setIsLoading(false);
      })
  }

  return (
    <React.Fragment>
      <div className="modal-body">
        <button className="modal-exit" onClick={hideModal}></button>
        <div className="modal-title">
          <FormHeader>Edit Flow</FormHeader>
        </div>
        <div className="modal-content">
          <form className="bot-create-form" onSubmit={handleSubmit(onSubmit)}>
            <InputField
              isError={!!errors.name}
              defaultValue={flow.name}
              name="name"
              ref={register({required: true, minLength: 3})}
            />
            {errors.name && errors.name.type === 'required' && (<p className="form-error">This field is required</p>)}
            {errors.name && errors.name.type === 'minLength' && (<p className="form-error">This field is required min length of 3</p>)}
            {errors.name && errors.name.type === 'server' && (<p className="form-error">{ errors.name.message}</p>)}

            <FormButton type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Save'}
            </FormButton>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FlowCreateModal;
