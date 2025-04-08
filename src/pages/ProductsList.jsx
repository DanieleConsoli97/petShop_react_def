import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { GrSort } from "react-icons/gr";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isGridView, setIsGridView] = useState(true); // Stato per la visualizzazione

    useEffect(() => {
        fetch('http://localhost:3000/prodotti')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante il recupero dei prodotti');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Funzione per formattare il prezzo come valuta
    const formatPrice = (price) => {
        return new Intl.NumberFormat('it-IT', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(price);
    };

    if (loading) return (
        <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <p>Caricamento...</p>
        </div>
    );

    if (error) return <p>Errore: {error}</p>;

    return (
        <>
            <h1 className='text-center my-4'>Lista Prodotti</h1>
            <div className="container d-flex justify-content-end mb-3">
                <button className={`btn btn-outline-success me-2 ${isGridView ? 'active' : ''}`} onClick={() => setIsGridView(true)}>
                    <BsFillGrid3X3GapFill />
                </button>
                <button className={`btn btn-outline-success ${!isGridView ? 'active' : ''}`} onClick={() => setIsGridView(false)}>
                    <GrSort />
                </button>
            </div>
            <div className={`products-container ${isGridView ? 'grid-view' : 'list-view'}`}>
                {products.map(product => (
                    <div className={`products-card ${isGridView ? '' : 'list-item'}`} key={product.id}>
                        <img src={product.image_url} className={`card-img-top ${isGridView ? '' : 'list-image'}`} alt={product.name} />
                        <div className={`card-body ${isGridView ? '' : 'list-body'}`}>
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{formatPrice(product.price)}</p>
                            <Link to={`/prodotti/${product.slug}`} className="btn btn-primary">
                                Vedi Dettagli
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ProductList;
