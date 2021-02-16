import React, {useState} from 'react';
import { FormHeader } from '../../../common/typography';
import { ConfigureWrapper } from './styles';
import { useForm } from 'react-hook-form';
import { InputField, SelectField } from '../../../common/form';
import { FormButton } from '../../../common/buttons';
import messengerLogo from '../../../../assets/images/platforms/messenger.png';
import { updataPlatformConfiguration } from '../../../../apis/bots';
import { toast } from 'react-toastify';
import urls from '../../../../constants/urls';

const MessengerConfigure = ({ botId, hideModal, configuration, changeConfiguration }) => {
  const { register, handleSubmit, errors, setError } = useForm();  
  const [isLoading, setIsLoading] = useState(false);
  const updateConfiguration = (data) => {
    setIsLoading(true);
    var config = {
      platform: "messenger",
      verification_code: data.verification_code,
      access_token: data.access_token,
      connect_status: data.connect_status,
      app_secret: data.app_secret
    };
    updataPlatformConfiguration(config, botId).then((response) => {
      changeConfiguration(config)
      hideModal();
    }).catch((err) => {
      if (err.response.status === 422) {
        if (err.response.data.errors.access_token) {
          setError('access_token', {
            type: 'server',
            message: err.response.data.errors.access_token[0]
          })
        } 
        if (err.response.data.errors.app_secret) {
          setError('app_secret', {
            type: 'server',
            message: err.response.data.errors.app_secret[0]
          })
        } 
        if (err.response.data.errors.verification_code) {
          setError('verification_code', {
            type: 'server',
            message: err.response.data.errors.verification_code[0]
          })
        } 
        if (err.response.data.errors.connect_status) {
          setError('connect_status', {
            type: 'server',
            message: err.response.data.errors.connect_status[0]
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
    <ConfigureWrapper>
      <div className="modal-body">
        <button className="modal-exit" onClick={hideModal}></button>
        <div className="modal-title">
          <img src={ messengerLogo } alt="Messenger Logo" />
          <FormHeader>Configure Messenger</FormHeader>
        </div>
        <div className="modal-content">
          <form className="configure-form" onSubmit={handleSubmit(updateConfiguration)}>
            <div className="form-group">
              <label>
                <span className="form-label">Access Token </span>
                {errors.access_token && errors.access_token.type === 'required' && (<span className="form-error">This field is required</span>)}
                {errors.access_token && errors.access_token.type === 'server' && (<span className="form-error">{ errors.access_token.message}</span>)}
              </label>
              <InputField
                isError={!!errors.access_token}
                name="access_token"
                id="access_token"
                placeholder="Enter Access Token"
                ref={register({ required: true })}
                defaultValue={configuration ? configuration.access_token : null}
              />
            </div>
            {/* <div className="form-group">
              <label>
                <span className="form-label">App Secret </span>
                {errors.app_secret && errors.app_secret.type === 'server' && (<span className="form-error">{ errors.name.message}</span>)}
              </label>
              <InputField
                isError={!!errors.app_secret}
                name="app_secret"
                id="app_secret"
                placeholder="Enter App Secret"
                ref={register}
                defaultValue={configuration ? configuration.app_secret : null}
              />
            </div> */}
            <div className="form-group">
              <label>
                <span className="form-label">Verification Code </span>
                {errors.verification_code && errors.verification_code.type === 'required' && (<span className="form-error">This field is required</span>)}
                {errors.verification_code && errors.verification_code.type === 'server' && (<span className="form-error">{ errors.verification_code.message}</span>)}
              </label>
              <InputField
                isError={!!errors.verification_code}
                name="verification_code"
                id="verification_code"
                placeholder="Enter Access Token"
                ref={register({ required: true })}
                defaultValue={(configuration && configuration.verification_code) ? configuration.verification_code : null}
              />
            </div>
            <div className="form-group">
              <label>
                <span className="form-label">Callback URL</span>
              </label>
              <InputField
                disabled
                readOnly
                id="callback_url"
                defaultValue={ urls.messenger + '/' + botId}
              />
            </div>
            <div className="form-group last-input">
              <label>
                <span className="form-label">Status</span>
                {errors.connect_status && errors.connect_status.type === 'required' && (<span className="form-error">This field is required</span>)}
              </label>
              <SelectField
                isError={!!errors.connect_status}
                name="connect_status"
                id="connect_status"
                ref={register({ required: true })}
                defaultValue={ configuration ? configuration.connect_status : null}
              >
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </SelectField>
            </div>
            <FormButton type="submit">
              {isLoading ? 'Loading...' : 'Save'}
            </FormButton>
          </form>
        </div>
      </div>
      </ConfigureWrapper>
  );
};

export default MessengerConfigure;
