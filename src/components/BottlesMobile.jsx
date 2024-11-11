import React, { useEffect, useRef } from 'react';
import Glassy from '../assets/images/glassy.mp4';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BottlesMobile = ({ sectionId, ...props }) => {
  const videoRef = useRef(null);
  const headlineRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    
    

    const contentSections = contentRef.current.querySelectorAll('.content-section');
    contentSections.forEach((section, index) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 20, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          delay: index * 0.15,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 60%',
            scrub: true,
        },
    }
      );
    });
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      <div className="h-screen">
    <div
      ref={headlineRef}
      className=" absolute top-[12%] left-1/2 z-10 transform -translate-x-1/2  text-center p-4"
    >
      <h1 className="text-3xl font-bold text-white font-serif shadow-md">
        Discover Los Angeles' Finest Bartending Experience
      </h1>
    </div>
        <div className="w-full h-full absolute top-0 left-0 bg-[#292929] ">
          <video
            ref={videoRef}
            className="w-full h-1/2 object-cover"
            src={Glassy}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
      <div ref={contentRef} className="w-full px-4 py-8 space-y-8 bg-gradient-to-b from-[#292929] to-black">
        <div className="content-section max-w-sm mx-auto p-4 bg-black/20 backdrop-blur-md rounded-lg">
          <h2 className="text-2xl font-serif text-[#e1c340] font-semibold mb-3">Event Bartending</h2>
          <p className="text-lg font-medium">Our event bartending service brings skilled bartenders and quality cocktails to weddings, corporate events, and private parties.</p>
        </div>
        <div className="content-section max-w-sm mx-auto p-4 bg-black/20 backdrop-blur-md rounded-lg">
          <h2 className="text-2xl font-serif text-[#e1c340] font-semibold mb-3">Cocktail Catering</h2>
          <p className="text-lg font-medium">Our cocktail catering service provides tailored drink menus for weddings, parties, and corporate gatherings.</p>
        </div>
        <div className="content-section max-w-sm mx-auto p-4 bg-black/20 backdrop-blur-md rounded-lg">
          <h2 className="text-2xl font-serif text-[#e1c340] font-semibold mb-3">Private Bartender Services</h2>
          <p className="text-lg font-medium">Hire our private bartender services for an exclusive, personalized bar experience at your home or private event.</p>
        </div>
      </div>
    </div>
  );
};

export default BottlesMobile;
