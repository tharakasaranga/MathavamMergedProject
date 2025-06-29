// D:\Computer Science - University of Jaffn a\3rd Year\Group Project\Mathavam Project\client\src\pages\RecordSheet\PatientRecordForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // For navigation

// Import child components
import Part1PatientInfo from './Part1PatientInfo';
import Part2History from './Part2History';
import Part3Diagnosis from './Part3Diagnosis';
import Part4Management from './Part4Management';

const PatientRecordForm = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(() => {
        // Load saved data from localStorage on component mount
        // This ensures data persists across page reloads
        const savedData = localStorage.getItem('patientRecordFormData');
        return savedData ? JSON.parse(savedData) : {};
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Save formData to localStorage whenever it changes
    // This is crucial for data persistence between steps and reloads
    useEffect(() => {
        localStorage.setItem('patientRecordFormData', JSON.stringify(formData));
    }, [formData]);

    // Handle input changes for simple fields (e.g., text, number, checkbox)
    // This function is passed down to child components
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value // Correctly handles checkbox boolean values
        }));
    };

    // Handle nested object changes (e.g., for structured data like family history)
    // This function is also passed down to child components for specific fields
    const handleNestedChange = (parentKey, e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [parentKey]: {
                ...prevData[parentKey], // Spreads existing nested data
                [name]: type === 'checkbox' ? checked : value // Updates the specific nested field
            }
        }));
    };

    // Functions to navigate between form steps
    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    const prevStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    // Handles the final form submission to the backend
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Define your backend API endpoint
            const backendUrl = 'http://localhost:5000/api/patientRecords'; 
            
            // Send the formData to the backend
            const response = await axios.post(backendUrl, formData);
            console.log('Record saved successfully:', response.data);
            setSuccess(true);
            
            // Clear local storage and reset form data/step after successful submission
            localStorage.removeItem('patientRecordFormData');
            setFormData({}); // Clear form data in state
            setStep(1); // Reset to first step

            alert('Patient record submitted successfully!');
            // You can uncomment the line below to navigate to a success page if needed
            // navigate('/success-page');

        } catch (err) {
            // Error handling for network issues or backend errors
            console.error('Error submitting form:', err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data.message : 'An unexpected error occurred.');
            alert('Error submitting form: ' + (err.response ? err.response.data.message : err.message));
        } finally {
            setLoading(false); // Always stop loading, regardless of success or error
        }
    };

    // Renders the current step's component, passing necessary props
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <Part1PatientInfo 
                        formData={formData} 
                        handleChange={handleChange} 
                        nextStep={nextStep} 
                    />
                );
            case 2:
                return (
                    <Part2History 
                        formData={formData} 
                        handleChange={handleChange} 
                        handleNestedChange={handleNestedChange} // Pass handleNestedChange for nested fields
                        nextStep={nextStep} 
                        prevStep={prevStep} 
                    />
                );
            case 3:
                return (
                    <Part3Diagnosis 
                        formData={formData} 
                        handleChange={handleChange} 
                        handleNestedChange={handleNestedChange} // Pass handleNestedChange for nested fields
                        nextStep={nextStep} 
                        prevStep={prevStep} 
                    />
                );
            case 4:
                return (
                    <Part4Management 
                        formData={formData} 
                        handleChange={handleChange} 
                        handleNestedChange={handleNestedChange} // Pass handleNestedChange for nested fields
                        prevStep={prevStep} 
                        handleSubmit={handleSubmit} 
                        loading={loading}
                        error={error}
                    />
                );
            default:
                return <p>Invalid Step</p>;
        }
    };

    return (
        <div className="patient-record-form-container">
            <h2>Patient Record - Step {step} of 4</h2>
            {renderStep()}
            {success && <p className="success-message">Record Submitted Successfully!</p>}
            {error && <p className="error-message">{error}</p>} {/* Display error messages */}
        </div>
    );
};

export default PatientRecordForm;