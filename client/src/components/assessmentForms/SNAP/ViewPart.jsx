import React from 'react';

const ViewPart = ({
  selectedForm,
  questions, // Pass the full questions array
  isTranslated,
  getAnswerOptionText,
  getLightColorShadeClass,
  setIsViewingDetails, // Function to go back to submissions table
  resetForm, // Function to reset the entire form to fill a new one
}) => {
  if (!selectedForm) {
    return <p className="text-red-500 text-center">Error: No form data to display.</p>;
  }

  const { studentInfo } = selectedForm;

  // Additional safeguard: If studentInfo is unexpectedly missing from the selectedForm
  if (!studentInfo) {
    return <p className="text-red-500 text-center">Error: Student information not found within the form data.</p>;
  }

  const handleGoBackToSubmissions = () => {
    setIsViewingDetails(false);
    window.scrollTo(0, 0);
  };

  const handleFillNewForm = () => {
    resetForm();
  };

  return (
    <div className="space-y-6 animate-fade-in-down">
      <h2 className="text-3xl font-bold text-blue-800 text-center mb-8 border-b-2 pb-3">
        {isTranslated ? "Details" : "விவரங்கள்"}
      </h2>

      <div className="bg-blue-50 rounded-xl shadow-lg p-8 border border-blue-200">
        <h3 className="text-2xl font-bold text-blue-700 mb-6 pb-2 border-b border-blue-100">
          {isTranslated ? "Student Information" : "மாணவர் தகவல்கள்"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-gray-700 mb-8">
          <div className="flex flex-col">
            <p className="font-semibold text-gray-900">
              {isTranslated ? "Name:" : "பெயர்:"}
            </p>
            <p className="font-bold text-blue-700 text-lg">
              {studentInfo.name}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-gray-900">
              {isTranslated ? "Age:" : "வயது:"}
            </p>
            <p className="font-bold text-lg">{studentInfo.age}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-gray-900">
              {isTranslated ? "Class:" : "வகுப்பு:"}
            </p>
            <p className="font-bold text-lg">{studentInfo.class}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-gray-900">
              {isTranslated ? "Address:" : "முகவரி:"}
            </p>
            <p className="font-bold text-lg">{studentInfo.address}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-gray-900">
              {isTranslated ? "Gender:" : "பால்:"}
            </p>
            <p className="font-bold text-lg">{studentInfo.gender}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-gray-900">
              {isTranslated ? "Completed By:" : "நிரப்பியது:"}
            </p>
            <p className="font-bold text-lg">{studentInfo.completedBy}</p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-gray-900">
              {isTranslated ? "Submission Date:" : "சமர்ப்பித்த தேதி:"}
            </p>
            <p className="font-bold text-lg">
              {new Date(selectedForm.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="font-semibold text-gray-900">
              {isTranslated ? "Total Score:" : "மொத்த மதிப்பெண்:"}
            </p>
            <p className="font-bold text-lg">
              {selectedForm.totalScore}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t-2 border-gray-100">
          <h3 className="font-bold text-xl text-blue-700 mb-4">
            {isTranslated ? "Answers to Questions:" : "கேள்விகளுக்கான பதில்கள்:"}
          </h3>
          <ul className="list-disc list-inside space-y-3 text-gray-700">
            {Object.entries(selectedForm.answers).map(([qIndex, val]) => (
              <li key={qIndex} className="text-base leading-relaxed pl-2">
                <span className="font-medium text-gray-800">
                  Q{Number(qIndex) + 1}.{" "}
                  {isTranslated
                    ? questions[qIndex]?.en
                    : questions[qIndex]?.ta}
                </span>
                <span
                  className={`ml-2 px-3 py-1 rounded-full text-xs font-semibold ${getLightColorShadeClass(
                    val
                  )}`}
                >
                  {getAnswerOptionText(val, isTranslated ? "en" : "ta")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={handleFillNewForm}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-full hover:from-green-600 hover:to-teal-700 transition-all duration-300 shadow-lg font-semibold"
        >
          {isTranslated ? "Fill New Form" : "புதிய படிவத்தை நிரப்புக"}
        </button>
        <button
          onClick={handleGoBackToSubmissions}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full hover:from-purple-600 hover:to-indigo-700 transition-all duration-300 shadow-lg font-semibold"
        >
          {isTranslated ? "Back to Submitted Forms" : "சமர்ப்பிக்கப்பட்ட படிவங்களுக்குத் திரும்பு"}
        </button>
      </div>
    </div>
  );
};

export default ViewPart;