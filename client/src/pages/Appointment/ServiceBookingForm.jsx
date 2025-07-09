// pages/Appointment/ServiceBookingForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ServiceBookingForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    serviceType: '', // New field for service type
    appointmentDate: '',
    appointmentTime: '',
    notes: '',
    status: 'Pending',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Placeholder for available services. In a real app, fetch this from API.
  const [services, setServices] = useState([
    { id: '1', name: 'General Consultation' },
    { id: '2', name: 'Diagnostic Testing' },
    { id: '3', name: 'Follow-up Checkup' },
    { id: '4', name: 'Counseling Session' },
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
      // For service booking, you might need to adjust the backend logic slightly
      // or ensure the existing appointment model can accommodate 'serviceType'.
      // If 'doctor' is a required field in your Appointment model, you might need to
      // either make it optional, or assign a default 'admin' or 'service coordinator' ID.
      // For simplicity here, I'm assuming your backend can handle the POST request
      // even if 'doctor' is empty for 'service' type, or you will map 'serviceType' to 'notes' or a new field.
      // A better approach would be to have a 'type' field in the Appointment model.
      const payload = { ...formData, doctor: '60d0fe4f5311236168a109ca' }; // Placeholder doctor ID if required by backend, otherwise remove
      // Or if you want to store serviceType in notes temporarily, or add a new field to your Appointment model
      // const payload = { ...formData, notes: `Service Type: ${formData.serviceType} - ${formData.notes}` };

      const response = await axios.post('http://localhost:5000/api/appointments', payload);
      console.log('Service booked successfully:', response.data);
      setSuccess(true);
      setFormData({ // Clear form after successful submission
        patientName: '',
        patientPhone: '',
        patientEmail: '',
        serviceType: '',
        appointmentDate: '',
        appointmentTime: '',
        notes: '',
        status: 'Pending',
      });
      navigate('/dashboard/appointments');
    } catch (err) {
      console.error('Error booking service:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.error : 'Failed to book service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Service Booking Form</h2>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
      {success && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">Service booked successfully!</div>}

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
            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">Type of Service</label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select a Service</option>
              {services.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name}
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
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Book Service'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceBookingForm;