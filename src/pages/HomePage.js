// pages/HomePage.js
import React from 'react';
import Header from '../components/Header';
import IllustrationSection from '../components/IllustrationSection';
import StockPreview from '../components/StockPreview';

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <IllustrationSection />
      <StockPreview />
    </div>
  );
};

export default HomePage;
