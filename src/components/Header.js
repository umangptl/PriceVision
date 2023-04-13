// components/Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="bg-primary h-screen relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 z-10"></div>
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-secondary relative z-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Stock Prediction Capstone</h1>
        <p className="text-lg md:text-xl text-center max-w-2xl">Explore our machine learning-driven stock predictions for 10 different stocks, and make informed investment decisions.</p>
      </div>
    </header>
  );
};

export default Header;
