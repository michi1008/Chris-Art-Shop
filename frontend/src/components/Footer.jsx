import React from 'react';
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear()
  
    return (
        <footer className="footer">
            <div className="footer-social">
                    <h4>follow me</h4>
                    <div className="social-links">
                        <a href="#"><FaFacebook className="social-icon" /></a>
                        <a href="#"><FaInstagramSquare className="social-icon" /></a>
                    </div>
            </div>
            <div className="copyright">
            <p className="copyright">Chris Art Shop &copy; {currentYear}</p>
            </div>                   
        </footer> 
  )
}

export default Footer