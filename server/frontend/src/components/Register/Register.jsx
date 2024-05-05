import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png";
import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import close_icon from "../assets/close.png";
import Header from '../Header/Header';

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  }

  const register = async (e) => {
    e.preventDefault();
    let register_url = window.location.origin + "/djangoapp/register/";
    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email
      }),
    });
    const json = await res.json();
    if (json.status) {
      sessionStorage.setItem('username', json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with the same username is already registered");
      window.location.href = window.location.origin;
    }
  };

  return (
    <div>
      <Header />
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">Logo</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="modalContainer">
        <div className="banner py-2">
          <h1 className="mb-0">Register</h1>
        </div>
        <div className="container my-4">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <form onSubmit={register}>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        <img src={user_icon} className="img_icon" alt='Username' />
                        Username
                      </label>
                      <input type="text" name="username" placeholder="Username" className="form-control" onChange={(e) => setUserName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">
                        <img src={user_icon} className="img_icon" alt='First Name' />
                        First Name
                      </label>
                      <input type="text" name="first_name" placeholder="First Name" className="form-control" onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">
                        <img src={user_icon} className="img_icon" alt='Last Name' />
                        Last Name
                      </label>
                      <input type="text" name="last_name" placeholder="Last Name" className="form-control" onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        <img src={email_icon} className="img_icon" alt='Email' />
                        Email
                      </label>
                      <input type="email" name="email" placeholder="Email" className="form-control" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        <img src={password_icon} className="img_icon" alt='Password' />
                        Password
                      </label>
                      <input type="password" name="password" placeholder="Password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="d-grid gap-2">
                      <input className="btn btn-primary" type="submit" value="Register" />
                      <a className="btn btn-secondary" href="/" onClick={gohome}>Cancel</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
