import React, { useEffect, useState, useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BuilderContext } from '../../../../../services/Builder/BuilderProvider';
import { AddTextWrapper } from './styles';
import { AddTextButton } from '../../../../common/buttons';
import { BiTrash } from 'react-icons/bi';
import Textarea from 'react-expanding-textarea';

const FormText = ({ messageId, childId }) => {
  const [builderState, setBuilderState] = useContext(BuilderContext);
  const { register, handleSubmit } = useForm({ mode: 'onChange' });
  const [isChangingBody, setIsChangingBody] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  //Find index of specific object using findIndex method.
  const childIndex = builderState[messageId].children.findIndex(
    (obj) => obj.id == childId
  );

  const onTextChange = (data) => {
    var height = textAreaRef.current.scrollHeight;
    setBuilderState(
      builderState.map((item, index) => {
        if (index == messageId) {
          item.children.map((child, ind) => {
            if (ind == childIndex) {
              child.value = data.text;
              child.height = height;
            }
          });
        }
        return item;
      })
    );
  };

  const handleDelete = () => {
    var height =
      builderState[messageId].height - textAreaRef.current.scrollHeight;
    setBuilderState(
      builderState.map((item, index) => {
        if (index == messageId) {
          item.height = height;
          item.children.splice(childIndex,1)
        }
        return item;
      })
    );
  };

  useEffect(() => {
    if (textAreaRef.current) {
      register(textAreaRef.current);
      textAreaRef.current.focus();
    }
  }, [isChangingBody]);

  return (
    <AddTextWrapper>
      <button className="action-btn">
        <BiTrash onClick={handleDelete} />
      </button>
      <div className={isChangingBody ? 'card-body active' : 'card-body'}>
        <form onBlur={handleSubmit(onTextChange)}>
          <Textarea
            maxLength={500}
            placeholder="Enter your text here"
            onBlur={() => setIsChangingBody(false)}
            defaultValue={builderState[messageId].children[childIndex].value}
            id="text"
            name="text"
            ref={textAreaRef}
            onClick={() => setIsChangingBody(true)}
          />
        </form>
      </div>

      <AddTextButton height="4rem" width="100%">
        Add Button
      </AddTextButton>
    </AddTextWrapper>
  );
};

export default FormText;
