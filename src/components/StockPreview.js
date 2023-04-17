import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import stockData from '../data/stockData';

const StockPreview = () => {
  const [selectedStock, setSelectedStock] = useState(null);

  const handleClick = (stock) => {
    setSelectedStock(selectedStock === stock ? null : stock);
  };

  const variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Stocks</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Object.values(stockData).map((stock, index) => (
          <motion.div
            key={stock.ticker}
            className={`bg-white shadow-md rounded p-6 text-center ${selectedStock === stock ? 'col-span-2 row-span-2 bg-blue-100' : ''}`}
            initial="hidden"
            animate="visible"
            variants={variants}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => handleClick(stock)}
          >
            <h3 className="text-2xl font-bold mb-2">{stock.name}</h3>
            <p className="mb-4">{stock.ticker}</p>

            <AnimatePresence>
              {selectedStock === stock && (
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-sm mb-4">{stock.description}</p>
                  <div className="flex justify-between">

                  </div>
                  <Link to={`/stock/${stock.ticker}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors">
                    View Details
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StockPreview;
