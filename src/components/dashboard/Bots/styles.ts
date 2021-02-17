import styled from 'styled-components';

export const InstallToBotWrapper = styled.div`
  .modal-body {
    max-width: 50vw;
    height: 70vh;
    overflow-y: scroll;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .modal-title {
    font-size: 1.5rem;
    font-weight: 500;
    font-family: Roboto, 'sans-serif';
    padding-left: 2rem;
    margin-bottom: 2rem;
  }
`;