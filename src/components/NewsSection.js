import React from 'react';

const NewsSection = ({ news }) => {
  const sampleNews = [
    {
      title: 'Sample Article 1',
      url: 'https://example.com/article1',
      date: '2023-03-27',
      imageUrl: 'https://via.placeholder.com/100',
    },
    {
      title: 'Sample Article 2',
      url: 'https://example.com/article2',
      date: '2023-03-26',
      imageUrl: 'https://via.placeholder.com/100',
    },
  ];

  const displayNews = news.length > 0 ? news : sampleNews;

  return (
    <section className="bg-white shadow-md rounded p-6">
      <h3 className="text-2xl font-bold mb-4">Latest News</h3>
      <ul className="space-y-4 overflow-y-scroll h-80">
        {displayNews.map((article, index) => (
          <li key={index} className="flex">
            <img src={article.imageUrl} alt={article.title} className="w-20 h-20 object-cover mr-4" />
            <div>
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                {article.title}
              </a>
              <p className="text-sm text-gray-600">{article.date}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NewsSection;
