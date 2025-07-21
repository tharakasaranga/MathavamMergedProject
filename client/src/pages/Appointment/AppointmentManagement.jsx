// client/src/pages/Appointment/AppointmentManagement.jsx (updated)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AppointmentManagement = () => {
  const [selectedType, setSelectedType] = useState('');
  const [currentUserType, setCurrentUserType] = useState(null); // State to hold current user's type
  const [currentUserId, setCurrentUserId] = useState(null); // State to hold current user's ID (for quick link)
  const navigate = useNavigate();

  useEffect(() => {
    // Get user type and ID from localStorage (assuming it's stored on login)
    const user = JSON.parse(localStorage.getItem('user')); // Get the full user object
    if (user && user.userType) {
      setCurrentUserType(user.userType);
      setCurrentUserId(user.id); // Assuming user.id holds the user's _id
    }
  }, []);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
    if (type === 'session') {
      navigate('/dashboard/appointments/session-booking');
    } else if (type === 'service') {
      navigate('/dashboard/appointments/service-booking');
    } else if (type === 'doctor') {
      navigate('/dashboard/appointments/doctor-booking');
    } else if (type === 'my-schedule') {
      navigate('/dashboard/appointments/my-schedule'); // Route for practitioner calendar
    } else if (type === 'all-appointments') {
        navigate('/dashboard/appointments/all'); // Route for admin overview
    }
  };

  // Determine user roles for conditional rendering
  const isPractitioner = currentUserType === 'Doctor' || currentUserType === 'Therapist';
  const isAdmin = currentUserType === 'Admin' || currentUserType === 'Super Admin';
  const isParent = currentUserType === 'Parent';
  const isResourcePerson = currentUserType === 'Resource Person';


  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Appointment Management</h2>

      {/* Quick Access for Practitioners */}
      {isPractitioner && (
        <div className="mb-8 p-4 bg-blue-100 border border-blue-300 rounded-lg flex justify-between items-center shadow-sm">
          <p className="text-blue-800 text-lg font-medium">Quickly view your upcoming appointments:</p>
          <button
            onClick={() => navigate('/dashboard/appointments/my-schedule')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <i className="fas fa-calendar-check mr-2"></i> View My Schedule
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Doctor Appointment Card (for Parents/Admins) */}
        {(isParent || isAdmin) && (
          <div
            className={`bg-purple-50 border-2 ${
              selectedType === 'doctor' ? 'border-purple-600' : 'border-purple-200'
            } rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            onClick={() => handleTypeSelect('doctor')}
          >
            <div className="text-5xl mb-4 text-purple-700">
              <i className="fas fa-user-md"></i> {/* Icon for doctor */}
            </div>
            <h3 className="text-xl font-semibold text-purple-800 mb-2">Book Doctor Appointment</h3>
            <p className="text-gray-600 text-center">Schedule appointments with doctors.</p>
          </div>
        )}

        {/* Service Booking Card (for Parents/Admins/Therapists) */}
        {(isParent || isAdmin || isPractitioner) && (
          <div
            className={`bg-green-50 border-2 ${
              selectedType === 'service' ? 'border-green-600' : 'border-green-200'
            } rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            onClick={() => handleTypeSelect('service')}
          >
            <div className="text-5xl mb-4 text-green-700">
              <i className="fas fa-briefcase-medical"></i> {/* Icon for medical service */}
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">Book Service Appointment</h3>
            <p className="text-gray-600 text-center">Schedule appointments for various therapy services.</p>
          </div>
        )}

        {/* Session Booking Card (Re-enabled and updated) - for Parents, Admins, Resource Person, Practitioners */}
        {(isParent || isAdmin || isResourcePerson || isPractitioner) && (
          <div
            className={`bg-indigo-50 border-2 ${
              selectedType === 'session' ? 'border-indigo-600' : 'border-indigo-200'
            } rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            onClick={() => handleTypeSelect('session')}
          >
            <div className="text-5xl mb-4 text-indigo-700">
              <i className="fas fa-users"></i> {/* Icon for sessions/groups */}
            </div>
            <h3 className="text-xl font-semibold text-indigo-800 mb-2">Book Session</h3>
            <p className="text-gray-600 text-center">Schedule group or specific topic sessions.</p>
          </div>
        )}

        {/* Practitioner's Personal Schedule (for Doctors/Therapists) */}
        {isPractitioner && (
          <div
            className={`bg-blue-50 border-2 ${
              selectedType === 'my-schedule' ? 'border-blue-600' : 'border-blue-200'
            } rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            onClick={() => handleTypeSelect('my-schedule')}
          >
            <div className="text-5xl mb-4 text-blue-700">
              <i className="fas fa-calendar-alt"></i> {/* Icon for calendar */}
            </div>
            <h3 className="text-xl font-semibold text-blue-800 mb-2">My Schedule</h3>
            <p className="text-gray-600 text-center">View and manage your upcoming appointments.</p>
          </div>
        )}

        {/* Admin/Super Admin All Appointments View (for Admins) */}
        {isAdmin && (
          <div
            className={`bg-orange-50 border-2 ${
              selectedType === 'all-appointments' ? 'border-orange-600' : 'border-orange-200'
            } rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
            onClick={() => handleTypeSelect('all-appointments')}
          >
            <div className="text-5xl mb-4 text-orange-700">
              <i className="fas fa-list-alt"></i> {/* Icon for list */}
            </div>
            <h3 className="text-xl font-semibold text-orange-800 mb-2">View All Appointments</h3>
            <p className="text-gray-600 text-center">Oversee and manage all system appointments.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentManagement;