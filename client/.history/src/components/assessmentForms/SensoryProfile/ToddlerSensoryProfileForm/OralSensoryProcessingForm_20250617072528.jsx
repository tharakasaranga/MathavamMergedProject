import BaseForm from "../BaseForm";

function ToddlerOralSensoryProcessingForm({ patientId , examinerId, testDate }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    <BaseForm
      questions={questions}
      onSubmit={handleFormSubmit}
      formTitle="Oral Sensory Processing"
      isSubmitting={isSubmitting}
    />
  );
}

export default ToddlerOralSensoryProcessingForm;
