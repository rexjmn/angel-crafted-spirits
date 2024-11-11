import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';


// Importación de las páginas principales con carga diferida
const Home = React.lazy(() => import('./pages/Home.jsx'));
const QuoteCalculator = React.lazy(() => import('./pages/QuoteCalculator.jsx'));

function App() {
  return (
    <Suspense fallback={null}> {/* Propiedad adicional para animar */}
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/event-calculator" element={<QuoteCalculator />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
