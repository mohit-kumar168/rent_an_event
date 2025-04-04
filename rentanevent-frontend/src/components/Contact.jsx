import React from 'react';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import ContactForm from './ContactForm';

const Contact = () => {
  return (
    <>
      <Nav />
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
        <ContactForm />
        <p className="text-gray-700">
          Reach out to us at: <a href="mailto:support@houserental.com" className="text-blue-500 hover:underline">support@houserental.com</a>
        </p>
      </main>
      <Footer />
    </>
  );
};

export default Contact;