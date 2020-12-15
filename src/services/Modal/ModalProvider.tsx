import React, { createContext, useContext, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import PropTypes from 'prop-types';
import styled from 'styled-components';

type ModalStateContextType = {
  View?: React.FC<{ hideModal: () => void }>;
  isOpen: boolean;
  onRequestClose?: () => void;
};

type ModalStateModifierContextType = {
  showModal: (View: React.FC, onRequestClose?: () => void) => void;
  hideModal: () => void;
};

const ModalStateContext = createContext<
  ModalStateContextType | null | undefined
>(null);

const ModalStateModifierContext = createContext<ModalStateModifierContextType>({
  showModal: () => {},
  hideModal: () => {},
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalState, setModalState] = useState<ModalStateContextType | null>();
  const { isOpen, View, onRequestClose } = modalState || {
    View: undefined,
    onRequestClose: undefined,
  };

  const showModal = (
    View?: React.FC<{ hideModal: () => void }>,
    onRequestClose?: () => void
  ) => {
    setModalState({ View, isOpen: true, onRequestClose });
  };
  const hideModal = () => {
    setModalState({
      View: undefined,
      isOpen: false,
      onRequestClose: undefined,
    });
  };
  const modalSpring = useSpring({
    from: { display: 'none' },
    to: async (next: any) => {
      if (isOpen) {
        await next({
          display: 'block',
          transform: 'translate(0px,0px)',
          opacity: 1,
        });
      } else {
        await next({ transform: 'translate(0px,100px)', opacity: 0 });
        await next({
          display: 'none',
        });
      }
    },
  });
  return (
    <ModalStateContext.Provider value={modalState}>
      <ModalStateModifierContext.Provider value={{ showModal, hideModal }}>
        {children}
        <ModalWrapper>
          <animated.div style={modalSpring} className="modal">
            {View && <View hideModal={hideModal} />}
          </animated.div>
        </ModalWrapper>
      </ModalStateModifierContext.Provider>
    </ModalStateContext.Provider>
  );
};
ModalProvider.propTypes = {
  children: PropTypes.element,
};

export default ModalProvider;

export const useModal = () => {
  const context = useContext(ModalStateModifierContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalWrapper = styled.div`

  .modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(5px);
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 4rem 0;
    h1 {
      padding-bottom: 1rem;
    }
    h2 {
      margin-top: -1rem;
    }
    input {
      margin-bottom: 1rem;
      margin-top: 1rem;
    }
    .last-input {
      margin-bottom: 3rem;
    }
    &-exit {
      background: rgb(255, 0, 76, 0.7);
      border-radius: 10rem;
      border: 0;
      cursor: pointer;
      height: 1.5rem;
      outline: none;
      padding: 0.5rem;
      position: absolute;
      right: 2rem;
      top: 2rem;
      width: 1.5rem;
      &:active {
        filter: brightness(0.8);
      }
    }
    &-body {
      align-items: center;
      background: #ffffff;
      border-radius: 24px;
      box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.12);
      margin: 0 auto;
      max-width: 40rem;
      min-height: 25rem;
      padding: 4rem;
      position: relative;
      /* p,
      h2 {
        color: black;
      } */
    }
  }
`;
