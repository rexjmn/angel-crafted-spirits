import gsap from 'gsap';
import React, { useState, useLayoutEffect } from 'react';
import { heroVideo, smallHeroVideo } from '../assets/images';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Satyr from '../models3D/Satyr';



const VideoHero = () => {
  const [videoSrc, setVideoSrc] = useState(heroVideo);

  useLayoutEffect(() => {
    const handleResize = () => {
      setVideoSrc(window.innerWidth < 768 ? smallHeroVideo : heroVideo);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial video source

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    gsap.fromTo('#hero',
      {
        opacity: 0,
      },
      {
        opacity: 1,    // Fade to opacity 1
        delay: 2,    // Delay before starting the fade-in
        duration: 1,   // Duration of the fade-in
        ease: 'power1.inOut'
      }
    );

    gsap.fromTo('#cta',
      {
       y: 50,
        opacity: 0,
      },
      {
        opacity: 1,
        y: -50,
        delay: 2
      });
    gsap.fromTo('#flame',
      {
        opacity: 0,
      },
      {
        opacity: 1,    // Fade to opacity 1
        delay: 0.5,    // Delay before starting the fade-in
        duration: 1.5,   // Duration of the fade-in
        ease: 'power1.inOut'
      }
    );
    gsap.fromTo('#canvas',
      {
        opacity: 0,

      },
      {
        opacity: 1, 
        delay: 0.5,
        duration: 0.5,   // Fade to opacity 1
         ease: 'power2.in'

      }
    );
  }, []);

  return (
<div className="relative h-screen w-full">
  <div className="h-full  w-full flex flex-col items-center justify-center relative  z-10">
    <div className="flex items-center justify-center w-full h-full">
      {/* Contenedor del texto */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2 z-20">
        <p id="hero" className="text-white text-center text-5xl font-bold font-[Rye]">
          Elevating Spirits, <br /> Crafting Experience
        </p>
      </div>

      {/* Contenedor del Canvas */}
      <div id='canvas' className=" absolute w-full h-full top-0 flex items-center justify-center">
        <Canvas className="  w-full h-full z-10">
          <ambientLight intensity={4} />
          <directionalLight position={[100, -50, 5]} intensity={20} />
          <Satyr position={[0, -9.5, -1]} scale={6.7} /> {/* Aumentamos la escala */}
          <OrbitControls enableZoom={false} autoRotate={true} autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 2} // Límite superior de rotación vertical
          minPolarAngle={Math.PI / 2} />
        </Canvas>
      </div>
    </div>

    {/* CTA centrado en el medio */}
    <div id="cta" className="absolute bottom-16 left-1/2  transform -translate-x-1/2 flex flex-col items-center z-10">
      <a href="#hightlights" className="btn mb-4">Contact</a>
      <p className="font-normal text-xl">Make a Reservation</p>
    </div>
  </div>

  {/* Video de fondo */}
  <video
    id="flame"
    autoPlay
    muted
    loop
    playsInline
    className="absolute top-0 right-0 w-full h-full object-cover z-0"
  >
    <source src={videoSrc} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>
  );
};

export default VideoHero;
