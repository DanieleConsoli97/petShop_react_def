import React, { useEffect, useState } from 'react';

function CatGamesList() {
    const [catGames, setCatGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        fetch('http://localhost:3000/products/gatti/games')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante il recupero dei prodotti');
                }
                return response.json();
            })
            .then(data => {
                setCatGames(data);
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
        <div>
            <h1>Lista Prodotti</h1>
            <ul>
                {catGames.map(product => (
                    <li key={product.id}>
                        <img src={product.image_url} alt={product.name} style={{ width: '50px', height: '50px' }} />
                        {product.description} - {product.price}€
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CatGamesList;