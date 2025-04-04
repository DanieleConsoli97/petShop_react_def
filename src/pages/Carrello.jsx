import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

function Carrello() {
  const { carrello, rimuoviDalCarrello, svuotaCarrello, handleQuantityChange } = useGlobalContext();

  return (
    <div>
      <div className='container'>
        <h1 className='text-center'>Carrello</h1>

        {/* Messaggio se il carrello è vuoto */}
        {carrello.length === 0 ? (
          <p className="text-center">Il tuo carrello è vuoto. Inizia a fare shopping <Link className='link-underline link-underline-opacity-0 text-warning' to="/prodotti">qui</Link>.</p>
        ) : (
          <div className='row'>
            {carrello.map((product) => (
              <div className="card" key={product.slug}>
                <img src={product.image_url} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Prezzo Unitario: {product.price} €</p>
                  <p className="card-text">Prezzo Totale: {(product.price * product.quantity).toFixed(2)} €</p>
                  <p className="card-text">Quantità:</p>

                  {/* Bottoni per aumentare o diminuire la quantità con i simboli "+" e "-" */}
                  <div className="quantity-container">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(product.slug, product.quantity > 1 ? product.quantity - 1 : 1)}>
                      -
                    </button>
                    <span className="quantity-input">{product.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(product.slug, product.quantity + 1)}>
                      +
                    </button>
                  </div>

                  <div className="button-container">
                    <button
                      onClick={() => rimuoviDalCarrello(product.slug)}
                      className='btn btn-danger'>
                      Rimuovi dal carrello
                    </button>

                    <Link to={`/prodotti/${product.slug}`} className="btn btn-primary">
                      Vedi Dettagli
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Contenitore dei bottoni di checkout e svuotamento */}
      {carrello.length > 0 && (
        <div className="button-container">
          <Link to={'/checkout'}>
            <button className="checkout-btn">Completa ordine</button>
          </Link>
          <button className="empty-cart-btn" onClick={() => {
            if (window.confirm("Sei sicuro di voler svuotare il carrello?")) {
              svuotaCarrello();
            }
          }}>Svuota Carrello</button>
        </div>
      )}
    </div>
  );
}

export default Carrello;
