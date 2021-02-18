import styled from 'styled-components';
import Toolbar from '../dashboard/builder/Toolbar/index';

export const StyledButton = styled.button`
  display:flex;
  align-items:center;
  justify-content:center;
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
  button {
    text-decoration: none;
  }
  &:visited, :focus, :active {
   button {
    text-decoration: none;
   }
  }
`;

export const PrimaryButton = styled(StyledButton)`
  background-color: #5850eb;
  height: 2.5rem;
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
  margin-top: 1.5rem;
`;

export const AuthButton = styled(StyledButton)`
  width: 20rem;
  font-size: 1.6rem;
`;


export const ToolbarButton = styled.button < { height?: string, width?: string, fontSize?: string}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${props => props.height ? props.height : '2rem'};
  width: ${props => props.width ? props.width : '2rem'};
  border: none;
  outline: none;
  padding: 0;
  background: #ffffff;
  color: #8392AB;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: ${props => props.fontSize ? props.fontSize : '1.6rem'};
  margin: .8rem;
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='7' ry='7' stroke='%238392ABFF' stroke-width='4' stroke-dasharray='10%2c10' stroke-dashoffset='23' stroke-linecap='round'/%3e%3c/svg%3e");
  border-radius: 0px 0px 7px 7px;
  &:hover {
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='7' ry='7' stroke='%235850EBFF' stroke-width='4' stroke-dasharray='10%2c10' stroke-dashoffset='23' stroke-linecap='round'/%3e%3c/svg%3e");
    color: #5850EB;
  }
`;

export const AddTextButton = styled(ToolbarButton)`
  margin: 0rem;
  width: 100%;
`;

export const ContentButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width:  90%;
  border: none;
  padding: 0;
  background: #E1E5EA;
  color: black;
  border: none;
  outline: none;
  font-family: Roboto, sans-serif;
  font-weight: 400;
  font-size: 1.4rem;
  margin: .4rem;
  cursor: pointer;
  border-radius: 7px;
`;

