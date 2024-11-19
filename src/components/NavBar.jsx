import React, { useState, useRef, useEffect } from 'react';
import { Angel, burgerbars } from '../assets/images/index';
import gsap from 'gsap';
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css'; // Import AOS CSS
import Aos from 'aos';


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  // Initialize AOS
  React.useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: 'ease-out',
      once: true,
      offset: 200,
    });
  }, []);
  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(mobileMenuRef.current, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
    } else {
      gsap.to(mobileMenuRef.current, { x: '-100%', opacity: 0, duration: 0.5, ease: 'power2.in' });
    }
  }, [isMenuOpen]); // Ejecutar cuando isMenuOpen cambie


  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Event Packages', path: '/packages' },
    { name: 'Event Calculator', path: '/event-calculator' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav
      className="absolute top-0 left-0 w-full right-0  items-center  bg-black/10 p-7 z-50"
      data-aos="fade-down"
    >
      <div className='flex items-center justify-between'>
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="transform transition-transform hover:scale-105 duration-300">
          <img
            src={Angel}
            alt="logo"
            width={110}
            className="drop-shadow-lg opacity-100"
            data-aos="fade-up"
          />
        </Link>
      </div>

      {/* Mobile Menu Icon */}
      <button onClick={toggleMenu} className="lg:hidden">
        <img src={burgerbars} alt="menu" className="w-8 h-8 text-white" />
      </button>

      {/* Large Screen Menu */}
      <ul className="hidden lg:flex space-x-12 absolute right-12 text-white text-lg font-[Rye]">
        {navItems.map((item, index) => (
          <li
            key={item.name}
            className="hover:text-[#f0d85e]  cursor-pointer transition-all duration-300 relative group"
            data-aos="fade-down"
            data-aos-delay={`${index * 100}`} // Staggered animation
          >
            <Link to={item.path}>{item.name}</Link>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#f0d85e] group-hover:w-full transition-all duration-300"></span>
          </li>
        ))}
      </ul>

      {/* Mobile Menu */}
    
      <ul
        ref={mobileMenuRef}
        className={`fixed top-0 left-0 w-3/4 h-screen bg-gradient-to-r from-black via-gray-900 to-black bg-blur text-white flex flex-col space-y-6 text-xl p-6 shadow-lg transform transition-transform duration-500 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
        data-aos="fade-down"
      >
        {navItems.map((item) => (
          <li key={item.name} className="hover:text-[#f0d85e] cursor-pointer">
            <Link to={item.path} onClick={toggleMenu}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      </div>
      
    </nav>
  );
};

export default NavBar;
