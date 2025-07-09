// pages/Appointment/AppointmentManagement.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppointmentManagement = () => {
  const [selectedType, setSelectedType] = useState('');
  const navigate = useNavigate();

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    // Navigate to the respective form based on the selected type
    if (type === 'session') {
      navigate('/dashboard/appointments/session-booking');
    } else if (type === 'service') {
      navigate('/dashboard/appointments/service-booking');
    } else if (type === 'doctor') {
      navigate('/dashboard/appointments/doctor-booking');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Appointment Management</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Session Booking Card */}
        <div
          className={`bg-indigo-50 border-2 ${
            selectedType === 'session' ? 'border-indigo-600' : 'border-indigo-200'
          } rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
          onClick={() => handleTypeSelect('session')}
        >
          <div className="text-5xl mb-4 text-indigo-700">
            <i className="fas fa-calendar-alt"></i> {/* You might need to add FontAwesome for this icon */}
          </div>
          <h3 className="text-xl font-semibold text-indigo-800 mb-2">Session Booking</h3>
          <p className="text-gray-600 text-center">Book individual therapy or consultation sessions.</p>
        </div>

        {/* Service Booking Card */}
        <div
          className={`bg-green-50 border-2 ${
            selectedType === 'service' ? 'border-green-600' : 'border-green-200'
          } rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
          onClick={() => handleTypeSelect('service')}
        >
          <div className="text-5xl mb-4 text-green-700">
            <i className="fas fa-briefcase-medical"></i> {/* Icon for medical service */}
          </div>
          <h3 className="text-xl font-semibold text-green-800 mb-2">Service Booking</h3>
          <p className="text-gray-600 text-center">Schedule appointments for various medical services.</p>
        </div>

        {/* Doctor Appointment Card */}
        <div
          className={`bg-purple-50 border-2 ${
            selectedType === 'doctor' ? 'border-purple-600' : 'border-purple-200'
          } rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
          onClick={() => handleTypeSelect('doctor')}
        >
          <div className="text-5xl mb-4 text-purple-700">
            <i className="fas fa-user-md"></i> {/* Icon for doctor */}
          </div>
          <h3 className="text-xl font-semibold text-purple-800 mb-2">Doctor Appointment</h3>
          <p className="text-gray-600 text-center">Book an appointment directly with a doctor.</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagement;