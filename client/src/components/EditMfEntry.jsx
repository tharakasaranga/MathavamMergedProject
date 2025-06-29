import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChildInfoInputs from "../forms/ChildInfoInputs";

const EditMathavamFlowchart = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const sanitizeData = (dataFromDb) => {
    const flatData = {
      name: dataFromDb.name,
      childNo: dataFromDb.childNo,
      age: dataFromDb.age,
      gender: dataFromDb.gender,
      date: dataFromDb.date,
    };

    Object.values(sections)
      .flat()
      .forEach((item) => {
        flatData[item] = [];
      });

    if (dataFromDb.sections && Array.isArray(dataFromDb.sections)) {
      dataFromDb.sections.forEach((section) => {
        flatData[section.name] = section.dates || [];
      });
    }

    return flatData;
  };

  const prepareForSubmission = (flatData) => {
    const { name, childNo, age, gender, date } = flatData;

    const sectionsArray = Object.values(sections)
      .flat()
      .map((item) => ({
        name: item,
        dates: flatData[item] || [],
      }));

    return { name, childNo, age, gender, date, sections: sectionsArray };
  };

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/mflow/entries/${id}`);
        if (!res.ok) throw new Error("Failed to fetch entry");
        const data = await res.json();
        setFormData(sanitizeData(data));
        setLoading(false);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchEntry();
  }, [id]);

  const handleDateChange = (item, index, value) => {
    setFormData((prev) => {
      const updatedDates = [...prev[item]];
      updatedDates[index] = value;
      return { ...prev, [item]: updatedDates };
    });
  };

  const handleAddDate = (item) => {
    setFormData((prev) => ({
      ...prev,
      [item]: [...prev[item], ""],
    }));
  };

  const handleRemoveDate = (item, index) => {
    setFormData((prev) => {
      const updatedDates = [...prev[item]];
      updatedDates.splice(index, 1);
      return { ...prev, [item]: updatedDates };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = prepareForSubmission(formData);

      const res = await fetch(`http://localhost:5000/api/mflow/entries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Update failed");
      alert("Entry updated successfully");
      navigate("/forms");
    } catch (error) {
      console.error(error.message);
      alert("Update failed: " + error.message);
    }
  };

  if (loading || !formData) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4">Edit Mathavam Flowchart</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
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
                        value={date || ""}
                        onChange={(e) => handleDateChange(item, index, e.target.value)}
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
          Update
        </button>
      </form>
    </div>
  );
};

export default EditMathavamFlowchart;
