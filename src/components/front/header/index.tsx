import React from 'react';
import { Link } from 'react-router-dom'
import { HeaderContainer, HeroWrapper } from './styles';
import Navbar from '../navbar/index';
import PrototypingImg from '../../../assets/images/hero-img.png';
import { PrimaryButton, StyledButton } from '../../common/buttons';
import { useAuthContext } from '../../../services/Auth/AuthProvider';

const Header = () => {
  const authContext = useAuthContext();

  return (
    <HeaderContainer>
      <Navbar />
      <HeroWrapper>
        <div className="hero_text">
          <h1 className="hero_text-heading">Build Chat, The Easy Way.</h1>
          <p className="hero_text-paragraph">
            Signup for free and start building your own chatbot with no code
            platform.
          </p>
          {!authContext.isAuthenticated && <>
            <Link to="/register">
            <PrimaryButton>Get Started</PrimaryButton>  
          </Link>
          </>}
          {authContext.isAuthenticated && <>
            <Link to="/app">
            <StyledButton>Dashboard</StyledButton>  
          </Link>
          </>}
        </div>
        <div className="hero_image">
          <img src={PrototypingImg} alt="Prototyping Process" />
        </div>
      </HeroWrapper>
    </HeaderContainer>
  );
};

export default Header;
