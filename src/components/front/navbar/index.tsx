import React from 'react';
import { Link } from 'react-router-dom';
import { NavWrapper, NavContainer } from './styles';
import { StyledButton, PrimaryButton } from '../../common/buttons';
import logo from '../../../assets/images/logo-gray.png';

const Navbar = () => {
  return (
    <NavWrapper>
      <NavContainer>
        <img src={logo} alt="Shipboard logo" />
        <div className="button-group">
          <Link to="/login">
            <StyledButton>Login</StyledButton>
          </Link>
          <Link to="/register">
            <PrimaryButton>Get Started</PrimaryButton>
          </Link>
        </div>
      </NavContainer>
    </NavWrapper>
  );
};

export default Navbar;
