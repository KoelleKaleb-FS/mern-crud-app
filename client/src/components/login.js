// src/components/Login.js
import React, { useState } from 'react';

const API_URL = 'http://localhost:3001/login';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Trim whitespace from inputs
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    console.log('Email:', trimmedEmail);
    console.log('Password:', trimmedPassword);
  
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
        });
  
        console.log('Response:', response);
  
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Invalid email or password');
        }
  
        const data = await response.json();
        localStorage.setItem('token', data.token);
        console.log('Logged in:', data);
    } catch (error) {
        setError(error.message);
    }
};

  

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
