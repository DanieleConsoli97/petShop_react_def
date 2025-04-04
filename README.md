# 🐾 PawPlanet - Pet Shop React

🌟 Un'applicazione web moderna per negozio di animali realizzata con React + Vite.

## 📝 Descrizione

PawPlanet è un e-commerce completo per prodotti e accessori per animali domestici. L'applicazione offre un'interfaccia intuitiva e moderna per la gestione e l'acquisto di prodotti per cani 🐕 e gatti 🐱, con un design responsive che si adatta a tutti i dispositivi.

## 🛠️ Tecnologie Utilizzate

- ⚛️ React 19
- ⚡ Vite 6
- 🔄 React Router DOM 7
- 🎨 Bootstrap 5
- 🌐 Axios per le chiamate API
- 💫 React Icons per le icone
- 🎠 Swiper per i carousel
- ✨ ESLint per il linting del codice
- 🗄️ JSON Server (mock backend)

## ✨ Funzionalità Principali

- 📦 **Catalogo Prodotti**
  - 🐕 Sezione dedicata per prodotti per cani
  - 🐱 Sezione dedicata per prodotti per gatti
  - 🏷️ Visualizzazione prodotti scontati
  - 🔍 Ricerca prodotti avanzata
  - 📋 Dettaglio prodotto con immagini e descrizioni

- 🗂️ **Categorie Specifiche**
  - 🍖 Alimenti per cani e gatti
  - 🎾 Giochi per cani e gatti
  - 🛍️ Accessori vari

- 🛒 **Carrello e Checkout**
  - 🛍️ Gestione carrello della spesa con persistenza dati (localStorage)
  - ➕ Aggiunta/rimozione prodotti e modifica quantità
  - ✅ Processo di checkout con validazione dei campi
  - 📍 Selezione regione di spedizione italiana
  - 🏠 Gestione indirizzi di spedizione e fatturazione

- 🎯 **Interfaccia Utente**
  - 📱 Design responsive per mobile, tablet e desktop
  - 🧭 Navigazione intuitiva con menu dropdown
  - 🎠 Carousel per presentazione prodotti in evidenza
  - 🗺️ Breadcrumb per navigazione contestuale
  - 🎨 Tema coerente con colori verdi e arancioni

## 📁 Struttura del Progetto

```plaintext
petShop_react_def/
├── public/                # Risorse statiche
│   ├── PawPlanet.logo.png
│   ├── PetShop-image.png
│   └── Planet_1.png
├── src/
│   ├── assets/           # Asset del progetto
│   │   └── imgs/
│   │       └── Hero-animals1.jpg
│   ├── components/       # Componenti riutilizzabili
│   │   ├── Carousel.jsx  # Slider prodotti
│   │   ├── Footer.jsx    # Footer del sito
│   │   ├── Hero.jsx      # Sezione hero
│   │   ├── Navbar.jsx    # Barra di navigazione
│   │   ├── PathNav.jsx   # Breadcrumb navigation
│   │   └── SearchForm.jsx # Form di ricerca
│   ├── context/          # Context API
│   │   └── GlobalContext.jsx # Stato globale dell'app
│   ├── data/             # Dati statici
│   │   └── Regioni.js    # Lista regioni per spedizione
│   ├── layout/           # Layout components
│   │   └── DefaultLayout.jsx # Layout principale
│   ├── pages/            # Componenti pagina
│   │   ├── Home.jsx      # Homepage
│   │   ├── ProductDetails.jsx # Dettaglio prodotto
│   │   ├── ProductsList.jsx # Lista prodotti
│   │   ├── Search.jsx    # Risultati ricerca
│   │   ├── CheckOut.jsx  # Pagina checkout
│   │   ├── Carrello.jsx  # Carrello acquisti
│   │   ├── DogProducts.jsx # Prodotti per cani
│   │   ├── CatProducts.jsx # Prodotti per gatti
│   │   ├── DogFoodList.jsx # Cibo per cani
│   │   ├── CatFoodList.jsx # Cibo per gatti
│   │   ├── DogGamesList.jsx # Giochi per cani
│   │   ├── CatGamesList.jsx # Giochi per gatti
│   │   ├── Accesories.jsx # Accessori
│   │   ├── DiscountedProducts.jsx # Prodotti in offerta
│   │   └── NotFound.jsx  # Pagina 404
│   ├── App.jsx           # Componente root
│   ├── main.jsx          # Entry point
│   └── index.css         # Stili globali
├── .envDefault           # Template variabili ambiente
├── .gitignore
├── eslint.config.js     # Configurazione ESLint
├── index.html           # HTML template
├── package.json         # Dipendenze e script
└── vite.config.js       # Configurazione Vite
```

## 🧠 Gestione dello Stato

L'applicazione utilizza React Context API per la gestione dello stato globale:

- 🛒 **Carrello**: Gestione completa del carrello con persistenza in localStorage
- 🔄 **Funzioni principali**:
  - `aggiungiAlCarrello`: Aggiunge prodotti al carrello o incrementa la quantità
  - `rimuoviDalCarrello`: Rimuove prodotti dal carrello
  - `svuotaCarrello`: Svuota completamente il carrello

## 🚀 Come Iniziare

### 📋 Prerequisiti

- 📦 Node.js (versione 14.0.0 o superiore)
- 📦 npm (incluso con Node.js)

### 💻 Installazione

1. Clona il repository
```bash
git clone [url-del-repository]
```

2. Installa le dipendenze
```bash
npm install
```

3. Avvia il mock server (JSON Server)
```bash
json-server --watch db.json
```

4. Avvia il server di sviluppo
```bash
npm run dev
```

🌐 L'applicazione si aprirà nel browser all'indirizzo `http://localhost:5173`

## 📜 Script Disponibili

- 🔥 `npm run dev` - Avvia il server di sviluppo
- 🏗️ `npm run build` - Crea la build di produzione
- 👀 `npm run preview` - Visualizza la build di produzione
- 🔍 `npm run lint` - Esegue il linting del codice

## 📚 API e Endpoints

L'applicazione utilizza JSON Server come mock backend, con i seguenti endpoints:

- `GET http://localhost:3000/prodotti` - Recupera lista prodotti
- `GET http://localhost:3000/prodotti/:slug` - Recupera dettaglio prodotto
- `GET http://localhost:3000/prodotti/cani` - Filtra prodotti per cani
- `GET http://localhost:3000/prodotti/gatti` - Filtra prodotti per gatti
- `GET http://localhost:3000/prodotti/cani/cibo` - Filtra cibo per cani
- `GET http://localhost:3000/prodotti/gatti/cibo` - Filtra cibo per gatti
- `GET http://localhost:3000/prodotti/cani/giochi` - Filtra giochi per cani
- `GET http://localhost:3000/prodotti/gatti/giochi` - Filtra giochi per gatti
- `GET http://localhost:3000/prodotti/accessori` - Filtra accessori
- `GET http://localhost:3000/prodotti/promozioni` - Filtra prodotti in promozione
- `GET http://localhost:3000/prodotti/search/:term` - Ricerca prodotti

## 🎨 UI/UX Design

- 🎯 **Tema Colori**:
  - Verde: Rappresenta natura e salute per gli animali
  - Arancione: Utilizzato per call-to-action e bottoni
  - Bianco/Grigio chiaro: Sfondo per leggibilità ottimale

- 📱 **Responsive Design**:
  - Mobile-first approach
  - Breakpoints per dispositivi mobili, tablet e desktop
  - Layout fluido con Flexbox e Grid

- 🧩 **Componenti UI**:
  - Navbar con dropdown per categorie
  - Hero section con immagine di sfondo
  - Carousel per prodotti in evidenza
  - Card prodotto con hover effects
  - Form di checkout con validazione

## 🔮 Sviluppi Futuri

- 🔐 Implementazione sistema di autenticazione
- 👤 Gestione profilo utente
- ⭐ Sistema di recensioni prodotti
- 💳 Integrazione pagamenti reali
- 💝 Wishlist prodotti
- ⚡ Ottimizzazione performance
- 🧪 Test automatizzati
- 📱 App mobile con React Native

## 📄 Licenza

Questo progetto è sotto licenza MIT - vedi il file [LICENSE.md](LICENSE.md) per i dettagli.