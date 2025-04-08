import React, { useState } from 'react';


const ShippingBanner = () => {
  // Stato per gestire la visibilità del banner
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false); // Nasconde il banner quando il bottone viene cliccato
  };

  return (
    // Se il banner è visibile, renderizza il contenuto
    isVisible && (
      <div className="shipping-banner">
        <div className="shipping-text">
          <h3>Spedizione Gratuita</h3>
          <p>Su tutti gli ordini superiori a 20€</p>
        </div>
        <button className="close-btn" onClick={handleClose}>X</button>
      </div>
    )
  );
};

export default ShippingBanner;

