import React from 'react';
import HoldButtonExample from '../components/HoldButtonExample';

/**
 * Pagina di dimostrazione per il componente HoldButton
 */
const HoldButtonDemo = () => {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">Dimostrazione del Pulsante "Hold to Press"</h1>
          <p className="lead">
            Questa pagina mostra esempi di utilizzo del componente HoldButton, un pulsante che risponde 
            quando viene tenuto premuto per un determinato periodo di tempo.
          </p>
          <hr className="my-4" />
        </div>
      </div>
      
      <HoldButtonExample />
    </div>
  );
};

export default HoldButtonDemo;