import styled from 'styled-components'
import { darkerGrey } from '../../styles/theme';

export const PrimaryHeader = styled.h1`
  font-family: Comic Neue, Roboto, sans-serif;
  font-weight: 700;
  font-size: 3.6rem;
  color: #000;
`;

export const FormHeader = styled(PrimaryHeader)`
  font-size: 2.6rem;
`;

export const FormSubHeader = styled.h2`
    font-family: Roboto, sans-serif;
    font-weight: 300;
    font-size: 1.6rem;
    color: #000;
    text-align: center;
    width: 25rem;
`;

export const SecondaryHeader = styled.h1`
  font-family: Roboto, sans-serif;
  font-weight: 500;
  line-height: 5.6rem;
  color: #000;
  font-size: 2.4rem;
`;

export const Paragraph = styled.p`
  font-family: inherit;
  font-size: 1.5rem;
  color: ${props => props.theme.darkerGrey};
  line-height: 28px;
`;