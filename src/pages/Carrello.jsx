import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Carrello() {

  const { carrello, rimuoviDalCarrello, svuotaCarrello } = useGlobalContext();

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
      </div>

      <Link to={'/checkout'}>
        <button >Vai alla Pagina Di Checkout</button>
      </Link>
      <button onClick={svuotaCarrello}>Svouta Carrello</button>

    </div>
  );
}

export default Carrello;