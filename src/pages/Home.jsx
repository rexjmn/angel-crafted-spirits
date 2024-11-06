import React from 'react'
import NavBar from '../components/NavBar'

import VideoHero from '../components/VideoHero'
import HighLights from '../components/HighLights'
import Bottles  from '../components/Bottles'
import ErrorBoundary from '../components/ErrorBoundary'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <div>
      <NavBar />
      <VideoHero />
      <HighLights />
      <ErrorBoundary>
      <Bottles/> 
      </ErrorBoundary>

      
      <Newsletter />

      <Footer />
    
    </div>
  )
}

export default Home
