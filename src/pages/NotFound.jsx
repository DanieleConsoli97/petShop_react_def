import { Link, useLocation } from 'react-router-dom';

function NotFound() {
    const location = useLocation();

    return (
        <div className="container mt-5 text-center">
            <div className="row justify-content-center ">
                <div className="col-md-8">
                    <img 
                        src="/PawPlanet.logo(3).png" 
                        alt="PawPlanet Logo" 
                        className="img-fluid mb-4" 
                        style={{ maxWidth: '150px' }}
                    />
                    <h1 className="display-4 text-danger mb-3">404 - Pagina non trovata</h1>
                    <p className="lead mb-4">La pagina <strong>{location.pathname}</strong> che stai cercando non esiste o è stata spostata.</p>
                    <p className="mb-4">Puoi tornare alla home page.</p>
                    <div className="mt-4">
                        <Link to="/" className="btn btn-primary my-4">Torna alla Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFound