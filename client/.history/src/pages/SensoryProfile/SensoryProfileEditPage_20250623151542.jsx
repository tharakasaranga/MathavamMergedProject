import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Base from "../../components/assessmentForms/SensoryProfile/Base";
import BaseCards from "../../components/assessmentForms/SensoryProfile/BaseCards";
import { createSensoryProfilePayload } from "../../utils/apiUtils";

function SensoryProfileEditPage() {
  const { id } = useParams();
  const navigate = useNavigate(); 

  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  
  const handleUpdateSubmit = async (formSpecificData) => {
    const {responses, comments, totalScore, formTitle} = formSpecificData;
    
    const formData = createSensoryProfilePayload (
      {responses, comments}
    );
    console.log("Submitting updated data:", formData);
    try{
        await axios.put(`/api/assessments/sensory-profile/${id}`, formData);
        alert('Assessment updated successfully!');
        navigate('/sensory-profile-view');
    } catch (err){
        console.error("Error updating assessment:", err);

        let errorMessage = "An unexpected error occurred. Please try again.";

        if (err.response){
            if (err.response.status === 409){
                errorMessage = err.response.data.message || 'This update would create a duplicate record.';
            } else if (err.response.status === 404) {
              errorMessage = 'This assessment could not be found. It may have been deleted.';
            } else if (err.response.data?.message) {
              errorMessage = err.response.data.message;
            }
          } else if (err.request) {
            errorMessage = "Cannot connect to the server. Please check your network connection.";
          }
          alert(`Error: ${errorMessage}`);
    }
  };

  
  if (isLoading) {
    return <div>Loading assessment for editing...</div>;
  }
  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  if (!initialData) {
    return <div>Assessment not found.</div>;
  }

  // 5. This is where we need to render the forms and pass the initial data down
  //    This part is complex and we will build it out.
  return (
    <div>
      <h1 className="text-3xl font-bold p-8">Edit Sensory Profile</h1>
      {/* 
        This is the tricky part. We need to render the <Base> and <BaseCards> components
        and somehow pass the `initialData` to them so they load with the existing values.
        We will tackle this next.
      */}
      {initialData && (
        <>
          <Base
            onDataChange={() => {}} // We don't need this for editing, but the prop must exist
            initialData={initialData} // Pass the fetched data down
          />
          {/* We need to render the correct form. This logic can be simplified later. */}
          <div className="max-w-3xl mx-auto mt-8">
            <BaseCards
              sensoryName={initialData.category}
              isExpanded={true} // Keep the card expanded by default on the edit page
              onToggle={() => {}}
              formType={initialData.ageGroup.toLowerCase()}
              patientId={initialData.patientId}
              examinerId={initialData.examinerId}
              testDate={initialData.testDate}
              // We need a way to pass the responses down too. This is the next step.
              initialResponses={initialData.responses}
              initialComments={initialData.comments}
              // We need a way to connect the submission
              onFormSubmit={handleUpdateSubmit}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default SensoryProfileEditPage;
