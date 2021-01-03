import React, { useState, useEffect, useRef, useContext } from 'react';
import { BuilderContext } from '../../../../../services/Builder/BuilderProvider';
import { AddTextWrapper, TextArea } from './styles';
import { AddTextButton } from '../../../../common/buttons';
import { BiTrash } from "react-icons/bi";


const FormText = ({ messageId, childId }) => {
  const [message, setMessage] = useState('');
  const [height, setHeight] = useState('2');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [builderState, setBuilderState] = useContext(BuilderContext);

  //Find index of specific object using findIndex method.
  const childIndex = builderState[messageId].children.findIndex((obj) => obj.id == childId);

  useEffect(() => {
    setHeight(`${textAreaRef.current!.scrollHeight}`);
  }, [message]);


  const handleChange = (value) => {
    console.log(`${textAreaRef.current!.scrollHeight}`);
    setMessage(value);
  };

  const handleDelete = () => {
    setBuilderState([
      ...builderState,
      builderState[messageId].children.splice(childIndex, 1)
    ]);
  }

  return (
    <AddTextWrapper>
      <TextArea
        id="message"
        ref={textAreaRef}
        height={height}
        placeholder="Enter your text here"
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
      {/* <AddTextButton height="4rem" width="100%">
        Add Button
      </AddTextButton> */}
            <button className="action-btn"><BiTrash onClick={handleDelete}/></button>

    </AddTextWrapper>
  );
};

export default FormText;
