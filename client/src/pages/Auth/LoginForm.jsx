// client/src/pages/LoginForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For redirection after login

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState(''); // For general messages like "Logging in..."

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('Logging in...');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, user } = response.data;

      // Store the token and user info (e.g., in localStorage)
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user)); // Store user details if needed

      setMessage('Login successful! Redirecting...');
      // Redirect to dashboard
      navigate('/dashboard');

    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError(err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Invalid username or password.');
      setMessage(''); // Clear logging in message on error
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Login to Mathavam</h1>
      {message && <p style={styles.message}>{message}</p>}
      {error && <p style={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

// Basic inline styles
const styles = {
    container: {
      maxWidth: '400px',
      margin: '100px auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backgroundColor: '#fff',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
      boxSizing: 'border-box', // Include padding in width
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      marginTop: '10px',
      alignSelf: 'center', // Center the button
      width: '100%',
    },
    message: {
        color: '#007bff',
        backgroundColor: '#e0f7fa',
        border: '1px solid #007bff',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '15px',
        textAlign: 'center',
    },
    errorMessage: {
        color: 'red',
        backgroundColor: '#ffe6e6',
        border: '1px solid red',
        padding: '10px',
        borderRadius: '5px',
        marginBottom: '15px',
        textAlign: 'center',
    }
  };