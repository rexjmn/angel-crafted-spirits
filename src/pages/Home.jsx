import React, { useEffect, useRef, useState, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import VideoHero from '../components/VideoHero';
import HighLights from '../components/HighLights';
import Bottles from '../components/Bottles';
import ErrorBoundary from '../components/ErrorBoundary';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [isVideoHeroLoaded, setIsVideoHeroLoaded] = useState(false);
  const bartenderSectionRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    if (isVideoHeroLoaded) {
      console.log("Video hero loaded, starting animations...");

      // Agregar un ligero retraso para asegurar que los elementos estén en el DOM
      setTimeout(() => {
        // Verificación de referencias en el DOM
        console.log("bartenderSectionRef:", bartenderSectionRef.current);
        console.log("titleRef:", titleRef.current);
        console.log("paragraphRef:", paragraphRef.current);

        // Animación para bartenderSectionRef
        if (bartenderSectionRef.current) {
          gsap.fromTo(
            bartenderSectionRef.current,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1.5,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: bartenderSectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        } else {
          console.warn("bartenderSectionRef no está presente en el DOM");
        }

        // Animación para titleRef
        if (titleRef.current) {
          gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: bartenderSectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        } else {
          console.warn("titleRef no está presente en el DOM");
        }

        // Animación para paragraphRef
        if (paragraphRef.current) {
          gsap.fromTo(
            paragraphRef.current,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: bartenderSectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        } else {
          console.warn("paragraphRef no está presente en el DOM");
        }
      }, 100);  // Un pequeño retraso de 100 ms para asegurar el renderizado completo
    }
  }, [isVideoHeroLoaded]);

  return (
    <div>
      {!isVideoHeroLoaded && <Loader />}

      <VideoHero onLoadComplete={() => setIsVideoHeroLoaded(true)} />

      {isVideoHeroLoaded && (
        <>
          <div
            ref={bartenderSectionRef}
            className="my-12 p-6 text-center bg-black/30 backdrop-blur-md rounded-lg shadow-lg max-w-3xl mx-auto"
            style={{
              boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            <h2
              ref={titleRef}
              className="text-3xl font-serif font-bold text-[#e1c340] mb-4"
            >
              Private Bartender Services in Los Angeles: Angel Crafted Spirits
            </h2>
            <p
              ref={paragraphRef}
              className="text-lg md:text-xl text-white font-light leading-relaxed"
            >
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

          <Suspense fallback={<Loader />}>
            <HighLights />
          </Suspense>

          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              <Bottles />
            </ErrorBoundary>
          </Suspense>

          <Newsletter />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
