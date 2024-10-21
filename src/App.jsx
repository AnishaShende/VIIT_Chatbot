import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <div className="wrapper">
      <Navbar />
      <Hero />
      <Chatbot />
      <Footer />
    </div>
  );
}

export default App;
