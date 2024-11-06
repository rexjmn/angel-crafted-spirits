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
          <img src={Angel} alt="logo" width={110} />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center">
        <ul className="flex space-x-12 text-lg font-[Rye]">
          <li className="hover:text-gray-400 cursor-pointer transition-colors duration-300">Home</li>
          <li className="hover:text-gray-400 cursor-pointer transition-colors duration-300">About</li>
          <li className="hover:text-gray-400 cursor-pointer transition-colors duration-300">Contact</li>
        </ul>
      </div>

      {/* Copyright */}
      <div className="text-sm font-light">
        &copy; 2024 Angel Crafted Spirits. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;