import React, { useState, useContext } from 'react';
import { FlowBuilderWrapper } from './styles';
import { Stage, Layer, Rect, Line, Text, Group, Circle } from 'react-konva';
import Toolbar from '../../../components/dashboard/builder/Toolbar/index';
import { v4 as uuidv4 } from 'uuid';

import {
  BuilderContext,
  useBuilder,
} from '../../../services/Builder/BuilderProvider';

const Flows = (props: any) => {
  const [isToolbarActive, setIsToolbarActive] = useState(null);
  const [builderState, setBuilderState] = useBuilder();
  const [id, setId] = useState(null);

  const [state, setState] = useState({
    layerScale: 1,
    layerX: 0,
    layerY: 0,
  });

  const hideToolbar = () => {
    setIsToolbarActive(false);
    setId(0);
  };

  const showToolbar = (id) => {
    setId(id);
    setIsToolbarActive(true);
  };

  return (
    <FlowBuilderWrapper>
      {isToolbarActive && <Toolbar id={id} hideToolbar={hideToolbar} />}
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
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
            builderState.map((item) => {
              return (
                <Group draggable onClick={(e) => showToolbar(item.id)}>
                  <Rect
                    cornerRadius={16}
                    height={item.height}
                    width={300}
                    fill="#FDFDFD"
                    strokeWidth={2}
                    shadowColor="gray"
                    shadowOpacity={0.7}
                    shadowBlur={2}
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
                  <Circle
                    x={280}
                    y={item.height - 20}
                    radius={9}
                    fill="#8392AB"
                    strokeWidth={1}
                  />
                  <Text
                    x={195}
                    y={item.height - 25}
                    text="Next Step"
                    fontFamily={'Roboto'}
                    fontSize={15}
                    fontWeight={300}
                    fill={'gray'}
                  />
                  {typeof item.children == 'object' ? (
                    <>
                      {item.children.length > 0 ? (
                        item.children.map((child) => {
                          return getChildren(child);
                        })
                      ) : (
                        <Rect
                          x={30}
                          y={100}
                          height={60}
                          width={250}
                          fill="#EEF1F4"
                        />
                      )}
                    </>
                  ) : null}
                </Group>
              );
            })}
        </Layer>
        <Layer name="layer_2">
          <Circle
            x={1525}
            y={40}
            radius={24}
            fill="#5850EB"
            onClick={() => {

              let number = builderState.length + 1;
              builderState.push({
                id: uuidv4(),
                name: 'Send Message #' + number,
                position: {
                  x: 1300,
                  y: 50,
                },
                height: 250,
                children: [],
              });
            }}
          />
        </Layer>
      </Stage>
    </FlowBuilderWrapper>
  );
};

export default Flows;

const getChildren = (children) => {
  if (children.type === 'text') {
    return (
      <>
        <Rect
          x={100}
          y={100}
          fill="#F0F4F7"
          stroke="lightgray"
          cornerRadius={5}
          height={100}
          width={200}
        />
        <Text x={150} y={150} text={children.value} fontSize={16} />
      </>
    );
  } else if (children.type === 'image') {
    return (
      <Rect
        x={100}
        y={200}
        fill="black"
        stroke="lightgray"
        cornerRadius={5}
        height={50}
        width={200}
      />
    );
  }
};

const handleWheel = (e) => {
  e.evt.preventDefault();

  const scaleBy = 0.9;
  const stage = e.target.getStage();
  const layer = stage.find('.layer_1')[0];

  const oldScale = layer.scaleX();
  const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
  layer.scale({ x: newScale, y: newScale });

  const layerPointerPosition = getRelativePointerPosition(layer);
  const correctedLayerPointerPosition = {
    x: layer.x() + layerPointerPosition.x * newScale,
    y: layer.y() + layerPointerPosition.y * newScale,
  };

  const mousePointTo = {
    x: correctedLayerPointerPosition.x / oldScale - layer.x() / oldScale,
    y: correctedLayerPointerPosition.y / oldScale - layer.y() / oldScale,
  };

  const newLayerPos = {
    x:
      -(mousePointTo.x - correctedLayerPointerPosition.x / newScale) * newScale,
    y:
      -(mousePointTo.y - correctedLayerPointerPosition.y / newScale) * newScale,
  };

  layer.position(newLayerPos);
  stage.draw();
};

const getRelativePointerPosition = (node) => {
  // returns mouse pointer position relative to the input node
  var transform = node.getAbsoluteTransform().copy();
  transform.invert();
  var pos = node.getStage().getPointerPosition();
  return transform.point(pos);
};
