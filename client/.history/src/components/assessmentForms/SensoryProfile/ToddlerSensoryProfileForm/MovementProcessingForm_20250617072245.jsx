import axios from "axios";
import BaseForm from "../BaseForm";
import { useState } from "react";
import { createSensoryProfilePayload } from "../../../../utils/apiUtils";

function ToddlerMovementProcessingForm({ patientId, examinerId, testDate }) {
  const questions = [
    {
      qid: 36,
      text: "enjoys physical activity (for example, bouncing, being held up high in the air).",
      quadrant: "SK",
    },
    {
      qid: 37,
      text: "enjoys rhythmical activities (for example, swinging, rocking, car rides).",
      quadrant: "SK",
    },
    {
      qid: 38,
      text: "takes movement or climbing risks.",
      quadrant: "SK",
    },
    {
      qid: 39,
      text: "becomes upset when placed on the back (for example, at changing times).",
      quadrant: "SN",
    },
    {
      qid: 40,
      text: "seems accident-prone or clumsy.",
      quadrant: "RG",
    },
    {
      qid: 41,
      text: "fusses when moved around (for example, walking around, when being handed over to another person).",
      quadrant: "SN",
      excludeFromScore: true,
    },
  ];

  const handleFormSubmit = ({ responses, comments, totalScore }) => {
    console.log("Movement Processing Form Responses:", responses);
    console.log("Movement Raw Score:", totalScore);
    console.log("Movement Processing Comments:", comments);
  };

  return (
    <>
      <BaseForm
        questions={questions}
        onSubmit={handleFormSubmit}
        formTitle="Movement Processing"
      />
      <p>* - Item/s is/are not part of the MOVEMENT Raw Score.</p>
    </>
  );
}

export default ToddlerMovementProcessingForm;
