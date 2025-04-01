function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
      fetch(`http://localhost:3000/products/${id}`) 
          .then(response => {
              if (!response.ok) {
                  throw new Error("Errore durante il recupero del prodotto");
              }
              return response.json();
          })
          .then(data => {
              setProduct(data);
              setLoading(false);
          })
          .catch(err => {
              setError(err.message);
              setLoading(false);
          });
  }, [id]);

  if (loading) return <p>Caricamento...</p>;
  if (error) return <p>Errore: {error}</p>;

  return (
      <div className="product-details">
          <h1>{product.name}</h1>
          <img src={product.image_url} alt={product.name} />
          <p>{product.description}</p>
          <p>Prezzo: €{product.price}</p>
      </div>
  );
}


export default ProductDetails;
