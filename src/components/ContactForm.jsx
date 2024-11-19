import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        alert('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row h-screen p-6 lg:p-10 bg-gradient-to-r from-black via-gray-900 to-black text-white"
      style={{
        boxShadow: '0px 15px 40px rgba(0, 0, 0, 0.6)',
      }}
    >
      <div className="lg:w-full flex flex-col justify-center items-start space-y-8 max-w-3xl mx-auto">
        <h1
          className="text-5xl font-serif font-bold text-[#f0d85e] mb-4"
          data-aos="fade-up"
        >
          Contact Angel Crafted Spirits
        </h1>
        <h2
          className="text-2xl font-medium text-white"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Get in touch with us!
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6 w-full"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-[#f0d85e] bg-black text-white rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#f0d85e] transition"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email Address"
            value={formData.email}
            onChange={handleChange}
            className="border border-[#f0d85e] bg-black text-white rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#f0d85e] transition"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="border border-[#f0d85e] bg-black text-white rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-[#f0d85e] transition"
            rows="5"
            required
          />
          <button
            type="submit"
            className="bg-[#f0d85e] text-black py-3 px-6 rounded-lg text-lg font-bold hover:bg-[#d1a830] transition duration-300 shadow-md hover:shadow-xl"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
