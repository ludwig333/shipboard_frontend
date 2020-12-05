import styled from 'styled-components';

export const NavWrapper = styled.div`
  height: 10rem;
`;

export const NavContainer = styled.nav`
  align-items: center;
  display: flex;
  height: 10rem;
  margin: auto;
  max-width: 144rem;
  position: relative;
  padding-top: 2rem;
  
  img {
    height: 5rem;
  }

  .button-group {
    position: absolute;
    right: 0rem;

    button {
      margin: 1.5rem;
    }    
  }
`;
