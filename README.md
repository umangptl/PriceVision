# PriceVision

### PriceVision is a web application designed to provide stock price predictions and help people receive all the news for buying and selling stock.

#### It's important to note that stock price prediction can be a challenging task depending on different economic factors which aren't used in this prediction program 

### Disclaimer: The predictions provided are for informational purposes only and should not be considered financial advice. We are not responsible for any financial investment losses


## Features:
- The price prediction model uses a Long Short-Term Memory (LSTM) Recurrent Neural Network algorithm. 
- News related to a particular stock.
- User-friendly Interface 
- Graph showing historical data and prediction price 
- Buy/sell single 


This is AAPL stock's initial prediction.

<img width="500" alt="AAPL" src="https://github.com/umangptl/Software-Engineering-Project-Seminar_1/blob/main/Resources/AAPL.png">

This is AMZN stock's initial prediction.

<img width="500" alt="AMZN" src="https://github.com/umangptl/Software-Engineering-Project-Seminar_1/blob/main/Resources/AmZN.png">

## Limitations of stock price prediction 
### The numbers below are based on PriceVision02 using AAPL stock from '2016-01-01' to '2023-03-01'
The prediction model for the stock closing prices has an RMSE value of 4.648 and a MAPE value of 2.435%. The RMSE represents the standard deviation of the residuals or the differences between the predicted and actual values. A lower RMSE value indicates that the model's predictions are closer to the actual values. In this case, the RMSE value of 4.648 suggests that the model's predictions have an average error of around 4.6 points.

The MAPE, on the other hand, represents the average percentage difference between the predicted and actual values. The lower the MAPE value, the better the model's accuracy. The MAPE value of 2.435% indicates that the model's predictions have an average percentage error of around 2.4%.

Overall, the model performs well in predicting the stock closing prices, with an RMSE value of 4.648 and a MAPE value of 2.435%. However, it's important to note that stock price prediction can be a challenging task depending on the different economic factors that aren't used in this prediction program

## Frontend using React
Machine learning predictions are made using Python which then sends the data to react App using Flask API connecting both ends 

### Technologies Used
- GoogleColab
- Ngrok
- Alphavantage
- News API
- React

### Prerequisites
- Python
- Ngrok Auth Token - https://ngrok.com
- API keys
    - News API - https://wwww.newsapi.org
    - Alphavantage - https://www.alphavantage.co

##Getting Started
1. Download and run the FinalPriceVision.ipynd to your Googlelab and replace your Auth Token 
```
authtoken= "YOUR_TOKEN"
```
2. Replace your News API and Alphavantage API in the React APP
```
const newsApiKey = 'YOUR_NEWS_API';
const API_KEY = 'YOUR_ALPHAVANTAGE_API';
```

### Main Page
<img width="500" alt="AMZN" src="https://github.com/umangptl/PriceVision/blob/main/Resources/image.png">
<img width="500" alt="AMZN" src="https://github.com/umangptl/PriceVision/blob/main/Resources/image2.1.png">

### Stock Page 
<img width="500" alt="AMZN" src="https://github.com/umangptl/PriceVision/blob/main/Resources/image5.jpeg">
