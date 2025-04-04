import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Carrello() {
  const { carrello, rimuoviDalCarrello, svuotaCarrello } = useGlobalContext();

  // Calcola il subtotale degli articoli nel carrello
  const subtotale = carrello.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <div>
      <div className='container'>
        <h1 className='text-center'>Carrello</h1>
        <div className='row'>
          {carrello.map((product) => (
            <div className="card" key={product.slug}>
              <img src={product.image_url} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Prezzo: {product.price} €</p>
                <p className="card-text">Quantità: {product.quantity}</p>
                <button onClick={() => rimuoviDalCarrello(product.slug)} className='btn btn-danger'>Rimuovi dal carrello</button>
                <Link to={`/prodotti/${product.slug}`} className="btn btn-primary">
                  Vedi Dettagli
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Inserimento del subtotale */}
        {carrello.length > 0 && (
          <div className="subtotale">
            <strong>Subtotale: {subtotale.toFixed(2)} €</strong>
          </div>
        )}
      </div>

      {/* Contenitore dei bottoni */}
      <div className="button-container">
        <Link to={'/checkout'}>
          <button className="checkout-btn">Vai alla Pagina Di Checkout</button>
        </Link>
        <button className="empty-cart-btn" onClick={svuotaCarrello}>Svuota Carrello</button>
      </div>
    </div>
  );
}

export default Carrello;