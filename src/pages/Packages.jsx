import React, { useState } from 'react';
import lila from '../assets/images/lila-mitchell.jpg';
import Footer from '../components/Footer';
import Aos from 'aos';

Aos.init({
  duration: 1000,
  easing: 'ease-out',
  once: true,
});

function Packages() {
  const [activePackage, setActivePackage] = useState(null);

  const cocktailPackages = [
    {
      name: "Legendary Classic Cocktail Experience",
      shortName: "Timeless Mixology",
      description: "Embark on an extraordinary journey through the most iconic cocktails in mixology history. Where every sip tells a story of craftsmanship, tradition, and unparalleled flavor.",
      price: "Starting at $300",
      features: [
        "10 hand-crafted classic cocktails",
        "Designer crystal glassware",
        "5-hour premium mixology session"
      ],
      ideal: "Perfect for corporate events, cocktail enthusiasts, and those who appreciate the art of traditional mixology.",
      keyBenefits: [
        "Immersive cocktail storytelling",
        "Professional-grade mixology experience",
        "Authentic flavor profiles"
      ]
    },
    {
      name: "Innovative Craft Cocktail Journey",
      shortName: "Creative Mixology",
      description: "Push the boundaries of flavor with our cutting-edge cocktail experience. A sensory adventure that transforms ordinary drinks into liquid art, challenging everything you know about mixology.",
      price: "Starting at $350",
      features: [
        "15 exclusive artisan cocktails",
        "Specialized modern mixology expert",
        "Premium locally-sourced ingredients",
        "5-hour innovative cocktail workshop"
      ],
      ideal: "Designed for creative groups, culinary adventurers, and those seeking a unique gastronomic experience.",
      keyBenefits: [
        "Innovative flavor combinations",
        "Cutting-edge mixology techniques",
        "Personalized cocktail creation"
      ]
    },
    {
      name: "Ultimate VIP Cocktail Extravaganza",
      shortName: "Elite Mixology Experience",
      description: "The pinnacle of cocktail luxury. A bespoke journey that transcends ordinary drinking, offering an unparalleled, personalized experience that redefines the art of mixology.",
      price: " Starting at $500",
      features: [
        "10 limited edition signature cocktails",
        "Exclusive imported rare ingredients",
        "5-hour full-service personalized mixology experience"
      ],
      ideal: "Exclusively designed for luxury events, special celebrations, and discerning clients seeking the ultimate cocktail experience.",
      keyBenefits: [
        "Personalized cocktail curation",
        "World-class mixology expertise",
        "Unmatched luxury experience"
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <div 
        className="fixed inset-0 bg-cover bg-center opacity-30 z-0"
        style={{
          backgroundImage: `url(${lila})`,
        }}
      />

      <main className="relative z-10 flex-grow container mx-auto px-4 py-16 md:py-44">
        <h1 
          className="text-5xl md:text-6xl font-bold  text-center mb-16 text-[#f0d85e] uppercase tracking-tight"
          data-aos="fade-down"
        >
          Exclusive Cocktail Packages
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {cocktailPackages.map((pkg, index) => (
            <div 
              key={index}
              className={`bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 transform transition-all duration-300 
                ${activePackage === index 
                  ? 'scale-105 border-[#f0d85e] shadow-2xl' 
                  : 'hover:scale-105 hover:border-white/50'
                }`}
              onClick={() => setActivePackage(activePackage === index ? null : index)}
              data-aos="zoom-in"
              data-aos-delay={index * 200}
            >
              <h2 className="text-2xl font-bold text-[#f0d85e] mb-4">{pkg.name}</h2>
              <p className="text-white/70 mb-4">{pkg.description}</p>
              <div className="text-3xl font-bold text-[#f0d85e] mb-4">{pkg.price}</div>
              
              <ul className="space-y-2 mb-6">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-5 w-5 text-[#f0d85e] mr-2" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#f0d85e] mb-2">Ideal For</h3>
                <p className="text-sm italic text-white/60">{pkg.ideal}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#f0d85e] mb-2">Key Benefits</h3>
                <ul className="text-sm text-white/70 space-y-1">
                  {pkg.keyBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 text-[#f0d85e] mr-2" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                className="w-full py-3 bg-[#f0d85e] text-black font-bold rounded-full hover:bg-[#ffd700] transition duration-300 uppercase tracking-wider"
              >
                Book Your Experience
              </button>
            </div>
          ))}
        </div>
      </main>

      
        <Footer />
    
    </div>
  );
}

export default Packages;