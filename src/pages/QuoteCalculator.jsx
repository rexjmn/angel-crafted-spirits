import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Footer from '../components/Footer';
import heroEvents from '../assets/images/heroEvents.mp4';

const QuoteCalculator = () => {
  const [formData, setFormData] = useState({
    guests: '10',
    cocktailsPerPerson: '2',
    packageType: '',
    email: '',
    phone: '',
    date: ''
  });

  const packages = [
    "Legendary Classic Cocktail Experience",
    "Innovative Craft Cocktail Journey",
    "Ultimate VIP Cocktail Extravaganza"
  ];

  const guestOptions = Array.from({ length: 49 }, (_, i) => (i * 5) + 10);
  const cocktailOptions = Array.from({ length: 9 }, (_, i) => i + 2);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendQuoteEmail = (formData) => {
    emailjs
      .send(
        'service_v093lm4', // Your EmailJS service ID
        'template_ctqkgcq', // Your EmailJS template ID
        {
          ...formData,
          message: `New event quote request: \nGuests: ${formData.guests}\nCocktails per person: ${formData.cocktailsPerPerson}\nPackage: ${formData.packageType}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nEvent Date: ${formData.date}`
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY // Your EmailJS public key from .env
      )
      .then(
        (result) => {
          console.log('Quote email sent successfully:', result.text);
        },
        (error) => {
          console.error('Error sending quote email:', error.text);
        }
      );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendQuoteEmail(formData);
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900  to-black min-h-screen">
      <section className="relative h-[500px] overflow-hidden">
        <video
          src={heroEvents}
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
          <div className="text-center px-4 py-44 max-w-3xl">
            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-[#f0d85e] mb-6 drop-shadow-lg">
              Event Quote Calculator
            </h1>
            <p className="text-xl lg:text-2xl text-white font-light mb-8 drop-shadow-md">
              Plan your ideal cocktail event with personalized quotes tailored to your needs. Serving Los Angeles and beyond.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <section className="bg-gray-900/70 rounded-xl border border-[#f0d85e]/20 shadow-2xl p-8 max-w-4xl mx-auto transform hover:scale-[1.01] transition-transform duration-300">
          <h2 className="text-3xl font-serif text-[#f0d85e] text-center mb-10">
            Customize Your Event
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="group">
                <label htmlFor="guests" className="block text-[#f0d85e] mb-2 group-hover:text-white transition-colors">
                  Number of Guests
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-[#f0d85e]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f0d85e] hover:border-[#f0d85e] transition-all"
                  required
                >
                  {guestOptions.map(num => (
                    <option key={num} value={num}>{num} guests</option>
                  ))}
                </select>
              </div>

              <div className="group">
                <label htmlFor="cocktailsPerPerson" className="block text-[#f0d85e] mb-2 group-hover:text-white transition-colors">
                  Cocktails per Person
                </label>
                <select
                  id="cocktailsPerPerson"
                  name="cocktailsPerPerson"
                  value={formData.cocktailsPerPerson}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-[#f0d85e]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f0d85e] hover:border-[#f0d85e] transition-all"
                  required
                >
                  {cocktailOptions.map(num => (
                    <option key={num} value={num}>{num} cocktails</option>
                  ))}
                </select>
              </div>

              <div className="group">
                <label htmlFor="packageType" className="block text-[#f0d85e] mb-2 group-hover:text-white transition-colors">
                  Select Package
                </label>
                <select
                  id="packageType"
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-[#f0d85e]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f0d85e] hover:border-[#f0d85e] transition-all"
                  required
                >
                  <option value="">Select a package</option>
                  {packages.map((pkg) => (
                    <option key={pkg} value={pkg}>{pkg}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-6">
              <div className="group">
                <label htmlFor="date" className="block text-[#f0d85e] mb-2 group-hover:text-white transition-colors">
                  Event Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-gray-800 border border-[#f0d85e]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f0d85e] hover:border-[#f0d85e] transition-all"
                  required
                />
              </div>

              <div className="group">
                <label htmlFor="email" className="block text-[#f0d85e] mb-2 group-hover:text-white transition-colors">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-[#f0d85e]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f0d85e] hover:border-[#f0d85e] transition-all"
                  required
                />
              </div>

              <div className="group">
                <label htmlFor="phone" className="block text-[#f0d85e] mb-2 group-hover:text-white transition-colors">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-800 border border-[#f0d85e]/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#f0d85e] hover:border-[#f0d85e] transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="col-span-1 md:col-span-2 w-full bg-[#f0d85e] text-black px-8 py-4 rounded-lg text-lg font-bold hover:bg-[#d1a830] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Quote
            </button>
          </form>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default QuoteCalculator;
