import styled from 'styled-components'
import { grey } from '../../styles/theme';

export const InputField = styled.input`
  background: #F7F7F7;
  border-radius: 7px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  min-height: 3.8rem;
  min-width: 30rem;
  padding: .8rem;
  outline: none;
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  color: #000;


  &:focus {
    font-weight: 400;
    box-shadow: 0 0 0 3px rgba(164, 202, 254, 0.45);
    border-color: #5850EC;
  }

  &::placeholder {
    color: #d7d7d7;
    font-size: 1.2rem;
  }
`;

export const FormLink = styled.a`
  text-decoration: none;
  font-size: 1.2rem;
  font-family: Roboto, sans-serif;
  color: #565252;

  &:hover{
    text-decoration-line: underline;
    color: #000;
  }
`;
