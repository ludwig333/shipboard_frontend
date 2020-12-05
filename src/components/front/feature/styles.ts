import styled from 'styled-components';
import { darkerGrey } from '../../../styles/theme';

export const FeatureWrapper = styled.section`
  margin: auto;
  max-width: 120rem;
  margin-top: 3rem;
  
  .heading {
    text-align: center;
    margin-top: 2rem;
  }
`;

export const FeatureGrid = styled.div`
margin-top:1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-align: none;

  .feature {
    background-color: ${props => props.theme.white};
    border-radius: 20px;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.25);    height: 24rem;
    margin: 2rem;
    padding: 2rem;
    width: 35rem;

    img {
      width: 4rem;
      height: auto;
      margin-top: 1rem;
    }
  }
`;
