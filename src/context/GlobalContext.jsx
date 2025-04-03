import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [carrello, setCarrello] = useState([]);

    useEffect(() => {
        const carrelloLocale = JSON.parse(localStorage.getItem('carrello')) || [];
        setCarrello(carrelloLocale);
    }, []);

    useEffect(() => {
        localStorage.setItem('carrello', JSON.stringify(carrello));
    }, [carrello]);

    const aggiungiAlCarrello = async (prodottoSlug) => {
        try {
            const risposta = await axios.get(`/api/prodotti/${prodottoSlug}`);
            const prodotto = risposta.data;
            const prodottoEsistente = carrello.find((item) => item.slug === prodotto.slug);
            if (prodottoEsistente) {
                setCarrello(carrello.map((item) => (item.slug === prodotto.slug ? { ...item, quantity: item.quantity + 1 } : item)));
            } else {
                setCarrello([...carrello, { ...prodotto, quantity: 1 }]);
            }
        } catch (errore) {
            console.error('Errore durante l\'aggiunta al carrello:', errore);
        }
    };

    const rimuoviDalCarrello = (prodottoSlug) => {
        setCarrello(carrello.filter((item) => item.slug !== prodottoSlug));
    };

    const svuotaCarrello = () => {
        localStorage.removeItem('carrello');
        setCarrello([]);
    };

    const value = {
        carrello,
        aggiungiAlCarrello,
        rimuoviDalCarrello,
        svuotaCarrello,
        setCarrello, // Aggiunto per eventuali modifiche esterne
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };