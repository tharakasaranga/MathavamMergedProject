import axios from 'axios';
import BaseForm from "../BaseForm";
import { useState } from 'react';
import { createSensoryProfilePayload } from "../../../../utils/apiUtils";

function ToddlerGeneralProcessingForm({ patientId , examinerId, testDate }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    {
      qid: 1,
      text: "needs a routine to stay content or calm.",
      quadrant: "SN",
    },
    {
      qid: 2,
      text: "acts in a way that interferes with family schedules and plans.",
      quadrant: "SN",
    },
    {
      qid: 3,
      text: "resists playing among other children.",
      quadrant: "AV",
    },
    {
      qid: 4,
      text: "takes longer than same-aged children to respond to questions or actions.",
      quadrant: "",
    },
    {
      qid: 5,
      text: "withdraws from situations.",
      quadrant: "",
    },
    {
      qid: 6,
      text: "has an unpredictable sleeping pattern.",
      quadrant: "",
    },
    {
      qid: 7,
      text: "has an unpredictable eating pattern.",
      quadrant: "",
    },
    {
      qid: 8,
      text: "is easily awakened.",
      quadrant: "",
    },
    {
      qid: 9,
      text: "misses eye contact with me during everyday interactions.",
      quadrant: "RG",
    },
    {
      qid: 10,
      text: "gets anxious in new situations.",
      quadrant: "AV",
    },
  ];

  // Inside ToddlerGeneralProcessingForm.jsx

  const handleFormSubmit = async (formSpecificData) => {
    // `formSpecificData` is the object from BaseForm: { responses, comments, ... }

    if (isSubmitting) return;
    setIsSubmitting(true);

    // 1. GATHER THE SHARED DATA
    // This is the data that comes from this component's props.
    const sharedData = {
      patientId,
      examinerId,
      testDate,
      ageGroup: "Toddler", // This value is specific to this form's context
    };

    // 2. USE YOUR NEW TOOL
    // Call the builder function to do all the heavy lifting.
    const formData = createSensoryProfilePayload(formSpecificData, sharedData);

    // 3. THE REST OF THE LOGIC REMAINS THE SAME
    try {
      const result = await axios.post(
        "/api/assessments/sensory-profile",
        formData
      );
      console.log("Form Submitted Successfully:", result.data);
      alert("Assessment saved!");
    } catch (error) {
      console.error("There was an error submitting the form:", error);
      alert("Error: Could not save the assessment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BaseForm
      questions={questions}
      onSubmit={handleFormSubmit}
      formTitle="General Processing"
      isSubmitting={isSubmitting}
    />
  );
}
export default ToddlerGeneralProcessingForm;
