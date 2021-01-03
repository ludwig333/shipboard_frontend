import styled from 'styled-components';
import { darkerGrey } from '../../styles/theme';
import { media } from '../../styles/mediaQueries';

export const PrimaryHeader = styled.h1`
  font-family: Comic Neue, Roboto, sans-serif;
  font-weight: 700;
  font-size: 3.6rem;
  color: #000;
`;

export const FormHeader = styled(PrimaryHeader)`
  font-size: 2.6rem;
  text-align: center;
`;

export const FormSubHeader = styled.h2`
  font-family: Roboto, sans-serif;
  font-weight: 300;
  font-size: 1.6rem;
  color: #000;
  text-align: center;
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
  color: ${(props) => props.theme.darkerGrey};
  line-height: 2.8rem;
`;

export const ToolbarHeading = styled.h2`
  font-family: Roboto, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.1rem;
  color: #797979;
`;

export const VerticalGap = styled.div<{size: string}>`
  width: auto;
  height: ${(props) => props.size}rem;
  display: block;
  flex-shrink: 0;
`;

export const HorizontalGap = styled.div<{size: string}>`
  width: ${(props) => props.size}rem;
  height: auto;
  display: block;
`;