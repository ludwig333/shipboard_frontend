import React, { useState } from 'react';
import {withRouter} from 'react-router-dom'
import { FlowBuilderWrapper } from './styles';
import { Stage, Layer, Rect, Image, Text, Group, Circle } from 'react-konva';
import Toolbar from '../../../components/dashboard/builder/Toolbar/index';
import {
  handleRenderingCards,
  getImage,
  calculateHeightOfMessageBox,
  handleWheel,
  Edge,
  URLImage,
} from './helper';
import {
  useBuilder,
} from '../../../services/Builder/BuilderProvider';
import { BiMessageSquareAdd } from 'react-icons/bi';
import { saveMessage, getMessages, updateMessage, deleteMessage, createAndConnectMessage } from '../../../apis/messages';
import { toast } from 'react-toastify';
import { getFlow } from '../../../apis/flows';

const FlowBuilder = (props) => {
  const [isToolbarActive, setIsToolbarActive] = useState(null);
  const [builderState, setBuilderState, sidebar] = useBuilder();
  const [flow, setFlow] = useState(null);
  const [id, setId] = useState(null);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isEdging, setIsSetting] = useState(false);
  const [isSecondClick, setIsSecondClick] = useState(false);
  const [showToolOption, setShowToolOption] = useState(false);
  const [edgingMessageId, setEdgingMessageId] = useState(null);
  const [edgingButtonId, setEdgingButtonId] = useState(null);


  const [state, setState] = useState({
    layerScale: 1,
    layerX: 0,
    layerY: 0,
  });

  const TrashIcon = "data:image/svg+xml;base64," + window.btoa('<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M17.004 20L17.003 8h-1-8-1v12H17.004zM13.003 10h2v8h-2V10zM9.003 10h2v8h-2V10zM9.003 4H15.003V6H9.003z"></path><path d="M5.003,20c0,1.103,0.897,2,2,2h10c1.103,0,2-0.897,2-2V8h2V6h-3h-1V4c0-1.103-0.897-2-2-2h-6c-1.103,0-2,0.897-2,2v2h-1h-3 v2h2V20z M9.003,4h6v2h-6V4z M8.003,8h8h1l0.001,12H7.003V8H8.003z"></path><path d="M9.003 10H11.003V18H9.003zM13.003 10H15.003V18H13.003z"></path></svg>');

  const getNextNode = (id) => {
    if (id) {
      const nextIndex = builderState.findIndex((obj) => obj.id == id);
      if (nextIndex == -1) {
        return mousePosition;
      }
      return builderState[nextIndex].position;
    }
  };

  const hideToolbar = () => {
    setIsToolbarActive(false);
    setId(0);
  };

  const showToolbar = (id) => {
    setId(id);
    setIsToolbarActive(true);
  };

 
const handleRenderingChildrens = (message) => {
  var lastPosition = 70;
  return message.children.map(function (child) {
    var yposition = lastPosition;
    if (child.type === 'card') {
      lastPosition = lastPosition + child.cards[0].height;
    } else if (child.type === 'text') {
      const buttons = child.buttons.length;
      lastPosition = lastPosition + child.height + (buttons * 40) + 40;
    } else if (child.type === 'image') {
      lastPosition = lastPosition + child.height + 20;
    }
    return getChildren(message, child, yposition);
  });
};
  
const getChildren = (message, child, lastPosition) => {
  if (child.type === 'text') {
    var textButtons = child.buttons;
    var boxHeight = (child.height * 1.05) + (textButtons.length * 40) + 10;
    return (
      <Group x={20} y={lastPosition}>
        <Rect
          fill="#F0F4F7"
          cornerRadius={5}
          height={boxHeight}
          width={300}
          stroke="lightGrey"
          strokeWidth={1}
          shadowColor="#95bbdf"
          shadowOpacity={0.5}
          shadowBlur={7}
        />
        <Text
          x={15}
          y={7}
          text={child.value}
          fontSize={15}
          lineHeight={1.2}
          width={280}
        />
        {child.buttons.map((button, index) => {
          var y = (child.height * 1.05) + (40 * index) + 10;
          return (
            <Group>
              { button.next &&
                    <Edge
                      height={0}
                      node1={{ x: message.position.x , y: message.position.y }}
                      node2={getNextNode(button.next)}
                    />
                  }
              <Rect
                x={25}
                y={y}
                fill="#FFFFFF"
                cornerRadius={5}
                height={30}
                width={250}
                shadowOpacity={0.5}
                shadowBlur={7}
                align={"center"}
              />
              <Text
                x={10}
                y={y + 3}
                text={button.name}
                fontSize={15}
                width={280}
                lineHeight={1.5}
                align={"center"}
              />
              <Circle x={260} y={y + 14} radius={9} fill="#8392AB" strokeWidth={1}
                onMouseOver={() => { document.body.style.cursor = 'pointer' }}
                onMouseOut={() => { document.body.style.cursor = 'default' }}
                onClick={(e) => {
                  e.cancelBubble = true;
                  connectButtonEdge(message.id, child.id, button.id)
                }}
             />
            </Group>
          );
         })}
      </Group>
    );
  } else if (child.type === 'image') {
    return getImage(child, lastPosition);
  } else if (child.type === 'card') {
    return (
      <Group x={20} y={lastPosition}>
        {handleRenderingCards(child)}
      </Group>
    );
  }
};


  const getStageWidth = () => {
    return sidebar ? window.innerWidth - 280 : window.innerWidth - 90;
  };

  const setSelectedTrue = (messageId) => {
    var previousSelected = getSelectedNode(builderState);
    if (previousSelected >= 0) {
      setBuilderState(
        builderState.map((item, index) => {
          if (index == messageId) {
            item.isSelected = true;
          }
          if (index == previousSelected) {
            item.isSelected = false;
          }
          return item;
        })
      );
    } else {
      setBuilderState(
        builderState.map((item, index) => {
          if (index == messageId) {
            item.isSelected = true;
          }
          return item;
        })
      );
    }
  };

  const setHoverTrue = (messageId) => {
    var previousHover = getHoveredNode(builderState);
    if (previousHover >= 0) {
      setBuilderState(
        builderState.map((item, index) => {
          if (index == messageId) {
            item.isHover = true;
          }
          if (index == previousHover) {
            item.isHover = false;
          }
          return item;
        })
      );
    } else {
      setBuilderState(
        builderState.map((item, index) => {
          if (index == messageId) {
            item.isHover = true;
          }
          return item;
        })
      );
    }
  };

  const setHoverFalse = (messageId) => {
    setBuilderState(
      builderState.map((item, index) => {
        if (index == messageId) {
          item.isHover = false;
        }
        return item;
      })
    );
  };

  const connectEdge = (messageId) => {
    if (!showToolOption) {
      setIsSetting(true);
      setEdgingMessageId(messageId);
      setBuilderState(
        builderState.map((item) => {
          if (item.id == messageId) {
            item.next = 'dummy';
          }
          return item;
        })
      );
    }
  };

  const connectButtonEdge = (messageId, childId, buttonId) => {
    if (!showToolOption) {
      setIsSetting(true);
      setEdgingButtonId(buttonId);
      setBuilderState(
        builderState.map((item) => {
          if (item.id == messageId) {
            item.children.map((child) => {
              if (child.id == childId) {
                child.buttons.map((button) => {
                  if (button.id == buttonId) {
                    button.next = "dummy"
                  }
                })
              }
            })
          }
          return item;
        })
      );
    }
  }

  const handleMousePosition = (event) => {
    if (isEdging && !showToolOption) {
      var point = event.target.getStage().getPointerPosition();
      setMousePosition({
        x: point.x,
        y: point.y,
      });
    }
  };

  const handleClickOnCanvas = () => {
    if (isEdging) {
      var hoveredIndex = getHoveredNode(builderState);
      if (hoveredIndex > 0) {
        //If the edging is hovered over another message and connect that message
        var messageIdOfHover = builderState[hoveredIndex].id
        if (messageIdOfHover != edgingMessageId) {
          updateMessage({
            next: messageIdOfHover
          }, edgingMessageId).then((response) => { 
            setBuilderState(
              builderState.map((item, index) => {
                if (item.id == edgingMessageId) {
                  item.next = messageIdOfHover
                }
                return item;
              })
            );
          }).catch((err) => {
            toast.error("Something went wrong");
          })
        }
      } else {
        setShowToolOption(true);
      }
    }
  };

  const handleAddMessage = () => {
    let number = builderState.length + 1;
    saveMessage({
      name: 'Send Message #' + number,
      type: 'default',
      position_x: 1200,
      position_y: 60,
      flow: props.match.params.id
    }).then((response) => {
       setBuilderState([...builderState, response.data]);

    }).catch((err) => {
      toast.error("Something went wrong")
    })
  }

  const handleDeleteMessage = (item, index) => {
    if (index > 0) {
      //Delete the message
    builderState.splice(index, 1);
    //Delete the edging where this message belongs to
    const messageIndexHavingNextOfDeleteMessage = getMessageIndexWhichHasNextOfGivenMessageId(builderState, item.id);
    setBuilderState(
      builderState.map((item, index) => {
        if (index == messageIndexHavingNextOfDeleteMessage) {
          item.next = ""
        }
        return item;
      })
    );
    deleteMessage(item.id).then(() => {
      setShowToolOption(false);
      setEdgingMessageId(null);
      setIsSetting(false);
    }).catch((err) => {
        toast.error("Something went wrong");
      })
    } else {
      toast.info("You cannot delete the start message")
    }
  }

  const handleDragMessage = (e, item, index) =>  {
    var updatedPosition = {
      x: e.target.x(),
      y: e.target.y(),
    };

    setBuilderState(
      builderState.map((item, ind) => {
        if (ind == index) {
          item.position = updatedPosition;
        }
        return item;
      })
    );
  }

  const updateMessagePosition = (item) => {
    updateMessage({
      position_x: item.position.x,
      position_y: item.position.y
    }, item.id).catch((err) => {
      toast.error('Something went wrong')
    })    
  }

  const handleToolOptionNewMessageAction = () => {
    setIsSetting(false);
    setShowToolOption(false);

    let number = builderState.length + 1;
    createAndConnectMessage({
      name: 'Send Message #' + number,
      type: 'default',
      position_x: mousePosition.x,
      position_y: mousePosition.y,
      flow: props.match.params.id
    }, edgingMessageId).then((response) => {
      setBuilderState(
        builderState.map((item) => {
          if (item.id == edgingMessageId) {
            item.next = response.data.id;
          }
          return item;
        })
      );
      setBuilderState([...builderState, response.data]);

    }).catch((err) => {
      toast.error("Something went wrong")
    })
  }

  const handleToolOptionConnectFlow = () => {
    setIsSetting(false);
    setShowToolOption(false);

    let number = builderState.length + 1;
    createAndConnectMessage({
      name: 'Connect Flow #' + number,
      type: 'flow',
      position_x: mousePosition.x,
      position_y: mousePosition.y,
      flow: props.match.params.id
    }, edgingMessageId).then((response) => {
      setBuilderState(
        builderState.map((item) => {
          if (item.id == edgingMessageId) {
            item.next = response.data.id;
          }
          return item;
        })
      );
      setBuilderState([...builderState, response.data]);

    }).catch((err) => {
      toast.error("Something went wrong")
    })
  }
  
  React.useEffect(() => {
    getMessages(props.match.params.id)
      .then((response) => {
        setBuilderState(response.data)
      })
      .catch((err) => {
        toast.error("Something went wrong")
      })
    getFlow(props.match.params.id)
      .then((response) => {  
        setFlow(response.data);
    }).catch((err) => {
      toast.error("Something went wrong")
    })
  }, []);

  const getToolOption = () => {
    return (
      <Group  x={mousePosition.x} y={mousePosition.y} zIndex={200}
        onMouseOver={() => { document.body.style.cursor = 'pointer' }}
        onMouseOut={() => { document.body.style.cursor = 'default' }}
      >
        <Group onClick={handleToolOptionNewMessageAction}>
          <Rect
            width={200}
            height={50}
            fill="#FDFDFD"
            strokeWidth={2}
            shadowColor="gray"
            shadowOpacity={0.7}
            shadowBlur={2}
            onMouseDown={(e) => {
              e.target.setAttr('fill', ' #eef1f4');
            }}
          />
          <Text
            x={15}
            y={15}
            text="+ New Message"
            fontFamily={'Roboto'}
            fontSize={20}
            fill={'#5850eb'}
          />
        </Group>
        <Group y={50} onClick={handleToolOptionConnectFlow}>
          <Rect
            width={200}
            height={50}
            fill="#FDFDFD"
            strokeWidth={2}
            shadowColor="gray"
            shadowOpacity={0.7}
            shadowBlur={2}
            onMouseDown={(e) => {
              e.target.setAttr('fill', ' #eef1f4');
            }}
          />
          <Text
            x={15}
            y={15}
            text="+ Connect Flow"
            fontFamily={'Roboto'}
            fontSize={20}
            fill={'#5850eb'}
          />
        </Group>
        <Group y={100}  onClick={() => {
          setShowToolOption(false);
          setIsSetting(false);
          setBuilderState(
            builderState.map((item) => {
              if (item.id == edgingMessageId) {
                item.next = ""
              }
              return item;
            })
          );
        }}>
          <Rect
            width={200}
            height={50}
            fill="#FDFDFD"
            strokeWidth={2}
            shadowColor="gray"
            shadowOpacity={0.7}
            shadowBlur={2}
            onMouseDown={(e) => {
              e.target.setAttr('fill', ' #eef1f4');
            }}
          />
          <Text
            x={15}
            y={15}
            text="- Cancel"
            fontFamily={'Roboto'}
            fontSize={20}
            fill={'#5850eb'}
          />
        </Group>
      </Group>
    );
  }
  const getDefaultMessage = (item, index, messageHeight) => {
    return (
      <Group
        x={item.position?.x}
        y={item.position?.y}
        draggable
        onClick={(e) => {
          showToolbar(item.id);
          setSelectedTrue(index);
        }}
        onMouseEnter={(e) => {
          setHoverTrue(index);
        }}
        onMouseLeave={(e) => {
          setHoverFalse(index);
        }}
        hitOnDragEnabled={true}
        onDragMove={(e) => {
          handleDragMessage(e, item, index)
        }}
        onDragEnd={() => { updateMessagePosition(item) }}
      >
        {index === 0 &&
          <Group x={10} y={-40}>
            <Rect cornerRadius={7} stroke={"green"} strokeWidth={2} fill="#FDFDFD" width={60} height={30} />
            <Text
              x={13}
              y={8}
              text={"Start"}
              fontFamily={'Roboto'}
              fontSize={15}
              fill={'green'}
            />
          </Group>
        }
        <Rect
          cornerRadius={16}
          height={messageHeight}
          width={340}
          fill="#FDFDFD"
          strokeWidth={1}
          stroke={ "#5850EB"}
          shadowColor={getShadowColor(item)}
          shadowOpacity={1}
          shadowBlur={7}
        />
        {item.isHover &&
          <>
            <Rect
              width={50} height={30} x={330} y={10} />
            <URLImage
              onMouseOver={() => { document.body.style.cursor = 'pointer' }}
              onMouseOut={() => { document.body.style.cursor = 'default' }}
              onClick={() => { handleDeleteMessage(item, index) }}
              image={TrashIcon} x={345} y={10} height={25} width={25} />
          </>
        }
        <Circle x={30} y={30} radius={15} fill="#5850EB" />
        <Text
          x={55}
          y={22}
          text={item.name}
          fontFamily={'Roboto'}
          fontSize={20}
          fill={'gray'}
        />
        <Group
          x={340}
          y={messageHeight - 20}
          onMouseOver={() => { document.body.style.cursor = 'pointer' }}
          onMouseOut={() => { document.body.style.cursor = 'default' }}
          onClick={(e) => {
            e.cancelBubble = true;
            connectEdge(item.id)
          }}>
          <Circle radius={9} fill="#8392AB" strokeWidth={1} />
          <Text
            x={-80}
            y={-8}
            text="Next Step"
            fontFamily={'Roboto'}
            fontSize={15}
            fontWeight={300}
            fill={'gray'}
          />
        </Group>
        {typeof item.children == 'object' ? (
          <>
            {item.children.length > 0 ? (
              handleRenderingChildrens(item)
            ) : (
                <React.Fragment key={item}>
                  <Group>
                    <Rect
                      x={20}
                      y={75}
                      height={60}
                      width={300}
                      fill="#EEF1F4"
                      cornerRadius={16}
                    />
                    <Text
                      text="No Content"
                      x={110}
                      y={95}
                      fontFamily={'Roboto'}
                      fontSize={20}
                      fontWeight={300}
                      fill={'blue'}
                    />
                  </Group>
                </React.Fragment>
              )}
          </>
        ) : null}
      </Group>
    );
  }
  const getFlowMessage = (item, index) => {
    return (
      <Group
      x={item.position?.x}
      y={item.position?.y}
      draggable
      onClick={(e) => {
        showToolbar(item.id);
        setSelectedTrue(index);
      }}
      onMouseEnter={(e) => {
        setHoverTrue(index);
      }}
      onMouseLeave={(e) => {
        setHoverFalse(index);
      }}
      hitOnDragEnabled={true}
      onDragMove={(e) => {
        handleDragMessage(e, item, index)
      }}
      onDragEnd={() => { updateMessagePosition(item) }}
    >
      <Rect
        cornerRadius={16}
        height={200}
        width={340}
        fill="#FDFDFD"
        stroke={ "#f9bf3b"}
        strokeWidth={1}
        shadowColor={getShadowColor(item)}
        shadowOpacity={1}
        shadowBlur={7}
      />
      {item.isHover &&
        <>
          <Rect
            width={50} height={30} x={330} y={10} />
          <URLImage
            onMouseOver={() => { document.body.style.cursor = 'pointer' }}
            onMouseOut={() => { document.body.style.cursor = 'default' }}
            onClick={() => { handleDeleteMessage(item, index) }}
            image={TrashIcon} x={345} y={10} height={25} width={25} />
        </>
      }
      <Circle x={30} y={30} radius={15} fill="#f9bf3b" />
      <Text
        x={55}
        y={22}
        text={item.name}
        fontFamily={'Roboto'}
        fontSize={20}
        fill={'gray'}
        />
        {item.children.length > 0 ? (
          <Group>
          <Rect
            x={20}
            y={75}
            height={60}
            width={300}
            stroke="green"
            strokeWidth={1}
            fill="#EEF1F4"
            cornerRadius={16}
          />
          <Text
            text={item.children[0].name}
            x={40}
            y={95}
            fontFamily={'Roboto'}
            fontSize={20}
            fontWeight={300}
              fill={"#f9bf3b"}
              align={"center"}
          />
        </Group>
        ) : (
            <React.Fragment key={item}>
              <Group>
                <Rect
                  x={20}
                  y={75}
                  height={60}
                  width={300}
                  fill="#EEF1F4"
                  cornerRadius={16}
                />
                <Text
                  text="Select Flow"
                  x={110}
                  y={95}
                  fontFamily={'Roboto'}
                  fontSize={20}
                  fontWeight={300}
                  fill={"#f9bf3b"}
                  align={"center"}
                />
              </Group>
            </React.Fragment>
          )}
    </Group>
    );
  }
  const getMessageBox = (item, index, messageHeight) => {
    if (item.type == "default") {
      return getDefaultMessage(item, index, messageHeight);
    } else if (item.type == "flow") {
      return getFlowMessage(item, index);
    }
  }
  

  return (
    <FlowBuilderWrapper>
      {flow && <div className="header">{flow.name}</div>}
      <div className="stage-action">
        <BiMessageSquareAdd
          onClick={handleAddMessage}
        />
      </div>
      {isToolbarActive && <Toolbar id={id} hideToolbar={hideToolbar} bot={flow.bot} flow={flow.id} />}
      <Stage
        width={getStageWidth()}
        height={window.innerHeight - 70}
        scaleX={state.layerScale}
        scaleY={state.layerScale}
        onMouseMove={handleMousePosition}
        x={0}
        y={0}
        onClick={handleClickOnCanvas}>
        <Layer name="layer_1" draggable onWheel={handleWheel}>
          <Rect
            x={-window.innerWidth}
            y={-window.innerHeight}
            width={window.innerWidth * 3}
            height={window.innerHeight * 3}
            fill=""
          />
          {showToolOption && getToolOption()}
          {builderState &&
            typeof builderState == 'object' &&
            builderState.map((item, index) => {
              var messageHeight = calculateHeightOfMessageBox(item.children);
              return (
                <React.Fragment key={item.id}>
                  {(item.type==="default" && item.next) ? (
                    <Edge
                      height={messageHeight}
                      node1={item.position}
                      node2={getNextNode(item.next)}
                    />
                  ) : null}
                  {getMessageBox(item, index, messageHeight)}
                  </React.Fragment>
              );
            })}
        </Layer>
      </Stage>
    </FlowBuilderWrapper>
  );
};
const getShadowColor = (item) => {
  if (item.isSelected) {
    if (item.type == "default") {
      return '#1e824c';
    } else if (item.type == "flow") {
      return "#f9ae23";
    }
   
  } else if (item.isHover) {
    if (item.type == "default") {
      return '#8078FF';
    } else if (item.type == "flow") {
      return "#f9bf3b";
    }
  } else {
    return '#95bbdf';
  }
};

const getSelectedNode = (state) => {
  return state.findIndex((obj) => obj.isSelected == true);
};

const getMessageIndexWhichHasNextOfGivenMessageId = (state, messageId) => {
  return state.findIndex((obj) => obj.next == messageId);
}

const getHoveredNode = (state) => {
  return state.findIndex((obj) => obj.isHover == true);
};

export default withRouter(FlowBuilder);
