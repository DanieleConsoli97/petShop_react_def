import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import logo from '/PawPlanet.logo(3).png'
import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

function Navbar() {
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
          <SearchForm />
          <div className="ms-auto">
            <Link to={'/carrello'} className="cart-icon">
              <FaShoppingCart size={30} />
            </Link>
          </div>
        </div>
      </nav>
      {/* Menu sotto la Navbar */}
      <div className="bg-success-subtle text-success-emphasis shadow-sm ">
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
    </>
  );
}

export default Navbar;