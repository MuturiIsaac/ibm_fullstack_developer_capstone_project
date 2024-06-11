import React from 'react';


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

  let homePageItems;
  let currUser = sessionStorage.getItem('username');
  if (currUser !== null && currUser !== "") {
    homePageItems = (
      <div className="input_panel">
        <span className='homepage_links'>{sessionStorage.getItem("username")}</span>
        <a className="btn btn-primary border rounded-pill shadow" href="/" onClick={logout} style={{ marginRight: '34px' }}>Logout</a>
      </div>
    );
  } else {
    homePageItems = (
      <div className="input_panel">
        <a className="btn btn-primary border rounded-pill shadow" href="/login" style={{ marginRight: '34px' }}>Login</a>
        <a className="btn btn-primary border rounded-pill shadow" href="/register" style={{ marginRight: '34px' }}>Register</a>
      </div>
    );
  }

  return (
    <nav className="navbar navbar-expand-md fixed-top navbar-shrink py-3 navbar-light" id="mainNav">
      <div className="container">
        <img src="/static/logo.png" alt="Logo" height="60" />
        <a className="navbar-brand d-flex align-items-center" href="/">
          <span>Dealership</span>
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navcol-1">
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol-1">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item"><a className="nav-link active" href="/">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="/about">About</a></li>
            <li className="nav-item"><a className="nav-link" href="/contacts">Contact</a></li>
          </ul>
          {homePageItems}
        </div>
      </div>
    </nav>
  );
};

export default Header;
