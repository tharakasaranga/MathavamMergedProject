import axios from "axios";
import BaseForm from "../BaseForm";
import { useState } from "react";
import { createSensoryProfilePayload } from "../../../../utils/apiUtils";

function TouchProcessingForm({
  patientId,
  examinerId,
  testDate,
  initialResponses,
  initialComments,
  onFormSubmit,
  isSubmitting: isSubmittingProp,
}) {
  const [isCreating, setIsCreating] = useState(false);

  const isSubmitting = isSubmittingProp !== undefined ? isSubmittingProp : isCreating;

  const questions = [
    {
      qid: 16,
      text: "shows distress during grooming (for example, fights or cries during haircutting, facewashing, fingernail cutting).",
      quadrant: "SN",
    },
    {
      qid: 17,
      text: "becomes irritated by wearing shoes or socks.",
      quadrant: "",
    },
    {
      qid: 18,
      text: "shows an emotional or aggressive response to being touched.",
      quadrant: "AV",
    },
    {
      qid: 19,
      text: "becomes anxious when standing close to others (for example, in a line).",
      quadrant: "SN",
    },
    {
      qid: 20,
      text: "rubs or scratches a part of the body that has been touched.",
      quadrant: "SN",
    },
    {
      qid: 21,
      text: "touches people or objects to the point of annoying others.",
      quadrant: "SK",
    },
    {
      qid: 22,
      text: "displays need to touch toys, surfaces, or textures (for example, wants to get the feeling of everything).",
      quadrant: "SK",
    },
    {
      qid: 23,
      text: "seems unaware of pain.",
      quadrant: "RG",
    },
    {
      qid: 24,
      text: "seems unaware of temperature changes.",
      quadrant: "RG",
    },
    {
      qid: 25,
      text: "touches people and objects more than same-aged children.",
      quadrant: "SK",
    },
    {
      qid: 26,
      text: "seems obvious to messy hands or face",
      quadrant: "RG",
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
      formTitle="Touch Processing"
      isSubmitting={isSubmitting}
    />
  );
}

export default TouchProcessingForm;
