// client/src/pages/Appointment/SessionBookingForm.jsx (updated)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SessionBookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientId: '',         // Holds the _id of the selected child
    practitionerId: '',    // Holds the _id of the selected Resource Person/Therapist/Doctor for the session
    serviceType: 'Session', // Default to 'Session' for this form
    appointmentDate: '',
    startTime: '',
    endTime: '',
    notes: '',
    status: 'Pending',
  });
  const [sessionPractitioners, setSessionPractitioners] = useState([]); // Resource Persons, Therapists, Doctors
  const [patients, setPatients] = useState([]);     // Registered Children
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchDataForDropdowns = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch users and filter for Resource Persons, Therapists, and Doctors who can conduct sessions
        // You might define a specific role for "session conductors" if needed.
        // For now, I'll include Resource Person, Doctor, and Therapist.
        const usersResponse = await axios.get('http://localhost:5000/api/users');
        const sessionProviders = usersResponse.data.filter(
          (user) => user.userType === 'Resource Person' || user.userType === 'Doctor' || user.userType === 'Therapist'
        );
        setSessionPractitioners(sessionProviders);

        // Fetch all registered children (patients)
        const patientsResponse = await axios.get('http://localhost:5000/api/child');
        setPatients(patientsResponse.data);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data for dropdowns:', err.response ? err.response.data : err.message);
        setError('Failed to load session providers or patients. Please try again.');
        setLoading(false);
      }
    };
    fetchDataForDropdowns();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:5000/api/appointments', formData);
      setSuccess(true);
      setLoading(false);
      console.log('Session appointment created:', response.data);
      // Optionally reset form or navigate
      setFormData({
        patientId: '',
        practitionerId: '',
        serviceType: 'Session',
        appointmentDate: '',
        startTime: '',
        endTime: '',
        notes: '',
        status: 'Pending',
      });
      navigate('/dashboard/appointments/success'); // Or to a list view
    } catch (err) {
      console.error('Error booking session appointment:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || 'Failed to book session appointment. Please check your inputs.');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Book Session Appointment</h2>

      {loading && <p className="text-blue-500 text-center">Loading data...</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">Session appointment booked successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Patient Selection */}
        <div>
          <label htmlFor="patientId" className="block text-sm font-medium text-gray-700">Select Patient (Child)</label>
          <select
            id="patientId"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.firstName} {patient.lastName} ({patient.childRegNo})
              </option>
            ))}
          </select>
        </div>

        {/* Practitioner Selection for Session */}
        <div>
          <label htmlFor="practitionerId" className="block text-sm font-medium text-gray-700">Select Session Provider</label>
          <select
            id="practitionerId"
            name="practitionerId"
            value={formData.practitionerId}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a session provider</option>
            {sessionPractitioners.map((practitioner) => (
              <option key={practitioner._id} value={practitioner._id}>
                {practitioner.firstName} {practitioner.lastName} ({practitioner.userType})
              </option>
            ))}
          </select>
        </div>

        {/* Service Type (fixed to 'Session') */}
        <div>
          <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">Service Type</label>
          <input
            type="text"
            id="serviceType"
            name="serviceType"
            value={formData.serviceType}
            readOnly // Make it read-only as it's fixed for this form
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm"
          />
        </div>

        {/* Appointment Date */}
        <div>
          <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">Appointment Date</label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Start Time */}
        <div>
          <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* End Time */}
        <div>
          <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Notes */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes (Optional)</label>
          <textarea
            id="notes"
            name="notes"
            rows="3"
            value={formData.notes}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => navigate('/dashboard/appointments')}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Book Session Appointment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionBookingForm;