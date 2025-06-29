export const createSensoryProfilePayload = (formSpecificData, sharedData) => {
  // 1. Unpack the data that comes from the BaseForm submission.
  const { responses, comments, totalScore, formTitle } = formSpecificData;

  // 2. Unpack the data that comes from the component's props.
  const { patientId, examinerId, testDate, ageGroup } = sharedData;

  // 3. This is the formatting logic you wanted to reuse.
  //    It's now in one central place.
  const formattedResponses = Object.entries(responses).map(([qid, data]) => ({
    qid: parseInt(qid, 10),
    score: data.score,
    quadrant: data.quadrant,
  }));

  // 4. This is the formData object creation you wanted to reuse.
  const formData = {
    patientId: patientId,
    examinerId: examinerId,
    testDate: testDate,
    assessmentType: "Sensory Profile", // This is consistent for this builder
    ageGroup: ageGroup,
    category: formTitle,
    responses: formattedResponses,
    rawScore: totalScore,
    comments: comments,
  };

  // 5. The function returns the final, ready-to-send object.
  return formData;
};
