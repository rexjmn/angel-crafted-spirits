import React, { useState } from 'react';
import Modal from 'react-modal';
import wineData from '../assets/constants/updated_wine_tasting_data.json';

Modal.setAppElement('#root');

const WineTastingCalculator = () => {
  const [numPeople, setNumPeople] = useState(10);
  const [selectedWineQuality, setSelectedWineQuality] = useState('standard');
  const [selectedFoodOption, setSelectedFoodOption] = useState('no_appetizers');
  const [totalCost, setTotalCost] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Pricing per person based on wine quality and food selection
  const winePricing = {
    standard: 20.99,
    premium: 50.99,
    luxury: 100.99
  };

  const foodPricing = {
    no_appetizers: 0,
    spanish_appetizers: 15.99,
    french_appetizers: 18.99,
    american_appetizers: 16.99,
    charcuterie_and_cheese: 25.99,
    nuts_and_dried_fruits: 12.99
  };

  const handleCalculate = () => {
    const wineCostPerPerson = winePricing[selectedWineQuality];
    const foodCostPerPerson = foodPricing[selectedFoodOption];
    const total = numPeople * (wineCostPerPerson + foodCostPerPerson);
    setTotalCost(total);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-black bg-opacity-70 rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-serif text-[#e1c340]">Wine Tasting Calculator</h2>

      {/* Number of Guests */}
      <div>
        <label className="block text-sm font-medium text-[#e1c340]">
          Number of Guests:
        </label>
        <select
          value={numPeople}
          onChange={(e) => setNumPeople(parseInt(e.target.value))}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-black bg-opacity-60 text-white focus:outline-none focus:ring-[#e1c340] focus:border-[#e1c340] sm:text-sm rounded-md"
        >
          {Array.from({ length: 39 }, (_, i) => 10 + i * 5).map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Wine Quality Selection */}
      <div>
        <label className="block text-sm font-medium text-[#e1c340]">
          Select Wine Quality:
        </label>
        <select
          value={selectedWineQuality}
          onChange={(e) => setSelectedWineQuality(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-black bg-opacity-60 text-white focus:outline-none focus:ring-[#e1c340] focus:border-[#e1c340] sm:text-sm rounded-md"
        >
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
          <option value="luxury">Luxury</option>
        </select>
      </div>

      {/* Food Option Selection */}
      <div>
        <label className="block text-sm font-medium text-[#e1c340]">
          Select Food Option:
        </label>
        <select
          value={selectedFoodOption}
          onChange={(e) => setSelectedFoodOption(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-black bg-opacity-60 text-white focus:outline-none focus:ring-[#e1c340] focus:border-[#e1c340] sm:text-sm rounded-md"
        >
          <option value="no_appetizers">No Appetizers</option>
          <option value="spanish_appetizers">Spanish Appetizers</option>
          <option value="french_appetizers">French Appetizers</option>
          <option value="american_appetizers">American Appetizers</option>
          <option value="charcuterie_and_cheese">Charcuterie & Cheese, Nuts and Dried Fruit</option>
        </select>
      </div>

      {/* Calculate Button */}
      <div>
        <button
          onClick={handleCalculate}
          className="w-full bg-[#e1c340] text-black py-2 px-4 rounded-md hover:bg-[#d1a830] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e1c340]"
        >
          Calculate Total Cost
        </button>
      </div>

      {/* Total Cost Display */}
      <div className="text-xl font-semibold text-[#e1c340]">
        Total Cost: ${totalCost.toFixed(2)} USD
      </div>

      {/* Button to Open Wine & Food List Modal */}
      <div className="mt-6">
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-[#e1c340] text-black py-2 px-4 rounded-md hover:bg-[#d1a830] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e1c340]"
        >
          View Wine & Food Options
        </button>
      </div>

      {/* Modal for Wine & Food List */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Wine and Food List"
        className="bg-black bg-opacity-90 p-6 rounded-lg shadow-lg max-w-3xl w-full mx-4 overflow-y-auto max-h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <h3 className="text-lg font-serif text-[#e1c340] mb-4">Wine & Food List</h3>
        <div className="space-y-4 overflow-y-auto max-h-[70vh]">
          <div>
            <h4 className="font-semibold text-[#e1c340]">Wine Selection</h4>
            {wineData.wine_tasting && wineData.wine_tasting.wine_selection ? (
              Object.entries(wineData.wine_tasting.wine_selection).map(([type, wines]) => (
                <div key={type} className="mb-4">
                  <h5 className="font-bold text-[#e1c340] capitalize">{type.replace('_', ' ')}</h5>
                  <ul className="list-disc pl-5 text-white">
                    {Array.isArray(wines) && wines.map((wine, i) => (
                      <li key={i} className="flex justify-between">
                        <span>{wine.brand} ({wine.vintage}, {wine.quality}):</span>
                        <span>${wine.price.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-white">No wine data available.</p>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-[#e1c340]">Food Selection</h4>
            <ul className="list-disc pl-5 text-white">
              {wineData.wine_tasting && wineData.wine_tasting.appetizer_selection[selectedFoodOption] ? (
                wineData.wine_tasting.appetizer_selection[selectedFoodOption].map((food, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{food.product}:</span>
                    <span>{food.price_range || `$${food.price.toFixed(2)}`}</span>
                  </li>
                ))
              ) : (
                <p className="text-white">No food data available.</p>
              )}
            </ul>
          </div>
        </div>
        <button
          onClick={() => setShowModal(false)}
          className="mt-4 bg-[#e1c340] text-black py-2 px-4 rounded-md hover:bg-[#d1a830] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e1c340]"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default WineTastingCalculator;
