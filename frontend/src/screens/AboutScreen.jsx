import React from 'react';
import './AboutScreen.css';
import profile from '../assets/Chris.jpg';
import sample from '../assets/paint_with_frame.jpg';
import { MdLocalShipping } from 'react-icons/md';
import { MdFilterFrames } from 'react-icons/md';
import { TbAdjustmentsDown } from 'react-icons/tb';

const AboutScreen = () => {
  return (
    <div className='about-content'>
      <div className='about-artist'>
        <h1>About Artist</h1>

        <div className='about-artist-profile'>
          <div className='about-artist-artist'>
            <img className='profile-image' src={profile} alt='Chris Lange' />
            <h2>Chris Lange</h2>
          </div>
          <div className='about-artist-sample'>
            <img className='sample-image' src={sample} alt='paining' />
            <h2>Her Pieces</h2>
          </div>
          ``
        </div>
      </div>
      <div className='profile-content'>
        <div className='artist-info'>
          <div className='artist-info-title'>
            <h3>Her history</h3>
          </div>
          <div className='artist-info-content'>
            <p>
              Chris began her lifelong passion for drawing and painting early in
              life. In her early years, she visited National Parks in the
              western United States and Canada with her family where she gained
              an appreciation of our natural treasures. She received a Bachelor
              of Arts Degree in Fine Arts from San Diego State University in
              1970. Life responsibilities meant working in a corporate job while
              painting for pleasure in her spare time.
            </p>
          </div>
        </div>

        <div className='artist-info'>
          <div className='artist-info-title'>
            <h3>Her statement</h3>
          </div>

          <div className='artist-info-content'>
            <p>
              "My passion is being outdoors among the majestic vistas that
              inspire my art. Painting plein air gives me the true colors for my
              work that are sometimes completed in studio from photographs. My
              photographic library gives me subjects from the Pacific Coast to
              the Great Plains. The ones that inspire me the most become my next
              painting. I also paint subjects by request on a commission basis.
              These include places people enjoyed, Corvettes, race cars, and
              equine portraits. When I’m not painting, I’m riding or grooming my
              horse, and visiting National and State parks here in Texas,
              Colorado, Wyoming, and the rest of the West."
            </p>
          </div>
        </div>
      </div>

      <div className='about-service'>
        <h1>About Service</h1>
        <div className='service-content'>
          <div className='service-content-item'>
            <MdFilterFrames
              style={{ fontSize: '4rem', color: 'var(--clr-primary-2)' }}
            />
            <h4>Place the paining to the frame </h4>
          </div>
          <div className='service-content-item'>
            <MdLocalShipping
              style={{ fontSize: '4rem', color: 'var(--clr-primary-2)' }}
            />
            <h4>Deliver the paining to your place safely</h4>
          </div>
          <div className='service-content-item'>
            <TbAdjustmentsDown
              style={{ fontSize: '4rem', color: 'var(--clr-primary-2)' }}
            />
            <h4>Paint only for you with an additional cost </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutScreen;
