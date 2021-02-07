import React from 'react';
import { FormHeader } from '../../../common/typography';
import { ConfigureWrapper } from './styles';
import { useForm } from 'react-hook-form';
import { InputField } from '../../../common/form';
import { FormButton } from '../../../common/buttons';
import messengerLogo from '../../../../assets/images/platforms/messenger.png';

const MessengerConfigure = ({ hideModal }) => {
  const { register, handleSubmit, errors, setError } = useForm();  

  return (
    <ConfigureWrapper>
      <div className="modal-body">
        <button className="modal-exit" onClick={hideModal}></button>
        <div className="modal-title">
          <img src={ messengerLogo } alt="Messenger Logo" />
          <FormHeader>Configure Messenger</FormHeader>
        </div>
        <div className="modal-content">
          <form className="configure-form">
            <div className="form-group">
              <label>
                <span className="form-label">Access Token </span>
                {errors.access_token && errors.access_token.type === 'required' && (<span className="form-error">This field is required</span>)}
                {errors.access_token && errors.access_token.type === 'server' && (<span className="form-error">{ errors.access_token.message}</span>)}
              </label>
              <InputField
                isError={!!errors.access_token}
                name="name"
                placeholder="Enter Access Token"
                ref={register({required: true})}
              />
            </div>
            <div className="form-group">
              <label>
                <span className="form-label">App Secret </span>
                {errors.app_secret && errors.app_secret.type === 'server' && (<span className="form-error">{ errors.name.message}</span>)}
              </label>
              <InputField
                isError={!!errors.app_secret}
                name="app_secret"
                placeholder="Enter App Secret"
                ref={register}
              />
            </div>
            <div className="form-group">
              <label>
                <span className="form-label">Verification Code </span>
                {errors.verification_code && errors.verification_code.type === 'required' && (<span className="form-error">This field is required</span>)}
                {errors.verification_code && errors.verification_code.type === 'server' && (<span className="form-error">{ errors.verification_code.message}</span>)}
              </label>
              <InputField
                isError={!!errors.verification_code}
                name="name"
                placeholder="Enter Access Token"
                ref={register({required: true})}
              />
            </div>
            <div className="form-group">
              <label>
                <span className="form-label">Callback URL</span>
              </label>
              <p>https://staging.bot.manaweb.ca/facebook/84cb0c9b-c95b-40c3-9484-de05a8479bd8</p>
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

export default MessengerConfigure;
