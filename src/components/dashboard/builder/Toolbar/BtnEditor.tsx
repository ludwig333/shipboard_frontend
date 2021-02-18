import React, {useState} from 'react';
import { BtnEditorWrapper } from './styles';
import { useForm } from "react-hook-form";
import { InputField } from '../../../common/form';
import { toast } from 'react-toastify';
import { BuilderContext } from '../../../../services/Builder/BuilderProvider';
import { updateButton, deleteButton, createAndConnectWithButton } from '../../../../apis/buttons';
import Textarea from 'react-expanding-textarea';
import { saveMessage } from '../../../../apis/messages';
import { S_IFBLK } from 'constants';
import { GiButtonFinger } from 'react-icons/gi';
import { GiCancel } from 'react-icons/gi';



const BtnEditor = ({ flow, handleClose, editorContent }) => {
  const { register, handleSubmit, errors, setError, setValue } = useForm(); 
  const [builderState, setBuilderState] = React.useContext(BuilderContext);
  const [nextMessageName, setNextMessageName] = useState(null);
  const [nextUrl, setNextUrl] = useState(null);
  const [showUrlField, setShowUrlField] = useState(false);


  const onSubmit = data => {
    updateButton({ name: data.name, url: data.url }, editorContent.id)
      .then((response) => {
        if (editorContent.type == 'text') {
          setBuilderState(
            builderState.map((message) => {
              if (message.id == editorContent.messageId) {
                message.children.map((child) => {
                  if (child.id == editorContent.childId) {
                    child.buttons.map((button) => {
                      if (button.id == editorContent.id) {
                        button.name = response.data.name
                        button.url = response.data.url
                        button.next = response.data.next
                      }
                    })
                  }
                })
              }
              return message;
            })
          );
        } else if (editorContent.type == 'card') {
          setBuilderState(
            builderState.map((message) => {
              if (message.id == editorContent.messageId) {
                message.children.map((child) => {
                  if (child.id == editorContent.childId) {
                    child.cards.map((card) => {
                      if (card.id == editorContent.activeCardId) {
                          card.buttons.map((button) => {
                            if (button.id == editorContent.id) {
                              button.name = response.data.name
                            }
                          })
                      }
                    })
                  }
                })
              }
              return message;
            })
          );
        }
      }).catch((err) => { 
        if (err.response.status === 422) {
          if (err.response.data.errors.name) {
            setError('name', {
              type: 'server',
              message: err.response.data.errors.name[0]
            })
          } 
          if (err.response.data.errors.url) {
            setError('url', {
              type: 'server',
              message: err.response.data.errors.url[0]
            })
          } 
        } else {
          toast.error('Something went wrong')
        }
      }).finally(() => {
        // handleClose();
      })
  }


  const handleDelete = () => {
    if (editorContent.type == 'text') {
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
    } else if (editorContent.type == 'card') {
      setBuilderState(
        builderState.map((message, mix) => {
          if ( message.id == editorContent.messageId) {
            message.children.map((child, cix) => {
              if (child.id == editorContent.childId) {
                child.cards.map((card, aci) => {
                  if (card.id == editorContent.activeCardId) {
                    const  buttonIndex = builderState[mix].children[cix].cards[aci].buttons.findIndex(
                      (obj) => obj.id == editorContent.id
                    );
                    card.buttons.splice(buttonIndex, 1)
                  }
                })
              }
            })
          }
          return message;
        })
      );
    }
    deleteButton(editorContent.id)
      .then(() => {
      })
      .catch((err) => {
        toast.error("Something went wrong");
      }).finally(() => {
        handleClose()
      });
  }

  const handleNextMessage = (e) => {
    e.preventDefault();
    let number = builderState.length + 1;
    if (!nextMessageName) {
      const newMessage = {
        name: 'Send Message #' + number,
        type: 'default',
        position_x: 1200,
        position_y: 60,
        flow: flow
      };
      createAndConnectWithButton(newMessage, editorContent.id)
        .then((response) => {
          setNextMessageName(response.data.name)
            setBuilderState(
              builderState.map((message) => {
                if (message.id == editorContent.messageId) {
                  message.children.map((child) => {
                    if (child.id == editorContent.childId) {
                      if (editorContent.type == 'text') {
                        child.buttons.forEach((button) => {
                          if (button.id == editorContent.id) {
                            button.next = response.data.id
                            editorContent.next = response.data.id
                            }
                          })
                      } else if (editorContent.type == 'card') {
                        child.cards.forEach((card) => {
                            if (card.id == editorContent.activeCardId) {
                              card.buttons.forEach((button) => {
                                if (button.id == editorContent.id) {
                                  button.next = response.data.id
                                }
                              })
                            }
                          })
                      }
                    }
                  })
                }
                return message;
              })
            );
          setBuilderState([...builderState, response.data]);
          handleClose();
        }).catch((err) => {
          console.log(err);
            toast.error("Something went wrong")
          }).finally(() => {
            handleClose();
          })
    }
  }

  const handleNextUrl = (e) => {
    e.preventDefault();
    setShowUrlField(true);
  }

  React.useEffect(() => {
    setValue("name", editorContent.name);
    var messageName = null;
    //Set the next message name and url by looping through 
    builderState.forEach((message) => {
      if (message.id == editorContent.next) {
        messageName = message.name
      }
    });

    setNextMessageName(messageName);
    setNextUrl(editorContent.url);
  }, [editorContent.name, nextMessageName, nextUrl])


  return (
    <BtnEditorWrapper position={editorContent.position}>
      <div className="title">
        Edit Button
        <div className="close-editor" onClick={handleClose}><GiCancel/></div>
      </div>
      <hr />
      <form className="content">
        <label>Name</label>
        <InputField
          onBlur={handleSubmit(onSubmit)}
          name="name"
          id="name"
          ref={register({ required: true })}
        />
        <br/>
        <label>When the button is clicked</label>
        {!(showUrlField || nextUrl) && <div className="btn-div" onClick={handleNextMessage}>
          <div className="btn-label">
            <h3>Send Message</h3>
          {nextMessageName && <p>{nextMessageName}</p>}
          </div>
          {/* {nextMessageName && <div className="remove-btn">X</div>} */}
        </div>}
        {!nextMessageName && <div className="btn-div" onClick={handleNextUrl}>
          <div className="btn-label">
          <h3>Open Website</h3>
          {nextUrl && <p>{nextUrl}</p>}
          </div>
          {/* {nextUrl && <div className="remove-btn">X</div>} */}
        </div>}
        {showUrlField &&
          <>
            <label>Web Address</label>
            <InputField
            ref={register}
            name="url"
            id="url"
            defaultValue={nextUrl}
            onBlur={handleSubmit(onSubmit)}
            />
          </>}
          <div className="bottom">
          <button className="btn btn-delete" onClick={(e) => {
            e.preventDefault();
            handleDelete()
          }
          }>Delete</button>
        <button type="submit" className="btn btn-done" onClick={handleClose}>Done</button>
      </div>
      </form>
     
    </BtnEditorWrapper>
  );
}

export default BtnEditor;