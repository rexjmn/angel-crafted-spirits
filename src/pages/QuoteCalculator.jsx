import React from 'react';
import CocktailCalculator from '../components/CocktailCalculator';

import WineTastingCalculator from '../components/WineTastingCalculator';
import heroEvents from '../assets/images/heroEvents.mp4';

function QuoteCalculator() {
  return (
    <>
      {/* Hero Section with Video */}
      <section className="relative h-[400px] overflow-hidden">
        {/* Video Background */}
        <video
          src={heroEvents}
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-[-1]"
        />
        {/* Overlay Content */}
        <div className="relative z-10 flex items-center justify-center h-full bg-black bg-opacity-40 text-white text-center">
          <div>
            <h1 className="text-4xl font-bold">Welcome to Our Event Quote Calculator</h1>
            <p className="text-lg mt-2">Plan your perfect event with our specialized calculators!</p>
          </div>
        </div>
      </section>

      <CocktailCalculator />
      <WineTastingCalculator />
    </>
  );
}

export default QuoteCalculator;
