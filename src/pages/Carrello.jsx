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
            // <div key={prodotto.slug} className='col-md-4'>
            //   <div className='card mb-4'>
            //     <img src={prodotto.immagine} className='card-img-top' alt={prodotto.nome} />
            //     <div className='card-body'>
            //       <h5 className='card-title'>{prodotto.nome}</h5>
            //       <p className='card-text'>Prezzo: {prodotto.prezzo} €</p>
            //       <p className='card-text'>Quantità: {prodotto.quantity}</p>
            //       <button onClick={() => rimuoviDalCarrello(prodotto.slug)} className='btn btn-danger'>Rimuovi dal carrello</button>
            //     </div>
            //   </div>
            // </div>

            <div className="card" key={product.id}>
              <img src={product.image_url} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.price} €</p>
                <button onClick={() => rimuoviDalCarrello(prodotto.slug)} className='btn btn-danger'>Rimuovi dal carrello</button>
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