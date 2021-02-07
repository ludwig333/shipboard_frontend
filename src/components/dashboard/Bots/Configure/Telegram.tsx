import React, {useState} from 'react';
import { FormHeader } from '../../../common/typography';
import { ConfigureWrapper } from './styles';
import { useForm } from 'react-hook-form';
import { InputField, SelectField } from '../../../common/form';
import { FormButton } from '../../../common/buttons';
import telegramLogo from '../../../../assets/images/platforms/telegram.png';
import { updataPlatformConfiguration } from '../../../../apis/bots';
import { toast } from 'react-toastify';

const TelegramConfigure = ({ botId, hideModal }) => {
  const { register, handleSubmit, errors, setError } = useForm();  
  const [isLoading, setIsLoading] = useState(false);

  const updateConfiguration = (data) => {
    setIsLoading(true);

    updataPlatformConfiguration({
      platform: 'telegram',
      username: data.username,
      access_token: data.access_token,
      connect_status: data.connect_status
    }, botId).then((response) => {
      hideModal();
      toast.success(response.message);
    }).catch((err) => {
      if (err.response.status === 422) {
        if (err.response.data.errors.username) {
          setError('username', {
            type: 'server',
            message: err.response.data.errors.username[0]
          })
        } 
        if (err.response.data.errors.access_token) {
          setError('access_token', {
            type: 'server',
            message: err.response.data.errors.access_token[0]
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
          <img src={ telegramLogo } alt="Messenger Logo" />
          <FormHeader>Configure Telegram</FormHeader>
        </div>
        <div className="modal-content">
          <form className="configure-form" onSubmit={handleSubmit(updateConfiguration)}>
            <div className="form-group">
              <label>
                <span className="form-label">Username</span>
                {errors.username && errors.username.type === 'required' && (<span className="form-error">This field is required</span>)}
                {errors.username && errors.username.type === 'minLength' && (<p className="form-error">This field is required min length of 3</p>)}
                {errors.username && errors.username.type === 'server' && (<span className="form-error">{ errors.username.message}</span>)}
              </label>
              <InputField
                isError={!!errors.username}
                id="username"
                name="username"
                placeholder="Enter Username"
                ref={register({required: true, minLength: 3})}
              />
            </div>
            <div className="form-group">
              <label>
                <span className="form-label">Access Key</span>
                {errors.access_token && errors.access_token.type === 'required' && (<span className="form-error">This field is required</span>)}
                {errors.access_token && errors.access_token.type === 'server' && (<span className="form-error">{ errors.access_token.message}</span>)}
              </label>
              <InputField
                isError={!!errors.access_token}
                name="access_token"
                id="access_token"
                placeholder="Enter Access Key"
                ref={register({required: true})}
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
                ref={register({ required: true })}>
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

export default TelegramConfigure;
