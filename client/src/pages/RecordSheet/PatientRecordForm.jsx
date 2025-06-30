// D:\Computer Science - University of Jaffn a\3rd Year\Group Project\Mathavam Project\client\src\pages\RecordSheet\PatientRecordForm.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'; // මෙය අලුතින් එකතු කරන ලදි

import Part1PatientInfo from './Part1PatientInfo';
import Part2History from './Part2History';
import Part3Diagnosis from './Part3Diagnosis';
import Part4Management from './Part4Management';

const PatientRecordForm = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // URL එකෙන් ID එක ලබා ගනී (edit කිරීම සඳහා)
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem('patientRecordFormData');
        return savedData ? JSON.parse(savedData) : {};
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // localStorage වෙතින් දත්ත load කිරීමට හෝ ID එකක් ඇත්නම් පවතින record එක fetch කර ගැනීමට
    useEffect(() => {
        if (id) {
            const fetchRecord = async () => {
                setLoading(true);
                try {
                    const response = await axios.get(`http://localhost:5000/api/patientRecords/${id}`);
                    setFormData(response.data);
                    localStorage.setItem('patientRecordFormData', JSON.stringify(response.data));
                    setError(null); // පෙර තිබූ error ඉවත් කරයි
                } catch (err) {
                    console.error(`Error fetching record with ID ${id}:`, err);
                    setError('Failed to load patient record for editing. It might not exist.');
                    navigate('/patient-records'); // Record එකක් සොයාගත නොහැකි නම් ලැයිස්තු පිටුවට යොමු කරයි
                } finally {
                    setLoading(false);
                }
            };
            fetchRecord();
        } else {
            // නව records සඳහා, localStorage හි ඇති දත්ත ඉවත් කරයි (ඇත්නම්)
            localStorage.removeItem('patientRecordFormData');
            setFormData({}); // නව entry එකක් සඳහා form එක reset කරයි
        }
    }, [id, navigate]); // ID වෙනස් වුවහොත් හෝ navigate function වෙනස් වුවහොත් නැවත ක්‍රියාත්මක වේ

    // formData වෙනස් වන විට localStorage වෙත දත්ත save කරයි (multi-step persistence සඳහා)
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

    const handleNestedChange = (path, e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevData => {
            const newState = { ...prevData };
            const pathParts = path.split('.');
            let current = newState;
            for (let i = 0; i < pathParts.length - 1; i++) {
                if (!current[pathParts[i]]) {
                    current[pathParts[i]] = {};
                }
                current = current[pathParts[i]];
            }
            current[name] = type === 'checkbox' ? checked : value;
            return newState;
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
            let response;
            if (id) {
                // පවතින record එකක් යාවත්කාලීන කරයි (UPDATE)
                response = await axios.put(`http://localhost:5000/api/patientRecords/${id}`, formData);
                alert('Patient record updated successfully!');
            } else {
                // නව record එකක් නිර්මාණය කරයි (CREATE)
                response = await axios.post('http://localhost:5000/api/patientRecords', formData);
                alert('Patient record submitted successfully!');
            }
            setSuccess(true);
            setLoading(false);
            localStorage.removeItem('patientRecordFormData'); // සාර්ථකව submit/update කිරීමෙන් පසු form data ඉවත් කරයි
            navigate('/patient-records'); // සාර්ථක වීමෙන් පසු ලැයිස්තු පිටුවට යොමු කරයි
        } catch (err) {
            console.error('Error submitting patient record:', err.response ? err.response.data : err.message);
            setError(err.response?.data?.message || 'Failed to submit patient record. Please check your input.');
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