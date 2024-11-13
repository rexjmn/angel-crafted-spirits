import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import Martini from '../models3D/Martini';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BottlesMobile = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    // Seleccionamos los elementos de contenido y los convertimos en un array
    const contentSections = Array.from(contentRef.current.querySelectorAll('.content-section'));

    // GSAP animation para cada sección de contenido
    const animations = contentSections.map((section, index) =>
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
            start: 'top 95%',
            end: 'bottom top',
            scrub: true,
          },
        }
      )
    );

    // Cleanup de animaciones y ScrollTrigger cuando se desmonta el componente
    return () => {
      animations.forEach(animation => animation.kill());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      <div className="h-[60vh] bg-[#333333] ">
        {/* Encabezado */}
        <div className="absolute  top-[19%] left-1/2 bg-black/50 backdrop-blur-md rounded-lg z-10 transform w-[90%] -translate-x-1/2 text-center p-4">
          <h1 className="text-2xl font-bold text-[#e1c340] font-serif shadow-md">
            Discover Los Angeles' Finest Bartending Experience
          </h1>
        </div>
        
        {/* Escena 3D */}
        <div className="w-full h-[60vh] absolute top-0 left-0  bg-gradient-to-b from-[#333333] via-[#1a1a1a] to-[#111111]">
          <Canvas 
            className="w-full h-full"
            camera={{ position: [0, 2, 10], fov: 50 }}
          >
            <ambientLight intensity={2} />
            <directionalLight position={[10, 20, 20]} intensity={10} />
            <Martini scale={35}  position={[0, -3.5, 0]} />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={2}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 3}
            />
            <Preload all />
          </Canvas>
        </div>
  
      </div>

      {/* Secciones de Contenido */}
      <div ref={contentRef} className="w-full h-full px-4 py-8 space-y-8 bg-gradient-to-b from-[#111111] via-[#1a1a1a] to-black">
        {["Event Bartending", "Cocktail Catering", "Private Bartender Services"].map((title, index) => (
          <div key={index} className="content-section max-w-sm mx-auto p-4 bg-black/20 backdrop-blur-md rounded-lg">
            <h2 className="text-2xl font-serif text-[#e1c340] font-semibold mb-3">{title}</h2>
            <p className="text-lg font-medium">
              {index === 0 && "Our event bartending service brings skilled bartenders and quality cocktails to weddings, corporate events, and private parties."}
              {index === 1 && "Our cocktail catering service provides tailored drink menus for weddings, parties, and corporate gatherings."}
              {index === 2 && "Hire our private bartender services for an exclusive, personalized bar experience at your home or private event."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottlesMobile;
