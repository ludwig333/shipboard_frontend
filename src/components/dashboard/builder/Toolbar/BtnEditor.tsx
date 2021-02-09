import React from 'react';
import { BtnEditorWrapper } from './styles';
import { useForm } from "react-hook-form";
import { InputField } from '../../../common/form';
import { toast } from 'react-toastify';
import { BuilderContext } from '../../../../services/Builder/BuilderProvider';
import { updateButton, deleteButton } from '../../../../apis/buttons';


const BtnEditor = ({ handleClose, editorContent }) => {
  const { register, handleSubmit, errors, setError, setValue } = useForm(); 
  const [builderState, setBuilderState] = React.useContext(BuilderContext);

  const onSubmit = data => {
    updateButton({ name: data.name }, editorContent.id)
      .then((response) => {
        setBuilderState(
          builderState.map((message) => {
            if (message.id == editorContent.messageId) {
              message.children.map((child) => {
                if (child.id == editorContent.childId) {
                  child.buttons.map((button) => {
                    if (button.id == editorContent.id) {
                      button.name = response.data.name
                    }
                  })
                }
              })
            }
            return message;
          })
        );
      }).catch((err) => { 
        if (err.response.status === 422) {
          if (err.response.data.errors.name) {
            setError('name', {
              type: 'server',
              message: err.response.data.errors.name[0]
            })
          } 
        } else {
          toast.error('Something went wrong')
        }
      })
  }

  const handleDelete = () => {
    console.log('deleted')
    setBuilderState(
      builderState.map((message, mix) => {
        if ( message.id == editorContent.messageId) {
          message.children.map((child, cix) => {
            if (child.id == editorContent.childId) {
              const  buttonIndex = builderState[mix].children[cix].buttons.findIndex(
                (obj) => obj.id == editorContent.id
              );
              child.buttons.splice(buttonIndex, 1)
            }
          })
        }
        return message;
      })
    );
    deleteButton(editorContent.id)
      .then(() => {
      })
      .catch((err) => {
        toast.error("Something went wrong");
      }).finally(() => {
        handleClose()
      });
  }

  React.useEffect(() => {
    setValue("name", editorContent.name)
  }, [editorContent.name])


  return (
    <BtnEditorWrapper position={editorContent.position}>
      <div className="title">
        Edit Button
      </div>
      <hr />
      <form className="content" onBlur={handleSubmit(onSubmit)}>
        <label>Name</label>
        <InputField
          name="name"
          id="name"
          ref={register({ required: true })}
        />
        <div className="bottom">
          <button className="btn btn-delete" onClick={(e) => {
            e.preventDefault();
            handleDelete()
          }
          }>Delete</button>
        <button className="btn btn-done" onClick={handleClose}>Done</button>
      </div>
      </form>
     
    </BtnEditorWrapper>
  );
}

export default BtnEditor;