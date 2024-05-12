import React, { useState } from 'react';
import "./Login.css";
import Header from '../Header/Header';

const Login = ({ onClose }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);

  let login_url = window.location.origin + "/djangoapp/login";

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch(login_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password
      }),
    });
    const json = await res.json();
    if (json.status !== null && json.status === "Authenticated") {
      sessionStorage.setItem('username', json.userName);
      setOpen(false);
    } else {
      alert("The user could not be authenticated.");
    }
  };

  if (!open) {
    window.location.href = "/";
  }

  return (
    <div>
      <Header />
      <div onClick={onClose}>
        <div onClick={(e) => { e.stopPropagation(); }} className='modalContainer'>
          <div className="container my-4">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card">
                  <div className="banner py-2" style={{ backgroundColor: '#145858' }}>
                   <h1 className="mb-0" style={{ color: '#FFFFFF' }}>Login</h1>
                  </div>
                  <div className="card-body">
                    <form className="login_panel" style={{}} onSubmit={login}>
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" name="username" placeholder="Username" className="form-control" onChange={(e) => setUserName(e.target.value)} />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input name="psw" type="password" placeholder="Password" className="form-control" onChange={(e) => setPassword(e.target.value)} />
                      </div>
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="d-flex">
                          <input className="btn" style={{ backgroundColor: '#145858', color: '#FFFFFF' }} type="submit" value="Login" />
                          <input className="btn btn-secondary ms-2" type="button" value="Cancel" onClick={() => setOpen(false)} />
                        </div>
                        <a className="loginlink mt-3 mt-md-0" href="/register" style={{ color: '#C8E0CA' }}>Register Now</a>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;