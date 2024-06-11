import React, { useState } from 'react';
import Header from '../Header/Header';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import loginIllustration from '../assets/login.svg';
import './Register.css' // Ensure this file is correctly linked in your project

const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const register = async (e) => {
    e.preventDefault();
    const registerUrl = `${window.location.origin}/djangoapp/register/`;

    const res = await fetch(registerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userName,
        password,
        firstName,
        lastName,
        email,
      }),
    });

    const json = await res.json();

    if (json.status) {
      sessionStorage.setItem('username', json.userName);
      window.location.href = window.location.origin;
    } else if (json.error === 'Already Registered') {
      alert('The user with the same username is already registered');
      window.location.href = window.location.origin;
    }
  };

  return (
    <div>
      <Header />
      <section className="py-4 py-md-5 my-5" style={{ paddingTop: '100px' }}>
        <div className="container py-md-5">
          <div className="row">
            <div className="col-md-6 text-center">
              <img className="img-fluid w-100" src={loginIllustration} alt="Register Illustration" />
            </div>
            <div className="col-md-5 col-xl-4 text-center text-md-start">
              <h2 className="display-6 fw-bold mb-5">
                <span className="underline pb-1"><strong>Register</strong></span>
              </h2>
              <form onSubmit={register}>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <img src={user_icon} alt="Username Icon" />
                    </span>
                    <input 
                      className="form-control" 
                      type="text" 
                      name="userName" 
                      placeholder="Username" 
                      value={userName} 
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <img src={user_icon} alt="First Name Icon" />
                    </span>
                    <input 
                      className="form-control" 
                      type="text" 
                      name="firstName" 
                      placeholder="First Name" 
                      value={firstName} 
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <img src={user_icon} alt="Last Name Icon" />
                    </span>
                    <input 
                      className="form-control" 
                      type="text" 
                      name="lastName" 
                      placeholder="Last Name" 
                      value={lastName} 
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <img src={email_icon} alt="Email Icon" />
                    </span>
                    <input 
                      className="form-control" 
                      type="email" 
                      name="email" 
                      placeholder="Email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <img src={password_icon} alt="Password Icon" />
                    </span>
                    <input 
                      className="form-control" 
                      type="password" 
                      name="password" 
                      placeholder="Password" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <button className="btn btn-primary shadow w-100" type="submit">Register</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
