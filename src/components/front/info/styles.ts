import styled from 'styled-components';
import { media } from '../../../styles/mediaQueries';

export const InfoWrapper = styled.section`
  background-color: limegreen;
  background-color: transparent;
  display: flex;
  margin: auto;
  max-width: 100rem;
  padding-left: 3rem;
  padding-right: 3rem;

  ${media.phone} {
    justify-content: center;
    margin-top: 3rem;
  }

  .info-image {
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-grow: 1;

    ${media.tabPort} {
      justify-content: center;
    }

    ${media.phone} {
      display: none;
    }

    img {
      width: 24rem;
      height: auto;

      ${media.tabLand} {
        width: 20rem;
      }

      ${media.tabPort} {
        width: 18rem;
      }
    }
  }

  .info-text {
    flex-grow: 1;
    width: 50rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${media.tabLand} {
      width: 45rem;
    }

    ${media.tabPort} {
      width: 35rem;
      padding-right: 3rem;
    }

    ${media.phone} {
      width: 30rem;
      padding: 3rem;
    }

    .heading {
      align-self: none;

      ${media.phone} {
        text-align: center;
      }
    }
    .paragraph {
      text-align: justify;
    }
  }
`;
