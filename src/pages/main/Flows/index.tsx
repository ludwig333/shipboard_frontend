import React, { useState, useEffect, useContext, Children } from 'react';
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

const Flows = (props: any) => {
  const [isToolbarActive, setIsToolbarActive] = useState(null);
  const [builderState, setBuilderState, sidebar] = useBuilder();
  const [id, setId] = useState(null);

  const [state, setState] = useState({
    layerScale: 1,
    layerX: 0,
    layerY: 0,
  });

  const getNextNode = (id) => {
    if (id) {
      const nextIndex = builderState.findIndex((obj) => obj.id == id);
      return builderState[nextIndex].position;
    }
    return null;
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
    // var height;
    // state.foreach(item => {
    //     if(item.type == )
    // })
    return 100;
  };

  const getStageWidth = () => {
    return sidebar ? window.innerWidth - 280 : window.innerWidth - 90;
  };
  const setSelectedTrue = (messageId) => {
    var previousSelected = getSelectedNode(builderState);
    console.log(previousSelected);
    if (previousSelected >= 0) {
      setBuilderState([
        ...builderState,
        (builderState[messageId].isSelected = true),
        (builderState[previousSelected].isSelected = false),
      ]);
    } else {
      setBuilderState([
        ...builderState,
        (builderState[messageId].isSelected = true),
      ]);
    }
  };

  const setHoverTrue = (messageId) => {
    var previousHover = getHoveredNode(builderState);
    if (previousHover >= 0) {
      setBuilderState([
        ...builderState,
        (builderState[messageId].isHover = true),
        (builderState[previousHover].isHover = false),
      ]);
    } else {
      setBuilderState([
        ...builderState,
        (builderState[messageId].isHover = true),
      ]);
    }
  };

  const setHoverFalse = (messageId) => {
    setBuilderState([
      ...builderState,
      (builderState[messageId].isHover = false),
    ]);
  };

  return (
    <FlowBuilderWrapper>
      <div className="header">Flows</div>
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
        x={0}
        y={0}>
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
                <React.Fragment>
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
                      setBuilderState([
                        ...builderState,
                        (builderState[index].position = updatedPosition),
                      ]);
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
                    <Group x={340} y={item.height - 20} onClick={connectEdge}>
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

const connectEdge = () => {
  console.log('connect');
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

export default Flows;
