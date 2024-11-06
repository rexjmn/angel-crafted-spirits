import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Angel } from '../assets/images/index';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const containerRef = React.useRef(null);

  useGSAP(() => {
    const navItems = containerRef.current.querySelectorAll('.nav-item');
    const logo = containerRef.current.querySelector('.nav-logo');

    // Timeline para coordinar mejor las animaciones
    const tl = gsap.timeline({
      defaults: {
        ease: 'power3.out'
      }
    });

    // Animación del contenedor principal
    tl.fromTo(containerRef.current,
      { 
        y: -100,
        opacity: 0 
      },
      { 
        y: 0,
        opacity: 1,
        duration: 1.2
      }
    );

    // Animación del logo
    tl.fromTo(logo,
      { 
        scale: 0.8,
        opacity: 0 
      },
      { 
        scale: 1,
        opacity: 1,
        duration: 0.8
      },
      "-=0.8" // Superposición con la animación anterior
    );

    // Animación de los items del menú
    tl.fromTo(navItems,
      { 
        y: 30,
        opacity: 0 
      },
      { 
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: {
          amount: 0.4,
          ease: "power2.out"
        }
      },
      "-=0.4"
    );

  }, { scope: containerRef }); // Scope the animations to the container

  return (
    <nav 
      ref={containerRef}
      className="relative top-0 left-0 right-0 flex items-center justify-around bg-transparent p-4 z-50"
    >
      <div className="flex items-center">
        <Link to="/" className="nav-logo transform transition-transform hover:scale-105 duration-300">
          <img 
            src={Angel} 
            alt="logo" 
            width={110}
            className="drop-shadow-lg"
          />
        </Link>
      </div>
      
      <div className="flex items-center">
        <ul className="flex space-x-12 text-white text-lg font-[Rye]">
          {['Home', 'About', 'Contact'].map((item) => (
            <li 
              key={item}
              className="nav-item hover:text-gray-300 cursor-pointer transition-all duration-300 relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;