// client/src/pages/Appointment/DoctorAppointmentBooking.jsx (updated)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorAppointmentBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientId: '',        // Holds the _id of the selected child
    practitionerId: '',   // Holds the _id of the selected Doctor/Therapist
    appointmentDate: '',
    startTime: '',        // New: "HH:MM" format
    endTime: '',          // New: "HH:MM" format
    notes: '',
    status: 'Pending',
    serviceType: 'General Consultation', // Default for doctor appointments
  });
  const [practitioners, setPractitioners] = useState([]); // Doctors and Therapists
  const [patients, setPatients] = useState([]);         // Registered Children
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchDataForDropdowns = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch all users and filter for Doctors and Therapists
        // Ideally, you'd have a specific backend endpoint like /api/users/practitioners
        const usersResponse = await axios.get('http://localhost:5000/api/users');
        const medicalPersonnel = usersResponse.data.filter(
          (user) => user.userType === 'Doctor' || user.userType === 'Therapist'
        );
        setPractitioners(medicalPersonnel);

        // Fetch all registered children (patients)
        // Assuming a route like /api/child is available to get all children
        const patientsResponse = await axios.get('http://localhost:5000/api/child'); // Adjust if your child endpoint is different
        setPatients(patientsResponse.data); // Assuming response.data is an array of child objects
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data for dropdowns:', err.response ? err.response.data : err.message);
        setError('Failed to load practitioners or patients. Please try again.');
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
    setSuccess(false); // Clear success message on change
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
      console.log('Appointment created:', response.data);
      // Optionally reset form or navigate
      setFormData({
        patientId: '',
        practitionerId: '',
        appointmentDate: '',
        startTime: '',
        endTime: '',
        notes: '',
        status: 'Pending',
        serviceType: 'General Consultation',
      });
      navigate('/dashboard/appointments/success'); // Or to a list view
    } catch (err) {
      console.error('Error booking appointment:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || 'Failed to book appointment. Please check your inputs.');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Book Doctor/Therapist Appointment</h2>

      {loading && <p className="text-blue-500 text-center">Loading data...</p>}
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">Appointment booked successfully!</p>}

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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          >
            <option value="">Select a patient</option>
            {patients.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.firstName} {patient.lastName} ({patient.childRegNo})
              </option>
            ))}
          </select>
        </div>

        {/* Practitioner Selection */}
        <div>
          <label htmlFor="practitionerId" className="block text-sm font-medium text-gray-700">Select Doctor or Therapist</label>
          <select
            id="practitionerId"
            name="practitionerId"
            value={formData.practitionerId}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
          >
            <option value="">Select a practitioner</option>
            {practitioners.map((practitioner) => (
              <option key={practitioner._id} value={practitioner._id}>
                {practitioner.firstName} {practitioner.lastName} ({practitioner.userType})
              </option>
            ))}
          </select>
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
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
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
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
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            disabled={loading}
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorAppointmentBooking;