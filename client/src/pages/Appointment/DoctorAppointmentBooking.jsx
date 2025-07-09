// pages/Appointment/DoctorAppointmentBooking.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DoctorAppointmentBooking = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    doctor: '', // This will hold the _id of the selected doctor
    appointmentDate: '',
    appointmentTime: '',
    notes: '',
    status: 'Pending',
  });
  const [doctors, setDoctors] = useState([]); // State to store fetched doctors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Fetch doctors (users with userType: 'Doctor' or 'Therapist') from your backend
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users'); // Adjust this endpoint if needed
        // Filter for users who are 'Doctor' or 'Therapist'
        const medicalPersonnel = response.data.data.filter(
          (user) => user.userType === 'Doctor' || user.userType === 'Therapist'
        );
        setDoctors(medicalPersonnel);
      } catch (err) {
        console.error('Error fetching doctors:', err.response ? err.response.data : err.message);
        setError('Failed to load doctor list.');
      }
    };
    fetchDoctors();
  }, []); // Empty dependency array means this runs once on component mount

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:5000/api/appointments', formData);
      console.log('Doctor appointment booked successfully:', response.data);
      setSuccess(true);
      setFormData({ // Clear form after successful submission
        patientName: '',
        patientPhone: '',
        patientEmail: '',
        doctor: '',
        appointmentDate: '',
        appointmentTime: '',
        notes: '',
        status: 'Pending',
      });
      navigate('/dashboard/appointments');
    } catch (err) {
      console.error('Error booking doctor appointment:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.error : 'Failed to book doctor appointment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Doctor Appointment Booking Form</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">Doctor appointment booked successfully!</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="patientName" className="block text-sm font-medium text-gray-700">Patient Name</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="patientPhone" className="block text-sm font-medium text-gray-700">Patient Phone</label>
            <input
              type="tel"
              id="patientPhone"
              name="patientPhone"
              value={formData.patientPhone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="patientEmail" className="block text-sm font-medium text-gray-700">Patient Email (Optional)</label>
            <input
              type="email"
              id="patientEmail"
              name="patientEmail"
              value={formData.patientEmail}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Doctor</label>
            <select
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select a Doctor</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.firstName} {doc.lastName} ({doc.userType})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">Appointment Date</label>
            <input
              type="date"
              id="appointmentDate"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700">Appointment Time</label>
            <input
              type="time"
              id="appointmentTime"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
        </div>

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
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Book Appointment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DoctorAppointmentBooking;