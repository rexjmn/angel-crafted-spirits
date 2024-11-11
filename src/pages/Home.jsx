import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoHero from '../components/VideoHero';
import HighLights from '../components/HighLights';
import Bottles from '../components/Bottles';
import ErrorBoundary from '../components/ErrorBoundary';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    // Animación para la sección de bartender services
    gsap.fromTo(
      '#bartender-section',
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#bartender-section',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animación del título y párrafo dentro de la sección
    gsap.fromTo(
      '#bartender-section h2',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#bartender-section',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      '#bartender-section p',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#bartender-section',
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <div>
      <VideoHero />
      <div
        id="bartender-section"
        className="my-12 p-6 text-center bg-black/30 backdrop-blur-md rounded-lg shadow-lg max-w-3xl mx-auto"
        style={{
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        <h2 className="text-3xl font-serif font-bold text-[#e1c340] mb-4">
          Private Bartender Services in Los Angeles: Angel Crafted Spirits
        </h2>
        <p className="text-lg md:text-xl text-white font-light leading-relaxed">
          At <strong>Angel Crafted Spirits</strong>, we specialize in providing
          exceptional <strong>private bartender services</strong> throughout{' '}
          <strong>Los Angeles</strong>. Our team of{' '}
          <strong>professional mixologists</strong> is dedicated to crafting
          bespoke cocktails tailored to your event's unique theme and your
          personal preferences. Whether you're hosting an intimate gathering, a
          corporate event, or a grand celebration, our commitment to excellence
          ensures a memorable experience for you and your guests. Experience the
          art of <strong>craft cocktails</strong> and elevate your event with
          our unparalleled <strong>bartending services</strong>.
        </p>
      </div>
      <HighLights />
      <ErrorBoundary>
        <Bottles />
      </ErrorBoundary>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
