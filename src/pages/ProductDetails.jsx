import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function ProductDetail() {
  const { slug } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    
    fetch(`http://localhost:3000/products/${slug}`) 
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Errore nel recupero del prodotto:", error));
  }, [slug]);

  if (!product) {
    return <div>Caricamento...</div>;
  }
  console.log(product?.image_url);
  console.log(product)

  return (
    <>  
      <div className="product-detail">
        <h1>{product.name}</h1>
        <img src={product?.image_url} className="product-image" alt={product.name} />
        <p>{product.description}</p>
        <p>Prezzo: €{product.price}</p>
      </div>
    </>
  );


}


export default ProductDetail;