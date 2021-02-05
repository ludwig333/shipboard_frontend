import React, { useState } from 'react';
import {withRouter} from 'react-router-dom'
import { FlowBuilderWrapper } from './styles';
import { Stage, Layer, Rect, Image, Text, Group, Circle } from 'react-konva';
import Toolbar from '../../../components/dashboard/builder/Toolbar/index';
import { v4 as uuidv4 } from 'uuid';
import {
  handleRenderingChildrens,
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

const FlowBuilder = (props) => {
  const [isToolbarActive, setIsToolbarActive] = useState(null);
  const [builderState, setBuilderState, sidebar] = useBuilder();
  const [id, setId] = useState(null);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isEdging, setIsSetting] = useState(false);
  const [isSecondClick, setIsSecondClick] = useState(false);
  const [showToolOption, setShowToolOption] = useState(false);
  const [edgingMessageId, setEdgingMessageId] = useState(null);

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

  const calculateCardHeight = (state) => {
    var height;
    state.foreach((item) => {
      if (item.type == 'card') {
        height += item.cards[0].height;
      } else {
        height += item.height;
      }
    });
    return height;
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
        console.log(err);
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
        <Group y={50} onClick={() => {
          setShowToolOption(false);
          console.log('connect flow')
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
  

  return (
    <FlowBuilderWrapper>
      <div className="header">Flows of { props.match.params.id}</div>
      <div className="stage-action">
        <BiMessageSquareAdd
          onClick={handleAddMessage}
        />
      </div>
      {isToolbarActive && <Toolbar id={id} hideToolbar={hideToolbar} />}
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
          <Group draggable x={200} y={200}>
            <Rect
              cornerRadius={16}
              width={300}
              height={100}
              fill="#FDFDFD"
              strokeWidth={2}
              shadowColor="gray"
              shadowOpacity={0.7}
              shadowBlur={2}
            />
            <Circle x={30} y={30} radius={15} fill="green" />
            <Text
              x={55}
              y={22}
              text="Starting Step"
              fontFamily={'Roboto'}
              fontSize={20}
              fill={'gray'}
            />
            <Circle x={280} y={80} radius={9} fill="#8392AB" strokeWidth={1} />
            <Text
              x={195}
              y={72}
              text="Next Step"
              fontFamily={'Roboto'}
              fontSize={15}
              fontWeight={300}
              fill={'gray'}
            />
          </Group>
          {showToolOption && getToolOption()}
          {builderState &&
            typeof builderState == 'object' &&
            builderState.map((item, index) => {
              var messageHeight = calculateHeightOfMessageBox(item.children);
              return (
                <React.Fragment key={item.id}>
                  {item.next ? (
                    <Edge
                      height={messageHeight}
                      node1={item.position}
                      node2={getNextNode(item.next)}
                    />
                  ) : null}
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
                      height={messageHeight}
                      width={340}
                      fill="#FDFDFD"
                      strokeWidth={5}
                      shadowColor={getShadowColor(item)}
                      shadowOpacity={1}
                      shadowBlur={10}
                    />
                    {item.isHover &&
                      <>
                      <Rect
                        width={50} height={30} x={330} y={10} /> 
                      <URLImage
                        onMouseOver={() => { document.body.style.cursor = 'pointer' }}
                        onMouseOut={() => { document.body.style.cursor = 'default' }}
                        onClick={() => {handleDeleteMessage(item, index)}}
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
    return '#1e824c';
  } else if (item.isHover) {
    return '#1f3a93';
  } else {
    return 'black';
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
