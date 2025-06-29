import axios from "axios";
import BaseForm from "../BaseForm";
import { useState } from "react";
import { createSensoryProfilePayload } from "../../../../utils/apiUtils";

function SocialEmotionalSensoryProcessingForm({
  patientId,
  examinerId,
  testDate,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const questions = [
    {
      qid: 62,
      text: "seems to have low self-esteem (for example, difficulty liking self).",
      quadrant: "RG",
    },
    {
      qid: 63,
      text: "needs positive support to return to challenging situations.",
      quadrant: "AV",
    },
    {
      qid: 64,
      text: "is sensitive to criticisms.",
      quadrant: "AV",
    },
    {
      qid: 65,
      text: "has definite, predictable fears.",
      quadrant: "AV",
    },
    {
      qid: 66,
      text: "expresses feeling like a failure.",
      quadrant: "AV",
    },
    {
      qid: 67,
      text: "is too serious.",
      quadrant: "AV",
    },
    {
      qid: 68,
      text: "has strong emotional outbursts when unable to complete a task.",
      quadrant: "AV",
    },
    {
      qid: 69,
      text: "struggles to interpret body language or facial expression.",
      quadrant: "SN",
    },
    {
      qid: 70,
      text: "gets frustrated easily.",
      quadrant: "AV",
    },
    {
      qid: 71,
      text: "has fears that interfere with daily routines.",
      quadrant: "AV",
    },
    {
      qid: 72,
      text: "is distressed by changes in plans, routines, or expectations.",
      quadrant: "AV",
    },
    {
      qid: 73,
      text: "needs more protection from life than same-aged children (for example, defenseless physically or emotionally).",
      quadrant: "SN",
    },
    {
      qid: 74,
      text: "interacts or participates in groups less than same-aged children.",
      quadrant: "AV",
    },
    {
      qid: 75,
      text: "has difficulty with friendships (for example, making or keeping friends).",
      quadrant: "AV",
    },
  ];

  const handleFormSubmit = ({ responses, comments, totalScore }) => {
    console.log("Social Emotional Form Responses:", responses);
    console.log("Social Emotional Raw Score:", totalScore);
    console.log("Social Emotional Responses Comments:", comments);
  };

  return (
    <BaseForm
      questions={questions}
      onSubmit={handleFormSubmit}
      formTitle="Social Emotional Responses Associated with Sensory Processing"
    />
  );
}

export default SocialEmotionalSensoryProcessingForm;
