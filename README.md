# 🐾 PawPlanet - Pet Shop React

🌟 Un'applicazione web moderna per negozio di animali realizzata con React + Vite.

## 📝 Descrizione

PawPlanet è un e-commerce completo per prodotti e accessori per animali domestici. L'applicazione offre un'interfaccia intuitiva e moderna per la gestione e l'acquisto di prodotti per cani 🐕 e gatti 🐱.

## 🛠️ Tecnologie Utilizzate

- ⚛️ React 19
- ⚡ Vite 6
- 🔄 React Router DOM 7
- 🎨 Bootstrap 5
- 🌐 Axios per le chiamate API
- 💫 React Icons per le icone
- 🎠 Swiper per i carousel
- ✨ ESLint per il linting del codice

## ✨ Funzionalità Principali

- 📦 **Catalogo Prodotti**
  - 🐕 Sezione dedicata per prodotti per cani
  - 🐱 Sezione dedicata per prodotti per gatti
  - 🏷️ Visualizzazione prodotti scontati
  - 🔍 Ricerca prodotti
  - 📋 Dettaglio prodotto

- 🗂️ **Categorie Specifiche**
  - 🍖 Alimenti per cani e gatti
  - 🎾 Giochi per cani e gatti
  - 🛍️ Accessori vari

- 🛒 **Carrello e Checkout**
  - 🛍️ Gestione carrello della spesa
  - ✅ Processo di checkout con validazione
  - 📍 Selezione regione di spedizione

- 🎯 **Interfaccia Utente**
  - 📱 Design responsive
  - 🧭 Navigazione intuitiva
  - 🎠 Carousel per presentazione prodotti
  - 🗺️ Breadcrumb per navigazione

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
│   │   ├── Hero.jsx      # Sezione hero
│   │   ├── Navbar.jsx    # Barra di navigazione
│   │   ├── PathNav.jsx   # Breadcrumb navigation
│   │   └── SearchForm.jsx # Form di ricerca
│   ├── context/          # Context API
│   │   └── GlobalContext.jsx # Stato globale
│   ├── data/             # Dati statici
│   │   └── Regioni.js    # Lista regioni per spedizione
│   ├── layout/           # Layout components
│   │   └── DefaultLayout.jsx # Layout principale
│   ├── pages/            # Componenti pagina
│   │   ├── Home.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── ProductsList.jsx
│   │   ├── Search.jsx
│   │   ├── CheckOut.jsx
│   │   ├── DogProducts.jsx
│   │   ├── CatProducts.jsx
│   │   ├── DogFoodList.jsx
│   │   ├── CatFoodList.jsx
│   │   ├── DogGamesList.jsx
│   │   ├── CatGamesList.jsx
│   │   ├── Accesories.jsx
│   │   └── DiscountedProducts.jsx
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

3. Avvia il server di sviluppo
```bash
npm run dev
```

🌐 L'applicazione si aprirà nel browser all'indirizzo `http://localhost:5173`

## 📜 Script Disponibili

- 🔥 `npm run dev` - Avvia il server di sviluppo
- 🏗️ `npm run build` - Crea la build di produzione
- 👀 `npm run preview` - Visualizza la build di produzione
- 🔍 `npm run lint` - Esegue il linting del codice

## 🔮 Sviluppi Futuri

- 🔐 Implementazione sistema di autenticazione
- 👤 Gestione profilo utente
- ⭐ Sistema di recensioni prodotti
- 💳 Integrazione pagamenti
- 💝 Wishlist prodotti
- ⚡ Ottimizzazione performance
- 🧪 Test automatizzati

## 📄 Licenza

Questo progetto è sotto licenza MIT