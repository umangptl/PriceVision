// src/pages/StockPage/components/TwitterSection.js
import React from 'react';

const TwitterSection = ({ tweets }) => {
  return (
    <section className="bg-white shadow-md rounded p-6">
      <h3 className="text-2xl font-bold mb-4">Twitter Feed</h3>
      <ul className="space-y-4">
        {tweets.map((tweet, index) => (
          <li key={index}>
            <p>{tweet.text}</p>
            <p className="text-sm text-gray-600">{tweet.date}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TwitterSection;
