import React from 'react';
import ContactForm from '../components/ContactForm';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../components/Footer';

AOS.init({
  duration: 1000, // Animation duration
  easing: 'ease-out', // Easing function
  once: true, // Animation happens only once

});
const Contact = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center pt-44  lg:px-8">
      {/* Hero Section */}
      <div className="w-full max-w-3xl text-center mb-10">
        <h1
          className="text-4xl lg:text-5xl font-serif font-bold text-[#f0d85e] mb-4"
          data-aos="fade-down"
        >
          Get in Touch with Angel Crafted Spirits
        </h1>
        <p
          className="text-lg lg:text-xl font-light text-white"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          Have questions or want to book our premium bartender services in Los Angeles? 
          Drop us a message, and we’ll get back to you shortly.
        </p>
      </div>

      {/* Contact Form */}
      <div
        className="w-full max-w-4xl bg-gray-900/90 p-2 rounded-lg"
        data-aos="fade-up"
      >
        <ContactForm />
      </div>
      <div className="w-full">
      <Footer />

      </div>
    </div>
  );
};

export default Contact;