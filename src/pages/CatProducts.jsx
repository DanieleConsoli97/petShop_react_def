import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

function CatProducts() {
    const [catProducts, setCatProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        fetch('http://localhost:3000/prodotti/gatti')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Errore durante il recupero dei prodotti');
                }
                return response.json();
            })
            .then(data => {
                setCatProducts(data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const [quantity, setQuantity] = useState(1);
    
        // Funzioni per gestire il cambiamento della quantità
        const handleDecrease = () => {
            if (quantity > 1) setQuantity(quantity - 1); // Riduci solo se la quantità è maggiore di 1
        };
    
        const handleIncrease = () => {
            if (quantity < 10) setQuantity(quantity + 1); // Aumenta solo se la quantità è inferiore a 10
        };
    
        const handleQuantityChange = (event) => {
            // Ottieni il valore e limitato tra 1 e 10
            const value = Math.max(1, Math.min(10, parseInt(event.target.value) || 1));
            setQuantity(value);
        };
    
        const handleAddToCart = () => {
            aggiungiAlCarrello(product, quantity); // Passa il prodotto e la quantità
        };

    if (loading) return <p>Caricamento...</p>;
    if (error) return <p>Errore: {error}</p>;

    return (
        <div>
            <h1>Lista Prodotti Gatti</h1>
            {catProducts.map(product => (
                        <div className="card" key={product.id}>
                            <img src={product.image_url} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.price} €</p>
                                <Link to={`/prodotti/${product.slug}`} className="btn btn-primary">
                                    Vedi Dettagli
                                </Link>
                                {/* Selettore quantità */}
                        <div className="quantity-container">
                            <button className="quantity-btn" onClick={handleDecrease}>-</button>
                            <input
                                type="number"
                                value={quantity}
                                className="quantity-input"
                                onChange={handleQuantityChange} // Gestione del cambio quantità
                                min="1"
                                max="10"
                            />
                            <button className="quantity-btn" onClick={handleIncrease}>+</button>
                        </div>
                        <button onClick={handleAddToCart} className="btn btn-primary mt-3">Aggiungi al Carrello</button>

                            </div>
                        </div>
                ))}
        </div>
    );
}

export default CatProducts;