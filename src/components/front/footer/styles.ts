import styled from 'styled-components';

export const FooterWrapper = styled.div`
  background-color: #2a3250;
  display: flex;
  height: 30rem;
  justify-content: center;
  margin-top: 4rem;

  section {
    align-items: center;
    display: flex;
    flex-grow: 1;
    justify-content: space-around;
    max-width: 144rem;
    margin: auto;
    padding-left: 3rem;
    padding-right: 3rem;
  }

  .logo-section {
    text-align: center;
    flex-grow: 1;

    .copyright {
      margin-top: 2rem;
      font-size: 1.4rem;
      color: #fff;
    }

    img {
      height: 4rem;
    }
  }

  .cts-section {
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center; 
    flex-grow: 1;
    text-align: center;

    p {
      font-size: 1.6rem;
      font-family: Roboto, sans-serif;
      color: #fff;
      margin-bottom: 2rem;
    }
  }
`;
