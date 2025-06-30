import React, { useState, useEffect, useCallback } from "react";
import Studentinfo from "../../components/assessmentForms/SNAP/Studentinfo";
import ViewPart from "../../components/assessmentForms/SNAP/ViewPart";
import axios from "axios";
import { useNavigate, useParams, useLocation } from 'react-router-dom'; // Import useLocation

const SnapForm = () => {
  const [studentInfo, setStudentInfo] = useState({
    id: "",
    name: "",
    age: "",
    class: "",
    address: "",
    gender: "",
    completedBy: "",
  });
  const [isTranslated, setIsTranslated] = useState(false);
  const [answers, setAnswers] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedForm, setSelectedForm] = useState(null);
  const [isViewingDetails, setIsViewingDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // New state for editing mode

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation(); // Get location object to access query params

  // Define resetForm using useCallback BEFORE its usage in useEffect
  const resetForm = useCallback(() => {
    setIsSubmitted(false);
    setCurrentPage(0);
    setAnswers({});
    setStudentInfo({
      id: "", // Reset student ID as well
      name: "",
      age: "",
      class: "",
      address: "",
      gender: "",
      completedBy: "",
    });
    setSelectedForm(null);
    setTotalScore(0);
    setIsViewingDetails(false);
    setIsEditing(false); // Reset editing state
    window.scrollTo(0, 0);
  }, []);

  // Fetch specific form data if ID is present (for viewing/editing)
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const editMode = queryParams.get('edit') === 'true';

    if (id) {
      const fetchSpecificFormData = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/snapforms/${id}`);
          const formData = res.data;

          setStudentInfo(formData.studentInfo || {});
          setAnswers(formData.answers);
          setTotalScore(formData.totalScore);
          setSelectedForm(formData);

          if (editMode) {
            setIsEditing(true); // Enable editing mode
            setIsViewingDetails(false); // Ensure not in viewing mode
            setCurrentPage(0); // Go back to the first page for editing
          } else {
            setIsViewingDetails(true); // Default to viewing if no edit param
            setIsEditing(false);
          }
          setIsSubmitted(false);
        } catch (error) {
          console.error("Error fetching form data:", error);
          navigate('/snap-submitted-forms'); // Redirect to list if not found or error
        }
      };
      fetchSpecificFormData();
    } else {
      resetForm();
    }
  }, [id, navigate, resetForm, location.search]); // Added location.search to dependency array

  const toggleTranslation = () => {
    setIsTranslated(!isTranslated);
  };

  const handleChange = (index, value) => {
    const updatedAnswers = { ...answers, [index]: Number(value) };
    setAnswers(updatedAnswers);

    let newTotal = 0;
    for (let key in updatedAnswers) {
      newTotal += updatedAnswers[key];
    }
    setTotalScore(newTotal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Student Info validation (always required for submission/update)
    if (
      !studentInfo.id ||
      !studentInfo.name ||
      !studentInfo.age ||
      !studentInfo.class ||
      !studentInfo.address ||
      !studentInfo.gender ||
      !studentInfo.completedBy
    ) {
      alert(isTranslated ? "Please fill in all student information fields." : "மாணவர் தகவல்கள் அனைத்தையும் நிரப்பவும்.");
      return;
    }

    // Answer validation (now always runs when submitting/updating the form)
    const unanswered = questions.filter(
      (_, index) => answers[index] === undefined
    );
    if (unanswered.length > 0) {
      alert(isTranslated ? "Please answer all questions before submitting the form." : "படிவத்தைச் சமர்ப்பிக்கும் முன் அனைத்து கேள்விகளுக்கும் பதிலளிக்கவும்.");
      return;
    }

    try {
      const formData = {
        studentInfo,
        answers,
        totalScore,
      };

      if (id) {
        // If ID exists, it's an update operation
        await axios.put(`http://localhost:5000/api/snapforms/${id}`, formData);
        alert(isTranslated ? "Form updated successfully!" : "படிவம் வெற்றிகரமாக புதுப்பிக்கப்பட்டது!");
        navigate('/snap-submitted-forms'); // Navigate after successful update
      } else {
        // Otherwise, it's a new submission
        await axios.post("http://localhost:5000/api/snapforms", formData);
        setIsSubmitted(true);
        alert(isTranslated ? "Form submitted successfully!" : "படிவம் வெற்றிகரமாகச் சமர்ப்பிக்கப்பட்டது!");
        navigate('/snap-submitted-forms'); // Navigate after successful submission
      }

    } catch (err) {
      // Improved error handling for specific backend messages
      let errorMessage = err.response?.data?.message || (isTranslated ? "Error submitting form." : "படிவத்தைச் சமர்ப்பிப்பதில் பிழை.");
      if (err.response?.data?.errors) {
        // If backend sends validation errors object
        errorMessage += "\n" + Object.values(err.response.data.errors).join("\n");
      } else if (err.response?.data?.details) {
        // For custom messages like duplicate student ID
        errorMessage += "\n" + err.response.data.details;
      }
      alert(errorMessage);
    }
  };

  const questions = [
    {
      en: "Often fails to give close attention to details or makes careless mistakes in schoolwork or tasks",
      ta: "அடிக்கடி கவனக்குறைவு அல்லது பாடசாலையில் கவனயினப்பிழை விடுதல்",
    },
    {
      en: "Often has difficulty sustaining attention in tasks or play activities",
      ta: "அடிக்கடி விளையாட்டிலும் ஏனைய செயற்பாடுகளிலும் தொடர்ச்சியாக கவனம் செலுத்த முடியாதிருத்தல்",
    },
    {
      en: "Often does not seem to listen when spoken to directly",
      ta: "அடிக்கடி நேரடி உரையாடலின் போது காது கொடுக்காதது போன்று காணப்படல்",
    },
    {
      en: "Often does not follow through on instructions and fails to finish schoolwork, chores, or duties",
      ta: "அடிக்கடி அறிவுறுத்தல்களுக்கு கீழ்ப்படியாமல் இருத்தல் மற்றும் பாடசாலை வேலைகளை அரைகுறையாகச் செய்தல்",
    },
    {
      en: "Often has difficulty organizing tasks and activities",
      ta: "அடிக்கடி செயற்பாடுகளையும் கடமைகளையும் ஒழுங்குபடுத்துவதில் கடினம் அரைகுறையாகச் செய்தல்",
    },
    {
      en: "Often avoids, dislikes, or reluctantly engages in tasks requiring sustained mental effort",
      ta: "அடிக்கடி மனதை தொடர்ச்சியாக ஒருமுகப்படுத்தி ஈடுபடும் வேலைகளில் விருப்பமின்மை அல்லது தவிர்த்தல்",
    },
    {
      en: "Often loses things necessary for activities (e.g., toys, school assignments, pencils, or books)",
      ta: "அடிக்கடி பாடசாலை மற்றும் விளையாட்டு உபகரணங்களைத் தொலைத்தல்",
    },
    {
      en: "Often is distracted by extraneous stimuli",
      ta: "அடிக்கடி குறித்த வேலையில் கவனம் செலுத்தாது பராக்குப்பார்த்தல்",
    },
    {
      en: "Often is forgetful in daily activities",
      ta: "அடிக்கடி நாளாந்த செயற்பாடுகளில் மறதித் தன்மை",
    },
    {
      en: "Often fidgets with hands or feet or squirms in seat",
      ta: "அடிக்கடி கையைப் பிசைந்து கொண்டும் நெளிந்தபடியும் இருத்தல்",
    },
    {
      en: "Often leaves seat in classroom or in other situations in which remaining seated is expected",
      ta: "அடிக்கடி வகுப்பறையில் கதிரையை விட்டு எழும்பித் திரிதல்",
    },
    {
      en: "Often runs about or climbs excessively in situations in which it is inappropriate",
      ta: "அடிக்கடி அதிகமாக ஓடிக்கொண்டும் ஏறிக்குதித்தபடியும் காணப்படல்",
    },
    {
      en: "Often has difficulty playing or engaging in leisure activities quitely",
      ta: "அடிக்கடி அமைதியாக ஓரிடத்தில் இருந்து விளையாட முடியாது இருத்தல்",
    },
    {
      en: 'Often is "on the go" or often acts as if "driven by a motor"',
      ta: "அடிக்கடி ஓரிடத்தில் இருக்காமல் எழும்பித்திரிதல் அல்லது கட்டுப்பாடு இல்லாமல் இயங்குதல்",
    },
    { en: "Often talks excessively", ta: "அடிக்கடி அளவுக்கு அதிகமாகக் கதைத்தல்" },
    {
      en: "Often blurts out answers before questions have been completed",
      ta: "அடிக்கடி கேள்வி கேட்டு முடிப்பதற்கு முன்னதாக முந்தியடித்துக் கொண்டு பதில் சொல்லல்",
    },
    {
      en: "Often has difficulty awaiting turn",
      ta: "அடிக்கடி தனது முறை வருமட்டும் காத்திருக்க முடியாது இருத்தல்",
    },
    {
      en: "Often interrupts or intrudes on others(e.g-butts into conversations/games)",
      ta: "அடிக்கடி மற்றவர்களுக்கு இடையூறு விளைவித்துக் கொண்டு அல்லது இடைப்பட்டுக்கொண்டிருத்தல்",
    },
  ];

  const questionsPerPage = 9;
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const startIndex = currentPage * questionsPerPage;
  const currentQuestions = questions.slice(
    startIndex,
    startIndex + questionsPerPage
  );

  const getAnswerOptionText = (val, lang) => {
    if (lang === "en") {
      return ["Not At All", "Just A Little", "Quite A Bit", "Very Much"][val];
    } else {
      return ["இல்லை", "குறைவாக", "சில நேரங்களில்", "அதிகமாக"][val];
    }
  };

  const getSelectedButtonColorClass = (val) => {
    switch (val) {
      case 0:
        return "bg-green-600 border-green-600 text-white";
      case 1:
        return "bg-blue-600 border-blue-600 text-white";
      case 2:
        return "bg-orange-500 border-orange-500 text-white";
      case 3:
        return "bg-red-600 border-red-600 text-white";
      default:
        return "";
    }
  };

  const getDefaultButtonColorClass = (val) => {
    switch (val) {
      case 0:
        return "bg-green-100 border-green-200 text-green-800";
      case 1:
        return "bg-blue-100 border-blue-200 text-blue-800";
      case 2:
        return "bg-orange-100 border-orange-200 text-orange-800";
      case 3:
        return "bg-red-100 border-red-200 text-red-800";
      default:
        return "bg-gray-100 border-gray-200 text-gray-700";
    }
  };

  const getLightColorShadeClass = (val) => {
    return getDefaultButtonColorClass(val);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 py-10 px-4 flex justify-center">
      <div className="w-full max-w-[80%] bg-white rounded-2xl shadow-lg p-8 space-y-6 border">
        {isViewingDetails && selectedForm && !isEditing ? ( // Only show ViewPart if viewing and not editing
          <ViewPart
            selectedForm={selectedForm}
            questions={questions}
            isTranslated={isTranslated}
            getAnswerOptionText={getAnswerOptionText}
            getLightColorShadeClass={getLightColorShadeClass}
            setIsViewingDetails={setIsViewingDetails}
            resetForm={resetForm}
          />
        ) : (
          <>
            <div className="text-center flex-1">
              <h2 className="text-4xl font-extrabold text-blue-800 mb-2">
                SNAP-IV Rating Scale
              </h2>
              <p className="text-gray-600 text-md italic">
                James M. Swanson, Ph.D University of California, Irvine
              </p>
            </div>
            <div className="mt-4">
              <button
                onClick={toggleTranslation}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-md font-semibold"
              >
                {isTranslated ? "Show Tamil (தமிழ்)" : "Translate to English"}
              </button>
            </div>

            {currentPage === 0 && (
              <Studentinfo
                isTranslated={isTranslated}
                studentInfo={studentInfo}
                setStudentInfo={setStudentInfo}
                isEditing={isEditing} // Pass isEditing prop
              />
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {currentQuestions.map((q, index) => {
                const globalIndex = startIndex + index;
                return (
                  <div
                    key={globalIndex}
                    className="bg-gray-100 p-5 rounded-xl shadow-md flex flex-col border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                  >
                    <p className="mb-3 text-gray-800 font-medium text-lg leading-snug">
                      <span className="font-bold text-blue-700 mr-2">
                        {globalIndex + 1}.
                      </span>{" "}
                      {isTranslated ? q.en : q.ta}
                    </p>
                    <div className="flex flex-wrap gap-3 mt-2 justify-start">
                      {[0, 1, 2, 3].map((val) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => handleChange(globalIndex, val)}
                          className={`
                            px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-200 ease-in-out transform hover:scale-105
                            ${answers[globalIndex] === val
                              ? `${getSelectedButtonColorClass(val)} shadow-lg`
                              : `${getDefaultButtonColorClass(val)} hover:shadow-sm`
                            }`}
                        >
                          {getAnswerOptionText(val, isTranslated ? "en" : "ta")}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </form>

            <div className="flex justify-between items-center mt-8">
              {currentPage > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setCurrentPage((prev) => prev - 1);
                    window.scrollTo(0, 0);
                  }}
                  className="px-6 py-3 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition-colors duration-200 disabled:opacity-50 cursor-pointer font-semibold shadow-md"
                >
                  {isTranslated ? "Back" : "பின்செல்"}
                </button>
              )}

              <div className="flex-1" />

              {currentPage < totalPages - 1 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (currentPage === 0) {
                      if (
                        !studentInfo.id || // Added ID validation
                        !studentInfo.name ||
                        !studentInfo.age ||
                        !studentInfo.class ||
                        !studentInfo.address ||
                        !studentInfo.gender ||
                        !studentInfo.completedBy
                      ) {
                        alert(isTranslated ? "Please fill in all student information fields to proceed." : "அடுத்து செல்ல மாணவர் தகவல்கள் அனைத்தையும் நிரப்பவும்.");
                        return;
                      }
                    }
                    setCurrentPage((prev) => prev + 1);
                    window.scrollTo(0, 0);
                  }}
                  className="ml-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md cursor-pointer font-semibold"
                >
                  {isTranslated ? "Next" : "அடுத்து"}
                </button>
              ) : (
                <button
                  type="button" // Change to type="button" to prevent default form submission until handleSubmit is ready
                  onClick={handleSubmit} // This will now properly trigger validations
                  className="ml-auto px-6 py-3 bg-gradient-to-r from-green-600 to-teal-700 text-white rounded-full hover:from-green-700 hover:to-teal-800 transition-all duration-300 shadow-md cursor-pointer font-semibold"
                >
                  {isTranslated ? "Submit" : "படிவத்தைச் சமர்ப்பி"}
                </button>
              )}
            </div>
            {(!id || isEditing) && ( // Show this button if not in view mode or if explicitly editing
              <div className="mt-8 text-center">
                <button
                  onClick={() => navigate('/snap-submitted-forms')}
                  className="px-8 py-3 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition-all duration-300 shadow-md font-semibold text-lg"
                >
                  {isTranslated ? "View All Submitted Forms" : "சமர்ப்பிக்கப்பட்ட அனைத்து படிவங்களையும் காண்க"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SnapForm;