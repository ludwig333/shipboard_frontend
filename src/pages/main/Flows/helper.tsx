import React from 'react';
import { Rect, Image, Text, Group, Shape, Circle } from 'react-konva';
import useImage from 'use-image';

export const Edge = ({ height, node1, node2, width = 0 }) => {
  node1 = {
    x: node1.x + 350 - width,
    y: node1.y + height - 20
  }
  node2 = {
    x: node2.x,
    y: node2.y + 20
  }
  const p1 = { x: (node1.x + node2.x) / 2, y: node1.y };
  const p2 = { x: (node1.x + node2.x) / 2, y: node2.y };
  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath();
        context.moveTo(node1.x, node1.y);
        context.bezierCurveTo(p1.x, p1.y, p2.x, p2.y, node2.x, node2.y);
        // (!) Konva specific method, it is very important
        context.fillStrokeShape(shape);
      }}
      stroke="black"
      strokeWidth={2}
    />
  );
};

export const calculateHeightOfMessageBox = (message) => {
  var height = 110;

  if (typeof message == 'object') {
    if (message.length > 0) {
      message.forEach((item) => {
        if (item.type === 'card') {
          var activeCard = getActiveCard(item.cards);
          const buttons = item.cards[activeCard].buttons.length;
          height +=(item.cards[activeCard].height * 1.01) + (buttons * 40) + 20;
        } else if (item.type === 'text') { 
          const buttons = item.buttons.length;
          height += (item.height * 1.05) + (buttons * 40) + 20;
        } else {
          height += item.height + 20;
        }
      });
    } else {
      height += 90;
    }
  }
  return height;
};
export const getImage = (children, lastPosition) => {
  if (children.imagePreviewUrl) {
    return (
      <URLImage
        x={25}
        y={lastPosition}
        image={children.imagePreviewUrl}
        height={180}
        width={300}
      />
    );
  } else {
    return (
      <Group>
        <Rect
          x={20}
          y={lastPosition}
          cornerRadius={5}
          height={children.height}
          width={300}
          fill="#E1E5EA"
          stroke="#8392AB"
          dash={[10, 5]}
          strokeWidth={1}
          shadowColor="#95bbdf"
          shadowOpacity={0.5}
          shadowBlur={7}
        />
        <Text
          x={120}
          y={lastPosition + 65}
          text={'Upload Image'}
          fontSize={16}
        />
      </Group>
    );
  }
};

type URLImageType = {
  x: any,
  y: any,
  image: any,
  height: any,
  width: any,
  onMouseOver?: any,
  onMouseOut?: any,
  onClick?: any
}
export const URLImage = (props:URLImageType) => {
  const [img] = useImage(props.image);
  return <Image image={img} x={props.x} y={props.y} height={props.height} width={props.width} onMouseOver={props.onMouseOver} onMouseOut={props.onMouseOut} onClick={props.onClick}/>;
};

export const getActiveCard = (cards) => {
  var activeCard = cards.findIndex((obj) => obj.active == true);
  return activeCard;
};

/**
 * Stage zoom pan
 */
export const handleWheel = (e) => {
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

export const getRelativePointerPosition = (node) => {
  // returns mouse pointer position relative to the input node
  var transform = node.getAbsoluteTransform().copy();
  transform.invert();
  var pos = node.getStage().getPointerPosition();
  return transform.point(pos);
};

/** Touch Pinch Zooom */
function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCenter(p1, p2) {
  return {
    x: (p1.x + p2.x) / 2,
    y: (p1.y + p2.y) / 2,
  };
}
var lastCenter = null;
var lastDist = 0;

export const onTouchPinch = (e) => {
  e.evt.preventDefault();
  var touch1 = e.evt.touches[0];
  var touch2 = e.evt.touches[1];
  const stage = e.target.getStage();
  
  if (touch1 && touch2) {
    // if the stage was under Konva's drag&drop
    // we need to stop it, and implement our own pan logic with two pointers
    if (stage.isDragging()) {
      stage.stopDrag();
    }

    var p1 = {
      x: touch1.clientX,
      y: touch1.clientY,
    };
    var p2 = {
      x: touch2.clientX,
      y: touch2.clientY,
    };

    if (!lastCenter) {
      lastCenter = getCenter(p1, p2);
      return;
    }
    var newCenter = getCenter(p1, p2);

    var dist = getDistance(p1, p2);

    if (!lastDist) {
      lastDist = dist;
    }

    // local coordinates of center point
    var pointTo = {
      x: (newCenter.x - stage.x()) / stage.scaleX(),
      y: (newCenter.y - stage.y()) / stage.scaleX(),
    };

    var scale = stage.scaleX() * (dist / lastDist);

    stage.scaleX(scale);
    stage.scaleY(scale);

    // calculate new position of the stage
    var dx = newCenter.x - lastCenter.x;
    var dy = newCenter.y - lastCenter.y;

    var newPos = {
      x: newCenter.x - pointTo.x * scale + dx,
      y: newCenter.y - pointTo.y * scale + dy,
    };

    stage.position(newPos);
    stage.batchDraw();

    lastDist = dist;
    lastCenter = newCenter;
  }
};

const onTouchEnd = (e) => {
  lastDist = 0;
  lastCenter = null;
}