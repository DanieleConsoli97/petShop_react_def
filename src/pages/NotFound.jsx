import { Link, useLocation } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
    const location = useLocation();

    return (
        <div className="not-found-container">
            <img 
                src="/PawPlanet.logo(3).png" 
                alt="PawPlanet Logo" 
                className="not-found-logo" 
            />
            <h1 className="not-found-title">404 - Pagina non trovata</h1>
            <p className="not-found-message lead">La pagina <strong>{location.pathname}</strong> che stai cercando non esiste o è stata spostata.</p>
            <p>Puoi tornare alla home page.</p>
            <div className="not-found-buttons">
                <Link to="/" className="btn btn-primary">Torna alla Home</Link>
            </div>
        </div>
    );
}

export default NotFound