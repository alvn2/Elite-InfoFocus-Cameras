import React from 'react';
import Hero from '../components/Hero';
import FeaturedGear from '../components/FeaturedGear';
import TrustFactors from '../components/TrustFactors';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <FeaturedGear />
      <TrustFactors />
    </>
  );
};

export default Home;