import axios from "axios";
import BaseForm from "../BaseForm";
import { useState } from "react";
import { createSensoryProfilePayload } from "../../../../utils/apiUtils";

function AttentionalSensoryProcessingForm({ patientId, examinerId, testDate }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const questions = [
    {
      qid: 76,
      text: "misses eye contact with me during everyday interactions.",
      quadrant: "RG",
    },
    {
      qid: 77,
      text: "struggles to pay attention.",
      quadrant: "SN",
    },
    {
      qid: 78,
      text: "looks away from tasks to notice all actions in the room.",
      quadrant: "SN",
    },
    {
      qid: 79,
      text: "seems oblivious within an active environment (for example, unaware of activity).",
      quadrant: "RG",
    },
    {
      qid: 80,
      text: "stares intensively at objects.",
      quadrant: "RG",
    },
    {
      qid: 81,
      text: "stares intensively at people.",
      quadrant: "AV",
    },
    {
      qid: 82,
      text: "watches everyone when they move around the room.",
      quadrant: "SK",
    },
    {
      qid: 83,
      text: "jumps from one thing to another so that it interferes with activities.",
      quadrant: "SK",
    },
    {
      qid: 84,
      text: "gets lost easily.",
      quadrant: "SN",
    },
    {
      qid: 85,
      text: "has a hard time finding objects in competing backgrounds (for example, shoes in a messy room, pencil in 'junk drawer').",
      quadrant: "RG",
    },
    {
      qid: 86,
      text: "seems unaware when people come into the room.", //not a part of raw score
      quadrant: "AV",
      excludeFromScore: true,
    },
  ];

  const handleFormSubmit = ({ responses, comments, totalScore }) => {
    console.log("Attentional Form Responses:", responses);
    console.log("Attentional Raw Score:", totalScore);
    console.log("Attentional Responses Comments:", comments);
  };

  return (
    <>
      <BaseForm
        questions={questions}
        onSubmit={handleFormSubmit}
        formTitle="Attentional Responses Associated with Sensory Processing"
      />
      <p>* - Item/s is/are not part of the ATTENTIONAL Raw Score.</p>
    </>
  );
}

export default AttentionalSensoryProcessingForm;
