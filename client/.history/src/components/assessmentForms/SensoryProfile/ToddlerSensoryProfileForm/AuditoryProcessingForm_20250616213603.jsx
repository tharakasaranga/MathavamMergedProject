import axios from 'axios';
import BaseForm from "../BaseForm";
import { useState } from 'react';

function ToddlerAuditoryProcessingForm({ patientId, examinerId, testDate }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const questions = [
    {
      qid: 11,
      text: "only pays attention if I speak loudly.",
      quadrant: "RG",
    },
    {
      qid: 12,
      text: "only pays attention when I touch my child (and hearing is OK).",
      quadrant: "RG",
    },
    {
      qid: 13,
      text: "startles easily at sound compared to same-aged children (for example, dog barking, children shouting).",
      quadrant: "SN",
    },
    {
      qid: 14,
      text: "is distracted in noisy settings.",
      quadrant: "RG",
    },
    {
      qid: 15,
      text: "ignores sounds, including my voice.",
      quadrant: "RG",
    },
    {
      qid: 16,
      text: "becomes upset or tries to escape from noisy settings.",
      quadrant: "SN",
    },
    {
      qid: 17,
      text: "takes a long time to respond to own name.",
      quadrant: "",
    },
  ];

  const handleFormSubmit = ({ responses, comments, totalScore }) => {
    console.log("Auditory Processing Form Responses:", responses);
    console.log("Auditory Raw Score:", totalScore);
    console.log("Auditory Processing Comments:", comments);
  };

  return (
    <BaseForm
      questions={questions}
      onSubmit={handleFormSubmit}
      formTitle="Auditory Processing"
    />
  );
}
export default ToddlerAuditoryProcessingForm;
