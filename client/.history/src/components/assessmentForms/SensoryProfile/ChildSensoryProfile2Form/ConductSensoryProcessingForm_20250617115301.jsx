import BaseForm from "../BaseForm";

function ConductSensoryProcessingForm() {
  const questions = [
    {
      qid: 53,
      text: "seems accident-prone.",
      quadrant: "RG",
    },
    {
      qid: 54,
      text: "rushes through coloring, writing, or drawing.",
      quadrant: "RG",
    },
    {
      qid: 55,
      text: "takes excessive risks (for example, climbs high into a tree, jumps off tall furniture) that compromise own safety.",
      quadrant: "SK",
    },
    {
      qid: 56,
      text: "seems more active than same-aged children.",
      quadrant: "SK",
    },
    {
      qid: 57,
      text: "does things in a harder way than is needed (for example, wastes time, moves slowly).",
      quadrant: "RG",
    },
    {
      qid: 58,
      text: "can be stubborn and uncooperative.",
      quadrant: "AV",
    },
    {
      qid: 59,
      text: "has temper tantrums.",
      quadrant: "AV",
    },
    {
      qid: 60,
      text: "appears to enjoy falling.",
      quadrant: "SK",
    },
    {
      qid: 61,
      text: "resists eye contact from me or others.",
      quadrant: "AV",
    },
  ];

  const handleFormSubmit = ({ responses, comments, totalScore }) => {
    console.log("Conduct Form Responses:", responses);
    console.log("Conduct Raw Score:", totalScore);
    console.log("Conduct Comments:", comments);
  };

  return (
    <BaseForm
      questions={questions}
      onSubmit={handleFormSubmit}
      formTitle="Conduct Associated with Sensory Processing"
      isSubmitting={isSubmitting}
    />
  );
}

export default ConductSensoryProcessingForm;
