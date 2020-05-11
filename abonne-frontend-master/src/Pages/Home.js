import React from 'react';
import Header from '../components/Header';
import About from '../components/About';
import Features from '../components/Features';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function Home() {
  return (
    <div>
      <Header />
      <About />
      <Features />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;
