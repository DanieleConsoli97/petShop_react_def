import React, { useEffect, useState } from 'react'; 
import { Link } from "react-router-dom";

function DogFoodList() {
    const [dogFood, setdogFood] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        fetch('http://localhost:3000/prodotti/cani/cibo')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante il recupero dei prodotti');
                }
                return response.json();
            })
            .then(data => {
                setdogFood(data);
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
            <h1>Lista Cibo Cani</h1>
            {dogFood.map(product => (
                                    <div className="card" key={product.id}>
                                        <img src={product.image_url} className="card-img-top" alt={product.name} />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.price} €</p>
                                            <Link to={`/prodotti/${product.slug}`} className="btn btn-primary">
                                                Vedi Dettagli
                                            </Link>
                                        </div>
                                    </div>
                            ))}
        </div>
    );
}

export default DogFoodList;