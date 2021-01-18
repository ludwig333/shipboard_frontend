import React, { useState, createContext, useContext } from 'react';
import { FlowStateType } from '../../../types';
import { v4 as uuidv4 } from 'uuid';

const initialBuilderState = [
  {
    id: '12kl23-23k23l0-23l2',
    name: 'Send Message #1',
    height: 200,
    position: {
      x: 700,
      y: 50,
    },
    children: [],
    next: '2323-23jljkj23-23jo2i3'
  },
  {
    id: '2323-23jljkj23-23jo2i3',
    name: 'Send Message #2',
    height: 200,
    position: {
      x: 1000,
      y: 100,
    },
    children: [],
  },
];

export const BuilderContext = createContext(undefined);

export const BuilderProvider = ({ sidebar, children }) => {
  const [builderState, setBuilderState] = useState(initialBuilderState);
  return (
    <BuilderContext.Provider value={[builderState, setBuilderState, sidebar]} >
      {children}
    </BuilderContext.Provider>
  );
};

export const useBuilder = () => {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error('useBuilderState must be used within a BuilderProvider');
  }
  return context;
};
