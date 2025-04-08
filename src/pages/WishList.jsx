import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

function WishList() {
    const { wishList, rimuoviDallaWishList, svuotaWishList } = useGlobalContext();

    return (
        <div>
            <div className='container'>
                <h1 className='text-center'>WishList</h1>

                {wishList.length === 0 ? (
                    <p className="text-center">
                        La tua WishList è vuota. prendi ispirazione da <Link className='link-underline link-underline-opacity-0 text-warning' to="/prodotti">qui</Link> !!!
                    </p>
                ) : (
                    <div className='row'>
                        {wishList.map((product) => (
                            <div className="card" key={product.slug}>
                                <img src={product.image_url} className="card-img-top" alt={product.name} />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <div className="d-flex gap-2">
                                        {/* Bottone con l'icona di rimozione dalla wishlist */}
                                        <button
                                            onClick={() => rimuoviDallaWishList(product.slug)}
                                            className="btn-icon-text red-btn flex-grow-1"
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                            Rimuovi dalla WishList
                                        </button>
                                        {/* Bottone per vedere i dettagli del prodotto */}
                                        <Link to={`/prodotti/${product.slug}`} className="btn-icon-text blue-btn flex-grow-1">
                                            Vedi Dettagli
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Contenitore dei bottoni per svuotare la wishlist con margine inferiore */}
            {wishList.length > 0 && (
                <div className="button-container mb-5">
                    <button
                        className="btn-icon-text red-btn"
                        onClick={svuotaWishList}
                    >
                        <i className="fas fa-trash"></i>
                        Svuota WishList
                    </button>
                </div>
            )}
        </div>
    );
}

export default WishList;
