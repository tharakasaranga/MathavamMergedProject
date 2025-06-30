import React from 'react'

const Otherpart = ({ answers, handleAnswerChange, isEditing }) => { // Add isEditing prop
  return (
    <>
      <tr className="bg-blue-300 text-white">
        <th className="border border-blue-500 p-2"></th>
        <th className="border border-blue-500 p-2">Yes</th>
        <th className="border border-blue-500 p-2">No</th>
      </tr>
      {[
        "C. Symptoms must be present in the early developmental period (but may not become fully manifest until social demands exceed limited capacities, or may be masked by learned strategies later in life).",
        "D. Symptoms cause clinically significant impairment in social, occupational, or other important areas of current functioning.",
        "E. These disturbances are not better explained by intellectual disability or global developmental delay."
      ].map((item, index) => (
        <tr key={index} className="bg-green-50">
          <td className="border border-green-400 p-2 text-gray-700">{item}</td>
          <td className="border border-green-400 p-2 text-center">
            <input
              type="radio"
              name={`otherCriteria${index}`}
              value="Yes"
              checked={answers.otherCriteria[index] === "Yes"}
              onChange={() => handleAnswerChange("otherCriteria", index, "Yes")}
              className="transform scale-150"
              disabled={!isEditing} // Disable if not editing
            />
          </td>
          <td className="border border-green-400 p-2 text-center">
            <input
              type="radio"
              name={`otherCriteria${index}`}
              value="No"
              checked={answers.otherCriteria[index] === "No"}
              onChange={() => handleAnswerChange("otherCriteria", index, "No")}
              className="transform scale-150"
              disabled={!isEditing} // Disable if not editing
            />
          </td>
        </tr>
      ))}
    </>
  );
};

export default Otherpart