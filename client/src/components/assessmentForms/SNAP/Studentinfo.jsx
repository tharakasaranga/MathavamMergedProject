import React from "react";

const Studentinfo = ({ isTranslated, studentInfo, setStudentInfo }) => {
  // Define the fields for student information
  const fields = [
    // Add this new field for the ID
    { label: "Student ID", ta: "மாணவர் அடையாள அட்டை", type: "text", key: "id", placeholder: "Enter Student ID" },
    { label: "Child's Name", ta: "பிள்ளையின் பெயர்", type: "text", key: "name", placeholder: "Enter name" },
    { label: "Age", ta: "வயது", type: "number", key: "age", placeholder: "Enter age" },
    { label: "Class", ta: "வகுப்பு", type: "text", key: "class", placeholder: "Enter class" },
    { label: "Address", ta: "விலாசம்", type: "text", key: "address", placeholder: "Enter address" },
  ];

  return (
    <div className="mb-8 p-6 bg-blue-50 rounded-lg shadow-inner border border-blue-200">
      <h3 className="text-2xl font-bold text-blue-700 mb-6 pb-3 border-b border-blue-100">
        {isTranslated ? "Student Information" : "மாணவர் தகவல்கள்"}
      </h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field, idx) => (
            <div key={idx}>
              <label className="block text-gray-700 font-semibold mb-1">
                {isTranslated ? field.label : field.ta}
              </label>
              <input
                type={field.type}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                value={studentInfo[field.key] || ""}
                onChange={(e) =>
                  setStudentInfo({ ...studentInfo, [field.key]: e.target.value })
                }
              />
            </div>
          ))}

          {/* Gender - now manually selectable */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              {isTranslated ? "Gender" : "பால்"}
            </label>
            <div className="flex gap-4 mt-1">
              {["Male", "Female", "Other"].map((gender) => (
                <label key={gender} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    checked={studentInfo.gender === gender}
                    onChange={(e) =>
                      setStudentInfo({ ...studentInfo, gender: e.target.value })
                    }
                    className="accent-blue-600"
                  />
                  <span>{isTranslated ? gender : (gender === "Male" ? "ஆண்" : "பெண்")}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Completed By - This remains editable */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              {isTranslated ? "Completed By (Father, Mother, Guardian)" : "நிரப்புபவர் (தந்தை, தாய், பாதுகாவலர்)"}
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              value={studentInfo.completedBy || ""}
              onChange={(e) =>
                setStudentInfo({ ...studentInfo, completedBy: e.target.value })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studentinfo;