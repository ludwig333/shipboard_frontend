import React from 'react';
import { FormHeader } from '../../../common/typography';
import { ConfigureWrapper } from './styles';
import { useForm } from 'react-hook-form';
import { InputField } from '../../../common/form';
import { FormButton } from '../../../common/buttons';
import telegramLogo from '../../../../assets/images/platforms/telegram.png';

const TelegramConfigure = ({ hideModal }) => {
  const { register, handleSubmit, errors, setError } = useForm();  

  return (
    <ConfigureWrapper>
      <div className="modal-body">
        <button className="modal-exit" onClick={hideModal}></button>
        <div className="modal-title">
          <img src={ telegramLogo } alt="Messenger Logo" />
          <FormHeader>Configure Telegram</FormHeader>
        </div>
        <div className="modal-content">
          <form className="configure-form">
            <div className="form-group">
              <label>
                <span className="form-label">Username</span>
                {errors.user_name && errors.user_name.type === 'required' && (<span className="form-error">This field is required</span>)}
                {errors.user_name && errors.user_name.type === 'minLength' && (<p className="form-error">This field is required min length of 3</p>)}
                {errors.user_name && errors.user_name.type === 'server' && (<span className="form-error">{ errors.user_name.message}</span>)}
              </label>
              <InputField
                isError={!!errors.user_name}
                name="name"
                placeholder="Enter Username"
                ref={register({required: true, minLength: 3})}
              />
            </div>
            <div className="form-group last-input">
              <label>
                <span className="form-label">Access Key</span>
                {errors.access_key && errors.access_key.type === 'required' && (<span className="form-error">This field is required</span>)}
                {errors.access_key && errors.access_key.type === 'server' && (<span className="form-error">{ errors.access_key.message}</span>)}
              </label>
              <InputField
                isError={!!errors.access_key}
                name="name"
                placeholder="Enter Access Key"
                ref={register({required: true})}
              />
            </div>
            <FormButton type="submit">
               Save
            </FormButton>
          </form>
        </div>
      </div>
      </ConfigureWrapper>
  );
};

export default TelegramConfigure;
