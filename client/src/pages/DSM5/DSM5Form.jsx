import React, { useState, useEffect } from "react";
import Apart from "../../components/assessmentForms/DSM5/Apart";
import Bpart from "../../components/assessmentForms/DSM5/Bpart";
import Otherpart from "../../components/assessmentForms/DSM5/Otherpart";
import SubmittedFormsList from "./SubmittedFormsList";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const DSM5Form = () => {
  const [answers, setAnswers] = useState({
    socialCommunication: Array(3).fill(null),
    repetitiveBehaviors: Array(4).fill(null),
    otherCriteria: Array(3).fill(null),
  });

  const [severityRatings, setSeverityRatings] = useState({
    socialCommunication: null,
    repetitiveBehaviors: null,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode

  const [patientInfo, setPatientInfo] = useState({
    id: "",
    name: "",
    dob: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch form data if ID is present (view/edit mode)
  useEffect(() => {
    if (id) {
      const fetchFormData = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/dsm5forms/${id}`);
          const formData = res.data;
          setPatientInfo(formData.patientInfo);
          setAnswers(formData.answers);
          setSeverityRatings(formData.severityRatings);
          // Set to read-only initially when viewing an existing form
          setIsEditing(false);
          setSubmitted(false); // Reset submitted state when loading an existing form
        } catch (error) {
          console.error("Error fetching form data:", error);
          alert("Failed to load form data.");
          navigate('/submitted-forms');
        }
      };
      fetchFormData();
    } else {
      // If no ID, it's a new form, reset states and enable editing
      handleReset();
      setIsEditing(true);
    }
  }, [id, navigate]); // Added navigate to dependency array for useEffect

  const handlePatientInfoChange = (e) => {
    if (!isEditing) return;
    const { name, value } = e.target;
    setPatientInfo({ ...patientInfo, [name]: value });
  };

  const handleAnswerChange = (section, index, value) => {
    if (!isEditing) return;
    const updated = { ...answers };
    updated[section][index] = value;
    setAnswers(updated);
  };

  const handleSeverityChange = (section, value) => {
    if (!isEditing) return;
    setSeverityRatings((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  const handleReset = () => {
    setAnswers({
      socialCommunication: Array(3).fill(null),
      repetitiveBehaviors: Array(4).fill(null),
      otherCriteria: Array(3).fill(null),
    });
    setSeverityRatings({
      socialCommunication: null,
      repetitiveBehaviors: null,
    });
    setPatientInfo({ id: "", name: "", dob: "" });
    setSubmitted(false);
    setIsEditing(true); // Always enable editing on reset for a new form
  };

  const handleSubmit = async () => {
    // Validation logic remains the same
    const allAnswered = Object.values(answers).every((section) =>
      section.every((ans) => ans !== null)
    );

    // Corrected validation for severity ratings to explicitly check for null
    const allSeveritySet =
      severityRatings.socialCommunication !== null &&
      severityRatings.repetitiveBehaviors !== null;

    const hasPatientInfo =
      patientInfo.id.trim() && patientInfo.name.trim() && patientInfo.dob.trim();

    if (!allAnswered || !hasPatientInfo || !allSeveritySet) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      const payload = {
        patientInfo,
        answers,
        severityRatings,
      };

      if (id) {
        // If ID exists, it's an update
        const res = await axios.put(`http://localhost:5000/api/dsm5forms/${id}`, payload);
        alert(res.data.message);
        setSubmitted(true);
        setIsEditing(false); // Exit edit mode after saving
        // No navigation here, stay on the view page for edits
      } else {
        // Otherwise, it's a new submission
        const res = await axios.post("http://localhost:5000/api/dsm5forms", payload);
        alert(res.data.message);
        setSubmitted(true);
      }
    } catch (error) {
      alert("Submission failed. Check console for error.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center py-12 px-4">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-[80%] border space-y-6">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">
          DSM-5 Diagnostic Checklist
          {id && <span className="text-xl text-gray-500 block"> (Viewing/Editing Form ID: {id})</span>}
        </h1>

        {/* Patient Info */}
        <div className="grid grid-cols-1 gap-4">
          {[
            { label: "Patient ID", name: "id", type: "text" },
            { label: "Patient Name", name: "name", type: "text" },
            { label: "Date of Birth", name: "dob", type: "date" },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block font-semibold text-gray-700 mb-1">{field.label}</label>
              <input
                name={field.name}
                type={field.type}
                value={patientInfo[field.name]}
                onChange={handlePatientInfoChange}
                className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                readOnly={!isEditing} // Make input read-only when not editing
              />
            </div>
          ))}
        </div>

        {/* DSM-5 Criteria Table */}
        <table className="w-full border-collapse border border-indigo-400 mt-6">
          <thead>
            <tr className="bg-indigo-200 text-indigo-900">
              <th className="border border-indigo-400 p-2">DSM-5 Criteria</th>
              <th className="border border-indigo-400 p-2" colSpan="2">
                Autism Spectrum Disorder
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-indigo-50">
              <td className="border border-indigo-300 p-2 text-sm">
                <strong>Note:</strong> If the individual has a previous DSM-IV diagnosis, check here and complete the checklist to reclassify.
              </td>
              <td className="border border-indigo-300 p-2 text-center" colSpan="2">
                <input
                  type="checkbox"
                  className="scale-150 accent-indigo-600 cursor-pointer"
                  disabled={!isEditing}
                />
              </td>
            </tr>

            <Apart
              answers={answers}
              handleAnswerChange={handleAnswerChange}
              severityRating={severityRatings.socialCommunication}
              setSeverityRating={(value) => handleSeverityChange("socialCommunication", value)}
              isEditing={isEditing}
            />

            <Bpart
              answers={answers}
              handleAnswerChange={handleAnswerChange}
              severityRating={severityRatings.repetitiveBehaviors}
              setSeverityRating={(value) => handleSeverityChange("repetitiveBehaviors", value)}
              isEditing={isEditing}
            />

            <Otherpart
              answers={answers}
              handleAnswerChange={handleAnswerChange}
              isEditing={isEditing}
            />
          </tbody>
        </table>

        {/* Buttons */}
        <div className="flex justify-between gap-4 mt-8">
          {id ? ( // Show different buttons based on whether an ID is present
            <>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 font-semibold cursor-pointer"
                >
                  Edit Form
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-indigo-500 to-indigo-700 text-white p-3 rounded-lg hover:opacity-90 font-semibold cursor-pointer"
                >
                  Save Changes
                </button>
              )}
              <button
                onClick={() => navigate('/submitted-forms')}
                className="w-full bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 font-semibold cursor-pointer"
              >
                Back to List
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleReset}
                className="px-6 py-3 bg-gray-200 text-gray-800 p-3 rounded-lg hover:bg-gray-300 font-semibold cursor-pointer"
              >
                Reset
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-3  bg-gradient-to-r from-indigo-500 to-indigo-700 text-white p-3 rounded-lg hover:opacity-90 font-semibold cursor-pointer"
              >
                Submit
              </button>
            </>
          )}
        </div>
        {(!id || isEditing) && ( // Show this button if not in view mode or if explicitly editing
              <div className="mt-8 text-center">
                <button
                  onClick={() => navigate('/submitted-forms')}
                  className="px-8 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-all duration-300 shadow-md font-semibold text-lg"
                >
                View All Submitted Forms
                </button>
              </div>
            )}
      </div>
    </div>
  );
};

export default DSM5Form;