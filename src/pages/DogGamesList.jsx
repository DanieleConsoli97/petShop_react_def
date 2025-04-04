import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function DogGamesList() {
    const [dogGames, setDogGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isGridView, setIsGridView] = useState(true); // Stato per la visualizzazione

    useEffect(() => {
        fetch('http://localhost:3000/prodotti/cani/giochi')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante il recupero dei prodotti');
                }
                return response.json();
            })
            .then(data => {
                setDogGames(data);
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
            <h1 className='text-center my-4'>Giochi per Cani</h1>
            <div className="d-flex justify-content-end mb-3">
                <button className={`btn btn-outline-primary me-2 ${isGridView ? 'active' : ''}`} onClick={() => setIsGridView(true)}>
                    Griglia
                </button>
                <button className={`btn btn-outline-primary ${!isGridView ? 'active' : ''}`} onClick={() => setIsGridView(false)}>
                    Lista
                </button>
            </div>
            <div className={`products-container ${isGridView ? 'grid-view' : 'list-view'}`}>
                {dogGames.map(product => (
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
}

export default DogGamesList;