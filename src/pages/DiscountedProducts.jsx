import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { GrSort } from "react-icons/gr";

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

    if (loading) return <p>Caricamento...</p>;
    if (error) return <p>Errore: {error}</p>;

    return (
        <>
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
                                    <img
                                        src={product.image_url}
                                        className="card-img-top"
                                        alt={product.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text"><del>{product.price} €</del></p>
                                        <p className="card-text text-success" style={{ fontWeight: 'bold' }}>
                                            {product.discounted_price} €
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
                                    marginBottom: '30px',  // Distanza tra le card
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
                                    <h5 className="mb-2">{product.name}</h5>
                                    <p className="mb-2"><del>{product.price} €</del></p>
                                    {/* Prezzo scontato in verde */}
                                    <p className="mb-0 text-success" style={{ fontWeight: 'bold' }}>
                                        {product.discounted_price} €
                                    </p>
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
