import { FaShoppingCart } from "react-icons/fa";
import { useState, useEffect } from "react";
import logo from '/PawPlanet.logo(3).png'
import { Link } from "react-router-dom";
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

          <div className="mx-auto search-container">
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Cerca prodotti..."
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Cerca
              </button>
            </form>
          </div>

          <div className="ms-auto">
            <a href="#" className="cart-icon">
              <FaShoppingCart size={30} />
            </a>
          </div>

        </div>
      </nav>

      {/* Menu sotto la Navbar */}
      <div className="bg-success-subtle text-success-emphasis shadow-sm ">
        <div className="container">
          <ul className="nav justify-content-center">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to={"/products"}>
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
                  <Link className="dropdown-item" to={'/products/cani/food'} >
                    Cibo per cani
                  </Link>
                </li>
                <li>
                  <Link to={'/products/cani/games'} className="dropdown-item" >
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
                  <Link className="dropdown-item" to={'products/gatti/food'}>
                    Cibo per gatti
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={'products/gatti/games'}>
                    Giochi per gatti
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/products/accessories'}>
                Accessori
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={'/products/discounted'}>
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



