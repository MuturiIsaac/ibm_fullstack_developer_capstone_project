import React, { useState } from 'react';
import styled from 'styled-components';
import user_icon from '../assets/person.png';
import email_icon from '../assets/email.png';
import password_icon from '../assets/password.png';
import close_icon from '../assets/close.png';
import logo from '../assets/logo.png';

const RegisterContainer = styled.div`
  width: 50%;
  background-color: #f8f9fa;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Text = styled.span`
  flex-grow: 1;
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const Input = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #ced4da;
  border-radius: 4px;
  padding: 0.5rem;
`;

const InputField = styled.input`
  border: none;
  outline: none;
  flex-grow: 1;
  margin-left: 0.5rem;
`;

const SubmitButton = styled.input`
  background-color: #4ca1af;
  color: white;
  border: none;
  outline: none;
  padding: 0.5rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #2c3e50;
  }
`;

const Navbar = styled.nav`
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const NavbarBrand = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
`;

const LogoImage = styled.img`
  height: 40px;
  margin-right: 0.5rem;
`;

const RegisterHeader = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const RegisterTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const RegisterDescription = styled.p`
  color: #6c757d;
`;

const Register = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const goHome = () => {
    window.location.href = window.location.origin;
  };

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
    <>
      <Navbar>
        <NavbarBrand href="/">
          <LogoImage src={logo} alt="Logo" />
          Dealerships
        </NavbarBrand>
      </Navbar>
      <RegisterContainer>
        <RegisterHeader>
          <RegisterTitle>Register</RegisterTitle>
          <RegisterDescription>Create your account for a seamless experience</RegisterDescription>
        </RegisterHeader>
        <Form onSubmit={register}>
          <Inputs>
            <Input>
              <img src={user_icon} className="img_icon" alt="Username" />
              <InputField
                type="text"
                name="username"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
              />
            </Input>
            <Input>
              <img src={user_icon} className="img_icon" alt="First Name" />
              <InputField
                type="text"
                name="first_name"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Input>
            <Input>
              <img src={user_icon} className="img_icon" alt="Last Name" />
              <InputField
                type="text"
                name="last_name"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </Input>
            <Input>
              <img src={email_icon} className="img_icon" alt="Email" />
              <InputField
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Input>
            <Input>
              <img src={password_icon} className="img_icon" alt="Password" />
              <InputField
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Input>
          </Inputs>
          <SubmitButton type="submit" value="Register" />
        </Form>
      </RegisterContainer>
    </>
  );
};

export default Register;