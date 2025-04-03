import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; 

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        {/* Sezione Contatti */}
        <div className="footer-contact">
          <p><strong>Contattaci</strong></p>
          <p><a href="mailto:info@pawplanet.com">Email: info@pawplanet.com</a></p>
          <p><a href="tel:+1234567890">Numero: +123 456 7890</a></p>
          <p><a href="https://goo.gl/maps/xyz">Indirizzo: Via Roma 123, Milano</a></p>
        </div>

        {/* Sezione Social */}
        <div className="footer-social">
          <p><strong>Seguici su</strong></p>
          <a href="https://www.facebook.com/pawplanet" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={25} /> 
          </a>
          <a href="https://twitter.com/pawplanet" target="_blank" rel="noopener noreferrer">
            <FaTwitter size={25} /> 
          </a>
          <a href="https://www.instagram.com/pawplanet" target="_blank" rel="noopener noreferrer">
            <FaInstagram size={25} /> 
          </a>
        </div>
      </div>
      <p>&copy; 2025 PawPlanet. Tutti i diritti riservati.</p>
    </div>
  );
};

export default Footer;
