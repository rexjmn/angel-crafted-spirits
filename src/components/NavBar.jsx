import React, { useEffect } from 'react';
import { Angel } from '../assets/images/index';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const NavBar = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '#nav',
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }
      );

      gsap.fromTo(
        '#nav li',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out' }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <nav id='nav' className="flex items-center justify-around bg-transparent p-2">
      <div className="flex items-center">
        <Link to="/">
          <img src={Angel} alt="logo" width={110} />
        </Link>
      </div>
      <div className="flex items-center">
        <ul className="flex space-x-12 text-white text-lg font-[Rye]">
          <li className="hover:text-gray-300 cursor-pointer transition-colors duration-300">Home</li>
          <li className="hover:text-gray-300 cursor-pointer transition-colors duration-300">About</li>
          <li className="hover:text-gray-300 cursor-pointer transition-colors duration-300">Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;