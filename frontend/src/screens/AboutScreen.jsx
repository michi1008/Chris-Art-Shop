import React from 'react'
import './AboutScreen.css'
import profile from '../assets/Chris.jpg'

const AboutScreen = () => {
  return (
    <section className='about-content'>
      <div className="about-artist">
      <h1>About Artist</h1>
    
    <div className='profile-title'>
    <h2>Chris Lange</h2>
     <img className='profile-image' src={profile} alt='Chris Lange' />
    </div>
   <div className="history">
   <h3>Her history...</h3>
   <p>Chris began her lifelong passion for drawing and painting early in life.  In her early years, she visited National Parks in the western United States and Canada with her family where she gained an appreciation of our natural treasures. She received a Bachelor of Arts Degree in Fine Arts from San Diego State University in 1970.  Life responsibilities meant working in a corporate job while painting for pleasure in her spare time.</p>
  
   </div>
   
   <div className='statement'>
     <h3>Her statement...</h3>
     <p>'My passion is being outdoors among the majestic vistas that inspire my art. Painting plein air gives me the true colors for my work that are sometimes completed in studio from photographs. My photographic library gives me subjects from the Pacific Coast to the Great Plains.  The ones that inspire me the most become my next painting.  I also paint subjects by request on a commission basis. These include places people enjoyed, Corvettes, race cars, and equine portraits.  When I’m not painting, I’m riding or grooming my horse, and visiting National and State parks here in Texas, Colorado, Wyoming, and the rest of the West.'</p>
      </div>
      </div>
      <div className="about-service">
      <h1>About Service</h1>
      </div>
    </section>
    
  )
}

export default AboutScreen