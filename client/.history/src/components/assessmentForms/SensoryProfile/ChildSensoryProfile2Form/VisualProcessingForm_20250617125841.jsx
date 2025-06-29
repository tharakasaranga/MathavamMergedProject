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

   const handleFormSubmit = async (formSpecificData) => {
  
      if (isSubmitting) return;
      setIsSubmitting(true);
  
      const sharedData = {
        patientId,
        examinerId,
        testDate,
        ageGroup: "Toddler", 
      };
  
    
      const formData = createSensoryProfilePayload(formSpecificData, sharedData);
  
      try {
        const result = await axios.post("/api/assessments/sensory-profile",formData);
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
