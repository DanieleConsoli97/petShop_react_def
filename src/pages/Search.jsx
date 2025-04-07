import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { GrSort } from "react-icons/gr";

const Search = () => {
    const { term } = useParams(); // Parametro di ricerca

    const [products, setProducts] = useState([]);
    const [discountedProducts, setDiscountedProducts] = useState([]); 
    const [showDiscountedProducts, setShowDiscountedProducts] = useState(false); // Stato per mostrare i prodotti scontati
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isGridView, setIsGridView] = useState(true); // Stato per la visualizzazione

    // Funzione per alternare la visibilità dei prodotti scontati
    const handleClickDiscountedProducts = () => {
        setShowDiscountedProducts(!showDiscountedProducts);
    };

    useEffect(() => {
        fetch(`http://localhost:3000/prodotti/search/${term}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante il recupero dei prodotti');
                }
                return response.json();
            })
            .then(data => {
                setProducts(data);

                // Filtra i prodotti scontati
                const discounted = data.filter(product => product.discounted_price > 0);
                setDiscountedProducts(discounted); // Imposta i prodotti scontati

                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [term]);

    if (loading) return <p>Caricamento...</p>;
    if (error) return <p>Errore: {error}</p>;

    // Se nessun prodotto corrisponde alla ricerca, mostriamo un messaggio
    let prodottoTrovato = products.some(product => 
        product.name.toLowerCase().includes(term.toLowerCase()) || 
        product.description.toLowerCase().includes(term.toLowerCase())
    );

    if (!prodottoTrovato) {
        return <p>Prodotto non trovato</p>;
    }

    // Se vogliamo visualizzare solo i prodotti scontati
    const displayedProducts = showDiscountedProducts ? discountedProducts : products;

    return (
        <>
            <h4 className='products-container'>
                Risultati di ricerca: <span className='fw-bold text-warning'>{displayedProducts.length}</span>
            </h4>
            <div className="container d-flex justify-content-end mb-3">
                <button className='btn btn-outline-success me-2' onClick={handleClickDiscountedProducts}>
                    {showDiscountedProducts ? 'Visualizza tutti i prodotti' : 'Filtra prodotti in offerta'}
                </button>
                <button className={`btn btn-outline-success me-2 ${isGridView ? 'active' : ''}`} onClick={() => setIsGridView(true)}>
                    <BsFillGrid3X3GapFill />
                </button>
                <button className={`btn btn-outline-success ${!isGridView ? 'active' : ''}`} onClick={() => setIsGridView(false)}>
                    <GrSort />
                </button>
            </div>
            <div className={`products-container ${isGridView ? 'grid-view' : 'list-view'}`}>
                {displayedProducts.map(product => (
                    <div className={`products-card ${isGridView ? '' : 'list-item'}`} key={product.id}>
                        {product.discounted_price && (
                            <div className='promotion'>Offerta!</div>
                        )}
                        <img src={product.image_url} className={`card-img-top ${isGridView ? '' : 'list-image'}`} alt={product.name} />
                        <div className={`card-body ${isGridView ? '' : 'list-body'}`}>
                            <h5 className="card-title">{product.name}</h5>
                            {product.discounted_price ? (
                                <p className="card-text">{product.discounted_price} €</p>
                            ) : (
                                <p className="card-text">{product.price} €</p>
                            )}
                            <Link to={`/prodotti/${product.slug}`} className="btn btn-primary">
                                Vedi Dettagli
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Search;
