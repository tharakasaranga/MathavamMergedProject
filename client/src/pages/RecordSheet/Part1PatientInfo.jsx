// D:\Computer Science  - University of Jaffna\3rd Year\Group Project\Mathavam Project\client\src\pages\RecordSheet\Part1PatientInfo.jsx

import React from 'react';

const Part1PatientInfo = ({ formData, handleChange, nextStep }) => {
    return (
        <div className="w-full px-4 py-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-xl my-8 font-sans text-gray-800">
            <h2 className="text-3xl font-extrabold text-center text-indigo-800 mb-8 tracking-tight leading-tight">
                Patient Information Form - Part 1
            </h2>

            <form className="space-y-8"> {/* Sets vertical spacing between direct children (Sections) */}
                {/* Patient Information Section */}
                <Section title="Patient Details">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                        <div className="flex flex-col">
                            <label htmlFor="childNo" className="block text-sm font-semibold text-blue-900 mb-2">Child No:</label>
                            <input
                                type="text"
                                id="childNo"
                                name="childNo"
                                value={formData.childNo || ''}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="name" className="block text-sm font-semibold text-blue-900 mb-2">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name || ''}
                                onChange={handleChange}
                                required
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4"> {/* Full width for address */}
                        <label htmlFor="address" className="block text-sm font-semibold text-blue-900 mb-2">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address || ''}
                            onChange={handleChange}
                            className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                       focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                       transition duration-200 ease-in-out shadow-sm resize-y hover:border-blue-300"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4"> {/* 3 columns for these fields */}
                        <div className="flex flex-col">
                            <label htmlFor="contactNo" className="block text-sm font-semibold text-blue-900 mb-2">Contact No:</label>
                            <input
                                type="text"
                                id="contactNo"
                                name="contactNo"
                                value={formData.contactNo || ''}
                                onChange={handleChange}
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="gnDiv" className="block text-sm font-semibold text-blue-900 mb-2">GN Division:</label>
                            <input
                                type="text"
                                id="gnDiv"
                                name="gnDiv"
                                value={formData.gnDiv || ''}
                                onChange={handleChange}
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="referredBy" className="block text-sm font-semibold text-blue-900 mb-2">Referred By:</label>
                            <input
                                type="text"
                                id="referredBy"
                                name="referredBy"
                                value={formData.referredBy || ''}
                                onChange={handleChange}
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4">
                        <label htmlFor="reasonForReferral" className="block text-sm font-semibold text-blue-900 mb-2">Reason for Referral:</label>
                        <textarea
                            id="reasonForReferral"
                            name="reasonForReferral"
                            value={formData.reasonForReferral || ''}
                            onChange={handleChange}
                            rows="3"
                            className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                       focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                       transition duration-200 ease-in-out shadow-sm resize-y hover:border-blue-300"
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {/* Remaining fields in 2 columns */}
                        <div className="flex flex-col">
                            <label htmlFor="dateOfInitialAssessment" className="block text-sm font-semibold text-blue-900 mb-2">Date of Initial Assessment:</label>
                            <input
                                type="date"
                                id="dateOfInitialAssessment"
                                name="dateOfInitialAssessment"
                                value={formData.dateOfInitialAssessment ? new Date(formData.dateOfInitialAssessment).toISOString().substring(0, 10) : ''}
                                onChange={handleChange}
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-blue-900 mb-2">Date of Birth:</label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={formData.dateOfBirth ? new Date(formData.dateOfBirth).toISOString().substring(0, 10) : ''}
                                onChange={handleChange}
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="gender" className="block text-sm font-semibold text-blue-900 mb-2">Gender:</label>
                            <select
                                id="gender"
                                name="gender"
                                value={formData.gender || ''}
                                onChange={handleChange}
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="age" className="block text-sm font-semibold text-blue-900 mb-2">Age:</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={formData.age || ''}
                                onChange={handleChange}
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            />
                        </div>
                    </div>
                </Section>

                {/* Parent Information Section */}
                <Section title="Parent Details">
                    {/* Mother's Details */}
                    <h4 className="text-xl font-medium text-blue-800 mb-4 mt-6 border-b pb-2 border-blue-100">Mother's Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="flex flex-col">
                            <label htmlFor="motherName" className="block text-sm font-semibold text-blue-900 mb-2">Name:</label>
                            <input
                                type="text"
                                id="motherName"
                                name="motherName"
                                value={formData.motherName || ''}
                                onChange={handleChange}
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="motherAge" className="block text-sm font-semibold text-blue-900 mb-2">Age:</label>
                            <input
                                type="number"
                                id="motherAge"
                                name="motherAge"
                                value={formData.motherAge || ''}
                                onChange={handleChange}
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="motherQualification" className="block text-sm font-semibold text-blue-900 mb-2">Qualification:</label>
                            <input
                                type="text"
                                id="motherQualification"
                                name="motherQualification"
                                value={formData.motherQualification || ''}
                                onChange={handleChange}
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="motherOccupation" className="block text-sm font-semibold text-blue-900 mb-2">Occupation:</label>
                            <input
                                type="text"
                                id="motherOccupation"
                                name="motherOccupation"
                                value={formData.motherOccupation || ''}
                                onChange={handleChange}
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            />
                        </div>
                        <div className="flex flex-col md:col-span-1"> {/* Changed to md:col-span-1 for compactness */}
                            <label htmlFor="motherTelephoneNo" className="block text-sm font-semibold text-blue-900 mb-2">Telephone No:</label>
                            <input
                                type="text"
                                id="motherTelephoneNo"
                                name="motherTelephoneNo"
                                value={formData.motherTelephoneNo || ''}
                                onChange={handleChange}
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            />
                        </div>
                    </div>

                    {/* Father's Details */}
                    <h4 className="text-xl font-medium text-blue-800 mb-4 mt-6 border-b pb-2 border-blue-100">Father's Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col">
                            <label htmlFor="fatherName" className="block text-sm font-semibold text-blue-900 mb-2">Name:</label>
                            <input
                                type="text"
                                id="fatherName"
                                name="fatherName"
                                value={formData.fatherName || ''}
                                onChange={handleChange}
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="fatherAge" className="block text-sm font-semibold text-blue-900 mb-2">Age:</label>
                            <input
                                type="number"
                                id="fatherAge"
                                name="fatherAge"
                                value={formData.fatherAge || ''}
                                onChange={handleChange}
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="fatherQualification" className="block text-sm font-semibold text-blue-900 mb-2">Qualification:</label>
                            <input
                                type="text"
                                id="fatherQualification"
                                name="fatherQualification"
                                value={formData.fatherQualification || ''}
                                onChange={handleChange}
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="fatherOccupation" className="block text-sm font-semibold text-blue-900 mb-2">Occupation:</label>
                            <input
                                type="text"
                                id="fatherOccupation"
                                name="fatherOccupation"
                                value={formData.fatherOccupation || ''}
                                onChange={handleChange}
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            />
                        </div>
                        <div className="flex flex-col md:col-span-1"> {/* Changed to md:col-span-1 for compactness */}
                            <label htmlFor="fatherTelephoneNo" className="block text-sm font-semibold text-blue-900 mb-2">Telephone No:</label>
                            <input
                                type="text"
                                id="fatherTelephoneNo"
                                name="fatherTelephoneNo"
                                value={formData.fatherTelephoneNo || ''}
                                onChange={handleChange}
                                className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                           focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                           transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                            />
                        </div>
                    </div>
                </Section>

                {/* General Diagnosis */}
                <Section title="Diagnosis">
                    <div className="flex flex-col">
                        <label htmlFor="diagnosis" className="block text-sm font-semibold text-blue-900 mb-2">General Diagnosis:</label>
                        <input
                            type="text"
                            id="diagnosis"
                            name="diagnosis"
                            value={formData.diagnosis || ''}
                            onChange={handleChange}
                            className="w-full rounded-md px-4 py-3 text-gray-800 bg-white border-2 border-blue-200
                                       focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-blue-400
                                       transition duration-200 ease-in-out shadow-sm hover:border-blue-300"
                        />
                    </div>
                </Section>

                <div className="flex justify-end mt-8">
                    <button
                        type="button"
                        onClick={nextStep}
                        className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800
                                   text-white font-semibold py-3 px-10 rounded-full shadow-lg
                                   hover:shadow-2xl transform hover:scale-105 active:scale-95
                                   transition-all duration-300 ease-in-out text-base tracking-wide
                                   focus:outline-none focus:ring-4 focus:ring-purple-400"
                    >
                        Next →
                    </button>
                </div>
            </form>
        </div>
    );
};

// Re-used Section component for consistent styling
const Section = ({ title, children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-xl border-l-4 border-blue-400
    hover:shadow-2xl transition-all duration-300 ease-in-out
    ${className}`}>
    <h3 className="text-2xl font-semibold text-blue-900 mb-6 border-b pb-2 border-blue-100">
      {title}
    </h3>
    {children}
  </div>
);

export default Part1PatientInfo;
