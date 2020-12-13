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
