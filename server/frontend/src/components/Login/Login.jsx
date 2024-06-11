import React, { useState } from 'react';
import "../assets/bootstrap/css/bootstrap.min.css";
import Header from '../Header/Header';
import loginIllustration from "../assets/login.svg";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(true);

  const login_url = `${window.location.origin}/djangoapp/login`;

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch(login_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
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
      <section className="py-4 py-md-5 my-5" style={{ paddingTop: '100px' }}>
        <div className="container py-md-5">
          <div className="row">
            <div className="col-md-6 text-center">
              <img className="img-fluid w-100" src={loginIllustration} alt="Login Illustration" />
            </div>
            <div className="col-md-5 col-xl-4 text-center text-md-start">
              <h2 className="display-6 fw-bold mb-5">
                <span className="underline pb-1"><strong>Login</strong></span>
              </h2>
              <form onSubmit={login}>
                <div className="mb-3">
                  <input 
                    className="shadow form-control" 
                    type="text" 
                    name="userName" 
                    placeholder="Username" 
                    value={userName} 
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input 
                    className="shadow form-control" 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}  
                  />
                </div>
                <div className="mb-5">
                  <button className="btn btn-primary shadow" type="submit">Log in</button>
                </div>
              </form>
              <p className="text-muted">
                <a href="/forgotten-password">Forgot your password?</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
