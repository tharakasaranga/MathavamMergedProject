import BaseForm from "../BaseForm";

function ToddlerBehavioralSensoryProcessingForm() {
  const questions = [
    {
      qid: 49,
      text: "has temper tantrums.",
      quadrant: "AV",
    },
    {
      qid: 50,
      text: "is clingy.",
      quadrant: "",
    },
    {
      qid: 51,
      text: "stays calm only when being held.",
      quadrant: "",
    },
    {
      qid: 52,
      text: "is fussy or irritable.",
      quadrant: "SN",
    },
    {
      qid: 53,
      text: "is bothered by new settings.",
      quadrant: "AV",
    },
    {
      qid: 54,
      text: "becomes so upset in new settings that it's hard to calm down.",
      quadrant: "AV",
    },
  ];

  const handleFormSubmit = ({ responses, comments, totalScore }) => {
    console.log("Behavioral Form Responses:", responses);
    console.log("Behavioral Raw Score:", totalScore);
    console.log("Behavioral Responses Comments:", comments);
  };

  return (
    <BaseForm
      questions={questions}
      onSubmit={handleFormSubmit}
      formTitle="Behavioral Responses Associated with Sensory Processing"
    />
  );
}

export default ToddlerBehavioralSensoryProcessingForm;
