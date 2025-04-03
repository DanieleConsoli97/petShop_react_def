import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Carrello() {

  const { carrello, rimuoviDalCarrello, svuotaCarrello } = useGlobalContext();
  // Stato per le quantità di ogni prodotto
  const [quantities, setQuantities] = useState(
    carrello.reduce((acc, product) => {
      acc[product.slug] = product.quantity;
      return acc;
    }, {})
  );

  // Funzione per aggiornare la quantità di un singolo prodotto
  const handleQuantityChange = (slug, event) => {
    const value = Math.max(1, Math.min(10, parseInt(event.target.value) || 1));
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [slug]: value,
    }));
  };

  const handleDecrease = (slug) => {
    setQuantities((prevQuantities) => {
      const newQuantity = prevQuantities[slug] > 1 ? prevQuantities[slug] - 1 : 1;
      return { ...prevQuantities, [slug]: newQuantity };
    });
  };

  const handleIncrease = (slug) => {
    setQuantities((prevQuantities) => {
      const newQuantity = prevQuantities[slug] < 10 ? prevQuantities[slug] + 1 : 10;
      return { ...prevQuantities, [slug]: newQuantity };
    });
  };

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

                <button className="quantity-btn" onClick={() => handleDecrease(product.slug)}>-</button>

                <input
                  type="number"
                  value={quantities[product.slug] || 1} // Imposta la quantità dal nostro stato
                  className="quantity-input"
                  onChange={(e) => handleQuantityChange(product.slug, e)} // Gestione del cambio quantità
                  min="1"
                  max="10"
                />
                <button className="quantity-btn" onClick={() => handleIncrease(product.slug)}>+</button>
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
        <button>Vai alla Pagina Di Checkout</button>
      </Link>
      <button onClick={svuotaCarrello}>Svuota Carrello</button>

    </div>
  );
}

export default Carrello;
