import React from 'react'
import lila from '../assets/images/lila-mitchell.jpg';
const InfoHome = () => {
  return (
    <div className='w-full h-screen relative top-0 left-0'>
        <div
        className="w-1/2 h-1/2 rounded-lg shadow-lg  transform -translate-x-[40%] "
        style={{
          backgroundImage: `url(${lila})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          alt: 'bartender',
        }}
        data-aos="fade"
      >

      </div>
      
    </div>
  )
}

export default InfoHome

