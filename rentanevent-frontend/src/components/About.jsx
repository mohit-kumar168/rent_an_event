import React from 'react';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';

const About = () => {
  return (
    <>
      <Nav />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">About Us</h2>
        <p className="text-gray-700">
          Welcome to House Rental System, your one-stop solution for finding affordable and luxurious houses for rent.
          We aim to connect tenants with property owners seamlessly.
        </p>
      </main>
      <Footer />
    </>
  );
};

export default About;