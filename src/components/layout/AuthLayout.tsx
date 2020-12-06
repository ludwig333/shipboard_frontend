import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/images/logo-dark.png';
import { AuthButton } from '../common/buttons';

interface LayoutProps {
  children?: any;
  type?: string;
}

const AuthLayout: React.FC<LayoutProps> = (props) => {
  return (
    <LayoutWrapper>
      <nav className="logo-bar">
        <Link to="/">
          <img className="logo-img" src={logo} alt="Shipboard Logo" />
        </Link>
      </nav>
      <AuthContainer>
        <div className="card">{props.children}</div>
        {/* {props.type === 'login' && (
          <div className="auth-buttons">
            <AuthButton>Sign in with Google</AuthButton>
            <AuthButton>Sign in with Facebook</AuthButton>
          </div>
        )} */}
      </AuthContainer>
      <FooterWrapper>
        <p>©Shipbot Pvt. Ltd. 2020. All rights reserved</p>
      </FooterWrapper>
    </LayoutWrapper>
  );
};

export default AuthLayout;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-width: 50rem;
  position: relative;

  .logo-bar {
    align-content: center;
    display: flex;
    margin: auto;
    max-width: 144rem;
    min-height: 10rem;
    width: 100%;

    img {
      height: 4.5rem;
      margin-top: 2rem;
    }
  }
`;

const AuthContainer = styled.div`
  align-content: center;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  margin: auto;
  position: relative;

  .card {
    align-items: center;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.12);
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: -7rem;
    max-width: 40rem;
    min-height: 30rem;
    padding: 4rem;

    h1 {
      padding-bottom: 1rem;
    }

    h2 {
      margin-top: -1rem;
      padding-bottom: 1rem;
    }

    input {
      margin-bottom: 1rem;
      margin-top: 1rem;
    }

    .last-input {
      margin-bottom: 3rem;
    }

    .link {
      display: flex;
      justify-content: space-around;
      margin-top: 1rem;
      width: 100%;
    }

    .go-back {
      align-items: center;
      align-self: flex-start;
      color: #000;
      cursor: pointer;
      display: flex;
      margin-top: 1rem;
      text-decoration: none;

      &:hover{
        color: #000;
        text-decoration-line: underline;
      }

      h5 {
        font-family: Roboto, sans-serif;
        font-size: 1.2rem;
        font-weight: 300;
      }

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      &:hover {
        h5 {
          text-decoration: underline;
        }
      }
    }
  }

  .auth-buttons {
    margin-left: -5rem;
    margin-right: -5rem;
    display: flex;
    justify-content: space-between;
    margin-top: 6rem;
  }
`;

const FooterWrapper = styled.footer`
  bottom: 0rem;
  font-size: 1.2rem;
  padding-right: 10rem;
  position: absolute;
  text-align: right;
  width: 100%;
`;
