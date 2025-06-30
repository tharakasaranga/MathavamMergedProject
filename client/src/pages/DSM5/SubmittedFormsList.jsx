import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SubmittedFormsList = () => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/dsm5forms");
      setForms(res.data); // Assuming your backend returns an array of forms
      setLoading(false);
    } catch (err) {
      console.error("Error fetching forms:", err);
      setError("Failed to load forms. Please try again later.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      try {
        await axios.delete(`http://localhost:5000/api/dsm5forms/${id}`);
        alert("Form deleted successfully!");
        fetchForms(); // Refresh the list after deletion
      } catch (err) {
        console.error("Error deleting form:", err);
        alert("Failed to delete form. Check console for error.");
      }
    }
  };

  const handleView = (id) => {
    navigate(`/submitted-forms/${id}`);
  };

  if (loading) {
    return <div className="text-center p-8">Loading forms...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-[80%] border border-indigo-300 space-y-6">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">
          Submitted DSM-5 Forms
        </h1>

        {forms.length === 0 ? (
          <p className="text-center text-gray-600">No forms submitted yet.</p>
        ) : (
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-indigo-100 text-indigo-800">
                <th className="px-4 py-2">Serial No.</th>
                <th className="px-4 py-2">Patient ID</th>
                <th className="px-4 py-2">Patient Name</th>
                <th className="px-4 py-2">Submitted Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form, index) => (
                <tr key={form._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{form.patientInfo.id}</td>
                  <td className="px-4 py-3">{form.patientInfo.name}</td>
                  <td className="px-4 py-3">
                    {new Date(form.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button
                      onClick={() => handleView(form._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm cursor-pointer"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(form._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SubmittedFormsList;