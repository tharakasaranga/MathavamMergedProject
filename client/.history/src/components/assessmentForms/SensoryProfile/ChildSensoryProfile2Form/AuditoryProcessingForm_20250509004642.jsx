import BaseForm from "../BaseForm";

function AuditoryProcessingForm() {
  const questions = [
    {
      qid: 1,
      text: "reacts strongly to unexpected or loud noises (for example, sirens, dog barking, hair dryer).",
      quadrant: "AV",
    },
    {
      qid: 2,
      text: "holds hands over ears to protect them from sound.",
      quadrant: "AV",
    },
    {
      qid: 3,
      text: "struggles to complete tasks when music or TV is on.",
      quadrant: "SN",
    },
    {
      qid: 4,
      text: "is distracted when there is a lot of noise around.",
      quadrant: "SN",
    },
    {
      qid: 5,
      text: "becomes unproductive with background noise (for example, fan, refridgerator).",
      quadrant: "AV",
    },
    {
      qid: 6,
      text: "tunes me out or seems to ignore me.",
      quadrant: "SN",
    },
    {
      qid: 7,
      text: "seems not to hear when I call his or her name (even though hearing is OK).",
      quadrant: "SN",
    },
    {
      qid: 8,
      text: "enjoys strange noises or makes noise(s) for fun.",
      quadrant: "RG",
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
export default AuditoryProcessingForm;
