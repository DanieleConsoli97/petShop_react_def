import { useGlobalContext } from '../context/GlobalContext';
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

//swiper modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function ProductDetail() {
  // Ottieni lo slug del prodotto dalla URL tramite useParams
  const { slug } = useParams();
  // Stato per il prodotto attuale
  const [product, setProduct] = useState(null);
  // Stato per i prodotti correlati
  const [relatedProducts, setRelatedProducts] = useState([]);
  // Stato per la quantità del prodotto
  const [quantity, setQuantity] = useState(1);

  const { aggiungiAlCarrello, aggiungiAllaWishList } = useGlobalContext();

  // Funzione per formattare il prezzo
  const formatPrice = (price) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(price);
  };

  // Scroll in alto quando lo slug cambia
  useEffect(() => {
    window.scrollTo(0, 0); // Scorri verso l'alto
  }, [slug]);

  const navigate = useNavigate();

  useEffect(() => {
    // Recupera i dettagli del prodotto attuale tramite lo slug
    fetch(`http://localhost:3000/prodotti/${slug}`)
      .then((response) => {
        if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        // Verifica se il prodotto esiste e contiene le proprietà necessarie
        if (data && data.id && data.name && data.slug) {
          setProduct(data);
        } else {
          console.error("Dati del prodotto incompleti o mancanti");
          navigate('/404', { replace: true });
        }
      })
      .catch((error) => {
        console.error("Errore nel recupero del prodotto:", error);
        navigate('/404', { replace: true });
      });

    // Recupera tutti i prodotti per trovare quelli correlati
    fetch(`http://localhost:3000/prodotti/`)
      .then((response) => response.json())
      .then((data) => setRelatedProducts(data))
      .catch((error) => console.error("Errore nel recupero dei prodotti:", error));

    // Resetta la quantità ogni volta che cambia il prodotto
    setQuantity(1);

  }, [slug, navigate]);

  // Funzioni per gestire il cambiamento della quantità
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1); // Riduci solo se la quantità è maggiore di 1
  };

  const handleIncrease = () => {
    if (quantity < 10) setQuantity(quantity + 1); // Aumenta solo se la quantità è inferiore a 10
  };

  const handleQuantityChange = (event) => {
    // Ottieni il valore e limitato tra 1 e 10
    const value = Math.max(1, Math.min(10, parseInt(event.target.value) || 1));
    setQuantity(value);
  };

  const handleAddToCart = () => {
    aggiungiAlCarrello(product, quantity); // Passa il prodotto e la quantità
  };

  const handleAddToWishlist = () => {
    aggiungiAllaWishList(product); // Aggiungi alla wishlist   
  }
  
  if (!product) {
    return (
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ height: '100vh' }}
      >
        <p>Caricamento...</p>
      </div >
    );
  }

  return (
    <div className="container">
      {/* Sezione dei dettagli del prodotto */}
      <div className="container-product my-4">
        <div className="product-detail d-flex">
          {/* Colonna sinistra: immagine del prodotto */}
          <div className="product-image-container">
            <img src={product?.image_url} className="product-image" alt={product.name} />
          </div>

          {/* Colonna destra: informazioni del prodotto */}
          <div className="product-info">
            <h1>{product.name}</h1>
            <h6>Brand: {product.brand}</h6>
            <p>{product.description}</p>
            <p className="price">{formatPrice(product.price)}</p> {/* Prezzo formattato */}

            {/* Selettore quantità */}
            <div className="quantity-container">
              <button className="quantity-btn" onClick={handleDecrease}>-</button>
              <input
                type="number"
                value={quantity}
                className="quantity-input"
                onChange={handleQuantityChange} // Gestione del cambio quantità
                min="1"
                max="10"
              />
              <button className="quantity-btn" onClick={handleIncrease}>+</button>
            </div>

            {/* Sezione dei bottoni con le icone */}
            <div className="buttons-container">
              <button onClick={handleAddToCart} className="btn-icon-text green-btn">
                <i className="fas fa-cart-plus"></i>
                Aggiungi al Carrello
              </button>
              <button onClick={handleAddToWishlist} className="btn-icon-text red-btn">
                <i className={`fas fa-heart ${product.in_wishlist ? "filled" : ""}`}></i>
                Aggiungi alla Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Sezione del carosello per i prodotti correlati */}
        <div className="related-carousel">
          <h2 className="text-center my-4">Prodotti Correlati</h2>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            grabCursor={true}
            navigation={true}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              }
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {/* Filtra i prodotti correlati per mostrare solo quelli della stessa categoria */}
            {relatedProducts.filter((relatedProduct) => relatedProduct.animals === product.animals).map((relatedProduct) => {
              if (relatedProduct.slug === slug) return null; // Skip the current product
              return (
                <SwiperSlide key={relatedProduct.id}>
                  <div className="card-related">
                    <img src={relatedProduct.image_url} className="card-img-top" alt={relatedProduct.name} />
                    <div className="card-body">
                      <h5 className="card-title">{relatedProduct.name}</h5>
                      <p className="card-text">{formatPrice(relatedProduct.price)}</p> {/* Prezzo formattato */}
                      <Link to={`/prodotti/${relatedProduct.slug}`} className="btn btn-primary">
                        Vedi Dettagli
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
