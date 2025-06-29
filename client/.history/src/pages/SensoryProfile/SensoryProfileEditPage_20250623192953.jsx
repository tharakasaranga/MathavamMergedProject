
import Base from "../../components/assessmentForms/SensoryProfile/Base";
import BaseCards from "../../components/assessmentForms/SensoryProfile/BaseCards";
import { createSensoryProfilePayload } from "../../utils/apiUtils";

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Import your components
import Base from "../../components/assessmentForms/SensoryProfile/Base";

// --- IMPORTANT: Import ALL possible form components that can be edited ---
import ToddlerGeneralProcessingForm from "../../components/assessmentForms/SensoryProfile/ToddlerSensoryProfileForm/GeneralProcessingForm";
import ToddlerTouchProcessingForm from "../../components/assessmentForms/SensoryProfile/ToddlerSensoryProfileForm/TouchProcessingForm";
// ... import ToddlerAuditory, ToddlerVisual, etc. ...
// ... import all your Child form components as well ...

function SensoryProfileEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false); // For the submit button
  const [error, setError] = useState(null);

  // This data fetching logic is correct.
  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await axios.get(`/api/assessments/sensory-profile/${id}`);
        setInitialData(response.data);
      } catch (err) {
        setError("Failed to load assessment data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAssessment();
  }, [id]);

  // This function will be passed as the `onSubmit` prop to the form.
  const handleUpdateSubmit = async (formSpecificData) => {
    if (isUpdating) return;
    setIsUpdating(true);

    // The data from the form is already perfectly structured, no need to re-format.
    const formData = {
      ...formSpecificData,
      patientId: initialData.patientId,
      examinerId: initialData.examinerId,
      testDate: initialData.testDate,
      ageGroup: initialData.ageGroup,
      assessmentType: initialData.assessmentType
    };
    
    try {
      await axios.put(`/api/assessments/sensory-profile/${id}`, formData);
      alert('Assessment updated successfully!');
      navigate('/sensory-profile-view');
    } catch (err) {
      // Your detailed error handling logic is correct.
      let errorMessage = "An unexpected error occurred.";
      if (err.response) {
        errorMessage = err.response.data.message || errorMessage;
      }
      alert(`Error: ${errorMessage}`);
      console.error("Error updating assessment:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  // --- Conditional Rendering for Loading/Error States ---
  if (isLoading) return <div>Loading assessment for editing...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!initialData) return <div>Assessment not found.</div>;

  // --- Helper function to render the correct form ---
  const renderFormForEditing = () => {
    // We pass all the data the form needs to pre-populate itself.
    const formProps = {
      patientId: initialData.patientId,
      examinerId: initialData.examinerId,
      testDate: initialData.testDate,
      initialResponses: initialData.responses,
      initialComments: initialData.comments,
      onSubmit: handleUpdateSubmit,
      isSubmitting: isUpdating,
    };

    switch (initialData.category) {
      case "General Processing":
        return <ToddlerGeneralProcessingForm {...formProps} />;
      case "Touch Processing":
        return <ToddlerTouchProcessingForm {...formProps} />;
      // ... Add a 'case' for every other form category ...
      // e.g., case "Auditory Processing": return <ToddlerAuditoryProcessingForm {...formProps} />;
      
      default:
        return <div>Unknown form category: "{initialData.category}"</div>;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold p-8">Edit Sensory Profile</h1>
      <Base onDataChange={() => {}} initialData={initialData} isEditMode={true} />
      <div className="max-w-3xl mx-auto mt-8">
        {renderFormForEditing()}
      </div>
    </div>
  );
}

export default SensoryProfileEditPage;
