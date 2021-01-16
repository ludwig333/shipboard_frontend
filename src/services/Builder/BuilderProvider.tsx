import React, { useState, createContext, useContext } from 'react';
import { FlowStateType } from '../../../types';
import { v4 as uuidv4 } from 'uuid';

const initialBuilderState = [
  {
    id: uuidv4(),
    name: 'Send Message #1',
    height: 200,
    position: {
      x: 50,
      y: 50,
    },
    children: [],
  },
  {
    id: uuidv4(),
    name: 'Send Message #2',
    height: 200,
    position: {
      x: 400,
      y: 50,
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
