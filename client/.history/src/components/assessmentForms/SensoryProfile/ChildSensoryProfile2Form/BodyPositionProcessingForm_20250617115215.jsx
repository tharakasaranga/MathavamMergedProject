import axios from "axios";
import BaseForm from "../BaseForm";
import { useState } from "react";
import { createSensoryProfilePayload } from "../../../../utils/apiUtils";

function BodyPositionProcessingForm({ patientId, examinerId, testDate }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questions = [
    {
      qid: 35,
      text: "moves stiffly.",
      quadrant: "RG",
    },
    {
      qid: 36,
      text: "becomes tired easily, especially when standing or holding the body in one position.",
      quadrant: "RG",
    },
    {
      qid: 37,
      text: "seems to have weak muscles.",
      quadrant: "RG",
    },
    {
      qid: 38,
      text: "props to support seff (for example, holds head in hands, leans against a wall).",
      quadrant: "RG",
    },
    {
      qid: 39,
      text: "clings to objects, walls, or banisters more than same-aged children.",
      quadrant: "RG",
    },
    {
      qid: 40,
      text: "walks loudly as if feet are heavy.",
      quadrant: "RG",
    },
    {
      qid: 41,
      text: "drapes self over furniture or on other people.",
      quadrant: "SK",
    },
    {
      qid: 42,
      text: "needs heavy blankets to sleep.",
      quadrant: "",
    },
  ];

  const handleFormSubmit = async (formSpecificData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const sharedData = {
      patientId,
      examinerId,
      testDate,
      ageGroup: "Child",
    };

    const formData = createSensoryProfilePayload(formSpecificData, sharedData);

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
      formTitle="Body Position Processing"
    />
  );
}

export default BodyPositionProcessingForm;
