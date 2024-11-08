import React, { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, Preload } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BottleJack from '../models3D/BottleJack';
import Martini from '../models3D/Martini';

gsap.registerPlugin(ScrollTrigger);

const SECTION_ID = 'bottles-section';

const Bottles = ({ sectionId, ...props }) => {
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const containerRef = useRef(null);
  const wrapperRef = useRef(null);

  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 1024;
  };

  useEffect(() => {
    if (!isMobileDevice()) {
      const wrapperElement = wrapperRef.current;
      const handleTouchStart = (e) => {
        e.preventDefault();
      };

      const handleTouchMove = (e) => {
        e.preventDefault();
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollTop === 0 || scrollTop + clientHeight >= scrollHeight) {
          e.currentTarget.scrollTop += e.changedTouches[0].clientY - e.touches[0].clientY;
        }
      };

      const handleTouchEnd = (e) => {
        e.preventDefault();
      };

      wrapperElement.addEventListener('touchstart', handleTouchStart);
      wrapperElement.addEventListener('touchmove', handleTouchMove);
      wrapperElement.addEventListener('touchend', handleTouchEnd);

      return () => {
        wrapperElement.removeEventListener('touchstart', handleTouchStart);
        wrapperElement.removeEventListener('touchmove', handleTouchMove);
        wrapperElement.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, []);

  useGSAP(() => {
    const mobile = isMobileDevice();
    
    if (mobile) {
      return;
    }

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=300%",
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              background: `linear-gradient(to bottom, #2929290%, #141414 33%, #050404 66%, #000000 100%)`,
              duration: 0.1,
              overwrite: true
            });
          }
        }
      }
    });

    mainTl
      .fromTo(section1Ref.current,
        { x: 0, opacity: 0, scale: 0.9 },
        { x: 300, opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
      )
      .to(section1Ref.current,
        { opacity: 0, x: 100, scale: 0.9, duration: 1, ease: "power2.in" },
        "+=1.5"
      )
      .fromTo(section2Ref.current,
        { x: 0, opacity: 0, scale: 0.9 },
        { x: 200, opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
        "-=0.5"
      )
      .to(section2Ref.current,
        { opacity: 0, x: 50, scale: 0.9, duration: 1, ease: "power2.in" },
        "+=1.5"
      )
      .fromTo(section3Ref.current,
        { y: 50, opacity: 0, scale: 0.9 },
        { y: 100, opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" },
        "-=0.5"
      )
      .to(section3Ref.current,
        { opacity: 0, y: -50, scale: 0.9, duration: 1, ease: "power2.in" },
        "+=1.5"
      );

    const cleanup = () => {
      mainTl.kill();
    };

    window.addEventListener('resize', cleanup);
    return () => {
      window.removeEventListener('resize', cleanup);
      cleanup();
    };
  }, []);

  // Versión móvil con secciones estáticas
  if (isMobileDevice()) {
    return (
      <div className="relative w-full min-h-screen">
        <div className="h-screen relative">
          {/* Canvas container for mobile */}
          <div className="w-full h-full absolute top-0 left-0">
            <Canvas
              className="w-full h-full"
              camera={{ position: [0, 5, 10], fov: 50 }}
            >
              <ambientLight intensity={5} />
              <directionalLight position={[10, -10, 0]} intensity={20} />
              <Martini scale={0.3}  position={[0, 1, 0]} sectionId={SECTION_ID} />
              <OrbitControls
              autoRotate={true}
              autoRotateSpeed={10}
      
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3}
              />
              <Preload />
            </Canvas>
          </div>
          
          {/* Title overlay */}
          <div className="absolute top-1/2 left-0-full h-[200px] p-6 text-center bg-black/10 backdrop-blur-md rounded-lg ">
            <h1 className="text-4xl font-bold text- text-[#e1c340] font-serif">
              Best cocktail bartender in Los Angeles
            </h1>
          </div>
        </div>

        {/* Content sections */}
        <div className="w-full px-4 py-8 space-y-8 bg-gradient-to-b from-[#292929] to-black">
          <div className="max-w-md mx-auto p-6 bg-black/10 backdrop-blur-md rounded-lg">
            <h2 className="text-3xl font-serif text-[#e1c340] font-bold mb-4">Event Bartending</h2>
            <p className="text-xl font-bold">Our event bartending service brings skilled bartenders and quality cocktails to weddings, corporate events, and private parties.</p>
          </div>
          
          <div className="max-w-md mx-auto p-6 bg-black/10 backdrop-blur-md rounded-lg">
            <h2 className="text-3xl font-serif text-[#e1c340] font-bold mb-4">Cocktail Catering</h2>
            <p className="text-xl font-bold">Our cocktail catering service provides tailored drink menus for weddings, parties, and corporate gatherings.</p>
          </div>
          
          <div className="max-w-md mx-auto p-6 bg-black/10 backdrop-blur-md rounded-lg">
            <h2 className="text-3xl font-serif text-[#e1c340] font-bold mb-4">Private Bartender Services</h2>
            <p className="text-xl font-bold">Hire our private bartender services for an exclusive, personalized bar experience at your home or private event.</p>
          </div>
        </div>
      </div>
    );
  }

  // Versión desktop con animaciones
  return (
    <div ref={wrapperRef} className="relative w-full h-screen">
      <section id={SECTION_ID} className="relative min-h-screen">
        <div ref={containerRef} className="w-screen h-screen fixed top-0 left-0 bg-[#292929]" style={{
          background: 'linear-gradient(to bottom, #292929 0%, #141414 33%, #050404 66%, #000000 100%)'
        }}>
          <div className='p-10 absolute top-0 left-0 w-full h-full'>
            <h1 className='lg:text-6xl md:text-5xl text-3xl font-bold text-[#e1c340] font-serif text-center sm:text-5xl'>
              Best cocktail bartender in Los Angeles
            </h1>
          </div>
          <div className="w-full h-full absolute top-0 z-1 left-0">
            <Canvas 
              className='w-full h-full'
              camera={{ position: [0, 0, 10], fov: 50 }}
            >
              <ambientLight intensity={10} />
              <directionalLight position={[10, 20, 20]} intensity={20} />
              <BottleJack position={[0, -3.5, 0]} sectionId={SECTION_ID} />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3}
              />
              <Preload />
            </Canvas>
          </div>
        </div>
        <div className="absolute w-full h-full top-0 left-0 pointer-events-none">
          <div
            ref={section1Ref}
            className="section1 absolute opacity-0 max-w-md p-6 bg-black/10 backdrop-blur-md rounded-lg
              md:right-8 md:top-1/4
              top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0"
          >
            <h2 className="text-3xl font-serif md:text-4xl font-bold text-[#e1c340] mb-4">Event Bartending</h2>
            <p className="text-xl font-bold md:text-xl">Our event bartending service brings skilled bartenders and quality cocktails to weddings, corporate events, and private parties.</p>
          </div>

          <div
            ref={section2Ref}
            className="section2 absolute opacity-0 max-w-md p-6 bg-black/10 backdrop-blur-md rounded-lg
              md:left-8 md:top-1/3
              top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:translate-x-0 md:translate-y-0"
          >
            <h2 className="text-3xl font-serif md:text-4xl text-[#e1c340] font-bold mb-4">Cocktail Catering</h2>
            <p className="text-xl font-bold md:text-xl">Our cocktail catering service provides tailored drink menus for weddings, parties, and corporate gatherings.</p>
          </div>

          <div
            ref={section3Ref}
            className="section3 absolute opacity-0 max-w-md p-6 bg-black/10 backdrop-blur-md rounded-lg
              md:left-1/2 md:-translate-x-1/2 md:top-1/4
              top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <h2 className="text-3xl font-serif md:text-4xl text-[#e1c340] font-bold mb-4">Private Bartender Services</h2>
            <p className="text-xl font-bold md:text-xl">Hire our private bartender services for an exclusive, personalized bar experience at your home or private event.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bottles;