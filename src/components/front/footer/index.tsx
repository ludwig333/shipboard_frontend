import React from 'react';
import { Link } from 'react-router-dom';
import { FooterWrapper } from './styles';
import darkLogo from '../../../assets/images/logo-light.png';
import { StyledButton } from '../../common/buttons';

const Footer = () => {
  return (
    <FooterWrapper>
      <section>
        <div className="logo-section">
          <img src={darkLogo} alt="Shipboard Logo" />
          <p className="copyright">
            ©Shipbot Pvt. Ltd. 2020. All rights reserved
          </p>
        </div>
        <div className="cts-section">
          <p>Easy and fun way to build your chtbot.</p>
          <Link to="/register">
            <StyledButton>Get Started</StyledButton>
          </Link>
        </div>
      </section>
    </FooterWrapper>
  );
};

export default Footer;
