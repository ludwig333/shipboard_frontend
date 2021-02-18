import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { NavWrapper, NavContainer } from './styles';
import { StyledButton, PrimaryButton } from '../../common/buttons';
import logo from '../../../assets/images/logo-gray.png';
import { useAuthContext, useAuthDispatch } from '../../../services/Auth/AuthProvider';
import { logOut } from '../../../apis/auth';

const Navbar = () => {
  const authContext = useAuthContext();
  const authDispatch = useAuthDispatch();
  const history = useHistory();


  const handleLogOut = (event: any) => {
    event.preventDefault();
    logOut().then((response) => {
      authDispatch({
        type: 'LOGOUT',
      });
      history.push('/');
    });
  };

  
  return (
    <NavWrapper>
      <NavContainer>
        <img src={logo} alt="Shipboard logo" />
        <div className="button-group">
          {!authContext.isAuthenticated && <>
            <Link to="/login">
            <StyledButton>Login</StyledButton>
          </Link>
          <Link to="/register">
            <PrimaryButton className="register-btn">Get Started</PrimaryButton>
          </Link>
          </>}
          {authContext.isAuthenticated && <>
            <PrimaryButton className="register-btn" onClick={handleLogOut}>Log Out</PrimaryButton>
            </>
            }
        </div>
      </NavContainer>
    </NavWrapper>
  );
};

export default Navbar;
