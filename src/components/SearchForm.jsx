import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
    const [searchTerm, setSearchTerm] = useState(''); // Stato per memorizzare il termine di ricerca
    const navigate = useNavigate(); // Hook per navigare tramite React Router

    // Gestore dell'evento di cambio del campo di input
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Gestore dell'evento di submit del form
    const handleSearchSubmit = (e) => {
        e.preventDefault(); // Previeni il comportamento di submit predefinito
        if (searchTerm.trim()) {
            // Naviga alla pagina dei risultati aggiungendo il termine di ricerca nell'URL
            navigate(`prodotti/search/${searchTerm}`);
            setSearchTerm('');
        }
    };

    return (
        <div onSubmit={handleSearchSubmit} className="mx-auto search-container">
            <form className="d-flex">
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
        </div>
    );
};

export default SearchForm;
