import BaseForm from "../BaseForm";

function ToddlerVisualProcessingForm() {
  const questions = [
    {
      qid: 18,
      text: "enjoys looking at moving or spinning objects (for example, ceiling fans, toys with wheels).",
      quadrant: "SK",
    },
    {
      qid: 19,
      text: "enjoys looking at shiny objects.",
      quadrant: "SK",
    },
    {
      qid: 20,
      text: "is attracted to TV or computer screens with fast-paced, brightly colored graphics.",
      quadrant: "SK",
    },
    {
      qid: 21,
      text: "startles at bright or unpredictable light (for example, when moving from inside to outside).",
      quadrant: "",
    },
    {
      qid: 22,
      text: "is bothered by bright lights (for example, hides from sunlight through car window).",
      quadrant: "",
    },
    {
      qid: 23,
      text: "is more bothered by bright lights than other same-aged children.",
      quadrant: "RG",
    },
    {
      qid: 24,
      text: "pushes brightly colored toys away.",
      quadrant: "RG",
      excludeFromScore: true,
    },
    {
      qid: 25,
      text: "fails to respond to self in the mirror.",
      quadrant: "RG",
      excludeFromScore: true,
    },
  ];

  const handleFormSubmit = ({ responses, comments, totalScore }) => {
    console.log("Visual Processing Form Responses:", responses);
    console.log("Visual Raw Score:", totalScore);
    console.log("Visual Processing Comments:", comments);
  };

  return (
    <>
      <BaseForm
        questions={questions}
        onSubmit={handleFormSubmit}
        formTitle="Visual Processing"
        src/components/assessmentForms/SensoryProfile/ToddlerSensoryProfileForm/VisualProcessingForm.jsx
      />
      <p>* - Item/s is/are not part of the VISUAL Raw Score.</p>
    </>
  );
}

export default ToddlerVisualProcessingForm;
