import { Link } from 'react-router-dom';

function CheckouDone() {

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
                    <h1 className="display-4 mb-3">Grazie per aver scelto PawPlanet!</h1>
                    <p className="lead mb-4">Il tuo ordine è stato ricevuto, a breve riceverai una mail di conferma.</p>
                    <p className="mb-4">Puoi tornare alla home page.</p>
                    <div className="mt-4">
                        <Link to="/" className="btn btn-primary my-4">Torna alla Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckouDone