import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

function WishList() {
    const { wishList, rimuoviDallaWishList, svuotaWishList } = useGlobalContext();
    const formatPrice = (price) => {
        return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(price);
    };

    return (
        <div>
            <div className='container'>
                <h1 className='text-center'>WishList</h1>

                {wishList.length === 0 ? (
                    <p className="text-center">
                        La tua WishList è vuota, prendi ispirazione da <Link className='link-underline link-underline-opacity-0 text-warning' to="/prodotti">qui</Link> !
                    </p>
                ) : (
                    <div className="row row-cols-1 row-cols-md-5 g-4">
                        {wishList.map((product) => (
                            <div className="col" key={product.slug}>
                                <div className="card h-100">
                                    <img className="card-img-top" src={product.image_url} alt={product.name} style={{objectFit: 'cover', height: '200px'}} />
                                    <div className="card-body d-flex flex-column">
                                        <h6 className="card-title fs-6 text-center mb-2">{product.name}</h6>
                                        {product.discounted_price !== null ? 
                                            <p className="price text-center mb-3">{formatPrice(product.discounted_price)}</p> 
                                            : 
                                            <p className="price text-center mb-3">{formatPrice(product.price)}</p>}
                                        <div className="card-footer bg-white border-0 p-0 mt-auto">
                                            <div className="d-flex justify-content-between gap-2">
                                                <button
                                                    onClick={() => rimuoviDallaWishList(product.slug)}
                                                    className="btn btn-danger btn-sm flex-grow-1 py-1"
                                                >
                                                    <i className="fas fa-trash-alt me-1"></i>
                                                    Rimuovi
                                                </button>
                                                <Link 
                                                    to={`/prodotti/${product.slug}`} 
                                                    className="btn btn-primary btn-sm py-1"
                                                    style={{whiteSpace: 'nowrap'}}
                                                >
                                                    <i className="fas fa-info-circle me-1"></i>
                                                    Dettagli
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {wishList.length > 0 && (
                <div className="text-center my-4">
                    <button
                        className="btn btn-danger btn-sm"
                        onClick={svuotaWishList}
                    >
                        <i className="fas fa-trash me-1"></i>
                        Svuota WishList
                    </button>
                </div>
            )}
        </div>
    );
}

export default WishList;