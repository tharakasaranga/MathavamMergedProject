// D:\Computer Science - University of Jaffna\3rd Year\Group Project\Mathavam Project\client\src\pages\RecordSheet\PatientRecordList.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const PatientRecordList = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/patientRecords"
      );
      setRecords(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching patient records:", err);
      setError("Failed to fetch patient records. Please try again later.");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this patient record?")
    ) {
      try {
        await axios.delete(`http://localhost:5000/api/patientRecords/${id}`);
        alert("Patient record deleted successfully!");
        fetchRecords(); // Refresh the list after deletion
      } catch (err) {
        console.error(`Error deleting record with ID ${id}:`, err);
        alert("Failed to delete patient record. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl font-semibold mt-10">
        Loading patient records...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 text-xl font-semibold mt-10">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-xl max-w-6xl mx-auto my-8">
      <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">
        All Patient Records
      </h2>

      <div className="flex justify-end mb-4">
        <Link
          to="/dashboard/record-sheet"
          className="px-6 py-2 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-200"
        >
          Add New Record
        </Link>
      </div>

      {records.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No patient records found. Start by adding a new one!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Child No
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact No
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date of Assessment
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {records.map((record) => (
                <tr key={record._id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                    {record.childNo}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                    {record.name}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                    {record.contactNo}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-700">
                    {record.dateOfInitialAssessment
                      ? new Date(
                          record.dateOfInitialAssessment
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium">
                    <Link
                      to={`/patient-records/${record._id}`}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      View
                    </Link>
                    <Link
                      to={`/patient-records/edit/${record._id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(record._id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientRecordList;
