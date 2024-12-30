import React from 'react';
import ContactForm from '../components/ContactForm';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from '../components/Footer';

AOS.init({
  duration: 1000,
  easing: 'ease-out',
  once: true,
});

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center py-20 lg:px-8">
      {/* Hero Section */}
      <div className="w-full max-w-4xl text-center mb-12">
        <h1
          className="text-5xl lg:text-6xl font-serif font-bold text-[#f0d85e] mb-6"
          data-aos="fade-down"
        >
          Get in Touch with Angel Crafted Spirits
        </h1>
        <p
          className="text-xl lg:text-2xl font-light text-white max-w-3xl mx-auto"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          Have questions or want to book our premium bartender services in Los Angeles? 
          Drop us a message, and we'll get back to you shortly.
        </p>
      </div>

      {/* Contact Form and Information Container */}
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10">
        {/* Contact Form */}
        <div
          className="bg-gray-900/70 p-8 rounded-xl border border-[#f0d85e]/20 shadow-2xl"
          data-aos="fade-right"
        >
          <h2 className="text-3xl font-serif text-[#f0d85e] mb-8 text-center">Send Us a Message</h2>
          <ContactForm />
        </div>

        {/* Contact Information and Map */}
        <div 
          className="bg-gray-900/70 justify-center items-center p-8 rounded-xl border border-[#f0d85e]/20 shadow-2xl flex flex-col space-y-8"
          data-aos="fade-left"
        >
          {/* Google Maps Embed */}
          <div className='w-full'>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.27404345!2d-118.69192993092697!3d34.02016130653294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7b85dea2a93%3A0x1ff47c3ceb7bb2d5!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1702844876688!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{border:0}}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif text-[#f0d85e] text-center">Contact Details</h2>
            
            <div className="grid gap-4">
              {[
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#f0d85e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  text: "891 E 43rd Pl, Los Angeles, CA 90011, EE. UU."
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#f0d85e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  text: "(323) 708-1984"
                },
                {
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#f0d85e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  text: "contact@angelcraftedspirits.com"
                }
              ].map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-4 bg-black/30 p-4 rounded-lg hover:bg-black/50 transition duration-300"
                >
                  {item.icon}
                  <span className="text-base lg:text-lg">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;