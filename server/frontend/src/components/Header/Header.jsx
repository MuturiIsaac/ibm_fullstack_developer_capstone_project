import React from 'react';
import "../assets/bootstrap.min.css";
import "../assets/style.css";

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
  let home_page_items =  <div></div>
  let currUser = sessionStorage.getItem('username');

  if (currUser !== null && currUser !== "") {
    home_page_items = <div className="input_panel">
      <text className='username'>{sessionStorage.getItem("username")}</text>
      <a className="nav_item" href="/djangoapp/logout" onClick={logout}>Logout</a>
    </div>
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
          <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link " aria-current="page" href="#">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/about">About Us</a>
              </li>
              <li class="nav-item">
                <a class="nav-link " href="/contact">Contact Us</a>
              </li>
            </ul>
            
          </div>
          <span class="navbar-text">
                  <div class="loginlink" id="loginlogout">
                  {home_page_items}
                  </div>
          </span>
          <div className="d-flex">
                <div className="loginlink" id="loginlogout">
                {homepageItems}
                </div>
          </div>
        
        </div>
      </nav>
    </div>
  );
};

export default Header;