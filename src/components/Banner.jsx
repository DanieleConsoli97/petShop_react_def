import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="banner-wrapper">
      <div className="banner-container">
        <img 
          src="/Free_shipping_ok.jpg" 
          alt="Promotional banner"
          className="banner-image"
        />
        <button 
          className="position-absolute top-0 end-0 btn btn-link text-dark p-2"
          onClick={() => setIsVisible(false)}
          aria-label="Close"
        >
          <FaTimes size={20} />
        </button>
      </div>
    </div>
  );
}