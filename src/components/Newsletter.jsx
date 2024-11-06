import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import newsletterBg from '../assets/images/newsletter-bg.png';
import newsletterBgSm from '../assets/images/newsletter-bg-sm.png';

gsap.registerPlugin(ScrollTrigger);

const Newsletter = () => {
  const titleRef = useRef(null);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: true
      }
    });

    tl
      .fromTo(titleRef.current, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      )
      .fromTo([inputRef.current, buttonRef.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power4.out" },
        "-=0.5"
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      className="newsletter-section bg-cover bg-center py-12 sm:py-20 md:py-32 px-4 text-white flex items-center justify-center"
      style={{ 
        backgroundImage: `url(${newsletterBgSm})`,
        '@media (min-width: 640px)': {
          backgroundImage: `url(${newsletterBg})`
        }
      }}
    >
      <div className="bg-black bg-opacity-60 p-6 sm:p-8 md:p-12 rounded-lg text-center max-w-3xl h-full w-full">
        <h2 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 md:mb-8 font-serif">
          Stay Updated with Our Newsletter
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <input
            ref={inputRef}
            type="email"
            placeholder="Enter your email"
            className="newsletter-input px-4 sm:px-5 py-2 sm:py-3 rounded-lg text-gray-800 outline-none focus:ring-2 ring-indigo-400 w-full sm:w-auto"
          />
          <button
            ref={buttonRef}
            className="newsletter-button px-5 sm:px-6 md:px-8 py-2 sm:py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 w-full sm:w-auto"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;