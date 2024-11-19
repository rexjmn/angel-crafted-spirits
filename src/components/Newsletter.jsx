import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import newsletterBg from '../assets/images/newsletter-bg.png';
import newsletterBgSm from '../assets/images/newsletter-bg-sm.png';

gsap.registerPlugin(ScrollTrigger);

const Newsletter = () => {
  const containerRef = React.useRef(null);
  
  useGSAP(() => {
    const container = containerRef.current;
    const title = container.querySelector('.newsletter-title');
    const input = container.querySelector('.newsletter-input');
    const button = container.querySelector('.newsletter-button');
    
    const { width, height } = container.getBoundingClientRect();
    const yOffset = Math.min(50, height * 0.1);
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(title, 
      { 
        y: yOffset,
        opacity: 0 
      },
      { 
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power4.out"
      }
    ).fromTo([input, button],
      { 
        y: yOffset * 0.6,
        opacity: 0 
      },
      { 
        y: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.2,
        ease: "power4.out"
      },
      "-=0.5"
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="newsletter-section bg-cover bg-center py-16 sm:py-24 md:py-40 lg:py-52 px-4 text-white flex items-center justify-center relative min-h-[600px] md:min-h-[800px]"
    >
      {/* Background images with proper responsive handling */}
      <div 
        className="absolute inset-0 hidden sm:block"
        style={{ 
          backgroundImage: `url(${newsletterBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} 
      />
      <div 
        className="absolute inset-0 sm:hidden"
        style={{ 
          backgroundImage: `url(${newsletterBgSm})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} 
      />
      
      <div className="bg-black bg-opacity-60 p-6 sm:p-8 md:p-12 rounded-lg text-center max-w-3xl w-full relative z-10">
        <h2 className="newsletter-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0d85e] mb-4 sm:mb-6 md:mb-8 font-serif">
          Stay Updated with Our Newsletter
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="newsletter-input px-4 sm:px-5 py-2 sm:py-3 rounded-lg text-gray-800 outline-none focus:ring-2 ring-indigo-400 w-full sm:w-auto"
          />
          <button
            className="mt-8 px-6 py-2 text-lg bg-[#f0d85e] text-black rounded-full shadow-md hover:bg-[#e1c340] hover:shadow-xl transition duration-300"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;