import React, { useContext, useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ToolbarWrapper, ToolbarMenu, ToolbarButtonGroup } from './styles';
import { VerticalGap } from '../../../common/typography';
import { ToolbarButton } from '../../../common/buttons';
import { BuilderContext } from '../../../../services/Builder/BuilderProvider';
import { GiCancel } from 'react-icons/gi';
import FormImage from '../Form/Image/index';
import FormText from '../Form/Text/index';
import FormCard from '../Form/Card/index';
import { connectFlowToMessage, updateMessage } from '../../../../apis/messages';
import { toast } from 'react-toastify';
import { saveText } from '../../../../apis/texts';
import { saveImage } from '../../../../apis/images';
import { addCardGroup } from '../../../../apis/cards';
import { useModal } from '../../../../services/Modal/ModalProvider';
import ConnectFlowModal from '../Modals/ConnectFlow';


const Toolbar = ({ id, hideToolbar, bot, flow }) => {
  const [builderState, setBuilderState] = useContext(BuilderContext);
  const [isChangingTitle, setIsChangingTitle] = useState(false);
  const { register, handleSubmit } = useForm({ mode: 'onChange' });
  const { showModal, hideModal } = useModal();

  // const titleRef = useRef<HTMLInputElement>(null);

  //Find index of specific object using findIndex method.
  const objIndex = builderState.findIndex((obj) => obj.id == id);

  const onChangeTitle = (data) => {
    updateMessage({
      name: data.title
    }, id).then((response) => {
      setBuilderState(
        builderState.map((item, ind) => {
          if (ind == objIndex) {
           item.name = data.title
          }
          return item;
        })
      );
    }).catch((err) => {
      toast.error('Something went wrong')
    })    
  };
  const openConnectFlowModal = () => {
    showModal(() => (
      <ConnectFlowModal flow={flow} bot={bot} hideModal={hideModal} handleSelect={handleSelect}/>
    ));
  }

  const handleSelect = (flowId, flowName) => {
    connectFlowToMessage({
      flow: flowId
    }, id).catch((err) => {
      toast.error("Something went wrong")
    })
    setBuilderState(
      builderState.map((item, index) => {
        if (item.id == id) {
          item.children.push({
            name: flowName
          })
        }
        return item;
      })
    );
    hideModal();
  }

  const removeConnetedFlow = () => {
    connectFlowToMessage({}, id).catch((err) => {
      toast.error("Something went wrong")
    })
    setBuilderState(
      builderState.map((item) => {
        if (item.id == id) {
          item.children.splice(0, 1);
        }
        return item;
      })
    );
  }
  

  const getContents = () => {
    if (builderState[objIndex].type === "default") {
      return (
        <ToolbarMenu>
          <div className={isChangingTitle ? 'header active' : 'header'}>
            <form onBlur={handleSubmit(onChangeTitle)}>
              <input
                maxLength={35}
                className="heading-input"
                ref={register({required: true, minLength: 3})}
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
                <React.Fragment key={child.id}>
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
        <ToolbarButtons id={id} index={objIndex} />
        </ToolbarMenu>
      );
    } else if (builderState[objIndex].type === "flow") {
      return (
        <ToolbarMenu>
          <div className='flow-header'>
            <h4>Connect Flow </h4>
          </div>
          {builderState[objIndex].children.length > 0 ? (
            builderState[objIndex].children.map((child) => {
              return (
                <React.Fragment key={child.id}>
                  <VerticalGap size="3" />
                  <div className="flow-content">
                    {child.name}
                    <button className="action-btn">
                      <GiCancel onClick={removeConnetedFlow} />
                  </button>
                  </div>
                </React.Fragment>
              );
            })
          ) : (
              <React.Fragment>
                <VerticalGap size="3" />
                <ToolbarButton height="4rem" width="25rem" onClick={openConnectFlowModal}>
                  Select Flow
                </ToolbarButton>
              </React.Fragment>
            )}
        </ToolbarMenu>
      );
    }
  }

  return (
    <ToolbarWrapper>
      {builderState[objIndex] &&
        getContents()
      }
    </ToolbarWrapper>
  );
};

export default Toolbar;

const ToolbarButtons = ({ id, index }) => {
  const [builderState, setBuilderState] = useContext(BuilderContext);

  const addText = () => {
    var height = builderState[index].height;
    height = height + 50;
    const positionIndex = builderState[index].children.length + 1;
    saveText({
      text: 'Change text',
      message: id,
      position: positionIndex
    }).then((response) => {
      setBuilderState(
        builderState.map((item, ind) => {
          if (ind == index) {
            item.height = height;
            item.children.push(response.data);
          }
          return item;
        })
      );
    }).catch((err) => {
      toast.error("Something went wrong");
    })
  };

  const addCard = () => {
    let height = builderState[index].height;
    height = height + 150;
    const positionIndex = builderState[index].children.length + 1;


    addCardGroup({
      message: id,
      position: positionIndex
    }).then((response) => {
      console.log(response.data);
      setBuilderState(
        builderState.map((item, ind) => {
          if (ind == index) {
            item.height = height;
            item.children.push(response.data);
          }
          return item;
        })
      );
    }).catch((err) => {
      toast.error("Something went wrong");
    });
  };

  const addImage = () => {
    let height = builderState[index].height;
    height = height + 150;
    const positionIndex = builderState[index].children.length + 1;

    saveImage({
      message: id,
      position: positionIndex
    }).then((response) => {
      setBuilderState(
        builderState.map((item, ind) => {
          if (ind == index) {
            item.height = height;
            item.children.push(response.data);
          }
          return item;
        })
      );
    }).catch((err) => {
      toast.error("Something went wrong");
    })
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
        {/* <ToolbarButton height="4rem" width="25rem">
          Next Button
        </ToolbarButton> */}
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
