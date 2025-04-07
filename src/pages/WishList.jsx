import { useGlobalContext } from '../context/GlobalContext';
import { Link } from 'react-router-dom';

function WishList() {
    const { wishList, rimuoviDallaWishList, svuotaWishList } = useGlobalContext();

    return (
        <div>
            <div className='container'>
                <h1 className='text-center'>WishList</h1>
                <div className='row'>
                    {wishList.map((product) => (
                        <div className="card" key={product.slug}>
                            <img src={product.image_url} className="card-img-top" alt={product.name} />
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>

                                {/* Aggiunto d-flex per affiancare i bottoni */}
                                <div className="d-flex gap-2">
                                    <button onClick={() => rimuoviDallaWishList(product.slug)} className='btn btn-danger flex-grow-1'>
                                        Rimuovi dalla WishList
                                    </button>
                                    <Link to={`/prodotti/${product.slug}`} className="btn btn-primary flex-grow-1">
                                        Vedi Dettagli
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contenitore dei bottoni */}
            <div className="button-container">
                <button className="empty-cart-btn" onClick={svuotaWishList}>Svuota WishList</button>
            </div>
        </div>
    );
}

export default WishList;
