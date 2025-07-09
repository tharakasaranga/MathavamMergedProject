// pages/Appointment/SessionBookingForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // For making API requests

const SessionBookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    doctor: '', // This will likely be the ID of the doctor/therapist
    appointmentDate: '',
    appointmentTime: '',
    notes: '',
    status: 'Pending', // Default status
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // You would typically fetch a list of doctors/therapists from your backend
  // For now, let's use a placeholder list
  const [doctors, setDoctors] = useState([
    { _id: '60d0fe4f5311236168a109ca', firstName: 'Dr.', lastName: 'Smith' },
    { _id: '60d0fe4f5311236168a109cb', firstName: 'Therapist', lastName: 'Johnson' },
  ]);

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
      // Assuming your backend API endpoint for appointments is /api/appointments
      const response = await axios.post('http://localhost:5000/api/appointments', formData);
      console.log('Appointment booked successfully:', response.data);
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
      // Optionally navigate to a confirmation page or list of appointments
      navigate('/dashboard/appointments'); // Navigate back to the appointment management page
    } catch (err) {
      console.error('Error booking appointment:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.error : 'Failed to book appointment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Session Booking Form</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">Appointment booked successfully!</div>}

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
            <label htmlFor="doctor" className="block text-sm font-medium text-gray-700">Doctor/Therapist</label>
            <select
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select a Doctor/Therapist</option>
              {doctors.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.firstName} {doc.lastName}
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
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Book Session'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionBookingForm;