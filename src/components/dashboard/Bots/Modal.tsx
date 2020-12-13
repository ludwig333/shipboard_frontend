import React, { useState, useRef, useEffect } from 'react';
import { FormHeader } from '../../common/typography';
import { InputField } from '../../common/form';
import { FormButton } from '../../common/buttons';
import { BotDataType } from '../../../../types';
import { saveBots } from '../../../apis/bots';
import { useModalContext } from '../../../services/Modal/ModalProvider';
import { toast } from 'react-toastify';

const defaultBotData: BotDataType = {
  name: '',
};

const BotModal = () => {
  const [botData, setBotData] = useState(defaultBotData);
  const [errorMessage, setErrorMessage] = useState(defaultBotData);
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const modalContext = useModalContext();
  useEffect(() => {
    nameRef.current && nameRef.current.focus();
  }, []);

  const handleChange = <P extends keyof BotDataType>(
    prop: P,
    value: BotDataType[P]
  ) => {
    setBotData({ ...botData, [prop]: value });
    setErrorMessage({
      ...errorMessage,
      [prop]: '',
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    saveBots(botData)
      .then((response) => {
        modalContext.closeModal();
        toast.success('Bot added successfully');
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setErrorMessage({
            name: err.response.data.errors.name
              ? err.response.data.errors.name[0]
              : '',
          });
        } else {
          modalContext.closeModal();
          toast.error('Failed to create bot');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    children: (
      <React.Fragment>
        <form className="bot-create-form" onSubmit={handleSubmit}>
          <InputField
            isError={!!errorMessage.name}
            className="last-input"
            type="text"
            id="name"
            placeholder="Bot Name"
            ref={nameRef}
            onChange={(e) => {
              handleChange('name', e.target.value);
            }}
          />
          {errorMessage.name && (
            <span className="form-error">{errorMessage.name}</span>
          )}
          <FormButton type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Create'}
          </FormButton>
        </form>
      </React.Fragment>
    ),
    title: <FormHeader>Create Bot</FormHeader>,
  };
};

export default BotModal;
