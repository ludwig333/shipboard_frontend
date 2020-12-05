import styled from 'styled-components';

export const InfoWrapper = styled.section`
  background-color: limegreen;
  background-color: transparent;
  display: flex;
  margin: auto;
  max-width: 100rem;

  .info-image {
    /* background-color: orangered; */
    height: 100%;
    display: flex;
    justify-content: flex-start;
    flex-grow: 1;
    img {
      width: 24rem;
      height: auto;
    }
  }

  .info-text {  
    flex-grow: 1;
    width: 50rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .heading {
     align-self: none;
    }
    .paragraph {
      width: 50rem;
      text-align: justify;
    }
  }
`;
