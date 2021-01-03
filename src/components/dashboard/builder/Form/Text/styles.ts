import styled from 'styled-components';

export const AddTextWrapper = styled.div`
  width: 25rem;
  height: auto;
  border-radius: 7px 7px 7px 7px;

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
  }
`;

export const TextArea = styled.textarea<{ height: string }>`
  padding: 1rem;
  width: 100%;
  height: ${(props) => props.height}px;
  min-height: 2rem;
  background: #f2f5f7;
  border-radius: 7px 7px 0px 0px;
  outline: none;
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  border: none;
`;
