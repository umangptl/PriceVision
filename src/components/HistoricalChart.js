import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import enUS from 'date-fns/locale/en-US';

const HistoricalChart = ({ symbol }) => {
  const chartRef = useRef(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [predictions, setPredictions] = useState([]);

  const fetchData = async () => {
    const API_KEY = 'KVBNYD044OTRQZS1';
  
    // Fetch historical data
    const historicalUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;
  
    const fetchAndCacheHistoricalData = async (url, symbol) => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        const data = Object.entries(json['Time Series (Daily)'])
          .slice(0, 30)
          .reverse()
          .map(([date, data]) => ({
            date,
            price: parseFloat(data['4. close']),
          }));
  
        // Store the fetched historical data in the cache
        localStorage.setItem(`historicalData_${symbol}`, JSON.stringify(data));
        return data;
      } catch (error) {
        console.error('Failed to fetch historical data:', error);
        return [];
      }
    };
  
    // First, try to fetch historical data from the API
    let historical = await fetchAndCacheHistoricalData(historicalUrl, symbol);
  
    // If the API call fails or returns an empty array, use cached data as a fallback
    if (historical.length === 0) {
      const cachedHistoricalData = localStorage.getItem(`historicalData_${symbol}`);
      if (cachedHistoricalData) {
        historical = JSON.parse(cachedHistoricalData);
      }
    }
  
    // Fetch predictions
    try {
      console.log('Trying Prediction');
      const predictionsUrl = `https://pricevision.ngrok.io/${symbol}`;
      console.log('Constructed URL:', predictionsUrl);
      const predictionsResponse = await fetch(predictionsUrl);
      console.log('predictionsResponse:', predictionsResponse);
      const predictionsText = await predictionsResponse.text();
      const predictionsArray = JSON.parse(predictionsText.trim());
      console.log('Predictions Recieved');
      const pred = predictionsArray
      .slice(1) // Trim the first item
      .map((item) => ({
        date: item.date,
        price: Math.round(item.price * 100) / 100, // Round to the nearest cent
      }));
  
      console.log(pred);
      setPredictions(pred);
    } catch (error) {
      console.error('Failed to fetch predictions:', error);
    }
  
    setHistoricalData(historical);
  };

  useEffect(() => {
    fetchData();
  }, [symbol]);


  useEffect(() => {
    if (chartRef.current) {
      // Connect the lines by including the last historical data point in the predictions array
      const connectedPredictions = historicalData.length > 0 ? [historicalData[historicalData.length - 1], ...predictions] : predictions;

      const chart = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: historicalData.map(item => item.date).concat(predictions.map(item => item.date)),
          datasets: [
            {
              label: 'Actual Stock Price',
              data: historicalData.map(item => item.price),
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1,
              pointRadius: 0,
              borderWidth: 2,
            },
            {
              label: 'Predicted Stock Price',
              data: Array(historicalData.length).fill(null).concat(connectedPredictions.map(item => item.price)),
              borderColor: 'rgba(255, 99, 132, 1)',
              tension: 0.1,
              pointRadius: 0,
              borderWidth: 2,
            },
          ],
        },

        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day',
                tooltipFormat: 'MMM dd',
                displayFormats: {
                  day: 'MMM dd',
                },
              },
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: false,
              grid: {
                drawBorder: false,
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              titleColor: '#fff',
              bodyColor: '#fff',
            },
          },
          interaction: {
            intersect: false,
            mode: 'index',
          },
        },
      });

      return () => {
        chart.destroy();
      };
    }
  }, [historicalData, predictions]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default HistoricalChart;