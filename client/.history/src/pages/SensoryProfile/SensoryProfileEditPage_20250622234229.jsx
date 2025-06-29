import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Base from "../../components/assessmentForms/SensoryProfile/Base";
import BaseCards from "../../components/assessmentForms/SensoryProfile/BaseCards";

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

  // 4. We will add the submission logic here later
  
  const handleUpdateSubmit = async (formData) => {
    // TODO: Add PUT request logic
    console.log("Submitting updated data:", formData);
    try{
        await axios.put(`/api/assessments/sensory-profile/${id}`, formData);
        alert('Assessment updated successfully!');
        navigate('/sensory-profile-view');
    } catch (err){
        console.error()
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
      <p className="p-8">Form will be rendered here...</p>
    </div>
  );
}

export default SensoryProfileEditPage;
