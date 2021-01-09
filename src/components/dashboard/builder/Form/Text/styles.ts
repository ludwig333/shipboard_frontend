import styled from 'styled-components';

export const AddTextWrapper = styled.div`
  width: 25rem;
  height: auto;
  border-radius: 7px 7px 7px 7px;
  box-shadow: 0px 4px 12px #95bbdf;

  .action-btn {
    position: absolute;
    right: 0;
    height: 3rem;
    width: 3rem;
    visibility: hidden;
    background-color: transparent;
    border: none;
    outline: none;

    svg {
      height: 2rem;
      width: 2rem;
      color: #8392ab;

      &:hover {
        color: red;
        cursor: pointer;
      }
    }
  }

  &:hover {
    .action-btn {
      visibility: visible;
    }
    .card-body {
      background-color: #f2f5f7;
    }
  }
  .card-body {
    padding: .8rem;
    &.active {
      background-color: #f2f5f7;
    }
  }

  form {
    display: flex;
  }

  textarea {
    backface-visibility: hidden;
    border-radius: 7px 7px 0px 0px;
    border: none;
    font-family: Roboto, sans-serif;
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 400;
    min-height: 2rem;
    outline: none;
    padding: .5rem;
    width: 100%;
  }
`;
