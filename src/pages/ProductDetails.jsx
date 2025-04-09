import { useGlobalContext } from '../context/GlobalContext';
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// swiper modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Banner from '../components/Banner';

function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [popupMessage, setPopupMessage] = useState("");
  
  const { aggiungiAlCarrello, rimuoviDalCarrello, aggiungiAllaWishList, rimuoviDallaWishList, carrello, wishList } = useGlobalContext();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(price);
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the slug changes
  }, [slug]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/prodotti/${slug}`)
      .then((response) => {
        if (!response.ok) throw new Error(`Errore HTTP: ${response.status}`);
        return response.json();
      })
      .then((data) => {
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

    fetch(`http://localhost:3000/prodotti/`)
      .then((response) => response.json())
      .then((data) => setRelatedProducts(data))
      .catch((error) => console.error("Errore nel recupero dei prodotti:", error));

    setQuantity(1);
  }, [slug, navigate]);

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  const handleQuantityChange = (event) => {
    const value = Math.max(1, Math.min(10, parseInt(event.target.value) || 1));
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (carrello.some(item => item.slug === product.slug)) {
      rimuoviDalCarrello(product.slug);
    } else {
      aggiungiAlCarrello(product, quantity);
    }
  };

  const handleAddToWishlist = () => {
    if (wishList.some(item => item.slug === product.slug)) {
      rimuoviDallaWishList(product.slug);
      // Show popup message when removed from wishlist
      setPopupMessage("Prodotto rimosso dalla wishlist");
      setTimeout(() => setPopupMessage(""), 3000); // Hide after 3 seconds
    } else {
      aggiungiAllaWishList(product);
    }
  };

  if (!product) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <p>Caricamento...</p>
      </div>
    );
  }

  return (
    <>
      <Banner />
      <div className="container">
        <div className="container-product my-4">
          <div className="product-detail d-flex">
            {product.discounted_price && (
              <div className='promotion'>
                <span>Offerta! </span>
                <span><del>{product.price}</del></span>
              </div>
            )}
            <div className="product-image-container">
              <img src={product?.image_url} className="product-image" alt={product.name} />
            </div>

            <div className="product-info">
              <h1>{product.name}</h1>
              <h6>Brand: {product.brand}</h6>
              <p>{product.description}</p>

              {product.discounted_price !== null ? 
                <p className="price">{formatPrice(product.discounted_price)}</p> : 
                <p className="price">{formatPrice(product.price)}</p>}

              <div className="quantity-container">
                <button className="quantity-btn" onClick={handleDecrease}>-</button>
                <input
                  type="number"
                  value={quantity}
                  className="quantity-input"
                  onChange={handleQuantityChange}
                  min="1"
                  max="10"
                />
                <button className="quantity-btn" onClick={handleIncrease}>+</button>
              </div>

              <div className="buttons-container">
                <button onClick={handleAddToCart} className="btn-icon-text green-btn">
                  <i className={`fas fa-cart-plus ${carrello.some(item => item.slug === product.slug) ? 'added' : ''}`}></i>
                  {carrello.some(item => item.slug === product.slug) ? 'Rimuovi dal Carrello' : 'Aggiungi al Carrello'}
                </button>
                <button onClick={handleAddToWishlist} className="btn-icon-text red-btn">
                  <i className={`fas fa-heart ${wishList.some(item => item.slug === product.slug) ? "filled" : ""}`}></i>
                  {wishList.some(item => item.slug === product.slug) ? 'Rimuovi dalla Wishlist' : 'Aggiungi alla Wishlist'}
                </button>
              </div>
            </div>
          </div>

        

          <div className="related-carousel">
            <h2 className="text-center my-4">Prodotti Correlati</h2>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              grabCursor={true}
              navigation={true}
              breakpoints={{
                320: { slidesPerView: 1, spaceBetween: 10 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 30 }
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper"
            >
              {relatedProducts.filter((relatedProduct) => relatedProduct.animals === product.animals).map((relatedProduct) => {
                if (relatedProduct.slug === slug) return null;
                return (
                  <SwiperSlide key={relatedProduct.id}>
                    <div className="card-related">
                      <img src={relatedProduct.image_url} className="card-img-top" alt={relatedProduct.name} />
                      <div className="card-body">
                        <h5 className="card-title">{relatedProduct.name}</h5>
                        {product.discounted_price !== null ? <p className="price">{formatPrice(product.discounted_price)}</p> : <p className="price">{formatPrice(product.price)}</p>}
                        <Link to={`/prodotti/${relatedProduct.slug}`} className="btn btn-primary">
                          Vedi Dettagli
                        </Link>
                      </div>

           {/* Popup di notifica sotto i bottoni */}
          {popupMessage && (
            <div className="popup-message-container">
              <div className="alert alert-success alert-dismissible fade show" role="alert">
                {popupMessage}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            </div>
          )}
        {/* Sezione del carosello per i prodotti correlati */}
        <div className="related-carousel">
          <h2 className="text-center my-4">Potrebbe anche interessarti : </h2>
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
                      {product.discounted_price !== null ? <p className="price">{formatPrice(product.discounted_price)}</p> : <p className="price">{formatPrice(product.price)}</p>}
                      <Link to={`/prodotti/${relatedProduct.slug}`} className="btn btn-primary">
                        Vedi Dettagli
                      </Link>

                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
