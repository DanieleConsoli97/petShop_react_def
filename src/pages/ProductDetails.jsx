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
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {

    fetch(`http://localhost:3000/products/${slug}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Errore nel recupero del prodotto:", error));

    fetch(`http://localhost:3000/products/`)
      .then((response) => response.json())
      .then((data) => setRelatedProducts(data))
      .catch((error) => console.error("Errore nel recupero del prodotto:", error));
  }, [slug]);

  if (!product) {
    return <div>Caricamento...</div>;
  }
  console.log(product?.image_url);
  console.log(product)

  return (
    <>
      <div className="product-detail">
        <h1>{product.name}</h1>
        <img src={product?.image_url} className="product-image" alt={product.name} />
        <p>{product.description}</p>
        <p>Prezzo: €{product.price}</p>
      </div>

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


          {relatedProducts.filter((relatedProduct) => relatedProduct.animals == product.animals).map((product) => {
            if (product.slug === slug) return null; // Skip the current product
            return (<SwiperSlide key={product.id}>
              <div className="card ">
                <img src={product.image_url} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">€{product.price}</p>
                  <Link to={`/products/${product.slug}`} className="btn btn-primary">
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