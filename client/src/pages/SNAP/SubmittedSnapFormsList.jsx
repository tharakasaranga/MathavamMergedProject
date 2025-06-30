import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
// Import ToastContainer and toast from react-toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

const SubmittedSnapFormsList = () => {
  const [previousForms, setPreviousForms] = useState([]);
  const [isTranslated, setIsTranslated] = useState(false);
  const navigate = useNavigate();

  const fetchPreviousForms = async () => {
    try {
      const formsRes = await axios.get("http://localhost:5000/api/snapforms");
      const sortedForms = formsRes.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPreviousForms(sortedForms);
    } catch (err) {
      console.error("Error fetching previous SNAP forms:", err);
      toast.error(isTranslated ? "Failed to load previous forms. Please try again." : "முந்தைய படிவங்களைப் பதிவிறக்கத் தவறிவிட்டது. மீண்டும் முயற்சிக்கவும்.");
    }
  };

  useEffect(() => {
    fetchPreviousForms();
  }, [isTranslated]); // Added isTranslated to dependency array for toast messages

  const toggleTranslation = () => {
    setIsTranslated(!isTranslated);
  };

  const handleDelete = async (formId) => {
    if (window.confirm(isTranslated ? "Are you sure you want to delete this form? This action cannot be undone." : "இந்த படிவத்தை நீக்க நீங்கள் உறுதியாக இருக்கிறீர்களா? இந்தச் செயல்பாடு மீளப்பெற முடியாது.")) {
      try {
        await axios.delete(`http://localhost:5000/api/snapforms/${formId}`);
        toast.success(isTranslated ? "Form deleted successfully!" : "படிவம் வெற்றிகரமாக நீக்கப்பட்டது!");
        fetchPreviousForms(); // Refresh the list
      } catch (err) {
        console.error("Error deleting form:", err);
        toast.error(isTranslated ? "Failed to delete form. Please try again." : "படிவத்தை நீக்கத் தவறிவிட்டது. மீண்டும் முயற்சிக்கவும்.");
      }
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10 px-4 flex justify-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <div className="w-full max-w-[80%] bg-white rounded-2xl shadow-lg p-8 space-y-6 border">
        <h2 className="text-3xl font-bold text-green-700 text-center mb-6">
          {isTranslated ? "Submitted SNAP Forms" : "சமர்ப்பிக்கப்பட்ட SNAP படிவங்கள்"}
        </h2>

        <div className="flex justify-between items-center mb-6">
          <button
            onClick={toggleTranslation}
            className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-md font-semibold"
          >
            {isTranslated ? "Show Tamil (தமிழ்)" : "Translate to English"}
          </button>
          <button
            onClick={() => navigate('/snap-forms')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer font-semibold text-lg"
          >
            {isTranslated ? "Fill New Form" : "புதிய படிவத்தை நிரப்புக"}
          </button>
        </div>

        {previousForms.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
            <table className="w-full text-left table-auto">
              <thead className="bg-blue-100 border-b border-gray-300">
                <tr>
                  <th className="px-6 py-3 text-blue-800 font-semibold text-sm uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-blue-800 font-semibold text-sm uppercase tracking-wider">
                    {isTranslated ? "Patient Name" : "நோயாளியின் பெயர்"}
                  </th>
                  <th className="px-6 py-3 text-blue-800 font-semibold text-sm uppercase tracking-wider">
                    {isTranslated ? "Submission Date" : "சமர்ப்பித்த தேதி"}
                  </th>
                  <th className="px-6 py-3 text-blue-800 font-semibold text-sm uppercase tracking-wider">
                    {isTranslated ? "Total Score" : "மொத்த மதிப்பெண்"}
                  </th>
                  <th className="px-6 py-3 text-blue-800 font-semibold text-sm uppercase tracking-wider text-center">
                    {isTranslated ? "Actions" : "செயல்கள்"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {previousForms.map((form, idx) => (
                  <tr
                    key={form._id || idx}
                    className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {previousForms.length - idx}{" "}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {form.studentInfo?.name || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {new Date(form.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <span className="font-bold text-lg text-blue-600">
                        {form.totalScore}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        onClick={() => navigate(`/snap-forms/${form._id}`)}
                        className="px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white shadow-md mr-2"
                      >
                        {isTranslated ? "View Details" : "விவரங்களைப் பார்"}
                      </button>

                      <button
                        onClick={() => navigate(`/snap-forms/${form._id}?edit=true`)}
                        className="px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 bg-purple-600 hover:bg-purple-700 text-white shadow-md mr-2"
                      >
                        {isTranslated ? "Edit" : "திருத்து"}
                      </button>
                      <button
                        onClick={() => handleDelete(form._id)}
                        className="px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 bg-red-600 hover:bg-red-700 text-white shadow-md"
                      >
                        {isTranslated ? "Delete" : "அழி"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 mt-6 text-lg text-center">
            {isTranslated ? "No previous submissions found yet." : "இதுவரை எந்த முந்தைய சமர்ப்பிப்புகளும் கண்டறியப்படவில்லை."}
          </p>
        )}
      </div>
    </div>
  );
};

export default SubmittedSnapFormsList;