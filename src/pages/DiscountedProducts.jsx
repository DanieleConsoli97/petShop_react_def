import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { GrSort } from "react-icons/gr";
import Banner from "../components/Banner";

// Helper function to format prices
const formatPrice = (price) => {
    return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(price);
};

function DiscountedProducts() {
    const [discountedProducts, setDiscountedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isGridView, setIsGridView] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/prodotti/promozioni')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante il recupero dei prodotti');
                }
                return response.json();
            })
            .then(data => {
                setDiscountedProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) return (


        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ height: '100vh' }}
        >
            <p>Caricamento...</p>
        </div >

    );
    if (error) return <p>Errore: {error}</p>;

    return (
        <>
            <Banner />
            <h1 className='text-center my-4'>Prodotti in Promozione</h1>

            <div className="container d-flex justify-content-end mb-3">
                <button className={`btn btn-outline-success me-2 ${isGridView ? 'active' : ''}`} onClick={() => setIsGridView(true)}>
                    <BsFillGrid3X3GapFill />
                </button>
                <button className={`btn btn-outline-success ${!isGridView ? 'active' : ''}`} onClick={() => setIsGridView(false)}>
                    <GrSort />
                </button>
            </div>

            {/* Vista a Griglia */}
            {isGridView && (
                <div className="container mb-5">
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                        {discountedProducts.map(product => (
                            <div className="col" key={product.id}>
                                <div className="card h-100">


                                    <div className='promotion'>
                                        <span>Offerta! </span>
                                        <span>{product.discounted_price}</span>
                                    </div>
                                    <img
                                        src={product.image_url}
                                        className="card-img-top"
                                        alt={product.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text" style={{ fontWeight: 'bold' }}>
                                            <p>Prezzo precedente:<del>{formatPrice(product.price)}</del></p>

                                        </p>
                                        <Link to={`/prodotti/${product.slug}`} className="btn btn-primary">
                                            Vedi Dettagli
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Vista a Lista */}
            {!isGridView && (
                <div className="container mb-5">
                    <div className="list-group">
                        {discountedProducts.map(product => (
                            <div
                                className="list-group-item d-flex align-items-center mb-4 p-4"
                                key={product.id}
                                style={{
                                    borderRadius: '8px',

                                    marginBottom: '30px',

                                    padding: '20px',
                                    boxShadow: '0 6px 8px rgba(0,0,0,0.1)',
                                }}
                            >
                                {/* Immagine del prodotto */}
                                <img
                                    src={product.image_url}
                                    className="me-3"
                                    alt={product.name}
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        objectFit: 'contain',
                                        borderRadius: '8px',
                                    }}
                                />
                                <div style={{ flex: 1 }}>
                                    <div className='promotion'>
                                        <span>Offerta! </span>
                                        <span>{product.discounted_price}</span>
                                    </div>
                                    <h5 className="mb-2">{product.name}</h5>
                                    <p>Prezzo precedente: <del>{formatPrice(product.price)}</del></p>
                                    <p className="mb-0" style={{ fontWeight: 'bold' }}></p>
                                    <Link to={`/prodotti/${product.slug}`} className="btn btn-primary mt-2">
                                        Vedi Dettagli
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default DiscountedProducts;
