import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Satyr from '../models3D/Satyr';
import { heroVideo } from '../assets/images';

const VideoHero = ({ onLoadComplete }) => {
  const heroRef = useRef(null);
  const ctaRef = useRef(null);
  const flameRef = useRef(null);
  const canvasRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);

  // Memoized Satyr model
  const satyrModel = useMemo(() => (
    <Satyr
      position={[0, -9.5, -1]}
      scale={6.7}
      onReady={() => {
        console.log('Satyr model is ready');
        setIsLoaded(true);
        if (onLoadComplete) onLoadComplete();
      }}
    />
  ), [onLoadComplete]);

  // Video loaded callback
  useEffect(() => {
    const video = flameRef.current;
    if (video) {
      video.preload = 'auto';
      video.onloadeddata = () => {
        console.log('Video is ready');
        setIsLoaded(true);
        if (onLoadComplete) onLoadComplete();
      };
    }
  }, [onLoadComplete]);

  // GSAP animations
  useEffect(() => {
    if (isLoaded) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();

        if (flameRef.current) {
          tl.fromTo(
            flameRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: 'power1.in' }
          );
        }

        if (heroRef.current) {
          tl.fromTo(
            heroRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: 'power1.inOut' }
          );
        }

        if (ctaRef.current) {
          tl.fromTo(
            ctaRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: 'power1.out' }
          );
        }

        if (canvasRef.current) {
          tl.fromTo(
            canvasRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: 'power2.in' },
            '-=0.5'
          );
        }
      });

      return () => ctx.revert();
    }
  }, [isLoaded]);

  return (
    <div className="relative h-screen w-full">
      <div className="h-full w-full flex flex-col items-center justify-center relative z-10">
        <div className="flex items-center justify-center w-full h-full">
          {/* Hero Text */}
          <div ref={heroRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 opacity-0 -translate-y-1/2 z-20">
            <p className="text-white text-center text-4xl md:text-5xl font-bold font-[Rye]">
              Elevating Spirits, <br /> Crafting Experience
            </p>
          </div>

          {/* 3D Model */}
          <div ref={canvasRef} className="absolute w-full h-full top-0 opacity-0 flex items-center justify-center">
            <Canvas className="w-full h-full z-10">
              <ambientLight intensity={2} />
              <directionalLight position={[50, -10, 10]} intensity={2} />
              {satyrModel}
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                autoRotate
                autoRotateSpeed={0.1}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </div>
        </div>

        {/* Call-to-Action */}
        {isLoaded && (
          <div
            ref={ctaRef}
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex opacity-0 flex-col items-center z-10"
          >
            <a href="/contact" className="btn mb-4">
              Contact
            </a>
            <p className="font-normal text-xl">Make a Reservation</p>
          </div>
        )}
      </div>

      {/* Background Video */}
      <video
        ref={flameRef}
        autoPlay
        muted
        preload="auto"
        loop
        playsInline
        className="absolute top-0 right-0 w-full h-full object-cover z-0 opacity-0 transition-opacity duration-500"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoHero;
