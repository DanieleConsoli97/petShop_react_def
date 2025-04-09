import { FaShoppingCart, FaBars } from "react-icons/fa";
import { FaBone } from "react-icons/fa6";
import { useState, useEffect } from "react";
import logo from '/PawPlanet.logo(3).png';
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";
import SearchForm from "./SearchForm";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [caniDropdownOpen, setCaniDropdownOpen] = useState(false);
  const [gattiDropdownOpen, setGattiDropdownOpen] = useState(false)
  const { carrello, wishList } = useGlobalContext();

  const getCartCount = () => {
    if (!carrello || carrello.length === 0) {
      return null;
    }
    return carrello.length;
  };

  const getWishlistCount = () => {
    if (!wishList || wishList.length === 0) {
      return null;
    }
    return wishList.length;
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setCaniDropdownOpen(false);
    setGattiDropdownOpen(false);
  };

  const toggleCaniDropdown = () => {
    setCaniDropdownOpen(!caniDropdownOpen);
    setGattiDropdownOpen(false); // Close other dropdowns
  };

  const toggleGattiDropdown = () => {
    setGattiDropdownOpen(!gattiDropdownOpen);
    setCaniDropdownOpen(false); // Close other dropdowns
  };

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
              <Link to={'/carrello'} className="cart-icon position-relative">
                {getCartCount() !== null && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                    {getCartCount()}
                  </span>
                )}
                <FaShoppingCart size={30} />
              </Link>
            </div>
            <div className="mx-2">
              <Link to={'/wishlist'} className="cart-icon position-relative">
                {getWishlistCount() !== null && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                    {getWishlistCount()}
                  </span>
                )}
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
                  <Link className="dropdown-item" to={'/prodotti/cani/cibo'}>
                    Cibo per cani
                  </Link>
                </li>
                <li>
                  <Link to={'/prodotti/cani/giochi'} className="dropdown-item">
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
              <Link to={'/carrello'} className="cart-icon position-relative" onClick={closeMobileMenu}>
                {getCartCount() !== null && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                    {getCartCount()}
                  </span>
                )}
                <FaShoppingCart size={30} />
              </Link>
              <Link to={'/wishlist'} className="cart-icon position-relative" onClick={closeMobileMenu}>
                {getWishlistCount() !== null && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                    {getWishlistCount()}
                  </span>
                )}
                <FaBone size={30} />
              </Link>
            </div>
          </div>

          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" to="/prodotti" onClick={closeMobileMenu}>
                Tutti i Prodotti
              </Link>
            </li>
            <li className="nav-item dropdown">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                onClick={toggleCaniDropdown}
              >
                Cani
              </span>
              <ul className={`dropdown-menu ${caniDropdownOpen ? 'show' : ''}`}>
                <li><Link className="dropdown-item" to={'/prodotti/cani/'} onClick={closeMobileMenu}>Prodotti per cani</Link></li>
                <li><Link className="dropdown-item" to={'/prodotti/cani/cibo'} onClick={closeMobileMenu}>Cibo per cani</Link></li>
                <li><Link className="dropdown-item" to={'/prodotti/cani/giochi'} onClick={closeMobileMenu}>Giochi per cani</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <span
                className="nav-link dropdown-toggle"
                role="button"
                onClick={toggleGattiDropdown}
              >
                Gatti
              </span>
              <ul className={`dropdown-menu ${gattiDropdownOpen ? 'show' : ''}`}>
                <li><Link className="dropdown-item" to={'/prodotti/gatti/'} onClick={closeMobileMenu}>Prodotti per gatti</Link></li>
                <li><Link className="dropdown-item" to={'/prodotti/gatti/cibo'} onClick={closeMobileMenu}>Cibo per gatti</Link></li>
                <li><Link className="dropdown-item" to={'/prodotti/gatti/giochi'} onClick={closeMobileMenu}>Giochi per gatti</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/prodotti/accessori'} onClick={closeMobileMenu}>Accessori</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/prodotti/promozioni'} onClick={closeMobileMenu}>Offerte</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;