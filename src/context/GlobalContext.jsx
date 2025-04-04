import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [carrello, setCarrello] = useState(() => {
        // Inizializzo il carello con i dati presenti nel LocalStorage, se non ci sono dati lo inizializzo come array vuoto
        return JSON.parse(localStorage.getItem('carrello')) || [];
    });

    const [wishList, setWishList] = useState(() => {
        // Inizializzo la wishList con i dati presenti nel LocalStorage, se non ci sono dati lo inizializzo come array vuoto
        return JSON.parse(localStorage.getItem('wishList')) || [];
    });

    useEffect(() => {
        localStorage.setItem('carrello', JSON.stringify(carrello));
        localStorage.setItem('wishList', JSON.stringify(wishList));
    }, [carrello, wishList]);

    const aggiungiAlCarrello = (prodotto, quantity) => {
        const prodottoEsistente = carrello.find((item) => item.slug === prodotto.slug);
        if (prodottoEsistente) {
            setCarrello(carrello.map((item) =>
                item.slug === prodotto.slug ? { ...item, quantity: item.quantity + quantity } : item
            ));
        } else {
            setCarrello([...carrello, { ...prodotto, quantity }]);
        }
    };

    const aggiungiAllaWishList = (prodotto) => {
        const prodottoEsistente = wishList.find((item) => item.slug === prodotto.slug);
        if (!prodottoEsistente) {
            setWishList([...wishList, prodotto]);
        } else {
            alert('Il prodotto è già presente nella tua lista dei desideri!');
        }
    };

    const rimuoviDalCarrello = (prodottoSlug) => {
        setCarrello(carrello.filter((item) => item.slug !== prodottoSlug));
    };

    const rimuoviDallaWishList = (prodottoSlug) => {
        setWishList(wishList.filter((item) => item.slug !== prodottoSlug));
    };

    const svuotaCarrello = () => {
        localStorage.removeItem('carrello');
        setCarrello([]);
    };

    const svuotaWishList = () => {
        localStorage.removeItem('wishList');
        setWishList([]);
    }

    const value = {
        carrello,
        aggiungiAlCarrello,
        rimuoviDalCarrello,
        svuotaCarrello,
        setCarrello, // Aggiunto per eventuali modifiche esterne
        wishList,
        aggiungiAllaWishList,
        rimuoviDallaWishList,
        svuotaWishList,
        setWishList
    };

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };