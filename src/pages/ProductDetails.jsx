import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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

   // Scroll in alto quando lo slug cambia
   useEffect(() => {
    window.scrollTo(0, 0); // Scorri verso l'alto
  }, [slug]); // Dipendenza: esegui ogni volta che lo slug cambia

  
  useEffect(() => {
    // Recupera i dettagli del prodotto attuale tramite lo slug
    fetch(`http://localhost:3000/prodotti/${slug}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Errore nel recupero del prodotto:", error));
    // Recupera tutti i prodotti per trovare quelli correlati
    fetch(`http://localhost:3000/prodotti/`)
      .then((response) => response.json())
      .then((data) => setRelatedProducts(data))
      .catch((error) => console.error("Errore nel recupero del prodotto:", error));
  }, [slug]);

  if (!product) {
    return <div>Caricamento...</div>;
  }
 

  return (
    <>
    {/* Sezione dei dettagli del prodotto */}
    <div className="product-detail d-flex">
      {/* Colonna sinistra: immagine del prodotto */}
      <div className="product-image-container">
        <img src={product?.image_url} className="product-image" alt={product.name} />
      </div>

      {/* Colonna destra: informazioni del prodotto */}
      <div className="product-info">
        <h1>{product.name}</h1>
        <p><strong>Brand:</strong> {product.brand}</p>
        <p>{product.description}</p>

        <p><span className="price-label">Prezzo: </span>€{product.price}</p>
        <div className="quantity-container">
          <label htmlFor="quantity">Quantità:</label>
          <input type="number" id="quantity" name="quantity" min="1" defaultValue="1" />
        </div>
        <button className="btn btn-primary mt-3">Aggiungi al Carrello</button>

        <p><span className="price-label">Prezzo: </span>{product.price}€</p>

      </div>
    </div>

      {/* Sezione del carosello per i prodotti correlati */}
      <div className="related-carousel" >
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
          {relatedProducts.filter((relatedProduct) => relatedProduct.animals == product.animals).map((product) => {
            if (product.slug === slug) return null; // Skip the current product
            return (<SwiperSlide key={product.id}>
              <div className="card-related ">
                <img src={product.image_url} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.price}€</p>
                  <Link to={`/prodotti/${product.slug}`} className="btn btn-primary">
                    Vedi Dettagli
                  </Link>
                </div>
              </div>
            </SwiperSlide>)
          }

          )}

        </Swiper>
      </div>
    </>
  );


}


export default ProductDetail;