import React from 'react';
import notFound from '../../assets/images/not-found.svg';
import styled from 'styled-components';

const NotFound = () => {
  return (
    <NotFoundWrapper>
      <img src={notFound} alt="Page Not Found"></img>
    </NotFoundWrapper>
  );
};

export default NotFound;

const NotFoundWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  img {
    width: 40rem;
    height: auto;
  }
`;
