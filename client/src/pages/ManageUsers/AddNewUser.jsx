// client/src/pages/ManageUsers/AddNewUser.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function AddNewUser() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    idNumber: '',
    userType: '',
    username: '',
    password: '',
    confirmPassword: '',
    childRegNo: '' // Added new state for childRegNo
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const userTypes = ['Super Admin', 'Admin', 'Doctor', 'Therapist', 'Resource Person', 'Parent'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // If userType changes and it's no longer 'Parent', clear childRegNo
    if (name === 'userType' && value !== 'Parent') {
      setFormData(prev => ({ ...prev, childRegNo: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!formData.firstName || !formData.lastName || !formData.idNumber || !formData.userType || !formData.username || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all required fields.');
        return;
    }

    // Client-side validation for childRegNo if userType is Parent
    if (formData.userType === 'Parent' && !formData.childRegNo) {
        setError('Please enter Patient Registration Number for Parent user type.');
        return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/add', formData);
      setMessage(response.data.message);
      setFormData({
        firstName: '',
        lastName: '',
        idNumber: '',
        userType: '',
        username: '',
        password: '',
        confirmPassword: '',
        childRegNo: '' // Clear childRegNo on successful submission
      });
    } catch (err) {
      console.error('Error adding user:', err.response ? err.response.data : err.message);
      setError(err.response && err.response.data && err.response.data.message ? err.response.data.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Add New User</h1>
      {message && <p style={styles.successMessage}>{message}</p>}
      {error && <p style={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="firstName" style={styles.label}>First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="lastName" style={styles.label}>Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="idNumber" style={styles.label}>ID Number:</label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="userType" style={styles.label}>User Type:</label>
          <select
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            required
            style={styles.select}
          >
            <option value="">Select User Type</option>
            {userTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Conditional rendering for Patient Registration Number */}
        {formData.userType === 'Parent' && (
          <div style={styles.formGroup}>
            <label htmlFor="childRegNo" style={styles.label}>Patient Registration Number (Child No):</label>
            <input
              type="text"
              id="childRegNo"
              name="childRegNo"
              value={formData.childRegNo}
              onChange={handleChange}
              required={formData.userType === 'Parent'} // Make it required only for Parent
              style={styles.input}
              placeholder="e.g., P001"
            />
          </div>
        )}

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
        <div style={styles.formGroup}>
          <label htmlFor="confirmPassword" style={styles.label}>Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Add User</button>
      </form>
    </div>
  );
}

// Basic inline styles for demonstration. Consider using CSS modules or styled-components for larger projects.
const styles = {
    container: {
      maxWidth: '600px',
      margin: '50px auto',
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
      boxSizing: 'border-box',
    },
    select: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '16px',
      backgroundColor: '#fff',
      boxSizing: 'border-box',
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
      alignSelf: 'flex-end',
    },
    successMessage: {
        color: 'green',
        backgroundColor: '#e6ffe6',
        border: '1px solid green',
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