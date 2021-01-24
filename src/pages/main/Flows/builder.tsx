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
} from './helper';
import {
  BuilderContext,
  useBuilder,
} from '../../../services/Builder/BuilderProvider';
import { BiMessageSquareAdd } from 'react-icons/bi';

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

  const [state, setState] = useState({
    layerScale: 1,
    layerX: 0,
    layerY: 0,
  });

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
    setIsSetting(true);
    setBuilderState(
      builderState.map((item, index) => {
        if (index == messageId) {
          item.next = 'dummy';
        }
        return item;
      })
    );
  };

  const handleMousePosition = (event) => {
    if (isEdging) {
      var point = event.target.getStage().getPointerPosition();
      setMousePosition({
        x: point.x,
        y: point.y,
      });
    }
  };

  const handleClickOnCanvas = () => {
    setIsSecondClick(true);
    if (isSecondClick && isEdging) {
      setIsSetting(false);
      // window.removeEventListener('mousemove', handleMousePosition);
      let number = builderState.length + 1;
      var id = uuidv4();
      const newState = {
        id: id,
        name: 'Send Message #' + number,
        position: {
          x: mousePosition.x,
          y: mousePosition.y,
        },
        height: 200,
        children: [],
        isHover: false,
        isSelected: false,
      };
      setIsSecondClick(false);

      //find the message with next: dummy
      var dummyNextMessage = builderState.findIndex(
        (obj) => obj.next === 'dummy'
      );

      setBuilderState(
        builderState.map((item, index) => {
          if (index == dummyNextMessage) {
            item.next = id;
          }
          return item;
        })
      );
      setBuilderState([...builderState, newState]);
    }
  };
  return (
    <FlowBuilderWrapper>
      <div className="header">Flows of { props.match.params.id}</div>
      <div className="stage-action">
        <BiMessageSquareAdd
          onClick={() => {
            let number = builderState.length + 1;
            const newState = {
              id: uuidv4(),
              name: 'Send Message #' + number,
              position: {
                x: 1200,
                y: 50,
              },
              height: 200,
              children: [],
              isHover: false,
              isSelected: false,
            };
            setBuilderState([...builderState, newState]);
          }}
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
          {builderState &&
            typeof builderState == 'object' &&
            builderState.map((item, index) => {
              return (
                <React.Fragment key={item.id}>
                  {item.next ? (
                    <Edge
                      height={item.height}
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
                      var updatedPosition = {
                        x: e.target.x(),
                        y: e.target.y(),
                      };
                      var index = builderState.findIndex(
                        (obj) => obj.id == item.id
                      );
                      setBuilderState(
                        builderState.map((item, ind) => {
                          if (ind == index) {
                            item.position = updatedPosition;
                          }
                          return item;
                        })
                      );
                    }}>
                    <Rect
                      cornerRadius={16}
                      height={calculateHeightOfMessageBox(item.children)}
                      width={340}
                      fill="#FDFDFD"
                      strokeWidth={5}
                      shadowColor={getShadowColor(item)}
                      shadowOpacity={1}
                      shadowBlur={10}
                    />
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
                      y={item.height - 20}
                      onClick={(e) => connectEdge(index)}>
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

const getHoveredNode = (state) => {
  return state.findIndex((obj) => obj.isHovered == true);
};

export default withRouter(FlowBuilder);
