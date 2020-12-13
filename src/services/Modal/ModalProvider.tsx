import React from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

const ModalContext = React.createContext({
  content: () => ({}),
  closeModal: () => {},
  open: false,
  openModal: (content: any) => {},
});

export const useModalContext = () => {
  return React.useContext(ModalContext);
};

interface ModalInnerInterface {
  ModalContent: () => {
    children?: JSX.Element;
    title?: JSX.Element;
  };
}

const ModalInner: React.FC<ModalInnerInterface> = ({ ModalContent }) => {
  const { children, title } = ModalContent();

  return (
    <React.Fragment>
      <div className="modal-title">
        <h2>{title}</h2>
      </div>
      <div className="modal-content">{children}</div>
    </React.Fragment>
  );
};

const Modal = () => {
  const { closeModal, content: ModalContent } = useModalContext();
  if (!ModalContent) {
    return null;
  }

  return (
    <div className="modal-body">
      <button onClick={closeModal} className="modal-exit"></button>
      <ModalInner ModalContent={ModalContent} />
    </div>
  );
};

interface ModalProviderInterface {
  children?: JSX.Element;
}

export const ModalProvider: React.FC<ModalProviderInterface> = ({
  children,
}) => {
  const [{ open, content }, setContent] = React.useState({
    open: false,
    content: () => ({}),
  });

  const modalSpring = useSpring({
    from: { display: 'none' },
    to: async (next: any) => {
      if (open) {
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
    <ModalContext.Provider
      value={{
        open,
        content,
        openModal: (content) => {
          setContent({ open: true, content });
        },
        closeModal: () => {
          setContent((state) => ({ ...state, open: false }));
        },
      }}>
      <ModalWrapper>
        <animated.div style={modalSpring} className="modal">
          <Modal />
        </animated.div>
      </ModalWrapper>
      {children}
    </ModalContext.Provider>
  );
};

const ModalWrapper = styled.div`
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

    &-exit {
      position: absolute;
      right: 1rem;
      top: 1rem;
      width: 10px;
      height: 10px;
      background: rgb(255, 0, 76, .7);
      outline: none;
      border: 0;
      border-radius: 10rem;
      padding: 0.5rem;
      cursor: pointer;

      &:active {
        filter: brightness(0.8);
      }
    }

    &-body {
      position: relative;
      width: 90%;
      max-width: 600px;
      background: white;
      padding: 2rem;
      margin: 0 auto;
      border-radius: 1rem;

      p,
      h2 {
        color: black;
      }
    }
  }
`;
