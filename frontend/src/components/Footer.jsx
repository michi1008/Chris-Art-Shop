import React from 'react';
import './Footer.css';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='footer'>
      <div className='footer-social'>
        <h4>follow me</h4>
        <div className='social-links'>
          <a href='https://www.facebook.com/search/top?q=chris%20lange%20art'>
            <FaFacebook className='social-icon' />
          </a>
          <a href='https://www.instagram.com/chris_lange_art/'>
            <FaInstagramSquare className='social-icon' />
          </a>
          <a href="mailto:chrislangeart1@gmail.com">
            <MdEmail className='social-icon'/>
          </a>
        </div>
      </div>
      <div className='copyright'>
        <p className='copyright'>Chris Lange Art Shop &copy; {currentYear}</p>
      </div>
    </footer>
  );
};

export default Footer;
