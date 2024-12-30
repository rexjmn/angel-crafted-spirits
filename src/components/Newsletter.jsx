import React, { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import newsletterBg from '../assets/images/newsletter-bg.png';
import newsletterBgSm from '../assets/images/newsletter-bg-sm.png';

gsap.registerPlugin(ScrollTrigger);

const Newsletter = () => {
  const containerRef = React.useRef(null);
  const [email, setEmail] = useState('');
  
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // Aquí añadirías la lógica de suscripción
      console.log('Suscribiendo:', email);
      // Posiblemente resetear el email o mostrar un mensaje de éxito
      setEmail('');
    }
  };

  return (
    <section
      ref={containerRef}
      className="newsletter-section relative overflow-hidden py-16 sm:py-24 md:py-40 lg:py-52 px-4 text-white flex items-center justify-center min-h-[600px] md:min-h-[800px]"
    >
      {/* Fondo con efecto de superposición */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source media="(min-width: 640px)" srcSet={newsletterBg} />
          <img 
            src={newsletterBgSm} 
            alt="Newsletter Background" 
            className="w-full h-full object-cover absolute inset-0"
          />
        </picture>
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/20 p-8 sm:p-12 md:p-16 rounded-2xl shadow-2xl max-w-2xl w-full">
        <h2 className="newsletter-title text-center text-3xl sm:text-4xl md:text-5xl font-bold text-[#f0d85e] mb-6 md:mb-10 leading-tight">
          Stay Ahead with Our Newsletter
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="       Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="newsletter-input w-full px-5 py-3 rounded-full bg-white/20 backdrop-blur-sm text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#f0d85e] transition duration-300"
            />
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </span>
          </div>
          
          <button
            type="submit"
            className="newsletter-button w-full px-8 py-3 text-lg bg-[#f0d85e] text-black font-semibold rounded-full hover:bg-[#fae36c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f0d85e] transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
          >
            Subscribe Now
          </button>
        </form>
        
        <p className="text-center text-white/70 mt-4 text-sm">
          We promise to never spam you or share your email.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;