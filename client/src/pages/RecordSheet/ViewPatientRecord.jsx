// D:\Computer Science - University of Jaffna\3rd Year\Group Project\Mathavam Project\client\src\pages\RecordSheet\ViewPatientRecord.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';

const ViewPatientRecord = () => {
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate();
    const [record, setRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecord = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/patientRecords/${id}`);
                setRecord(response.data);
                setLoading(false);
            } catch (err) {
                console.error(`Error fetching record with ID ${id}:`, err);
                setError('Failed to load patient record. It might not exist or there was a server error.');
                setLoading(false);
            }
        };

        fetchRecord();
    }, [id]); // Re-run effect if ID changes

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to permanently delete this patient record?')) {
            try {
                await axios.delete(`http://localhost:5000/api/patientRecords/${id}`);
                alert('Patient record deleted successfully!');
                navigate('/patient-records');
            } catch (err) {
                console.error(`Error deleting record with ID ${id}:`, err);
                alert('Failed to delete patient record. Please try again.');
            }
        }
    };

    // Helper to render individual fields with improved readability for boolean and date types
    const renderField = (label, value) => {
        // Exclude rendering if value is empty/null/undefined or an empty array/object
        if (value === undefined || value === null || value === '' || 
            (Array.isArray(value) && value.length === 0) ||
            (typeof value === 'object' && Object.keys(value).length === 0)) {
            return null; 
        }

        let displayValue = value;
        if (typeof value === 'boolean') {
            displayValue = value ? 'Yes' : 'No';
        } else if (typeof value === 'string' && (label.toLowerCase().includes('date') || label.toLowerCase().includes('dob') || label.toLowerCase().includes('review date'))) {
            try {
                const date = new Date(value);
                if (!isNaN(date.getTime())) { // Check if it's a valid date
                    displayValue = date.toLocaleDateString();
                }
            } catch (e) {
                // Ignore parsing errors, treat as regular string
            }
        } else if (Array.isArray(value)) {
            displayValue = value.join(', ');
        }
        
        return (
            <p className="flex flex-col mb-3 text-gray-700">
                <strong className="font-semibold text-blue-800 text-sm mb-1">{label}:</strong> 
                <span className="text-base">{displayValue}</span>
            </p>
        );
    };

    // Helper to render sections (nested objects)
    const renderSection = (title, dataObject) => {
        // Don't render section if all its fields are empty or the object is empty
        if (!dataObject || Object.keys(dataObject).length === 0 || 
            Object.values(dataObject).every(val => val === null || val === undefined || val === '' || 
                                               (typeof val === 'object' && Object.keys(val).length === 0))) {
            return null; 
        }
        return (
            <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-gray-200">
                <h3 className="text-xl font-bold text-blue-700 border-b pb-3 mb-4">{title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                    {Object.entries(dataObject).map(([key, value]) => {
                        // Attempt to make keys more readable
                        const readableKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                        if (typeof value === 'object' && !Array.isArray(value) && value !== null && Object.keys(value).length > 0) {
                             // Render nested objects as sub-sections, if they are not empty
                             return (
                                <div key={key} className="col-span-full">
                                    <h4 className="text-lg font-semibold text-blue-600 mt-4 mb-2 border-b border-gray-100 pb-2">{readableKey}:</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 pl-4 pt-2">
                                        {Object.entries(value).map(([subKey, subValue]) => {
                                            const readableSubKey = subKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                                            return renderField(readableSubKey, subValue);
                                        })}
                                    </div>
                                </div>
                            );
                        }
                        return renderField(readableKey, value);
                    })}
                </div>
            </div>
        );
    };


    if (loading) {
        return <div className="text-center text-xl font-semibold mt-10 text-gray-700">Loading patient record details...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600 text-xl font-semibold mt-10">{error}</div>;
    }

    if (!record) {
        return <div className="text-center text-gray-600 text-xl font-semibold mt-10">Patient record not found.</div>;
    }

    // Main render
    return (
        <div className="p-8 bg-gray-50 rounded-lg shadow-xl max-w-7xl mx-auto my-8 font-sans">
            <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-10 tracking-tight">Patient Record Overview</h2>
            
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <Link 
                    to="/patient-records" 
                    className="px-6 py-3 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow-sm hover:bg-gray-300 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
                >
                    ← Back to List
                </Link>
                <div className="flex space-x-4">
                    <Link 
                        to={`/patient-records/edit/${record._id}`} 
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Edit Record
                    </Link>
                    <button
                        onClick={handleDelete}
                        className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Delete Record
                    </button>
                </div>
            </div>

            <div className="space-y-8">
                {/* Part 1: Patient Information */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-blue-100">
                    <h3 className="text-2xl font-bold text-blue-900 mb-6 border-b pb-4 border-blue-200">Patient Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                        {renderField('Child No', record.childNo)}
                        {renderField('Name', record.name)}
                        {renderField('Address', record.address)}
                        {renderField('Contact No', record.contactNo)}
                        {renderField('GN Division', record.gnDiv)}
                        {renderField('Referred By', record.referredBy)}
                        {renderField('Reason For Referral', record.reasonForReferral)}
                        {renderField('Date of Initial Assessment', record.dateOfInitialAssessment)}
                        {renderField('Date of Birth', record.dob)}
                        {renderField('Gender', record.gender)}
                        {renderField('Age', record.age)}
                        {renderField('Registration No', record.regNo)}
                        {renderField('Language Used', record.languageUsed)}
                        {renderField('Primary Carer', record.primaryCarer)}
                        {renderField('Medical Diagnosis', record.medicalDiagnosis)}
                        {renderField('Communication Diagnosis', record.communicationDiagnosis)}
                        {renderField('Family History (Top-Level)', record.familyHistory)}
                        {renderField('Hearing', record.hearing)}
                        {renderField('Vision', record.vision)}
                        {renderField('Siblings', record.siblings)}
                        {renderField('Motor Development', record.motorDevelopment)}
                        {renderField('Speech Regression', record.speechRegression)}
                        {renderField('Assessment Date', record.assessmentDate)}
                        {renderField('Accessed By', record.accessBy)}
                    </div>
                </div>

                {renderSection('Parent Information', record.parentInformation)}
                
                {/* Part 2: Review of System */}
                {renderSection('Review of Systems - Growth & Weight Problems', record.reviewOfSystem?.growthWeightProblems)}
                {renderSection('Review of Systems - Respiratory System', record.reviewOfSystem?.respiratorySystem)}
                {renderSection('Review of Systems - Gastrointestinal System', record.reviewOfSystem?.gastrointestinalSystem)}
                {renderSection('Review of Systems - Cardiovascular System', record.reviewOfSystem?.cardiovascularSystem)}
                {renderSection('Review of Systems - Genitourinary System', record.reviewOfSystem?.genitourinarySystem)}
                {renderSection('Review of Systems - Musculoskeletal System', record.reviewOfSystem?.musculoskeletalSystem)}
                {renderSection('Review of Systems - Nervous System', record.reviewOfSystem?.nervousSystem)}
                {renderSection('Review of Systems - Sensory Organs (Eyes/Ears)', record.reviewOfSystem?.sensoryOrgans)}
                {renderSection('Review of Systems - Skin', record.reviewOfSystem?.skin)}

                {/* Part 2: Developmental History */}
                {renderSection('Developmental History - Motor Development', record.developmentalHistory?.motor)}
                {renderSection('Developmental History - Speech and Language Development', record.developmentalHistory?.speechAndLanguage)}
                {renderSection('Developmental History - Social and Emotional Development', record.developmentalHistory?.socialAndEmotional)}
                {renderSection('Developmental History - Cognitive Development', record.developmentalHistory?.cognitive)}
                {renderSection('Developmental History - Toileting Habits', record.developmentalHistory?.toileting)}
                {renderSection('Developmental History - Feeding Habits', record.developmentalHistory?.feeding)}
                {renderSection('Developmental History - Sleep Patterns', record.developmentalHistory?.sleep)}
                {renderSection('Developmental History - Play Behavior', record.developmentalHistory?.play)}
                {renderSection('Developmental History - Behavioral Observations', record.developmentalHistory?.behavior)}
                {renderSection('Developmental History - Specific Skills', record.developmentalHistory?.specificSkills)}
                {renderSection('Developmental History - School Readiness', record.developmentalHistory?.schoolReadiness)}
                {renderSection('Developmental History - Allergies', record.developmentalHistory?.allergies)}
                {renderSection('Developmental History - Immunization History', record.developmentalHistory?.immunization)}
                {renderSection('Developmental History - Medications', record.developmentalHistory?.medications)}
                {renderSection('Developmental History - Hospitalizations', record.developmentalHistory?.hospitalizations)}
                {renderSection('Developmental History - Family History (Detailed)', record.developmentalHistory?.familyHistory)}

                {/* Part 3: Other Sections and Clinical Details */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-yellow-100">
                    <h3 className="text-2xl font-bold text-yellow-900 mb-6 border-b pb-4 border-yellow-200">Clinical and Other Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                        {renderField('Chief Complaints', record.chiefComplaints)}
                        {renderField('Parent\'s Expectation', record.parentsExpectation)}
                        {renderSection('Clinical Diagnosis', record.clinicalDiagnosis)}
                        {renderField('Associated Conditions', record.associatedConditions)}
                        {renderField('Schooling Details', record.schooling)}
                        {renderField('Presenting Complaints Summary', record.presentingComplaintsSummary)}
                    </div>
                </div>

                {/* Therapy Assessment Forms Data */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-teal-100">
                    <h3 className="text-2xl font-bold text-teal-900 mb-6 border-b pb-4 border-teal-200">Detailed Assessment Data</h3>

                    {renderSection('Pre-Requisite Skills', record.prerequisiteSkills)}
                    {renderSection('Communication Skills', record.communicationSkills)}
                    {renderSection('Language Skills', record.languageSkills)}
                    {renderSection('Speech Skills', record.speechSkills)}
                    {renderSection('Oral Motor Assessment', record.oralMotorAssessment)}
                </div>


                {/* Part 4: Management Plan */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-indigo-100">
                    <h3 className="text-2xl font-bold text-indigo-900 mb-6 border-b pb-4 border-indigo-200">Management and Outcome</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                        {renderField('Management Plan', record.managementPlan)}
                        {renderField('Home Training Recommendations', record.homeTrainingRecommendations)}
                        {renderField('Summary', record.summary)}
                        {renderField('CARS Score', record.carsScore)}
                        {renderField('Vineland Social Maturity Scale', record.vinelandSocialMaturityScale)}
                        {renderSection('Assessment Plan', record.assessmentPlan)}
                        {renderField('Future Therapy Plan', record.futureTherapyPlan)}
                        {renderField('Next Review Date', record.nextReviewDate)}
                        {renderField('Therapist Name', record.therapistName)}
                        {renderField('Contact Number of Therapist', record.contactNumberOfTherapist)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewPatientRecord;