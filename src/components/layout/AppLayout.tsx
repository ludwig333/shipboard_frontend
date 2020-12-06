import React from 'react';
import styled from 'styled-components';
import Sidebar from '../dashboard/Sidebar';

interface LayoutProps {
  children?: any;
}

const AppLayout: React.FC<LayoutProps> = (props) => {
  return (
    <LayoutWrapper>
      <Sidebar />
      <AppContainer>{props.children}</AppContainer>
    </LayoutWrapper>
  );
};

export default AppLayout;

const LayoutWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;

const AppContainer = styled.div`
  flex-grow: 1;

  h1 {
    margin-top: 2rem;
    margin-left: 2rem;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    margin: 2rem;

    .button {
      align-self: center;
    }
  }
`;
