import BaseForm from "../BaseForm";

function ToddlerOralSensoryProcessingForm() {
  const questions = [
    {
      qid: 42,
      text: "shows a clear dislike for all but a few food choices.",
      quadrant: "AV",
    },
    {
      qid: 43,
      text: "drools.",
      quadrant: "",
    },
    {
      qid: 44,
      text: "prefers one texture of food (for example, smooth, crunchy).",
      quadrant: "SN",
    },
    {
      qid: 45,
      text: "uses drinking to calm self.",
      quadrant: "RG",
    },
    {
      qid: 46,
      text: "gags on foods or drink.",
      quadrant: "SN",
    },
    {
      qid: 47,
      text: "holds food in cheeks before swallowing.",
      quadrant: "",
    },
    {
      qid: 48,
      text: "has difficulty weaning to chunky foods.",
      quadrant: "SN",
    },
  ];

  const handleFormSubmit = ({ responses, comments, totalScore }) => {
    console.log("Oral Sensory Processing Form Responses:", responses);
    console.log("Oral Sensory Raw Score:", totalScore);
    console.log("Oral Sensory Processing Comments:", comments);
  };

  return (
    <BaseForm
      questions={questions}
      onSubmit={handleFormSubmit}
      formTitle="Oral Sensory Processing"
    />
  );
}

export default ToddlerOralSensoryProcessingForm;
