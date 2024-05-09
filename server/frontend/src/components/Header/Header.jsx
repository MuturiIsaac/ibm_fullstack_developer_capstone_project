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

  
  let home_page_items =  <div></div>
  let currUser = sessionStorage.getItem('username');

  if (currUser !== null && currUser !== "") {
    home_page_items = <div className="input_panel">
      <span className='username'>{sessionStorage.getItem("username")}</span>
      <a className="nav_item" href="/djangoapp/logout" onClick={logout}>Logout</a>
    </div>
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
            <ul className="navbar-nav navitems">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About Us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>
          <span className="navbar-text">
            <div className="loginlink" id="loginlogout">
              {home_page_items}
            </div>
          </span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
