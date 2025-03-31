import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/petshop/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel recupero del prodotto");
        }
        return response.json();
      })
      .then((data) => setProduct(data))
      .catch((error) => console.error("Errore:", error));
  }, [id]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`${product.name} è stato aggiunto al carrello!`);
  };

  if (!product) {
    return <div>Caricamento...</div>;
  }

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card" style={{ width: "18rem" }}>
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><strong>Price:</strong> ${product.price}</p>
                <button onClick={() => addToCart(product)} className="btn btn-primary">
                  Aggiungi al carrello
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;