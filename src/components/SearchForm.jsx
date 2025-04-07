import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchForm = () => {
    // useState per gestire lo stato del termine di ricerca, dei risultati della ricerca,
    // della visibilità dei risultati e dei prodotti recuperati dal backend.
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [products, setProducts] = useState([]);

    // Hook per la navigazione e per ottenere la posizione corrente.
    const navigate = useNavigate();
    const location = useLocation();

    // useEffect per recuperare i prodotti dal backend al montaggio del componente.
    useEffect(() => {
        fetch('http://localhost:3000/prodotti')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Errore nel recupero dei prodotti:', error));
    }, []); // Array di dipendenze vuoto per eseguire l'effetto solo una volta.

    // Gestore dell'evento di cambio del campo di input.
    const handleInputChange = (e) => {
        const value = e.target.value; // Ottiene il valore del campo di input.
        setSearchTerm(value); // Aggiorna lo stato del termine di ricerca.
        setShowResults(true); // Mostra i risultati della ricerca.

        // Filtra i prodotti in base al termine di ricerca.
        if (value.trim()) {
            const filteredResults = products.filter(product =>
                product.name.toLowerCase().includes(value.toLowerCase())
            );
            setSearchResults(filteredResults); // Aggiorna i risultati della ricerca.
        } else {
            setSearchResults([]); // Se il termine di ricerca è vuoto, svuota i risultati.
        }
    };

    // Gestore dell'evento di submit del form.
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Impedisce il comportamento di submit predefinito.
        if (searchTerm.trim()) {
            navigate(`prodotti/search/${searchTerm}`); // Naviga alla pagina dei risultati.
            setSearchTerm(''); // Resetta il termine di ricerca.
            setShowResults(false); // Nasconde i risultati della ricerca.
        }
    };

    // Gestore del click su un prodotto nei risultati della ricerca.
    const handleProductClick = (slug) => {
        navigate(`/prodotti/${slug}`); // Naviga alla pagina di dettaglio del prodotto.
        setShowResults(false); // Nasconde i risultati della ricerca.
    };

    // useEffect per nascondere i risultati della ricerca se si è nella pagina dei risultati.
    useEffect(() => {
        if (location.pathname.startsWith('/prodotti/search/')) {
            setShowResults(false);
        }
    }, [location]); // Esegue l'effetto ogni volta che la posizione cambia.

    return (
        <div className="ms-auto search-container">
            <form onSubmit={handleSearchSubmit} className="d-flex">
                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Cerca prodotti..."
                    value={searchTerm}
                    onChange={handleInputChange}
                    aria-label="Search"
                />
                <button className="btn btn-outline-success" type="submit">
                    Cerca
                </button>
            </form>
            {showResults && searchResults.length > 0 && (
                <div className="search-results-dropdown">
                    {searchResults.map(result => (
                        <div
                            key={result.id}
                            className="search-result-item"
                            onClick={() => handleProductClick(result.slug)}
                        >
                            {result.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchForm;