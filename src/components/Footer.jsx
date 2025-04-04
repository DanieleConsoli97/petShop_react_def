import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa"; 
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        {/* Sezione Contatti */}
        <div className="footer-contact">
          <p><strong>Contattaci</strong></p>
          <p>Email: <a href="mailto:info@pawplanet.com">info@pawplanet.com</a></p>
          <p>Numero: <a href="tel:+1234567890"> +123 456 7890</a></p>
          <p>Indirizzo: <a href="https://goo.gl/maps/xyz">Via Roma 123, Milano</a></p>
        </div>

        {/* Sezione Social */}
        <div className="footer-social">
          <p><strong>Seguici su</strong></p>
          <a href="https://www.facebook.com/pawplanet" target="_blank" rel="noopener noreferrer">
            <FaFacebook size={25} /> 
          </a>
          <a href="https://twitter.com/pawplanet" target="_blank" rel="noopener noreferrer">
            <FaXTwitter size={25} /> 
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
