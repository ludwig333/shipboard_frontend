import styled from 'styled-components';
import waves from '../../../assets/images/wave.png';
import { media } from '../../../styles/mediaQueries';

export const HeaderContainer = styled.header`
  background-image: url(${waves});
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  margin-top: -2rem;
  height: 100%;
  z-index: 1;
`;

export const HeroWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  margin-top: 2rem;
  margin: auto;
  max-width: 144rem;
  padding-left: 3rem;
  padding-right: 3rem;

  ${media.phone} {
    margin-top: 4rem;
  }

  .hero_text {
    &-heading {
      color: ${(props) => props.theme.mediumSlateBlue};
      font-family: Comic Neue, Roboto, san-sans-serif;
      font-size: 4.8rem;
      font-style: normal;
      font-weight: bold;
      line-height: 5.5rem;
      width: 35rem;

      ${media.tabLand} {
        font-size: 4rem;
        line-height: 5rem;
        width: 30rem;
      }

      ${media.tabPort} {
        font-size: 3.5rem;
        line-height: 4rem;
        width: 32rem;
      }

      ${media.phone} {
        font-size: 3rem;
        line-height: 3.5rem;
        width: 25rem;
      }
    }

    &-paragraph {
      color: ${(props) => props.theme.grey};
      font-family: Roboto;
      font-size: 1.8rem;
      font-style: normal;
      font-weight: 300;
      letter-spacing: 0.05em;
      line-height: 2.4rem;
      padding-bottom: 2rem;
      padding-top: 2.2rem;
      width: 35rem;

      ${media.tabLand} {
        font-size: 1.6rem;
        line-height: 2rem;
        width: 30rem;
      }

      ${media.tabPort} {
        font-size: 1.4rem;
        line-height: 1.8rem;
        width: 32rem;
      }

      ${media.phone} {
        font-size: 1.2em;
        line-height: 1.5rem;
        width: 20rem;
      }
    }
  }

  .hero_image {
    img {
      height: auto;
      max-width: 70rem;

      ${media.tabLand} {
        width: 50rem;
      }

      ${media.tabPort} {
        width: 40rem;
        margin-left: -3rem;
      }

      ${media.phone} {
        width: 20rem;
        margin-left: -4rem;
      }
    }
  }
`;
