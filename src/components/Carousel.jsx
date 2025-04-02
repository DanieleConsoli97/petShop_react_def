import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext"; // da utilizzare per importare i value del globalcontext

const CarouselCustom = () => {
    const [productsCani, setProductsCani] = useState([]);
    const [productsGatti, setProductsGatti] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/prodotti/cani')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante il recupero dei prodotti');
                }
                return response.json();
            })
            .then(data => {
                setProductsCani(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });

        fetch('http://localhost:3000/prodotti/gatti')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante il recupero dei prodotti');
                }
                return response.json();
            })
            .then(data => {
                setProductsGatti(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Caricamento...</p>;
    if (error) return <p>Errore: {error}</p>;

    return (
        <>
            <h2 className="text-center my-4">Prodotti per cani</h2>
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


                {productsCani.map(product => (
                    <SwiperSlide key={product.id}>
                        <div className="card">
                            <img src={product.image_url} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.price}€</p>
                                <Link to={`/prodotti/${product.slug}`} className="btn btn-primary">
                                    Vedi Dettagli
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>
            <h2 className="text-center my-4">Prodotti per Gatti</h2>
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


                {productsGatti.map(product => (
                    <SwiperSlide key={product.id}>
                        <div className="card">
                            <img src={product.image_url} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.price}€</p>
                                <Link to={`/prodotti/${product.slug}`} className="btn btn-primary">
                                    Vedi Dettagli
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

            </Swiper>
        </>
    );
};
export default CarouselCustom