import { FaShoppingCart, FaBars } from "react-icons/fa";
import { FaBone } from "react-icons/fa6";
import { useState, useEffect } from "react";
import logo from '/PawPlanet.logo(3).png'
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar principale con logo, barra di ricerca e carrello */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to={"/"}>
            <img
              className="rounded-circle"
              src={logo}
              width="60"
              height="60"
              alt="Logo"
            />
          </Link>

           {/* HAMBURGER SOLO SU MOBILE */}
           <FaBars
            className="hamburger d-md-none d-lg-none"
            size={28}
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {/*icone che si nascondono nella versione mobile */}
          <div className="d-none d-md-flex align-items-center flex-grow-1">
            <SearchForm />
            <div className="ms-auto">
              <Link to={'/carrello'} className="cart-icon">
                <FaShoppingCart size={30} />
              </Link>
            </div>
            <div className="mx-2">
              <Link to={'/wishlist'} className="cart-icon">
                <FaBone size={30} />
              </Link>
            </div>
          </div>
        </div>
      </nav>
      {/* Menu sotto la Navbar */}
      <div className="bg-success-subtle text-success-emphasis shadow-sm d-none d-md-block ">
        <div className="container">
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to={"/prodotti"}>
                Tutti i Prodotti
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="caniDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Cani
              </a>
              <ul className="dropdown-menu" aria-labelledby="caniDropdown">
              <li>
                  <Link className="dropdown-item" to={'/prodotti/cani/'}>
                    Prodotti per cani
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={'/prodotti/cani/cibo'} >
                    Cibo per cani
                  </Link>
                </li>
                <li>
                  <Link to={'/prodotti/cani/giochi'} className="dropdown-item" >
                    Giochi per cani
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="gattiDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Gatti
              </a>
              <ul className="dropdown-menu" aria-labelledby="gattiDropdown">
              <li>
                  <Link className="dropdown-item" to={'/prodotti/gatti/'}>
                    Prodotti per gatti
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={'/prodotti/gatti/cibo'}>
                    Cibo per gatti
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={'/prodotti/gatti/giochi'}>
                    Giochi per gatti
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/prodotti/accessori'}>
                Accessori
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/prodotti/promozioni'}>
                Offerte
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* MENU SOLO MOBILE (hamburger) */}
      <div className={`menu-container d-md-none d-lg-none ${menuOpen ? 'open' : ''}`}>
        <div className="container">
          {/* Elementi solo per mobile (ricerca + icone) */}
          <div className="d-flex flex-column align-items-start mb-3">
            <SearchForm />
            <div className="mt-3 d-flex gap-3">
              <Link to={'/carrello'} className="cart-icon">
                <FaShoppingCart size={30} />
              </Link>
              <Link to={'/wishlist'} className="cart-icon">
                <FaBone size={30} />
              </Link>
            </div>
          </div>

          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="/prodotti" onClick={() => setMenuOpen(false)}>
                Tutti i Prodotti
              </Link>
            </li>
            <li className="nav-item dropdown">
              <span className="nav-link dropdown-toggle" role="button">Cani</span>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to={'/prodotti/cani/'} onClick={() => setMenuOpen(false)}>Prodotti per cani</Link></li>
                <li><Link className="dropdown-item" to={'/prodotti/cani/cibo'} onClick={() => setMenuOpen(false)}>Cibo per cani</Link></li>
                <li><Link className="dropdown-item" to={'/prodotti/cani/giochi'} onClick={() => setMenuOpen(false)}>Giochi per cani</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <span className="nav-link dropdown-toggle" role="button">Gatti</span>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to={'/prodotti/gatti/'} onClick={() => setMenuOpen(false)}>Prodotti per gatti</Link></li>
                <li><Link className="dropdown-item" to={'/prodotti/gatti/cibo'} onClick={() => setMenuOpen(false)}>Cibo per gatti</Link></li>
                <li><Link className="dropdown-item" to={'/prodotti/gatti/giochi'} onClick={() => setMenuOpen(false)}>Giochi per gatti</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/prodotti/accessori'} onClick={() => setMenuOpen(false)}>Accessori</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/prodotti/promozioni'} onClick={() => setMenuOpen(false)}>Offerte</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;