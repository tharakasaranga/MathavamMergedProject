import axios from "axios";
import BaseForm from "../BaseForm";
import { useState } from "react";
import { createSensoryProfilePayload } from "../../../../utils/apiUtils";

function MovementProcessingForm({ patientId, examinerId, testDate }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const questions = [
    {
      qid: 27,
      text: "pursues movement to the point it interferes with daily routines (for example, can't sit still, fidgets).",
      quadrant: "SK",
    },
    {
      qid: 28,
      text: "rocks in chair, on floor, or while standing.",
      quadrant: "SK",
    },
    {
      qid: 29,
      text: "hesitates going up or down curbs or steps (for example, is cautious, stops before moving).",
      quadrant: "",
    },
    {
      qid: 30,
      text: "becomes excited during movement tasks.",
      quadrant: "SK",
    },
    {
      qid: 31,
      text: "takes movement or climbing risks that are unsafe.",
      quadrant: "SK",
    },
    {
      qid: 32,
      text: "looks for opportunities to fall with no regard for own safety (for example, falls down on purpose).",
      quadrant: "SK",
    },
    {
      qid: 33,
      text: "loses balance unexpectedly when walking on an uneven surface.",
      quadrant: "RG",
    },
    {
      qid: 34,
      text: "bumps into things, failing to notice objects or people in the way.",
      quadrant: "RG",
    },
  ];

  const handleFormSubmit = ({ responses, comments, totalScore }) => {
    console.log("Movement Processing Form Responses:", responses);
    console.log("Movement Raw Score:", totalScore);
    console.log("Movement Processing Comments:", comments);
  };

  return (
    <BaseForm
      questions={questions}
      onSubmit={handleFormSubmit}
      formTitle="Movement Processing"
    />
  );
}

export default MovementProcessingForm;
