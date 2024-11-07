import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Loader from './components/Loader.jsx' // Asegúrate de tener este import

function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simula un tiempo de carga al iniciar o cambiar la ruta
    const timer = setTimeout(() => {
      setLoading(false)
    }, 6000) // Ajusta según la duración de la animación

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  )
}

export default App