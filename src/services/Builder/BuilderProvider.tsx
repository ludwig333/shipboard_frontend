import React, { useState, createContext, useContext } from 'react';
import { FlowStateType } from '../../../types';
import { v4 as uuidv4 } from 'uuid';

const initialBuilderState = [
  {
    id: uuidv4(),
    name: 'Send Message #1',
    position: {
      x: 50,
      y: 50,
    },
    height: 250,
    children: [
      {
        id: uuidv4(),
        type: 'text',
        value: 'This is text of first message',
      },
      {
        id: uuidv4(),
        type: 'image',
        selectedImage: null,
        imagePreviewUrl: ''
      },
      {
        id: uuidv4(),
        type: 'text',
        value: 'This is text of another message',
      },
    ],
  },
  {
    id: uuidv4(),
    name: 'Send Message #2',
    position: {
      x: 400,
      y: 50,
    },
    height: 250,
    children: [
      {
        id: uuidv4(),
        type: 'text',
      },
      {
        id: uuidv4(),
        type: 'text',
      },
      {
        id: uuidv4(),
        type: 'card',
        cards: [{
          id: uuidv4(),
          selectedImage: null,
          imagePreviewUrl: '',
          heading: 'subtitle #1',
          body: 'This is the body paragraph'
        }, {
            id: uuidv4(),
            selectedImage: null,
            imagePreviewUrl: '',
            heading: 'subtitle #2',
            body: 'This is body paragraph of second'
        }]
      }
    ],
  },
];

export const BuilderContext = createContext(undefined);

export const BuilderProvider = ({ children }) => {
  const [builderState, setBuilderState] = useState(initialBuilderState);
  return (
    <BuilderContext.Provider value={[builderState, setBuilderState]}>
      {children} 
    </BuilderContext.Provider>  
  );
}

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error('useBuilderState must be used within a BuilderProvider');
  }
  return context;
};
