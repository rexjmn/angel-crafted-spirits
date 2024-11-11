import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Angel, burgerbars } from '../assets/images/index';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const navItemsRef = useRef([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null); // Agregar una referencia para el menú móvil

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      containerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        logoRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8 }
      )
      .fromTo(
        navItemsRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: { amount: 0.4, ease: 'power2.out' } }
      );
  }, []);

  // Animación de apertura/cierre del menú móvil
  useEffect(() => {
    if (isMenuOpen) {
      gsap.to(mobileMenuRef.current, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
    } else {
      gsap.to(mobileMenuRef.current, { x: '-100%', opacity: 0, duration: 0.5, ease: 'power2.in' });
    }
  }, [isMenuOpen]); // Ejecutar cuando isMenuOpen cambie

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Event Calculator', path: '/event-calculator' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <nav ref={containerRef} className="absolute top-0 left-0 right-0 flex items-center justify-between bg-black/10 p-7 z-50">
      <div className="flex items-center  ">
        <Link to="/" className="transform transition-transform hover:scale-105 duration-300">
          <img ref={logoRef} src={Angel} alt="logo" width={110} className="drop-shadow-lg opacity-0" />
        </Link>
      </div>

      {/* Icono de menú para dispositivos móviles */}
      <button onClick={toggleMenu} className="lg:hidden">
        <img src={burgerbars} alt="menu" className="w-8 h-8 text-white" />
      </button>

      {/* Menú para pantallas grandes */}
      <ul className="hidden lg:flex space-x-12 text-white text-lg font-[Rye]">
        {navItems.map((item, index) => (
          <li
            key={item.name}
            ref={(el) => (navItemsRef.current[index] = el)}
            className="hover:text-gray-300 cursor-pointer transition-all opacity-0 duration-300 relative group"
          >
            <Link to={item.path}>{item.name}</Link>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
          </li>
        ))}
      </ul>

      {/* Menú desplegable para móviles */}
      <ul
        ref={mobileMenuRef} // Referencia para el menú móvil
        className="mobile-menu fixed top-0 left-0 w-3/4 h-auto bg-black bg-blur text-white flex flex-col space-y-6 text-xl p-6 shadow-lg transform -translate-x-full lg:hidden"
      >
        {navItems.map((item, index) => (
          <li key={item.name} className="hover:text-gray-400 cursor-pointer">
            <Link to={item.path} onClick={toggleMenu}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
