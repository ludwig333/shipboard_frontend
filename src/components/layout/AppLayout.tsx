import React from 'react';
import styled from 'styled-components';
import Sidebar from '../dashboard/Sidebar';

interface LayoutProps {
  children?: any;
}

const AppLayout: React.FC<LayoutProps> = (props) => {
  return (
    <LayoutWrapper>
      <Sidebar/>
    </LayoutWrapper>
  );
}

export default AppLayout;

const LayoutWrapper = styled.div`
display: flex;
min-height: 100vh;

`;