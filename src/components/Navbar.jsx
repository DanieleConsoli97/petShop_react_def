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
                  <a className="dropdown-item" href="#">
                    Cibo per cani
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Giochi per cani
                  </a>
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
                  <a className="dropdown-item" href="#">
                    Cibo per gatti
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Tiragraffi
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Accessori
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Offerte
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;



