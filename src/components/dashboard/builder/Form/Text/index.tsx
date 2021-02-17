import React, { useEffect, useState, useRef, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { BuilderContext } from '../../../../../services/Builder/BuilderProvider';
import { AddTextWrapper } from './styles';
import { AddTextButton, ContentButton } from '../../../../common/buttons';
import { BiTrash } from 'react-icons/bi';
import Textarea from 'react-expanding-textarea';
import { updateText, deleteText } from '../../../../../apis/texts';
import { toast } from 'react-toastify';
import { saveButton } from '../../../../../apis/buttons';
import { v4 as uuidv4 } from 'uuid';


const FormText = ({ messageId, childId , showBtnEditor, setEditorContent}) => {
  const [builderState, setBuilderState] = useContext(BuilderContext);
  const { register, handleSubmit } = useForm({ mode: 'onChange' });
  const [isChangingBody, setIsChangingBody] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  //Find index of specific object using findIndex method.
  const childIndex = builderState[messageId].children.findIndex(
    (obj) => obj.id == childId
  );

  const onTextChange = (data) => {
    var height = textAreaRef.current.scrollHeight;
    updateText({
      text: data.text,
      height: height
    }, childId).then((response) => {
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
    }).catch((err) => {
      toast.error("Something went wrong");
    })
  };

  const handleDelete = () => {
    var height = builderState[messageId].height - textAreaRef.current.scrollHeight;
    deleteText(childId)
      .then(() => {
        setBuilderState(
          builderState.map((item, index) => {
            if (index == messageId) {
              item.height = height;
              item.children.splice(childIndex,1)
            }
            return item;
          })
        );
      })
      .catch((err) => {
        toast.error("Something went wrong");
    })
  };

  const handleAddButton = () => {
    const buttonNumber = builderState[messageId].children[childIndex].buttons.length + 1;
    saveButton({
      name: 'Button #' + buttonNumber,
      parent_type: 'text',
      parent: childId
    }).then((response) => {
      setBuilderState(
        builderState.map((item, index) => {
          if (index == messageId) {
            item.children.map((child) => {
              if (child.id == childId) {
                child.buttons.push(response.data);
              }
            });
          }
          return item;
        })
      );
    }).catch((err) => {
      toast.error("Something went wrong")
    })      
  }

  useEffect(() => {
    if (textAreaRef.current) {
      register(textAreaRef.current, {required: true, minLength: 3});
    }
  }, []);

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
      <div className="card-base">
        {builderState[messageId].children[childIndex].buttons && builderState[messageId].children[childIndex].buttons.map((button, index) => {
          return (
            <React.Fragment key={button.id}>
              <ContentButton
                ref={buttonRef}
                onClick={(event) => {
                setEditorContent({
                  name: button.name,
                  id: button.id,
                  messageId: builderState[messageId].id,
                  childId: childId,
                  type: 'text',
                  url: button.url,
                  next: button.next
                });
                showBtnEditor();
            }}>{button.name}</ContentButton>
            </React.Fragment>
          );
        })}
        <AddTextButton height="4rem" width="100%" onClick={handleAddButton}>
          Add Button
        </AddTextButton>
      </div>
    </AddTextWrapper>
  );
};

export default FormText;
