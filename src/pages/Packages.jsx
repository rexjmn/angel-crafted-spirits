import React from 'react';
import lila from '../assets/images/lila-mitchell.jpg';
import Footer from '../components/Footer';
import Aos from 'aos';


Aos.init({
  duration: 1000, // Animation duration
  easing: 'ease-out', // Easing function
  once: true, // Animation happens only once
 
});

function Packages() {
  return (
    <div className="min-h-screen flex flex-col items-center pt-32 justify-center bg-black text-white">
      {/* Page Title */}
      <div className="text-center mb-8">

  
      </div>

      <div
        className="w-[800px] h-[700px] rounded-lg shadow-lg relative left-[30%] transform -translate-x-[40%] "
        style={{
          backgroundImage: `url(${lila})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          alt: 'bartender',
        }}
        data-aos="fade"
      >

      </div>

      {/* <div
  className="my-12 p-8 relative top-[-250px] left-[-350px] z-10  text-center bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-lg flex flex-wrap items-center justify-center rounded-xl shadow-2xl max-w-3xl mx-auto"
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
</div> */}

<div className="absolute top-[50%] left-[20%] transform -translate-x-1/2 "
 data-aos="fade-down"
 >
            <p className="text-white text-center text-4xl md:text-5xl font-bold font-[Rye]">
              COMING <br /> SOON...
            </p>
          </div>

      <Footer />

    </div>
  );
}

export default Packages;
