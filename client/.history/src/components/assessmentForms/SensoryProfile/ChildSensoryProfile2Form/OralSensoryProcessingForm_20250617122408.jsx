import BaseForm from "../BaseForm";

function OralSensoryProcessingForm() {
  const questions = [
    {
      qid: 43,
      text: "gags easily from certain food textures or food utensils in mouth.",
      quadrant: "",
    },
    {
      qid: 44,
      text: "rejects certain tastes or food smells that are typically part of children's diets.",
      quadrant: "SN",
    },
    {
      qid: 45,
      text: "eats only certain tastes (for example, sweet, salty).",
      quadrant: "SN",
    },
    {
      qid: 46,
      text: "limits self to certain food textures.",
      quadrant: "SN",
    },
    {
      qid: 47,
      text: "is a picky eater, especially about food textures.",
      quadrant: "SN",
    },
    {
      qid: 48,
      text: "smells nonfood objects.",
      quadrant: "SK",
    },
    {
      qid: 49,
      text: "shows a strong preference for certain tastes.",
      quadrant: "SK",
    },
    {
      qid: 50,
      text: "craves certain foods, tastes, or smells.",
      quadrant: "SK",
    },
    {
      qid: 51,
      text: "puts objects in mouth (for example, pencil, hands).",
      quadrant: "SK",
    },
    {
      qid: 52,
      text: "bites tongue or lips more than same-aged children.",
      quadrant: "SN",
    },
  ];

  const handleFormSubmit = async (formSpecificData) => {
  
      if (isSubmitting) return;
      setIsSubmitting(true);
  
      const sharedData = {
        patientId,
        examinerId,
        testDate,
        ageGroup: "Child", 
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
    <BaseForm
      questions={questions}
      onSubmit={handleFormSubmit}
      formTitle="Oral Sensory Processing"
      isSubmitting={isSubmitting}
    />
  );
}

export default OralSensoryProcessingForm;
