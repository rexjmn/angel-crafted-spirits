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

  const [videoReady, setVideoReady] = useState(false);
  const [modelReady, setModelReady] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const satyrModel = useMemo(
    () => <Satyr position={[0, -9.5, -1]} scale={6.7} onReady={() => setModelReady(true)} />,
    []
  );

  useEffect(() => {
    const video = flameRef.current;
    if (video) {
      video.onloadeddata = () => setVideoReady(true);
    }
  }, []);

  useEffect(() => {
    if (videoReady && modelReady) {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline();
        tl.fromTo(
          flameRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 1.5, ease: 'power1.inOut' }
        )
          .fromTo(
            heroRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: 'power1.inOut' }
          )
          .fromTo(
            ctaRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power1.out' },
            '-=0.5'
          )
          .fromTo(
            canvasRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5, ease: 'power2.in' },
            '-=1'
          );
      }, [heroRef, ctaRef, flameRef, canvasRef]); // Context dependencies for better scoping

      setIsLoaded(true);
      if (onLoadComplete) onLoadComplete();
      return () => ctx.revert();
    }
  }, [videoReady, modelReady, onLoadComplete]);

  return (
    <div className={`relative h-screen w-full ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}>
      <div className="h-full w-full flex flex-col items-center justify-center relative z-10">
        <div className="flex items-center justify-center w-full h-full">
          <div ref={heroRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 opacity-0 -translate-y-1/2 z-20">
            <p className="text-white text-center text-5xl font-bold font-[Rye]">
              Elevating Spirits, <br /> Crafting Experience
            </p>
          </div>

          <div ref={canvasRef} className="absolute w-full h-full top-0 opacity-0 flex items-center justify-center">
            <Canvas className="w-full h-full z-10" onCreated={() => setModelReady(true)}>
              <ambientLight intensity={2} />
              <directionalLight position={[100, -50, 5]} intensity={20} />
              {satyrModel}
              <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.5} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 2} />
            </Canvas>
          </div>
        </div>

        {isLoaded && (
          <div ref={ctaRef} className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-10">
            <a href="#highlights" className="btn mb-4">
              Contact
            </a>
            <p className="font-normal text-xl">Make a Reservation</p>
          </div>
        )}
      </div>

      <video ref={flameRef} autoPlay muted loop playsInline className="absolute top-0 right-0 w-full h-full object-cover z-0 opacity-0 transition-opacity duration-700">
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoHero;
