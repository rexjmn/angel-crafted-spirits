import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { rightImg, watchImg } from '../assets/images';
import VideoCarousel from './VideoCarousel';

gsap.registerPlugin(ScrollTrigger);

const HighLights = () => {
  const titleRef = useRef(null);
  const linkRefs = useRef([]);
  const videoCarouselRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animación del título
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animación de los enlaces
      gsap.fromTo(
        linkRefs.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
          stagger: 0.3,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Animación de VideoCarousel
      gsap.fromTo(
        videoCarouselRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: videoCarouselRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Limpiar las animaciones al desmontar
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="highlights"
      className="w-screen overflow-hidden h-full py-12 bg-gradient-to-b from-[#111111] via-[#1a1a1a] to-[#333333]"
    >
      <div className="screen-max-width mx-auto px-6">
        <div className="mb-12 w-full flex flex-col md:flex-row items-center justify-between">
          <h1
            ref={titleRef}
            className="section-heading text-[#f5f5f5] font-serif text-4xl md:text-5xl font-bold tracking-wide mb-6 md:mb-0"
          >
            Get the Highlights
          </h1>

          <div className="flex flex-wrap items-center gap-5">
            <p
              ref={(el) => (linkRefs.current[0] = el)}
              className="link text-[#c0a36e] flex items-center text-lg md:text-xl font-medium cursor-pointer transition-opacity duration-300 hover:opacity-80"
            >
              Watch the Film
              <img src={watchImg} alt="watch" className="ml-2 w-6 h-6" />
            </p>
            <p
              ref={(el) => (linkRefs.current[1] = el)}
              className="link text-[#c0a36e] flex items-center text-lg md:text-xl font-medium cursor-pointer transition-opacity duration-300 hover:opacity-80"
            >
              Watch the Event
              <img src={rightImg} alt="right" className="ml-2 w-6 h-6" />
            </p>
          </div>
        </div>

        {/* Contenedor de VideoCarousel con referencia */}
        <div ref={videoCarouselRef}>
          <VideoCarousel />
        </div>
      </div>
    </section>
  );
};

export default HighLights;
