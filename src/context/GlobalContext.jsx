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
            // Mostra toast di aggiornamento quantità
            setToastMessage({
                title: "Carrello aggiornato",
                text: `La quantità di ${prodotto.name} è stata aggiornata nel carrello!`,
                type: "info"
            });
        } else {
            setCarrello([...carrello, { ...prodotto, quantity }]);
            // Mostra toast di aggiunta al carrello
            setToastMessage({
                title: "Aggiunto al Carrello",
                text: `${prodotto.name} è stato aggiunto al tuo carrello!`,
                type: "success"
            });
        }
        handleShowToast();
    };

    const aggiungiAllaWishList = (prodotto) => {
        const prodottoEsistente = wishList.find((item) => item.slug === prodotto.slug);
        if (!prodottoEsistente) {
            setWishList([...wishList, prodotto]);
            // Mostra toast di successo
            setToastMessage({
                title: "Aggiunto alla Wishlist",
                text: `${prodotto.name} è stato aggiunto alla tua lista dei desideri!`,
                type: "success"
            });
            handleShowToast();
        } else {
            // Mostra toast di avviso
            setToastMessage({
                title: "Attenzione",
                text: "Il prodotto è già presente nella tua lista dei desideri!",
                type: "warning"
            });
            handleShowToast();
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

//NOTE - Toast

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState({
        title: "",
        text: "",
        type: "success" // Valori possibili: success, warning, info
    });

    const handleShowToast = () => {
        setShowToast(true);
        // Nasconde automaticamente dopo 5 secondi
        setTimeout(() => setShowToast(false), 5000);
    };

    const handleCloseToast = () => {
        setShowToast(false);
    };

    // Funzione generica per mostrare un toast
    const showToastMessage = (title, text, type = "success") => {
        setToastMessage({ title, text, type });
        handleShowToast();
    };
     


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
        setWishList,
        handleShowToast,
        handleCloseToast,
        showToast,
        setShowToast,
        toastMessage,
        setToastMessage,
        showToastMessage
    };



    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalProvider, useGlobalContext };