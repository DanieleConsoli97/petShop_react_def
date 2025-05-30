import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';
import HoldButton from '../components/HoldButton';

function WishList() {
    const { wishList, rimuoviDallaWishList, svuotaWishList, aggiungiAlCarrello } = useGlobalContext();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(price);
    };

    return (
        <div>
            <div className='container'>
                <h1 className='text-center'>La tua lista dei desideri</h1>

                {wishList.length === 0 ? (
                    <p className="text-center">
                        La tua WishList è vuota, prendi ispirazione da <Link className='link-underline link-underline-opacity-0 text-warning' to="/prodotti">qui</Link>!
                    </p>
                ) : (
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {wishList.map((product) => (
                            <div className="col" key={product.slug}>
                                <div className="card h-100 card-image">
                                    <img
                                        className="card-img-top"
                                        src={product.image_url}
                                        alt={product.name}
                                        style={{ objectFit: 'cover', height: '200px' }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h6 className="card-title fs-6 text-center mb-2">{product.name}</h6>

                                        {product.discounted_price !== null ? (
                                            <p className="price text-center mb-3">{formatPrice(product.discounted_price)}</p>
                                        ) : (
                                            <p className="price text-center mb-3">{formatPrice(product.price)}</p>
                                        )}

                                        <div className="card-footer bg-white border-0 mt-auto">
                                            {/* Riga con icone azioni rapide */}
                                            <div className="d-flex justify-content-around align-items-center mb-4">
                                                <HoldButton
                                                    onHold={() => rimuoviDallaWishList(product.slug)}
                                                    className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center"
                                                    style={{ width: '36px', height: '36px', borderRadius: '50%' }}
                                                    title="Rimuovi dalla lista"
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </HoldButton>

                                                <Link
                                                    to={`/prodotti/${product.slug}`}
                                                    className="btn btn-outline-primary btn-sm d-flex align-items-center justify-content-center"
                                                    style={{ width: '36px', height: '36px', borderRadius: '50%' }}
                                                    title="Dettagli prodotto"
                                                >
                                                    <i className="fas fa-info-circle"></i>
                                                </Link>
                                            </div>

                                            {/* Bottone Aggiungi al carrello */}
                                            <button
                                            className="btn btn-success btn-sm w-100 mt-auto"
                                            onClick={() => {
                                                aggiungiAlCarrello(product, 1);        
                                                rimuoviDallaWishList(product.slug);   
                                              }}
                                            >
                                            <i className="fas fa-cart-plus me-1"></i>
                                                Aggiungi al carrello
                                            </button>
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
