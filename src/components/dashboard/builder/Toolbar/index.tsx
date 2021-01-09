import React, { useContext, useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ToolbarWrapper, ToolbarMenu, ToolbarButtonGroup } from './styles';
import { ToolbarHeading, VerticalGap } from '../../../common/typography';
import { ToolbarButton } from '../../../common/buttons';
import { BuilderContext } from '../../../../services/Builder/BuilderProvider';
import { v4 as uuidv4 } from 'uuid';
import FormImage from '../Form/Image/index';
import FormText from '../Form/Text/index';
import FormCard from '../Form/Card/index';
import { InputField } from '../../../common/form';
import Textarea from 'react-expanding-textarea';

const Toolbar = ({ id, hideToolbar }) => {
  const [builderState, setBuilderState] = useContext(BuilderContext);
  const [isChangingTitle, setIsChangingTitle] = useState(false);
  const { register, handleSubmit } = useForm({ mode: 'onChange' });

  const titleRef = useRef<HTMLInputElement>(null);

  //Find index of specific object using findIndex method.
  const objIndex = builderState.findIndex((obj) => obj.id == id);

  const onChangeTitle = (data) => {
    setBuilderState([
      ...builderState,
      (builderState[objIndex].name = data.title),
    ]);
  };

  //UseEffects
  useEffect(() => {
    if (titleRef.current) {
      register(titleRef.current);
      titleRef.current.focus();
    }
  }, [isChangingTitle]);

  return (
    <ToolbarWrapper>
      <ToolbarMenu>
        <div className={isChangingTitle ? 'header active' : 'header'}>
          <form onBlur={handleSubmit(onChangeTitle)}>
            <Textarea
              maxLength={35}
              className="heading-input"
              ref={titleRef}
              id="title"
              name="title"
              defaultValue={builderState[objIndex].name}
              onBlur={() => setIsChangingTitle(false)}
            />
          </form>
        </div>
        {builderState[objIndex].children.length > 0 ? (
          builderState[objIndex].children.map((child) => {
            return (
              <React.Fragment>
                <VerticalGap size="3" />
                {getChildren(child, objIndex)}
              </React.Fragment>
            );
          })
        ) : (
          <React.Fragment>
            <VerticalGap size="3" />
            <p className="no-content-text">No content</p>
          </React.Fragment>
        )}
        <VerticalGap size="3" />
        <ToolbarButtons index={objIndex} />
      </ToolbarMenu>
    </ToolbarWrapper>
  );
};

export default Toolbar;

const ToolbarButtons = ({ index }) => {
  const [builderState, setBuilderState] = useContext(BuilderContext);

  const addText = () => {
    let height = builderState[index].height;
    height = height + 50;
    setBuilderState([
      ...builderState,
      (builderState[index].height = height),
      builderState[index].children.push({
        id: uuidv4(),
        type: 'text',
        value: 'Change text',
      }),
    ]);
  };

  const addCard = () => {
    setBuilderState([
      ...builderState,
      builderState[index].children.push({
        id: uuidv4(),
        type: 'card',
        cards: [
          {
            id: uuidv4(),
            active: true,
            selectedImage: null,
            imagePreviewUrl: '',
            heading: 'subtitle #1',
            body: 'This is the body paragraph',
          },
        ],
      }),
    ]);
  };

  const addImage = () => {
    setBuilderState([
      ...builderState,
      builderState[index].children.push({ id: uuidv4(), type: 'image' }),
    ]);
  };

  return (
    <React.Fragment>
      <ToolbarButtonGroup>
        <ToolbarButton
          height="6rem"
          width="6rem"
          fontSize="1.2rem"
          onClick={addText}>
          + Text
        </ToolbarButton>
        <ToolbarButton
          height="6rem"
          width="6rem"
          fontSize="1.2rem"
          onClick={addCard}>
          + Card
        </ToolbarButton>
        <ToolbarButton
          height="6rem"
          width="6rem"
          fontSize="1.2rem"
          onClick={addImage}>
          + Image
        </ToolbarButton>
        <ToolbarButton height="4rem" width="25rem">
          Next Button
        </ToolbarButton>
      </ToolbarButtonGroup>
    </React.Fragment>
  );
};

const getChildren = (children, messageId) => {
  if (children.type === 'text') {
    return <FormText messageId={messageId} childId={children.id} />;
  } else if (children.type === 'image') {
    return <FormImage messageId={messageId} childId={children.id} />;
  } else if (children.type === 'card') {
    return <FormCard messageId={messageId} childId={children.id} />;
  }
};
