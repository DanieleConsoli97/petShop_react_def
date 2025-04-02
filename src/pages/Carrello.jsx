import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Carrello() {
  const [carrello, setCarrello] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [indirizzoSpedizione, setIndirizzoSpedizione] = useState('');
  const [indirizzoFatturazione, setIndirizzoFatturazione] = useState('');

  useEffect(() => {
    const carrelloLocale = JSON.parse(localStorage.getItem('carrello')) || [];
    setCarrello(carrelloLocale);
  }, []);

  useEffect(() => {
    localStorage.setItem('carrello', JSON.stringify(carrello));
  }, [carrello]);

  const aggiungiAlCarrello = async (prodottoId) => {
    try {
      const risposta = await axios.get(`/api/products/${prodottoId}`);
      const prodotto = risposta.data;
      const prodottoEsistente = carrello.find((item) => item.id === prodotto.id);
      if (prodottoEsistente) {
        setCarrello(carrello.map((item) => (item.id === prodotto.id ? { ...item, quantity: item.quantity + 1 } : item)));
      } else {
        setCarrello([...carrello, { ...prodotto, quantity: 1 }]);
      }
    } catch (errore) {
      console.error('Errore durante l\'aggiunta al carrello:', errore);
    }
  };

  const rimuoviDalCarrello = (prodottoId) => {
    setCarrello(carrello.filter((item) => item.id !== prodottoId));
  };

  const svuotaCarrello = () => {
    localStorage.removeItem('carrello');
    setCarrello([]);
  };

  const inviaOrdine = async () => {
    try {
      await axios.post('/api/orders', {
        name: nome,
        email: email,
        shippingAddress: indirizzoSpedizione,
        billingAddress: indirizzoFatturazione,
        cartItems: carrello,
      });
      alert('Ordine inviato con successo!');
      svuotaCarrello();
    } catch (errore) {
      console.error('Errore durante l\'invio dell\'ordine:', errore);
      alert('Errore durante l\'invio dell\'ordine.');
    }
  };

  return (
    <div>
      {/* Visualizzazione del carrello */}
      {/* Form per l'invio dell'ordine */}
      {/* ... */}
      <button onClick={inviaOrdine}>Invia Ordine</button>
    </div>
  );
}

export default Carrello;