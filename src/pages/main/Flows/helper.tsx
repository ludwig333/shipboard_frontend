import React from 'react';
import { Stage, Layer, Rect, Image, Text, Group, Circle } from 'react-konva';
import useImage from 'use-image';


export const handleRenderingChildrens = (item) => {
  var lastPosition = 70;
  return item.children.map(function (child) {
    var yposition = lastPosition;
    if (child.type === 'card') {
      lastPosition = lastPosition + child.cards[0].height + 10;
    } else {
      lastPosition = lastPosition + child.height + 40;
      console.log("lstPot", lastPosition);

    }
    return getChildren(child, yposition);
  });
};

export const calculateHeightOfMessageBox = (message) => {
  var height = 200;

  // if (typeof message == 'object') {
  //   if (message.length > 0) {
  //     message.forEach((item) => {
  //       if (item.type === 'card') {
  //         var activeCard = getActiveCard(item.cards);

  //         height = height + item.cards[activeCard].height;
  //       }
  //       height = height + item.height;
  //     });
  //   }
  // }
  return height;
};
export const getChildren = (children, lastPosition) => {
  if (children.type === 'text') {
    return (
      <>
        <Rect
          x={20}
          y={lastPosition}
          fill="#F0F4F7"
          cornerRadius={5}
          height={children.height + 30}
          width={300}
          stroke="lightGrey"
          strokeWidth={1}
          shadowColor="#95bbdf"
          shadowOpacity={0.5}
          shadowBlur={7}
        />
        <Text
          x={30}
          y={lastPosition + 20}
          text={children.value}
          fontSize={15}
          width={280}
          lineHeight={1.5}
        />
      </>
    );
  } else if (children.type === 'image') {
    return getImage(children, lastPosition);
  } else if (children.type === 'card') {
    return (
      <Group x={20} y={lastPosition}>
        {handleRenderingCards(children)}
      </Group>
    );
  }
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

export const handleRenderingCards = (children) => {
  var activeCard = getActiveCard(children.cards);

  return (
    <React.Fragment>
      <Rect
        x={0}
        y={0}
        cornerRadius={5}
        fill="#F2F5F7"
        height={children.cards[activeCard].height - 30}
        width={300}
        stroke="lightGrey"
        strokeWidth={1}
        shadowColor="#95bbdf"
        shadowOpacity={0.5}
        shadowBlur={7}
      />
      {getCardImage(children.cards[activeCard])}
      <Text
        x={10}
        width={260}
        y={185}
        text={children.cards[activeCard].heading}
        fontFamily={'Roboto'}
        fontSize={16}
        fontStyle={'bold'}
        fill={'black'}
      />
      <Text
        x={10}
        y={210}
        width={280}
        text={children.cards[activeCard].body}
        fontFamily={'Roboto'}
        fontSize={15}
        fill={'black'}
        lineHeight={1.5}
      />
    </React.Fragment>
  );
};
const getCardImage = (children) => {
  if (children.imagePreviewUrl) {
    return (
      <URLImage
        x={0}
        y={0}
        image={children.imagePreviewUrl}
        height={160}
        width={300}
      />
    );
  } else {
    return (
      <Group>
        <Rect
          x={20}
          y={20}
          fill="#E1E5EA"
          stroke="#8392AB"
          cornerRadius={5}
          height={150}
          width={260}
          dash={[10, 5]}
          strokeWidth={1}
          shadowColor="#95bbdf"
          shadowOpacity={0.5}
          shadowBlur={7}
        />
        <Text x={100} y={85} text={'Upload Image'} fontSize={16} />
      </Group>
    );
  }
};

export const URLImage = ({ x, y, image, height, width }) => {
  const [img] = useImage(image);
  return <Image image={img} x={x} y={y} height={height} width={width} />;
};

export const getActiveCard = (cards) => {
  var activeCard = cards.findIndex((obj) => obj.active == true);
  return activeCard;
};

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
