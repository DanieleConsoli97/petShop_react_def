import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import PathNav from "../components/PathNav"

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
      <Navbar/>
      <PathNav/>
      
      <div className="product-detail">
        <h1>{product.name}</h1>
        <img src={product?.image_url} className="product-image" alt={product.name} />
        <p>{product.description}</p>
        <p><span className="price-label">Prezzo: </span>€{product.price}</p>
      </div>
    </>
  );


}


export default ProductDetail;