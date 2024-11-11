import React, { useState } from 'react';
import Modal from 'react-modal';
import alcoholPrices from '../assets/constants/alcoholPrices.json';

Modal.setAppElement('#root');

const CocktailCalculator = () => {
  const [numPeople, setNumPeople] = useState(10);
  const [selectedPackage, setSelectedPackage] = useState('classic');
  const [alcoholQuality, setAlcoholQuality] = useState('standard');
  const [totalCost, setTotalCost] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [bottleEstimates, setBottleEstimates] = useState({});

  const pricing = {
    classic: { standard: 15.99, premium: 20.99, luxury: 30.99 },
    mixed: { standard: 25.99, premium: 35.99, luxury: 50.99 },
    vip: { standard: 40.99, premium: 60.99, luxury: 80.99 },
  };

  const bottleConsumption = {
    classic: { vodka: 0.1, rum: 0.05, gin: 0.05 },
    mixed: { vodka: 0.15, rum: 0.1, gin: 0.1, tequila: 0.05 },
    vip: { vodka: 0.2, rum: 0.15, gin: 0.15, tequila: 0.1, whiskey: 0.1 },
  };

  const handleCalculate = () => {
    const costPerPerson = pricing[selectedPackage][alcoholQuality];
    setTotalCost(numPeople * costPerPerson);
    calculateBottles();
  };

  const calculateBottles = () => {
    const consumptionRates = bottleConsumption[selectedPackage];
    const newEstimates = {};

    for (let alcoholType in consumptionRates) {
      const bottlesNeeded = Math.ceil(numPeople * consumptionRates[alcoholType]);
      newEstimates[alcoholType] = bottlesNeeded;
    }

    setBottleEstimates(newEstimates);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-black bg-opacity-70 rounded-xl shadow-lg space-y-4">
      <h2 className="text-2xl font-serif text-[#e1c340]">Event Pricing Calculator</h2>

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

      <div>
        <label className="block text-sm font-medium text-[#e1c340]">
          Select Package:
        </label>
        <select
          value={selectedPackage}
          onChange={(e) => setSelectedPackage(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-black bg-opacity-60 text-white focus:outline-none focus:ring-[#e1c340] focus:border-[#e1c340] sm:text-sm rounded-md"
        >
          <option value="classic">Classic Package (Basic Cocktails)</option>
          <option value="mixed">Mixed Package (Basic + Elaborate Cocktails)</option>
          <option value="vip">VIP Package (High-End Cocktails)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-[#e1c340]">
          Alcohol Quality:
        </label>
        <select
          value={alcoholQuality}
          onChange={(e) => setAlcoholQuality(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-black bg-opacity-60 text-white focus:outline-none focus:ring-[#e1c340] focus:border-[#e1c340] sm:text-sm rounded-md"
        >
          <option value="standard">Standard Quality</option>
          <option value="premium">Premium Quality</option>
          <option value="luxury">Luxury Quality</option>
        </select>
      </div>

      <div>
        <button
          onClick={handleCalculate}
          className="w-full bg-[#e1c340] text-black py-2 px-4 rounded-md hover:bg-[#d1a830] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e1c340]"
        >
          Calculate Total Cost
        </button>
      </div>

      <div className="text-xl font-semibold text-[#e1c340]">
        Total Cost: ${totalCost.toFixed(2)} USD
      </div>

      <div className="text-lg font-medium text-[#e1c340] mt-4">
        Estimated Bottles Needed:
        <ul className="mt-2 text-white">
          {Object.keys(bottleEstimates).map((alcoholType) => (
            <li key={alcoholType}>
              {alcoholType.charAt(0).toUpperCase() + alcoholType.slice(1)}: {bottleEstimates[alcoholType]} bottles
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <button
          onClick={() => setShowModal(true)}
          className="w-full bg-[#e1c340] text-black py-2 px-4 rounded-md hover:bg-[#d1a830] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e1c340]"
        >
          View Alcohol Price List
        </button>
      </div>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Alcohol Price List"
        className="bg-black bg-opacity-90 p-6 rounded-lg shadow-lg max-w-3xl w-full mx-4 overflow-y-auto max-h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <h3 className="text-lg font-serif text-[#e1c340] mb-4">Alcohol Price List</h3>
        <div className="space-y-4 overflow-y-auto max-h-[70vh]">
          {alcoholPrices.map((item, index) => (
            <div key={index}>
              <h4 className="font-semibold text-[#e1c340]">{item.product}</h4>
              <ul className="list-disc pl-5 text-white">
                {item.brands.map((brand, i) => (
                  <li key={i} className="flex justify-between">
                    <span>{brand.name} ({brand.quality}):</span>
                    <span>${brand.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 mt-4">
          * Prices are average estimates and may vary depending on location and store.
        </p>
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

export default CocktailCalculator;
