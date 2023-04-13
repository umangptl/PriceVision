// components/IllustrationSection.js
import React from 'react';

const illustrations = [
  {
    image: './illustration1.svg',
    title: 'Machine Learning',
    description: 'Our stock predictions are powered by advanced machine learning algorithms.',
  },
  {
    image: './illustration2.svg',
    title: 'Sentiment Analysis',
    description: 'Stay informed with sentiment analysis regarding the latest stock prices and news.',
  },
  {
    image: './illustration3.svg',
    title: 'User-friendly Interface',
    description: 'Navigate through our platform with ease and access key insights in a glance.',
  },
  {
    image: './illustration4.svg',
    title: 'Informed Decisions',
    description: 'Make better investment decisions with our detailed stock analysis and recommendations.',
  },
];

const IllustrationSection = () => {
  return (
    <section className="bg-secondary py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary text-center mb-8">Why Choose Our Platform</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {illustrations.map((illustration, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <img src={illustration.image} alt={illustration.title} className="w-full h-64 object-cover mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-2">{illustration.title}</h3>
              <p className="text-primary">{illustration.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IllustrationSection;
