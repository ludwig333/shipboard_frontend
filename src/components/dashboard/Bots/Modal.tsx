import React, { useState, useRef, useEffect } from 'react';
import { FormHeader } from '../../common/typography';
import { InputField } from '../../common/form';
import { FormButton } from '../../common/buttons';
import { BotDataType } from '../../../../types';
import { saveBots, updateBot } from '../../../apis/bots';
import { toast } from 'react-toastify';

type BotType = {
  id: string;
  name: string;
  last_modified?: string;
};

const defaultBotData: BotType = {
  id: '',
  name: '',
};

const BotModal = ({
  hideModal,
  bots,
  reloadPage,
}: {
  hideModal?: () => void;
  bots?: BotType;
  reloadPage?: () => void;
}) => {
  const [botData, setBotData] = useState(bots || defaultBotData);
  const [errorMessage, setErrorMessage] = useState(defaultBotData);

  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const buttonTitle = bots ? 'Update' : 'Save';

  useEffect(() => {
    nameRef.current && nameRef.current.focus();
    if (bots) setBotData({ ...botData, name: bots.name });
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

  const resetState = () => {
    setErrorMessage(defaultBotData);
    setBotData(defaultBotData);
    reloadPage();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (bots) {
        editBot();
      } else {
        createBot();
      }
    } catch (e) {
      toast.error('Something went wrong');
    }
  };

  const createBot = () => {
    saveBots({ name: botData.name })
      .then((response) => {
        resetState();
        hideModal();
        toast.success('Bot added successfully');
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setErrorMessage({
            ...botData,
            name: err.response.data.errors.name
              ? err.response.data.errors.name[0]
              : '',
          });
        } else {
          hideModal();
          toast.error('Failed to create bot');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const editBot = () => {
    updateBot({ name: botData.name }, botData?.id || '1')
      .then((response) => {
        resetState();
        hideModal();
        toast.success('Bot updated successfully');
      })
      .catch((err) => {
        if (err.response.status === 422) {
          setErrorMessage({
            ...botData,
            name: err.response.data.errors.name
              ? err.response.data.errors.name[0]
              : '',
          });
        } else {
          hideModal();
          toast.error('Failed to update bot');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <React.Fragment>
      <div className="modal-body">
        <button className="modal-exit" onClick={hideModal}></button>
        <div className="modal-title">
          <FormHeader>{bots ? 'Edit Bot' : 'Create bot'}</FormHeader>
        </div>
        <div className="modal-content">
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
              value={botData.name}
            />
            {errorMessage.name && (
              <span className="form-error">{errorMessage.name}</span>
            )}
            <FormButton type="submit" disabled={isLoading}>
              {isLoading ? 'Loading...' : buttonTitle}
            </FormButton>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default BotModal;
