import React, { useLayoutEffect } from 'react';
import { Angel } from '../assets/images/index';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Footer = () => {
  useLayoutEffect(() => {
    gsap.fromTo('#footer', 
      { opacity: 0, y: 50 },  
      { opacity: 1, y: 0, duration: 1, ease: 'power1.out' }  
    );
  }, []);

  return (
    <footer id='footer' className="flex items-center justify-around bg-[#1e1e1e] p-6 text-white">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link to="/">
          <img src={Angel} alt="logo" width={130} />
        </Link>
      </div>

      {/* Navigation Links */}
     

      {/* Copyright */}
      <div className="text-sm font-light">
        &copy; 2024 Angel Crafted Spirits. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;