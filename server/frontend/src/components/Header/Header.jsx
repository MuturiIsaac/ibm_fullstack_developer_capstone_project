import React from 'react';
import "../assets/style.css";
import "../assets/bootstrap.min.css";

const Header = () => {
  const logout = async (e) => {
    e.preventDefault();
    let logout_url = window.location.origin + "/djangoapp/logout";
    const res = await fetch(logout_url, {
      method: "GET",
    });
    const json = await res.json();
    if (json) {
      let username = sessionStorage.getItem('username');
      sessionStorage.removeItem('username');
      window.location.href = window.location.origin;
      window.location.reload();
      alert("Logging out " + username + "...");
    } else {
      alert("The user could not be logged out.");
    }
  };

  let homepageItems = <div></div>;
  let currUser = sessionStorage.getItem('username');

  if (currUser !== null && currUser !== "") {
    homepageItems = (
      <div className="d-flex align-items-center">
        <span className="homepage_links me-3">{sessionStorage.getItem("username")}</span>
        <a className="btn btn-outline-light me-3" href="#" onClick={logout}>
          Logout
        </a>
      </div>
    );
  } else {
    homepageItems = (
      <div className="d-flex align-items-center">
        <a className="btn btn-outline-light me-3" href="/login">Login</a>
        <a className="btn btn-outline-light d-none d-md-inline-block" href="/register">Register</a>
      </div>
    );
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src="/static/logo.png" alt="Logo" height="60" />
            Dealerships
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
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact Us</a>
              </li>
            </ul>
            <div className="d-flex">
              <div className="loginlink" id="loginlogout">
                {homepageItems}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;