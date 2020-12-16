import styled from 'styled-components';

export const StyledButton = styled.button`
  background: #ffffff;
  border-radius: 12px 12px 12px 0px;
  border: 2px solid #5850eb;
  box-sizing: border-box;
  cursor: pointer;
  font-family: Comic Neue, Roboto, sans-serif;
  font-size: 1.5rem;
  padding:.9rem;
  width: 10rem;
  outline: none;
`;

export const PrimaryButton = styled(StyledButton)`
  background-color: #5850eb;
  color: #ffffff;
  margin-right: 0rem;
  &:focus {
    background-color: #251DCA
  }
`;

export const FormButton = styled(PrimaryButton)`
  width: 100%;
  height: 3.5rem;
  font-size: 1.6rem;
  font-weight: 600;
`;

export const AuthButton = styled(StyledButton)`
  width: 20rem;
  font-size: 1.6rem;
`;
