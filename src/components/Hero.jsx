import React from "react";
import logo from '/PawPlanet.logo(3).png'
function Hero() {
  return (
    <div className="hero-container">
      <div className="hero-mask">
        <div className="hero-content">
          <img className="rounded-circle img-fluid" src={logo} width="100" height="100" alt="Logo" />
          <h1 className="mb-3">PawPlanet</h1>
          <h4 className="mb-3">Il tuo shop online di fiducia</h4>
          <h5 className="mb-3">Quualità e risparmio per la cura dei tuoi Pet</h5>
  
        </div>
      </div>
    </div>
  );
}

export default Hero;
