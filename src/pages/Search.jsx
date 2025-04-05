import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { GrSort } from "react-icons/gr";

const Search = () => {
    const { term } = useParams(); //2

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isGridView, setIsGridView] = useState(true); // Stato per la visualizzazione

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
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, [term]);

    if (loading) return <p>Caricamento...</p>;
    if (error) return <p>Errore: {error}</p>;

    // Variabile per tracciare se un prodotto è stato trovato
    let prodottoTrovato = false;

    // Ciclo for con let i per controllare ogni prodotto
    for (let i = 0; i < products.length; i++) {
        if (products[i].name.toLowerCase().includes(term.toLowerCase()) || products[i].description.toLowerCase().includes(term.toLowerCase())) {
            prodottoTrovato = true;
            break; // Esci dal ciclo appena trovi un prodotto che corrisponde
        }
    }

    // Se non è stato trovato nessun prodotto che soddisfa la condizione, mostriamo il messaggio
    if (!prodottoTrovato) {
        return <p>Prodotto non trovato</p>;
    }

    return (
        <>
            <h4 className='products-container'>Risultati di ricerca: <span className='fw-bold'>{products.length}</span></h4>
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
                            <p className="card-text">{product.price} €</p>
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