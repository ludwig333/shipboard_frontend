import styled from 'styled-components';
import { media } from '../../../styles/mediaQueries';

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
  padding-left: 3rem;
  padding-right: 3rem;
  img {
    height: 5rem;
  }

  .button-group {
    position: absolute;
    right: 0rem;

    button {
      margin: 1.5rem;
    }

    .register-btn {
      ${media.phone} {
        display: none;
      }
    }
  }
`;
