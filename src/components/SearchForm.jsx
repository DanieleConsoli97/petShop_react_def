import React, { useState, useEffect } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom'; 

const SearchForm = () => { 
    const [searchTerm, setSearchTerm] = useState(''); 
    const [searchResults, setSearchResults] = useState([]); 
    const [showResults, setShowResults] = useState(false); 
    const [products, setProducts] = useState([]); 

    const navigate = useNavigate(); 
    const location = useLocation(); 

    useEffect(() => { 
        fetch('http://localhost:3000/prodotti') 
            .then(response => response.json()) 
            .then(data => setProducts(data)) 
            .catch(error => console.error('Errore nel recupero dei prodotti:', error)); 
    }, []); 

    
    useEffect(() => { 
        if (!location.pathname.startsWith('/prodotti/search/') && searchTerm !== '') {
            setSearchTerm('');
            setSearchResults([]);
            setShowResults(false);
        }
    }, [location]); 

    const handleInputChange = (e) => { 
        const value = e.target.value; 
        setSearchTerm(value); 
        setShowResults(true); 

        if (value.trim()) { 
            const filteredResults = products.filter(product => 
                product.name.toLowerCase().includes(value.toLowerCase()) || 
                product.description.toLowerCase().includes(value.toLowerCase()) 
            ); 
            setSearchResults(filteredResults); 
        } else { 
            setSearchResults([]); 
        } 
    }; 

    const handleSearchSubmit = (e) => { 
        e.preventDefault(); 
        if (searchTerm.trim()) { 
            navigate(`prodotti/search/${searchTerm}`); 
            setShowResults(false); 
        } 
    }; 

    const handleProductClick = (slug) => { 
        navigate(`/prodotti/${slug}`); 
        setShowResults(false); 
    }; 

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