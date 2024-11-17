import React, { useEffect, useRef, useState, Suspense } from 'react';
import VideoHero from '../components/VideoHero';
import HighLights from '../components/HighLights';
import Bottles from '../components/Bottles';
import ErrorBoundary from '../components/ErrorBoundary';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  const [isVideoHeroLoaded, setIsVideoHeroLoaded] = useState(false);

  useEffect(() => {
    console.log('isVideoHeroLoaded:', isVideoHeroLoaded);
    if (isVideoHeroLoaded) {
      console.log('Video hero loaded, initializing AOS...');
      AOS.init({
        duration: 1000, // Animation duration
        easing: 'ease-out', // Easing function
        once: true, // Animation happens only once
        offset: 200, // Trigger point from the top of the viewport
      });
    }
  }, [isVideoHeroLoaded]);

  return (
    <div>
      {/* Show loader until VideoHero is loaded */}
      {!isVideoHeroLoaded && <Loader />}
      {console.log('Rendering VideoHero')}
      
      {/* Video Hero Section */}
      <VideoHero onLoadComplete={() => setIsVideoHeroLoaded(true)} />

      {/* Main Content */}
      {isVideoHeroLoaded && (
        <>
          {console.log('Rendering Main Content')}
          {/* Bartender Section */}
          <div
            className="my-12 p-6 text-center bg-black/30 backdrop-blur-md rounded-lg shadow-lg max-w-3xl mx-auto"
            style={{
              boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
            data-aos="fade-up"
          >
            <h2
              className="text-3xl font-serif font-bold text-[#e1c340] mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Private Bartender Services in Los Angeles: Angel Crafted Spirits
            </h2>
            <p
              className="text-lg md:text-xl text-white font-light leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="400"
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

          {/* Highlights Section */}
          <Suspense fallback={<Loader />}>
            <HighLights />
          </Suspense>

          {/* Bottles Section */}
          <Suspense fallback={<Loader />}>
            <ErrorBoundary>
              <Bottles />
            </ErrorBoundary>
          </Suspense>

          {/* Newsletter and Footer */}
          <Newsletter />
          <Footer />
        </>
      )}
    </div>
  );
};

export default Home;
