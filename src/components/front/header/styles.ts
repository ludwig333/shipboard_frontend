import styled from 'styled-components';
import waves from '../../../assets/images/bg-wave.png';

export const HeaderContainer = styled.header`
  background-image: url(${waves});
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
`;

export const HeroWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly;
  margin-top: 2rem;
  margin: auto;
  max-width: 144rem;


  .hero_text {
    &-heading {
      color: ${(props) => props.theme.mediumSlateBlue};
      font-family: Comic Neue, Roboto, san-sans-serif;
      font-size: 4.8rem;
      font-style: normal;
      font-weight: bold;
      line-height: 5.5rem;
      width: 35rem;
    }

    &-paragraph {
      color: ${(props) => props.theme.grey};
      font-family: Roboto;
      font-size: 18px;
      font-style: normal;
      font-weight: 300;
      letter-spacing: 0.05em;
      line-height: 24px;
      padding-bottom: 2rem;
      padding-top: 2.2rem;
      width: 35rem;
    }
  }

  .hero_image {
    .img {
      height: auto;
      max-width: 550rem;
      width: 50%;
    }
  }
`;
