import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HistoricalChart from '../components/HistoricalChart';
import NewsSection from '../components/NewsSection';
import TwitterSection from '../components/TwitterSection';
import StockInfo from '../components/StockInfo';
import stockData from '../data/stockData';

const StockPage = () => {
  const newsApiKey = '5139675ce71e4f4e84bbda08d8f57474';
  const API_KEY = 'KVBNYD044OTRQZS1';
  const { symbol } = useParams();

  const [news, setNews] = useState([]);
  const [sentiment, setSentiment] = useState('');
  const [tweets, setTweets] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sector, setSector] = useState('');
  const [industry, setIndustry] = useState('');
  const [stockInfo, setStockInfo] = useState({
    price: 0,
    signal: 0,
    oneDayChange: 0,
    oneWeekChange: 0,
    oneDayChangePercent: 0,
    oneWeekChangePercent: 0,
  });

  useEffect(() => {
    const hardcodedStockData = stockData;

    const setHardcodedStockData = (symbol) => {
      if (hardcodedStockData[symbol]) {
        setName(hardcodedStockData[symbol].name);
        setDescription(hardcodedStockData[symbol].description);
        setSector(hardcodedStockData[symbol].sector);
        setIndustry(hardcodedStockData[symbol].industry);
      }
    };

    const fetchNews = async () => {

      setHardcodedStockData(symbol);
      const url = `https://newsapi.org/v2/everything?q=${symbol}&apiKey=${newsApiKey}`;
      const response = await fetch(url);
      const json = await response.json();
      
      console.log(json);
    
      const newsArticles = json.articles.map((article) => ({
        title: article.title,
        url: article.url,
        date: article.publishedAt,
        imageUrl: article.urlToImage,
      }));
    
      setNews(newsArticles);
    };
    

    const fetchStockInfo = async () => {
      setHardcodedStockData(symbol);


        try {
          console.log('Trying Prediction');
          const predictionsUrl = `https://pricevision.ngrok.io/${symbol}`;
          const predictionsResponse = await fetch(predictionsUrl);
          const predictionsText = await predictionsResponse.text();
          const predictionsArray = JSON.parse(predictionsText.trim());
          const pred = predictionsArray
            .map((item) => ({
              date: item.date,
              price: Math.round(item.price * 100) / 100, // Round to the nearest cent
            }));
        
          const todayPrice = pred[0].price;
          const oneDayPredictionPrice = pred[1].price;
          const oneWeekPredictionPrice = pred[7].price;
          const oneDayChange = oneDayPredictionPrice - todayPrice;
          const oneWeekChange = oneWeekPredictionPrice - todayPrice;
          const oneDayChangePercent = (oneDayChange / todayPrice) * 100;
          const oneWeekChangePercent = (oneWeekChange / todayPrice) * 100;

          console.log('Trying Prediction');
          const predictionsUrl2 = `https://pricevision.ngrok.io/${symbol}/signal`;
          const predictionsResponse2 = await fetch(predictionsUrl2);
          const predictionsJson2 = await predictionsResponse2.json();
          const signal = predictionsJson2.signal;
        
          setStockInfo({
            price: todayPrice,
            signal: signal,
            oneDayChange: oneDayChange,
            oneWeekChange: oneWeekChange,
            oneDayChangePercent: oneDayChangePercent,
            oneWeekChangePercent: oneWeekChangePercent,
          });
        } catch (error) {
          console.log('Error:', error);
        }
      }
  

    fetchNews();
    fetchStockInfo();
 

    setSentiment('Positive');

    setTweets([
      { text: 'Elon broke the Twitter API so this is being changed :/', user: '@exampleuser' },
      // ...
    ]);

  }, [symbol]);

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-bold mb-4 text-green-700">{name}</h3>
        <h4 className="text-xl font-semibold mb-2 text-gray-800">{symbol}</h4>
        <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8">
          <div className="w-full lg:w-2/3">
            <HistoricalChart symbol={symbol} />
          </div>
          <div className="w-full lg:w-1/3">
            <StockInfo
              price={stockInfo.price}
              signal={stockInfo.signal}
              oneDayChange={stockInfo.oneDayChange ?? 0}
              oneWeekChange={stockInfo.oneWeekChange ?? 0}
              oneDayChangePercent={stockInfo.oneDayChangePercent ?? 0}
              oneWeekChangePercent={stockInfo.oneWeekChangePercent ?? 0}
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white shadow-md rounded p-6">
              <h3 className="text-2xl font-bold mb-4 text-green-700">Company Overview</h3>
              <p className="text-gray-700">{description}</p>
              <dl className="grid grid-cols-2 gap-4 mt-4 text-gray-600">
                <div>
                  <dt>Sector</dt>
                  <dd className="text-lg font-semibold text-gray-800">{sector}</dd>
                </div>
                <div>
                  <dt>Industry</dt>
                  <dd className="text-lg font-semibold text-gray-800">{industry}</dd>
                </div>
              </dl>
            </div>
          </div>
          <div className="space-y-8">
            <NewsSection news={news} />
            {/* <SentimentSection sentiment={sentiment} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPage;