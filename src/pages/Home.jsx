import React, { useEffect, useRef, useState, Suspense } from 'react';
import VideoHero from '../components/VideoHero';
import HighLights from '../components/HighLights';
import Bottles from '../components/Bottles';
import ErrorBoundary from '../components/ErrorBoundary';
import joseph from '../assets/images/joseph-yip.jpg';
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
  className="my-12 p-8 text-center bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-lg flex flex-wrap items-center justify-center rounded-xl shadow-2xl max-w-3xl mx-auto"
  style={{
    boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  }}
  data-aos="fade-up"
>
  <h2
    className="text-4xl font-serif font-bold text-[#f0d85e] mb-6"
    data-aos="fade-up"
    data-aos-delay="200"
  >
    Private Bartender Services in Los Angeles
  </h2>
  <p
    className="text-lg md:text-xl text-white font-light leading-relaxed px-4"
    data-aos="fade-up"
    data-aos-delay="400"
  >
    At <strong className="text-[#f0d85e]">Angel Crafted Spirits</strong>, we specialize in
    exceptional <strong>private bartender services</strong> throughout{' '}
    <strong>Los Angeles</strong>. Our team of professional mixologists crafts bespoke
    cocktails tailored to your event's unique theme. Experience the art of{' '}
    <strong>craft cocktails</strong> and elevate your celebration with our
    unparalleled <strong>bartending services</strong>.
  </p>

  <button
    className="mt-8 px-6 py-2 text-lg bg-[#f0d85e] text-black rounded-full shadow-md hover:bg-[#e1c340] hover:shadow-xl transition duration-300"
  >
    Contact Us
  </button>
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