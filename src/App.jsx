import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';

// Importación de las páginas principales con carga diferida
const Home = React.lazy(() => import('./pages/Home.jsx'));
const QuoteCalculator = React.lazy(() => import('./pages/QuoteCalculator.jsx'));

// Componente Loader
const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <span className="text-white text-xl font-semibold z-10">Loading...</span>
      {[...Array(9)].map((_, index) => (
        <div
          key={index}
          className="absolute rounded-full border-2 border-white animate-pulse-circle"
          style={{ animationDelay: `${index * 200}ms` }}
        ></div>
      ))}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event-calculator" element={<QuoteCalculator />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
