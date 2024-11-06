import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image1 from '../assets/images/image1.png';
import Image2 from '../assets/images/image2.png';
import Image3 from '../assets/images/image3.png';

const FlipCards = () => {
  const containerRef = React.useRef(null);

  const cardsData = [
    {
      id: 1,
      frontImage: 'Cocktails', // Reemplaza con tu imagen
      backTitle: "Card Title 1",
      backText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
    },
    {
      id: 2,
      frontImage: 'Image2', // Reemplaza con tu imagen
      backTitle: "Card Title 2",
      backText: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      id: 3,
      frontImage: 'Image3', // Reemplaza con tu imagen
      backTitle: "Card Title 3",
      backText: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
    }
  ];

  useGSAP(() => {
    const cards = containerRef.current.querySelectorAll('.flip-card');

    // Animación inicial de las cartas
    gsap.fromTo(cards, 
      {
        opacity: 0,
        y: 50
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
      }
    );

    // Añadir efecto hover a cada carta
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.flip-card-inner'), {
          rotateY: 180,
          duration: 0.6,
          ease: "power2.inOut"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.flip-card-inner'), {
          rotateY: 0,
          duration: 0.6,
          ease: "power2.inOut"
        });
      });
    });
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {cardsData.map(card => (
          <div 
            key={card.id}
            className="flip-card w-full h-[400px] perspective-1000"
          >
            <div className="flip-card-inner relative w-full h-full transition-transform duration-500 transform-style-3d">
              {/* Frente de la carta */}
              <div className="flip-card-front absolute w-full h-full backface-hidden">
                <div className="w-full h-full rounded-xl shadow-lg overflow-hidden">
                  <img 
                    src={card.frontImage}
                    alt={`Card ${card.id}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Reverso de la carta */}
              <div className="flip-card-back absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-purple-600 to-blue-500">
                <div className="w-full h-full rounded-xl shadow-lg p-6 flex flex-col justify-center items-center text-white">
                  <h3 className="text-2xl font-bold mb-4">{card.backTitle}</h3>
                  <p className="text-center">{card.backText}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlipCards;