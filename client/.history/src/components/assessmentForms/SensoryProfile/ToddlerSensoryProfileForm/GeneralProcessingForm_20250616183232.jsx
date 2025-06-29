import axios from 'axios';
import BaseForm from "../BaseForm";
import { useState } from 'react';

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

  const handleFormSubmit = async ({
    responses,
    comments,
    totalScore,
    formTitle,
  }) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formattedResponses = Object.entries(responses).map(([qid, data]) => ({
      qid: parseInt(qid, 10),
      score: data.score,
      quadrant: data.quadrant,
    }));

    const formData = {
      patientId: patientId,
      examinerId: examinerId,
      assessmentType: "sensoryProfile",
      ageGroup: "toddler",
      category: formTitle,
      responses: formattedResponses,
      rawScore: totalScore,
      comments: comments,
    };

    try {
      const result = await axios.post("/api/assessments", formData);
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
