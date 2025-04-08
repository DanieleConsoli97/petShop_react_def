import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import HoldButton from '../components/HoldButton';
import { TbShoppingCartX, TbTrash } from "react-icons/tb";

function Carrello() {
  const { carrello, rimuoviDalCarrello, svuotaCarrello, handleQuantityChange } = useGlobalContext();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(price);
  };

  const totale = carrello.reduce((acc, item) => {
    const prezzoUnitario = item.discounted_price ?? item.price;
    return acc + prezzoUnitario * item.quantity;
  }, 0);

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">Il tuo Carrello</h1>

      {carrello.length === 0 ? (
        <p className="text-center">
          Il tuo carrello è vuoto. Inizia a fare shopping <Link className='text-warning' to="/prodotti">qui</Link>.
        </p>
      ) : (
        <div className="row">
          {/* Card principale con i prodotti */}
          <div className="col-lg-8">
            <div className="card shadow-sm mb-4">
              <div className="card-header">
                <h5 className="mb-0">Prodotti nel carrello</h5>
              </div>
              <div className="card-body">
                {carrello.map((product, index) => {
                  const prezzoUnitario = product.discounted_price ?? product.price;
                  const prezzoTotale = prezzoUnitario * product.quantity;

                  return (
                    <div key={product.slug} className="mb-4">
                      <div className="row align-items-center">
                        <div className="col-md-3">
                          <img src={product.image_url} className="img-fluid rounded" alt={product.name} />
                        </div>
                        <div className="col-md-5">
                          <h6>{product.name}</h6>
                          <p className="mb-1">Prezzo Unitario: {formatPrice(prezzoUnitario)}</p>
                          <p className="mb-1">Totale: {formatPrice(prezzoTotale)}</p>
                          <div className="d-flex align-items-center mt-2">
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => handleQuantityChange(product.slug, Math.max(1, product.quantity - 1))}
                              disabled={product.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="mx-2">{product.quantity}</span>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => handleQuantityChange(product.slug, Math.min(10, product.quantity + 1))}
                              disabled={product.quantity >= 10}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="col-md-4 text-end">
                          <HoldButton
                            onHold={() => rimuoviDalCarrello(product.slug)}
                            holdTime={2000}
                            className="btn btn-danger btn-sm mb-2"
                          >
                            Elimina <TbTrash />
                          </HoldButton>
                          <br />
                          <Link to={`/prodotti/${product.slug}`} className="btn btn-outline-primary btn-sm">
                            Vedi Dettagli
                          </Link>
                        </div>
                      </div>
                      {index !== carrello.length - 1 && <hr className="my-4" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card di riepilogo a destra */}
          <div className="col-lg-4">
            <div className="card summary-card shadow-sm">
              <div className="card-header">
                <h5 className="mb-0">Riepilogo</h5>
              </div>
              <div className="card-body">
                <ul className="list-unstyled mb-3">
                  <li className="d-flex justify-content-between">
                    <span>Totale prodotti: <strong>{formatPrice(totale)}</strong></span>
                    
                  </li>
                  <li className="d-flex justify-content-between">
                    <span>Spedizione gratis</span>
                    
                  </li>
                  <li className="d-flex justify-content-between mt-2 border-top pt-2">
                    <strong>Totale</strong>
                    <strong>{formatPrice(totale)}</strong>
                  </li>
                </ul>

                <Link to="/checkout">
                  <button className="btn btn-success w-100 mb-3">Vai al pagamento</button>
                </Link>

                <HoldButton
                  onHold={svuotaCarrello}
                  holdTime={2000}
                  className="btn btn-outline-danger w-50"
                >
                  Tieni premuto per svuotare <TbShoppingCartX />
                </HoldButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrello;
