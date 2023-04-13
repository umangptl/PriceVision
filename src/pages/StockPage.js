import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HistoricalChart from '../components/HistoricalChart';
import NewsSection from '../components/NewsSection';
import TwitterSection from '../components/TwitterSection';
import StockInfo from '../components/StockInfo';
import stockData from '../data/stockData';

const StockPage = () => {
  const newsApiKey = 'cbcd6d0afbfa45dea8922aa9ced7bfbb';
  const API_KEY = 'KVBNYD044OTRQZS1'; 
  const { symbol } = useParams();

  const [news, setNews] = useState([]);
  const [sentiment, setSentiment] = useState('');
  const [tweets, setTweets] = useState([]);
  const [companyOverview, setCompanyOverview] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [sector, setSector] = useState('');
  const [industry, setIndusty] = useState('');
  const [predictions, setPredictions] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [predictionlData, setPredictionData] = useState([]);
  const [stockInfo, setStockInfo] = useState({
    price: 0,
    change: 0,
    changePercent: 0,
  });
  


  useEffect(() => {
    const hardcodedStockData = stockData;
  
    const setHardcodedStockData = (symbol) => {
      if (hardcodedStockData[symbol]) {
        setName(hardcodedStockData[symbol].name);
        setDescription(hardcodedStockData[symbol].description);
        setSector(hardcodedStockData[symbol].sector);
        setIndusty(hardcodedStockData[symbol].industry);
      }
    };
  
    const fetchStockInfo = async () => {
      const API_KEY = 'YOUR_API_KEY';
  
      setHardcodedStockData(symbol);
  
      const stockInfoUrl = `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${API_KEY}`;
      const cachedStockInfo = localStorage.getItem(`stockInfo_${symbol}`);
      let stockInfo;
  
      if (cachedStockInfo) {
        stockInfo = JSON.parse(cachedStockInfo);
      } else {
        const stockInfoResponse = await fetch(stockInfoUrl);
        const stockInfoJson = await stockInfoResponse.json();
        localStorage.setItem(`stockInfo_${symbol}`, JSON.stringify(stockInfoJson));
        stockInfo = stockInfoJson;
      }
  
      //setName(stockInfo.Name);
      //setDescription(stockInfo.Description);
      //setSector(stockInfo.Sector);
  
      const historicalUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;
      const historicalResponse = await fetch(historicalUrl);
      const historicalJson = await historicalResponse.json();
      const historicalData = Object.entries(historicalJson['Time Series (Daily)'])
        .slice(0, 2)
        .reverse()
        .map(([date, data]) => ({
          date,
          price: parseFloat(data['4. close']),
        }));
  
      if (historicalData.length === 2) {
        const yesterdayPrice = historicalData[0].price;
        const todayPrice = historicalData[1].price;
        const change = todayPrice - yesterdayPrice;
        const changePercent = (change / yesterdayPrice) * 100;
  
        setStockInfo({
          price: todayPrice,
          change: change,
          changePercent: changePercent,
        });
      }
    };



      fetchStockInfo();

      const fetchNews = async () => {
      const url = `https://newsapi.org/v2/everything?q=${symbol}&apiKey=${newsApiKey}`;
      const response = await fetch(url);
      const json = await response.json();
      
      const newsArticles = json.articles.map((article) => ({
        title: article.title,
        url: article.url,
        date: article.publishedAt,
        imageUrl: article.urlToImage,
      }));
      
      setNews(newsArticles);
      };
      
      fetchNews();
      
      setNews([
      { title: 'Sample News Article', url: 'https://example.com', date: '2022-01-01' },
        // ...
      ]);

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
              change={stockInfo.change}
              changePercent={stockInfo.changePercent}
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
            <TwitterSection tweets={tweets} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPage;
