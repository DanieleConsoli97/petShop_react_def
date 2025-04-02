import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

const Search = () => {

    const { term } = useParams(); //2

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/products/search/${term}`)
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
        if (products[i].name.toLowerCase().includes(term.toLowerCase())||products[i].description.toLowerCase().includes(term.toLowerCase())) {
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
            <p>Risultati di ricerca: {products.length}</p>
            {products.map(product => (
                <div className="card" key={product.id}>
                    <img src={product.image_url} className="card-img-top" alt={product.name} />
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text">€{product.price}</p>
                        <Link to={`/products/${product.slug}`} className="btn btn-primary">
                            Vedi Dettagli
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
};
export default Search