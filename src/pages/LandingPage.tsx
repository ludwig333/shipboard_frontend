import React from 'react';
import Header from '../components/front/header/index';
import Info from '../components/front/info';
import Feature from '../components/front/feature';
import Footer from '../components/front/footer';

const LandingPage: React.FC = () => {
  return (
    <>
      <Header/>
      <Info />
      <Feature />
      <Footer />
    </>
  );
};

export default LandingPage;
