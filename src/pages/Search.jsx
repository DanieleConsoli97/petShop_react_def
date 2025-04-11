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
    const [noResults, setNoResults] = useState(false); // Nuovo stato per indicare nessun risultato

    // Funzione per alternare la visibilità dei prodotti scontati
    const handleClickDiscountedProducts = () => {
        setShowDiscountedProducts(!showDiscountedProducts);
    };

    useEffect(() => {
        setLoading(true); // Imposta il caricamento all'inizio di ogni fetch
        setError(null);   // Resetta l'errore
        setNoResults(false); // Resetta lo stato di "nessun risultato"

        fetch(`http://localhost:3000/prodotti/search/${term}`)
            .then(response => {
                if (!response.ok) {
                    // Se la risposta non è OK, proviamo a leggere il JSON per un eventuale messaggio di errore
                    return response.json().then(errData => {
                        throw new Error(errData.message || 'Errore durante il recupero dei prodotti');
                    });
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setProducts(data);
                    const discounted = data.filter(product => product.discounted_price > 0);
                    setDiscountedProducts(discounted);
                    setNoResults(data.length === 0); // Imposta noResults se l'array è vuoto
                } else {
                    // Se data non è un array, potrebbe essere un messaggio di "nessun risultato" dal server
                    console.warn("Risposta inattesa dal server:", data);
                    setProducts([]);
                    setDiscountedProducts([]);
                    setNoResults(true);
                }
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [term]);

    if (loading) return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ height: '100vh' }}
        >
            <p>Caricamento...</p>
        </div >
    );
    if (error) return <p>Errore: {error}</p>;
    if (noResults) return <h2 className='text-center my-4'>Nessun prodotto trovato per il termine "{term}"</h2>;

    const formatPrice = (price) => {
        return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(price);
    };

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
                            <div className='promotion'>
                                <span>Offerta! </span>
                                <span><del>{product.price}</del></span>
                            </div>
                        )}
                        <img src={product.image_url} className={`card-img-top ${isGridView ? '' : 'list-image'}`} alt={product.name} />
                        <div className={`card-body ${isGridView ? '' : 'list-body'}`}>
                            <h5 className="card-title">{product.name}</h5>
                            {product.discounted_price !== null ? <p className="price">{formatPrice(product.discounted_price)}</p> : <p className="price">{formatPrice(product.price)}</p>}

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