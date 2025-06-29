import { useState, useEffect } from "react";
import ChildInfoInputs from "./ChildInfoInputs";
import { useNavigate } from "react-router-dom";

const MathavamFlowchart = () => {
  const navigate = useNavigate();

  const sections = {
    Assessment: [
      "Doctor Assessment",
      "Speech Therapist",
      "Occupational Therapist",
      "Physiotherapist",
      "Feeding Assessment",
      "IQ Assessment",
    ],
    "Parental Training": ["Parental Training"],
    Consultants: ["Consultant Psychiatrist", "Consultant Pediatrician"],
    Interventions: [
      "Level 1 Intervention",
      "Level 2 Intervention",
      "Level 3 Intervention",
    ],
    Discussions: ["Case Discussion", "Family Discussion", "Group"],
  };

  const defaultFormData = () => {
    const initial = {
      name: "",
      childNo: "",
      age: "",
      date: "",
      gender: "",
    };
    Object.values(sections).flat().forEach((item) => {
      initial[item] = [];
    });
    return initial;
  };

  const [formData, setFormData] = useState(defaultFormData);
  const [readOnlyFields, setReadOnlyFields] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const sanitizeData = (dataFromDb) => {
    const clean = { ...defaultFormData() };
    Object.entries(clean).forEach(([key]) => {
      clean[key] = Array.isArray(dataFromDb[key])
        ? dataFromDb[key]
        : dataFromDb[key] || (Array.isArray(clean[key]) ? [] : "");
    });
    return { ...clean, ...dataFromDb };
  };

  const handleChildNoChange = async (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      childNo: value,
      name: "",
      age: "",
      gender: "",
      date: "",
    }));
    setReadOnlyFields(false);
    setIsEditMode(false);

    try {
      const res = await fetch(`http://localhost:5000/api/child/${value}`);
      if (!res.ok) throw new Error("Child not found");
      const child = await res.json();

      const flowRes = await fetch(`http://localhost:5000/api/mflow/${value}`);
      const hasExisting = flowRes.ok;
      const flowData = hasExisting ? await flowRes.json() : {};

      setFormData((prev) => ({
        ...sanitizeData({
          ...flowData,
          name: child.name,
          age: child.age,
          gender: child.gender,
          date: new Date().toISOString().split("T")[0],
          childNo: value,
        }),
      }));

      setIsEditMode(hasExisting);
      setReadOnlyFields(true);
    } catch (err) {
      console.warn("Error loading child:", err.message);
    }
  };

  const handleAddDate = (item) => {
    setFormData((prev) => ({
      ...prev,
      [item]: [...(prev[item] || []), ""],
    }));
  };

  const handleDateChange = (item, index, value) => {
    const updated = [...(formData[item] || [])];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [item]: updated }));
  };

  const handleRemoveDate = (item, index) => {
    const updated = [...(formData[item] || [])];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, [item]: updated }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:5000/api/mflow/${isEditMode ? "update" : "submit"}`,
        {
          method: isEditMode ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Submission failed");
      const result = await res.json();
      alert("Form submitted successfully!");
      navigate("/forms");
    } catch (error) {
      console.error("Submission error:", error.message);
      alert("Submission failed: " + error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">Mathavam Flowchart</h2>

      <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
        <ChildInfoInputs
          formData={formData}
          handleChildNoChange={handleChildNoChange}
          readOnlyFields={readOnlyFields}
        />

        <label className="block mt-4 font-semibold text-gray-700">Date</label>
        <input
          type="text"
          name="date"
          value={formData.date}
          readOnly
          className="border p-2 mt-1 rounded w-full"
        />
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {Object.entries(sections).map(([section, items]) => (
          <div key={section} className="border-b pb-4">
            <h3 className="font-semibold text-lg mb-2">{section}</h3>
            {items.map((item) => (
              <div key={item} className="border p-4 rounded-md mb-2">
                <label className="font-medium">{item}</label>
                <div className="flex flex-col gap-2 mt-2">
                  {(formData[item] || []).map((date, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="date"
                        value={date}
                        onChange={(e) =>
                          handleDateChange(item, index, e.target.value)
                        }
                        className="p-2 border rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveDate(item, index)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => handleAddDate(item)}
                  className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md"
                >
                  Add Date
                </button>
              </div>
            ))}
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 w-1/3 bg-green-500 text-white py-2 px-4 rounded-full"
        >
          {isEditMode ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default MathavamFlowchart;
