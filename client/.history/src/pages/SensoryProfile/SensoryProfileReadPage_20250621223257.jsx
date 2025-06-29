import { useState, useEffect } from 'react';
import axios from 'axios';


function SensoryProfileReadPage() {
  const [assessments, setAssessments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterPatientId, setFilterPatientId] = useState('');

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);
      try {
        const response = await axios.get('/api/assessments/sensory-profile', {
            params: { patientIdfilterPatientId }
        });
        setAssessments(response.data);
        setError(null);
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch assessment results.';
        setError(errorMessage);
        console.error('Error fetching sensory profiles:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSensoryProfiles();
  }, []); 
 

  if (isLoading) {
    return <div className="text-center p-10 text-lg font-medium">Loading Sensory Profiles...</div>;
  }

 
  if (error) {
    return <div className="text-center p-10 text-red-600 font-bold">Error: {error}</div>;
  }

  
  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Saved Sensory Profiles</h1>
      
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {assessments.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center py-8 text-gray-500">
                  No sensory profiles have been saved yet.
                </td>
              </tr>
            ) : (
                    assessments.map((assessment) => (
                        <tr key={assessment._id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{assessment.patientId}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-700">{assessment.category}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-700"> {new Date(assessment.testDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                                <button className="text-red-600 hover:text-red-900">Delete</button>
                            </td>
                        </tr>
                    ))
                )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SensoryProfileReadPage;