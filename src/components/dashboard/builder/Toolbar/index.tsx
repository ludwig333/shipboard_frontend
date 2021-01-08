import React, { useContext, useState, useEffect } from 'react';
import { ToolbarWrapper, ToolbarMenu, ToolbarButtonGroup } from './styles';
import { ToolbarHeading, VerticalGap } from '../../../common/typography';
import { ToolbarButton } from '../../../common/buttons';
import { BuilderContext } from '../../../../services/Builder/BuilderProvider';
import { v4 as uuidv4 } from 'uuid';
import FormImage from '../Form/Image/index';
import FormText from '../Form/Text/index';
import FormCard from '../Form/Card/index';
import { InputField } from '../../../common/form';

const Toolbar = ({ id, hideToolbar }) => {
  const [builderState, setBuilderState] = useContext(BuilderContext);
  const [isChangingTitle, setIsChangingTitle] = useState(false);

  //Find index of specific object using findIndex method.
  const objIndex = builderState.findIndex((obj) => obj.id == id);

  const handleTitleChange = (e) => {
    setBuilderState([
      ...builderState,
      (builderState[objIndex].name = e.target.value),
    ]);
  };

  return (
    <ToolbarWrapper>
      <ToolbarMenu>
        <div className="header">
          <ToolbarHeading>
            {isChangingTitle ? (
              <InputField
                type="text"
                id="title"
                value={builderState[objIndex].name}
                onChange={handleTitleChange}
                onBlur={() => setIsChangingTitle(false)}
              />
            ) : (
              <ToolbarHeading onClick={() => setIsChangingTitle(true)}>
                {builderState[objIndex].name}
              </ToolbarHeading>
            )}
          </ToolbarHeading>
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
          <p>No content</p>
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
      builderState[index].children.push({ id: uuidv4(), type: 'text', value: 'Change text' }),
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
          {
            id: uuidv4(),
            active:false,
            selectedImage: null,
            imagePreviewUrl: '',
            heading: 'subtitle #2',
            body: 'This is body paragraph of second',
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
