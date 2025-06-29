import React, { useState, useEffect } from "react";
import ChildInfoInputs from "./ChildInfoInputs"; 
import { Link } from "react-router-dom";
import CarsPrevious from "../components/CarsPrevious";
import { useNavigate } from "react-router-dom";
// Inside the return JSX:





const AutismRatingForm = () => {

  const navigate = useNavigate();
  const categories = [
    "Relating people", "Imitation", "Emotional Response", "Body use", "Object use",
    "Adaptation to change", "Visual Response", "Listening Response",
    "Taste, smell & touch response", "Fear or Nervousness", "Verbal Communication",
    "Nonverbal Communication", "Activity level", "Consistency of intellectual response",
    "General Impression"
  ];

  const scores = [1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0];

  const [selectedScores, setSelectedScores] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    childNo: "",
    age: "",
    date: new Date().toISOString().split("T")[0], // ← sets current date in YYYY-MM-DD format
    gender: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [previousEntries, setPreviousEntries] = useState([]);

  const handleChildNoChange = async (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, childNo: value }));

    try {
      const response = await fetch(`http://localhost:5000/api/child/${value}`);
      if (!response.ok) throw new Error("Child not found");
      const data = await response.json();
      setFormData((prev) => ({
        ...prev,
        name: data.name,
        age: data.age,
        gender: data.gender,
       
      }));
    } catch (err) {
      setFormData((prev) => ({
        ...prev,
        name: "",
        age: "",
        gender: "",
        date: "",
      }));
    }

    setErrorMessage("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorMessage("");
  };

  const handleRadioChange = (category, value) => {
    setSelectedScores((prev) => ({
      ...prev,
      [category]: parseFloat(value),
    }));
    setErrorMessage("");
  };

  const totalScore = Object.values(selectedScores).reduce((acc, curr) => acc + curr, 0);
  const allFilled = Object.keys(selectedScores).length === categories.length;
  const allBasicInfoFilled = Object.values(formData).every((field) => field.trim() !== "");

  const getSeverity = () => {
    if (!allFilled) return { label: "Pending", color: "bg-gray-400 text-white" };
    if (totalScore >= 15 && totalScore < 30) return { label: "Minimal to no symptoms of ASD", color: "bg-green-500 text-white" };
    if (totalScore >= 30 && totalScore < 37) return { label: "Mild to Moderate symptoms of ASD", color: "bg-yellow-400 text-black" };
    if (totalScore >= 37) return { label: "Severe symptoms of ASD", color: "bg-red-500 text-white" };
  };

  const severity = getSeverity();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allFilled || !allBasicInfoFilled) {
      setErrorMessage("⚠️ Please complete the form before submitting.");
      return;
    }

    const newEntry = { ...formData, scores: selectedScores, severity };

    try {
      const response = await fetch("http://localhost:5000/api/carsform/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) throw new Error("Failed to submit");

      const savedEntry = await response.json();

      setPreviousEntries((prev) => [...prev, savedEntry]);
      setIsSubmitted(true);
      alert("Form submitted successfully!");
      navigate("/forms");

    } catch (err) {
      console.error(err);
      setErrorMessage("🚨 Submission failed. Please try again.");
    }
  };

  const handleEdit = (entryIndex) => {
    const entryToEdit = previousEntries[entryIndex];
    setFormData(entryToEdit);
    setSelectedScores(entryToEdit.scores);
    setIsSubmitted(false);
  };

 

  return (
    <div>
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
      <h2 className="text-2xl font-bold text-center">Childhood Autism Rating Scale (CARS)</h2>
      <p className="text-center text-gray-600">Second Edition - Mathavam Centre</p>

      <div className="bg-blue-50 p-6 rounded-xl shadow-sm">
    

        <ChildInfoInputs
          formData={formData}
          handleChildNoChange={handleChildNoChange}
        />

         
       <label className="mb-2  font-semibold text-gray-700" htmlFor="age">
        Date
        </label>
        <input
          type="text"
          name="date"
          placeholder="Date of Test"
          value={formData.date}
          readOnly
          className="border p-2 ml-2 rounded mb-6 mt-6 "
        />
      
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Category</th>
              <th colSpan="7" className="border p-2">Score</th>
            </tr>
            <tr>
              <th></th>
              {scores.map((score, idx) => {
                const colors = [
                  "bg-green-300", "bg-green-200", "bg-yellow-100",
                  "bg-yellow-200", "bg-orange-200", "bg-red-200", "bg-red-400"
                ];
                return (
                  <th key={idx} className={`border p-2 ${colors[idx]}`}>
                    {score.toFixed(1)}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {categories.map((item, idx) => (
              <tr key={idx}>
                <td className="border p-2 text-left">{item}</td>
                {scores.map((score) => (
                  <td key={score} className="border p-2">
                    <input
                      type="radio"
                      name={item}
                      value={score}
                      checked={selectedScores[item] === score}
                      onChange={() => handleRadioChange(item, score)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-right font-semibold text-lg">
        Total Score: {totalScore.toFixed(1)}
      </div>

      <div className="p-4 border rounded bg-gray-50">
        <p className="font-semibold mb-2">Severity Group:</p>
        <span className={`inline-block px-4 py-2 rounded-full ${severity.color}`}>
          {severity.label}
        </span>
      </div>

      {errorMessage && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        className={`mt-4 w-1/3 p-2 rounded transition ${
          allFilled && allBasicInfoFilled
            ? "bg-green-600 text-white hover:bg-green-700"
            : "bg-green-500 text-white"
        }`}
      >
        Submit
      </button>

    </form>
   

  
      </div>
  );
};

export default AutismRatingForm;
