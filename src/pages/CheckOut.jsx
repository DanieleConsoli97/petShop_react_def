//NOTE - Mettere numero order in path ?
// Importazione delle dipendenze necessarie
import { useState } from "react";
import regioniItaliane from "../data/Regioni";
import { useGlobalContext } from "../context/GlobalContext";

// Componente principale per la gestione del checkout
const CheckOut = () => {
    const {carrello} = useGlobalContext ()
    
    // Gestione degli stati del form
    const [isBillingDifferent, setIsBillingDifferent] = useState(false); // Stato per gestire indirizzi di spedizione/fatturazione diversi
    const [errors, setErrors] = useState({}); // Stato per la gestione degli errori di validazione
    
    // Stato per i dati di spedizione
    const [shippingData, setShippingData] = useState({
        nome: '',
        cognome: '',
        email: '',
        indirizzo: '',
        paese: '',
        regione: '',
        citta: '',
        cap: ''
    });

    // Stato per i dati di fatturazione (se diversi dalla spedizione)
    const [billingData, setBillingData] = useState({
        nome: '',
        cognome: '',
        indirizzo: '',
        citta: '',
        regione: '',
        cap: ''
    });

    // Handler per l'aggiornamento dei dati di spedizione
    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShippingData(prev => ({
            ...prev,
            [name]: value
            
        }));
    };

    // Handler per l'aggiornamento dei dati di fatturazione
    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Funzioni di validazione per i campi del form
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const validateCAP = (cap) => {
        return /^\d{5}$/.test(cap);
    };

    const validateName = (name) => {
        return /^[A-Za-zÀ-ÿ\s]+$/.test(name);
    };

    // Funzione principale di validazione del form
    const validateForm = () => {
        const newErrors = {};

        // Validazione dei campi di spedizione
        if (!shippingData.nome.trim()) {
            newErrors.nome = "Il nome è obbligatorio";
        } else if (!validateName(shippingData.nome)) {
            newErrors.nome = "Il nome può contenere solo lettere e spazi";
        }
        if (!shippingData.cognome.trim()) {
            newErrors.cognome = "Il cognome è obbligatorio";
        } else if (!validateName(shippingData.cognome)) {
            newErrors.cognome = "Il cognome può contenere solo lettere e spazi";
        }
        if (!shippingData.email.trim()) {
            newErrors.email = "L'email è obbligatoria";
        } else if (!validateEmail(shippingData.email)) {
            newErrors.email = "Inserisci un'email valida";
        }
        if (!shippingData.indirizzo.trim()) newErrors.indirizzo = "L'indirizzo è obbligatorio";
        if (!shippingData.paese) newErrors.paese = "Il paese è obbligatorio";
        if (!shippingData.regione) newErrors.regione = "La regione è obbligatoria";
        if (!shippingData.citta.trim()) newErrors.citta = "La città è obbligatoria";
        if (!shippingData.cap.trim()) {
            newErrors.cap = "Il CAP è obbligatorio";
        } else if (!validateCAP(shippingData.cap)) {
            newErrors.cap = "Il CAP deve essere composto da 5 numeri";
        }

        // Validazione campi fatturazione se necessario
        if (isBillingDifferent) {
            if (!billingData.indirizzo.trim()) newErrors.billingIndirizzo = "L'indirizzo di fatturazione è obbligatorio";
            if (!billingData.citta.trim()) newErrors.billingCitta = "Il codice fiscale/P.IVA è obbligatorio";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    //FIXME - Dati di esempio del carrello (da sostituire con dati reali)
    const cartItems = carrello
   console.log(cartItems ) 
    // Handler per la gestione dell'invio del form
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Formattazione dell'indirizzo completo
            const formatAddress = (data) => {
                return `${data.indirizzo}, ${data.cap} ${data.citta}, ${data.regione}, ${data.paese}`;
            };

            // Preparazione dei dati per l'invio
            const shippingAddressFormatted = formatAddress(shippingData);
            const billingAddressFormatted = isBillingDifferent ? billingData.indirizzo : shippingAddressFormatted;

            // Costruzione dell'oggetto ordine 
            const orderData = {
                name: shippingData.nome,
                lastName: shippingData.cognome,
                email: shippingData.email,
                shippingAddress: shippingAddressFormatted,
                billingAddress: billingAddressFormatted,
                country: shippingData.paese,
                state: shippingData.regione,
                city: shippingData.citta,
                zipCode: shippingData.cap,
                cartItems: cartItems,
                discountCodeId: null,
                shippingCost: 5.00, // Costo fisso di spedizione
            }
           
            // Invio dei dati dell'ordine al server
            fetch('http://localhost:3000/prodotti/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(text || 'Errore durante la creazione dell\'ordine');
                    });
                }
                return response.json();
            })
            .then(data => {
                console.log('Ordine creato con successo:', data);
                // TODO: Reindirizzare alla pagina di conferma
            })
            .catch(error => {
                console.error('Errore dettagliato:', error);
                setErrors(prev => ({
                    ...prev,
                    submit: error.message || 'Si è verificato un errore durante l\'invio dell\'ordine. Riprova più tardi.'
                }));
            });
        }
    };

    return (
        <div className="container">
            <main>
                <div className="py-5 text-center">
                    <img className="d-block mx-auto mb-4" src="/Planet_1.png" alt="" width="90" height="90" />
                    <h2>Checkout</h2>
                    <p className="lead">Ci sei quasi... Inserisci i dati per la spedizione</p>
                </div>
                <div className="row g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">
                        {/* Sezione carrello rimasta invariata */}
                        <h4 className="d-flex justify-content-between align-items-center mb-3"> {/*NOTE carrello*/}
                            <span className="text-primary">Your cart</span>
                            <span className="badge bg-primary rounded-pill">3</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {/* ... contenuto del carrello ... */}
                        </ul>
                        <form className="card p-2">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Promo code" />
                                <button type="submit" className="btn btn-secondary">Redeem</button>
                            </div>
                        </form>
                    </div>

                    <div className="col-md-7 col-lg-8 mb-5">
                        <h4 className="mb-3">Indirizzo di spedizione</h4>
                        <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.nome ? 'is-invalid' : ''}`}
                                        name="nome"
                                        value={shippingData.nome}
                                        onChange={handleShippingChange}
                                        required
                                    />
                                    {errors.nome && (
                                        <div className="invalid-feedback">
                                            {errors.nome}
                                        </div>
                                    )}
                                </div>

                                <div className="col-sm-6">
                                    <label className="form-label">Cognome</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.cognome ? 'is-invalid' : ''}`}
                                        name="cognome"
                                        value={shippingData.cognome}
                                        onChange={handleShippingChange}
                                        required
                                    />
                                    {errors.cognome && (
                                        <div className="invalid-feedback">
                                            {errors.cognome}
                                        </div>
                                    )}
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        name="email"
                                        value={shippingData.email}
                                        onChange={handleShippingChange}
                                        placeholder="tua-e-mail@example.com"
                                        required
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Indirizzo</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.indirizzo ? 'is-invalid' : ''}`}
                                        name="indirizzo"
                                        value={shippingData.indirizzo}
                                        onChange={handleShippingChange}
                                        placeholder="via ...."
                                        required
                                    />
                                    {errors.indirizzo && (
                                        <div className="invalid-feedback">
                                            {errors.indirizzo}
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Paese</label>
                                    <select
                                        className={`form-select ${errors.paese ? 'is-invalid' : ''}`}
                                        name="paese"
                                        value={shippingData.paese}
                                        onChange={handleShippingChange}
                                        required
                                    >
                                        <option value="">Scegli Paese</option>
                                        <option value="Italia">Italia</option>
                                    </select>
                                    {errors.paese && (
                                        <div className="invalid-feedback">
                                            {errors.paese}
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Regione</label>
                                    <select
                                        className={`form-select ${errors.regione ? 'is-invalid' : ''}`}
                                        name="regione"
                                        value={shippingData.regione}
                                        onChange={handleShippingChange}
                                        required
                                    >
                                        <option value="">Scegli Regione</option>
                                        {regioniItaliane?.map((regione, index) => (
                                            <option key={index} value={regione.nome}>
                                                {regione.nome}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.regione && (
                                        <div className="invalid-feedback">
                                            {errors.regione}
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Città</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.citta ? 'is-invalid' : ''}`}
                                        name="citta"
                                        value={shippingData.citta}
                                        onChange={handleShippingChange}
                                        required
                                    />
                                    {errors.citta && (
                                        <div className="invalid-feedback">
                                            {errors.citta}
                                        </div>
                                    )}
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Codice Postale</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.cap ? 'is-invalid' : ''}`}
                                        name="cap"
                                        value={shippingData.cap}
                                        onChange={handleShippingChange}
                                        required
                                        maxLength={5}
                                    />
                                    {errors.cap && (
                                        <div className="invalid-feedback">
                                            {errors.cap}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <hr className="my-4" />

                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="same-address"
                                    checked={isBillingDifferent}
                                    onChange={(e) => setIsBillingDifferent(e.target.checked)}
                                />
                                <label className="form-check-label">
                                    L'indirizzo di spedizione è diverso dall'indirizzo di fatturazione?
                                </label>
                            </div>

                            {isBillingDifferent && (
                                <div className="billing-address mt-4">
                                    <h4 className="mb-3">Indirizzo di fatturazione</h4>
                                    <div className="row g-3">

                                        <div className="col-lg-6 col-md-12 col-sm-12">
                                            <label className="form-label">Indirizzo di fatturazione</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.billingIndirizzo ? 'is-invalid' : ''}`}
                                                name="indirizzo"
                                                value={billingData.indirizzo}
                                                onChange={handleBillingChange}
                                                required
                                            />
                                            {errors.billingIndirizzo && (
                                                <div className="invalid-feedback">
                                                    {errors.billingIndirizzo}
                                                </div>
                                            )}
                                        </div>

                                        <div className="col-lg-6 col-md-12 col-sm-12">
                                            <label className="form-label">Codice fiscale o partita IVA</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.billingCitta ? 'is-invalid' : ''}`}
                                                name="citta"
                                                value={billingData.citta}
                                                onChange={handleBillingChange}
                                                required
                                            />
                                            {errors.billingCitta && (
                                                <div className="invalid-feedback">
                                                    {errors.billingCitta}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                            <hr className="my-4" />
                            <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CheckOut;