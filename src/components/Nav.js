import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg"
        style={{ "min-height": "70px" }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <h2 className="fs-2 fw-bold">Assignments</h2>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item  pe-3">
                <Link className="nav-link" to="/home">
                  {" "}
                  Home
                </Link>
              </li>
              <li className="nav-item pe-3">
                <Link className="nav-link" to="/about">
                  {" "}
                  About
                </Link>
              </li>
              <li className="nav-item pe-3">
                <Link className="nav-link" to="/dashboard">
                  {" "}
                  Dashboard
                </Link>
              </li>
              {/* <li className="nav-item pe-3">
                <Link className="nav-link" to="/login">
                  {" "}
                  Login
                </Link>
              </li> */}
              {/* <li className="nav-item pe-3">
                <Link className="nav-link" to="/register">
                  {" "}
                  Register
                </Link>
              </li> */}
             
             {/* //dropdown */}
              <div class="dropstart">
                <button
                  class="btn btnn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenu2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  More
                </button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <li>
                    <button class="dropdown-item" type="button">
                    <Link to="/contact">
                  {" "}
                  Contact Us
                </Link>
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item" type="button">
                    <Link  to="/register">
                  {" "}
                  Register
                </Link>
                    </button>
                  </li>
                  <li>
                    <button class="dropdown-item" type="button">
                    <Link to="/login">
                  {" "}
                  Login
                </Link>
                    </button>
                  </li>
                </ul>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
