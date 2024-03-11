import React from 'react';
import './contact.css';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import riding from '../assets/chris-riding.jpg';
import artEvent from '../assets/chris-art-event.jpg';
const ContaceScreen = () => {
  return (
    <div className="contact-container">
      <h1>Contact</h1>
      <div className="contact-image-container">
        <img src={riding} alt="artist riding a hourse" />
        <img src={artEvent} alt="artist in an art event" />
      </div>
      <div className='social-links'>
          <a href='https://www.facebook.com/profile.php?id=100009509298193'>
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
  )
}

export default ContaceScreen