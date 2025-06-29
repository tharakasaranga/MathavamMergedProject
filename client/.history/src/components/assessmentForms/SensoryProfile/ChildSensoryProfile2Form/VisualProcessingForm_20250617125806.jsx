import BaseForm from "../BaseForm";

function VisualProcessingForm() {
  const questions = [
    {
      qid: 9,
      text: "prefers to play or work in low lighting.",
      quadrant: "SN",
    },
    {
      qid: 10,
      text: "prefers bright colors or patterns for clothing.",
      quadrant: "",
    },
    {
      qid: 11,
      text: "enjoys looking at visual details in objects.",
      quadrant: "",
    },
    {
      qid: 12,
      text: "needs help to find objects that are obvious to others.",
      quadrant: "RG",
    },
    {
      qid: 13,
      text: "is more bothered by bright lights than other same-aged children.",
      quadrant: "SN",
    },
    {
      qid: 14,
      text: "watches people as they move around the room.",
      quadrant: "SK",
    },
    {
      qid: 15, //not part of visual raw score
      text: "is bothered by bright lights (for example, hides from sunlight through car window).",
      quadrant: "AV",
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
        isSubmitting={isSubmitting}
      />
      <p>* - Item/s is/are not part of the VISUAL Raw Score.</p>
    </>
  );
}

export default VisualProcessingForm;
