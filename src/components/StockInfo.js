import React from 'react';

const StockInfo = ({
  price,
  change,
  changePercent,
  oneDayChange,
  oneWeekChange,
  oneDayChangePercent,
  oneWeekChangePercent,
}) => {
  return (
    <div className="bg-white shadow-md rounded p-6">
      <h3 className="text-2xl font-bold mb-4 text-green-700">Stock Info</h3>
      <dl className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
        <div>
          <dt>Price</dt>
          <dd className="text-lg font-semibold text-gray-800">${price.toFixed(2)}</dd>
        </div>
        <div>
          <dt>Change</dt>
          <dd
            className={`text-lg font-semibold ${
              change >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {change >= 0 ? '+' : '-'}${Math.abs(change).toFixed(2)} (
            {changePercent.toFixed(2)}%)
          </dd>
        </div>
        <div>
          <dt>1 Day Prediction</dt>
          <dd
            className={`text-lg font-semibold ${
              oneDayChange >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {oneDayChange >= 0 ? '+' : '-'}${Math.abs(oneDayChange).toFixed(2)} (
            {oneDayChangePercent.toFixed(2)}%)
          </dd>
        </div>
        <div>
          <dt>1 Week Prediction</dt>
          <dd
            className={`text-lg font-semibold ${
              oneWeekChange >= 0 ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {oneWeekChange >= 0 ? '+' : '-'}${Math.abs(oneWeekChange).toFixed(2)} (
            {oneWeekChangePercent.toFixed(2)}%)
          </dd>
        </div>
      </dl>
    </div>
  );
};

export default StockInfo;