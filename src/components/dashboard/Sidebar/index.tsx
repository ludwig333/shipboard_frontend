import React from 'react';
import styled from 'styled-components';
import logo from '../../../assets/images/logo-light.png';

const Sidebar: React.FC = () => {
  return (
    <SidebarWrapper>
      <LogoWrapper>
        <img src={logo} alt="Logo" />
      </LogoWrapper>
    </SidebarWrapper>
  );
};

export default Sidebar;

const SidebarWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 22rem;
  background: #252f3f;

  
`;

const LogoWrapper = styled.div`
  height: 6rem;
  background: #161E2E;
  img {
    height: 2.2.rem;
  }
`;
