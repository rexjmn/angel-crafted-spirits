import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Loader from './components/Loader'; // Custom Loader Component
import * as Sentry from "@sentry/react";

// Lazy imports for pages
const Home = React.lazy(() => import('./pages/Home'));
const QuoteCalculator = React.lazy(() => import('./pages/QuoteCalculator'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Packages = React.lazy(() => import('./pages/Packages'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}> {/* Show Loader while waiting for lazy-loaded components */}
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

export default Sentry.withProfiler (App);
