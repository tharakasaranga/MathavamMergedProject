// D:\Computer Science - University of Jaffn a\3rd Year\Group Project\Mathavam Project\client\src\pages\RecordSheet\PatientRecordForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Part1PatientInfo from './Part1PatientInfo';
import Part2History from './Part2History';
import Part3Diagnosis from './Part3Diagnosis';
import Part4Management from './Part4Management';

const PatientRecordForm = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('patientRecordFormData');
        return savedData ? JSON.parse(savedData) : {};
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        localStorage.setItem('patientRecordFormData', JSON.stringify(formData));
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // MODIFIED handleNestedChange function
    const handleNestedChange = (path, e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => {
            // Create a deep copy of the previous data to avoid direct mutation
            const newData = { ...prevData };
            
            // Split the path into individual keys (e.g., 'reviewOfSystem.growthWeightProblems' -> ['reviewOfSystem', 'growthWeightProblems'])
            const keys = path.split('.');
            
            // Traverse the newData object to reach the target nested object
            let current = newData;
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (!current[key]) {
                    current[key] = {}; // Initialize if the path doesn't exist
                }
                if (i < keys.length - 1) { // If not the last key in the path
                    current = current[key];
                } else { // This is the last key, where the target object resides
                    current[key] = {
                        ...current[key], // Spread existing properties of the target object
                        [name]: type === 'checkbox' ? checked : value // Update the specific field
                    };
                }
            }
            return newData;
        });
    };

    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    const prevStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const backendUrl = 'http://localhost:5000/api/patientRecords';
            const response = await axios.post(backendUrl, formData);
            console.log('Record saved successfully:', response.data);
            setSuccess(true);
            
            localStorage.removeItem('patientRecordFormData');
            setFormData({});
            setStep(1);

            alert('Patient record submitted successfully!');

        } catch (err) {
            console.error('Error submitting form:', err.response ? err.response.data : err.message);
            setError(err.response ? err.response.data.message : 'An unexpected error occurred.');
            alert('Error submitting form: ' + (err.response ? err.response.data.message : err.message));
        } finally {
            setLoading(false);
        }
    };

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
                        handleNestedChange={handleNestedChange}
                        nextStep={nextStep} 
                        prevStep={prevStep} 
                    />
                );
            case 3:
                return (
                    <Part3Diagnosis 
                        formData={formData} 
                        handleChange={handleChange} 
                        handleNestedChange={handleNestedChange}
                        nextStep={nextStep} 
                        prevStep={prevStep} 
                    />
                );
            case 4:
                return (
                    <Part4Management 
                        formData={formData} 
                        handleChange={handleChange} 
                        handleNestedChange={handleNestedChange}
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
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default PatientRecordForm;