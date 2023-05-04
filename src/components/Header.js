import React from 'react';
import backgroundImage from '../data/backgound2.jpg';

const Header = () => {
  return (
    <header className="bg-primary h-screen relative">
      <div
        className="absolute inset-0 z-10"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          //Dull the image
          filter: 'brightness(0.5)', 
          
        }}
      ></div>
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-secondary relative z-20">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 text-white shadow-md">Price-Vision</h1>
        <p className="text-2xl md:text-3xl text-center max-w-2xl text-white shadow-md">
          Explore our machine learning-driven stock predictions for 12 different stocks, and make informed investment decisions.
        </p>
      </div>
    </header>
  );
};

export default Header;
