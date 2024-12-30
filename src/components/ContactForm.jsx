import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const form = useRef();
  const [showPopup, setShowPopup] = useState(false); // Estado para el popup

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log('Correo enviado con éxito:', result.text);
          setShowPopup(true); // Mostrar el popup
          e.target.reset(); // Limpia el formulario después de enviarlo
        },
        (error) => {
          console.error('Error al enviar el correo:', error.text);
          alert('Hubo un problema al enviar tu mensaje. Por favor, inténtalo nuevamente.');
        }
      );
  };

  const closePopup = () => {
    setShowPopup(false); // Cierra el popup
  };

  return (
    <div className="relative">
      <form ref={form} onSubmit={sendEmail} className="flex flex-col space-y-4">
        <input
          type="text"
          name="user_name"
          placeholder="Name"
          required
          className="p-3 bg-black/50 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-[#f0d85e]"
        />
        <input
          type="email"
          name="user_email"
          placeholder="Email"
          required
          className="p-3 bg-black/50 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-[#f0d85e]"
        />
        <textarea
          name="message"
          placeholder="Your message"
          rows="5"
          required
          className="p-3 bg-black/50 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring focus:ring-[#f0d85e]"
        ></textarea>
        <button
          type="submit"
          className="p-3 bg-[#f0d85e] text-black font-semibold rounded-lg hover:bg-yellow-500 transition duration-300"
        >
          Send
        </button>
      </form>

      {/* Popup de agradecimiento */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">¡Gracias por tu mensaje!</h2>
            <p className="text-gray-600">
              We appreciate your message and will get back to you as soon as possible.
            </p>
            <button
              onClick={closePopup}
              className="px-4 py-2 bg-[#f0d85e] text-black font-semibold rounded-lg hover:bg-yellow-500 transition duration-300"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactForm;
