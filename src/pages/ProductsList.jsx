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

    if (loading) return (

        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ height: '100vh' }}
        >
            <p>Caricamento...</p>
        </div >
    );

    if (error) return <p>Errore: {error}</p>;

<<<<<<< HEAD
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
        {isGridView ? (
            // Grid View
            <div className="products-container grid-view">
                {products.map(product => (
                    <div className="products-card" key={product.id}>
                        <img src={product.image_url} className="card-img-top" alt={product.name} />
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.price} €</p>
                            <Link to={`/prodotti/${product.slug}`} className="btn btn-success">
                                Vedi Dettagli
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            // List View
             <div className="container">
        <div className="list-group list-group-flush">
            {products.map((product) => (
                <div className="list-group-item py-4" key={product.id}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img 
                                src={product.image_url} 
                                className="img-fluid p-3" 
                                alt={product.name}
                                style={{ objectFit: 'contain', height: '250px', width: '100%' }}
                            />
                        </div>
                        <div className="col-md-8">
                            <div className="h-100 d-flex flex-column justify-content-between">
                                <div>
                                    <h4 className="mb-3">{product.name}</h4>
                                    <p className="text-muted mb-3">{product.brand}</p>
                                    <p className="mb-3">{product.description}</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="mb-0 fw-bold">{product.price} €</h5>
                                    <Link to={`/prodotti/${product.slug}`} className="btn btn-success">
                                        Vedi Dettagli
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
        )}
    </>
);
=======
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
                            {product.discounted_price !== null ? <p className="card-text">{product.discounted_price}€</p> : <p className="price">{product.price}€</p>}
                            <Link to={`/prodotti/${product.slug}`} className="btn btn-primary">
                                Vedi Dettagli
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
>>>>>>> 15c7d4b6f9c3bda42d1be9b9c8e4d12c7e4f46ec
}

export default ProductList;