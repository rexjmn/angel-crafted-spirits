import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';

// Lazy imports for pages
const Home = React.lazy(() => import('./pages/Home'));
const QuoteCalculator = React.lazy(() => import('./pages/QuoteCalculator'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Packages = React.lazy(() => import('./pages/Packages'));

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black">
    <span className="text-white text-xl">Loading...</span>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />} >
      <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event-calculator" element={<QuoteCalculator />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/packages" element={<Packages />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
