import { useState } from "react";
import regioniItaliane from "../data/Regioni";

const CheckOut = () => {
    const [isBillingDifferent, setIsBillingDifferent] = useState(false);
    const [billingData, setBillingData] = useState({
        nome: '',
        cognome: '',
        indirizzo: '',
        citta: '',
        regione: '',
        cap: ''
    });

    const handleBillingChange = (e) => {
        const { name, value } = e.target;
        setBillingData(prev => ({
            ...prev,
            [name]: value
        }));
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
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
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

                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Indirizzo di spedizione</h4>
                        <form className="needs-validation" noValidate>
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label className="form-label">Nome</label>
                                    <input type="text" className="form-control" id="firstName" placeholder="" required />
                                    <div className="invalid-feedback">
                                        È obbligatorio un nome valido
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <label className="form-label">Cognome</label>
                                    <input type="text" className="form-control" id="lastName" placeholder="" required />
                                    <div className="invalid-feedback">
                                        È obbligatorio inserire un cognome valido.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="tua-e-mail@example.com" />
                                    <div className="invalid-feedback">
                                        Inserisci un indirizzo email valido per ricevere aggiornamenti sulla spedizione.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Indirizzo</label>
                                    <input type="text" className="form-control" id="address" placeholder="via ...." required />
                                    <div className="invalid-feedback">
                                        Inserisci il tuo indirizzo di spedizione.
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Paese</label>
                                    <select className="form-select" id="country" required>
                                        <option value="">Scegli Paese</option>
                                        <option>Italia</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Inserisci un Paese valido.
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Regione</label>
                                    <select className="form-select" id="region" required>
                                        <option value="">Scegli Regione</option>
                                        {regioniItaliane?.map((regione, index) => (
                                            <option key={index} value={regione.nome}>
                                                {regione.nome}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="invalid-feedback">
                                        Inserisci una Regione valida.
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Città</label>
                                    <input type="text" className="form-control" id="city" placeholder="" required />
                                    <div className="invalid-feedback">
                                        Inserisci una città valida.
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Codice Postale</label>
                                    <input type="text" className="form-control" id="zip" placeholder="" required />
                                    <div className="invalid-feedback">
                                        Inserisci un codice postale valido.
                                    </div>
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

                                        <div className="col-12">
                                            <label className="form-label">Indirizzo di fatturazione</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="indirizzo"
                                                value={billingData.indirizzo}
                                                onChange={handleBillingChange}
                                                required
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Codice fiscale o partita IVA</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="citta"
                                                value={billingData.citta}
                                                onChange={handleBillingChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <hr className="my-4" />
                                </div>
                            )}
                            <hr className="my-4" />
                            <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>
                        </form>
                    </div>
                </div>
            </main>

            <footer className="my-5 pt-5 text-body-secondary text-center text-small">
                <p className="mb-1">© 2017–2024 Company Name</p>
                <ul className="list-inline">
                    <li className="list-inline-item"><a href="#">Privacy</a></li>
                    <li className="list-inline-item"><a href="#">Terms</a></li>
                    <li className="list-inline-item"><a href="#">Support</a></li>
                </ul>
            </footer>
        </div>
    );
};

export default CheckOut;