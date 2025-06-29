// src/pages/EditCarEntry.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const CATEGORIES = [
  "Relating people",
  "Imitation",
  "Emotional Response",
  "Body use",
  "Object use",
  "Adaptation to change",
  "Visual Response",
  "Listening Response",
  "Taste, smell & touch response",
  "Fear or Nervousness",
  "Verbal Communication",
  "Nonverbal Communication",
  "Activity level",
  "Consistency of intellectual response",
  "General Impression",
];

const EditCarEntry = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [entry, setEntry] = useState(null);
  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    date: "",
  });
  const [scores, setScores] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/carsform/entries/${id}`);
        const data = await res.json();

        setEntry(data);
        setForm({
          name: data.name || "",
          age: data.age || "",
          gender: data.gender || "",
          date: data.date || "",
        });
        setScores(data.scores || {});
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch entry:", err);
        setLoading(false);
      }
    };

    fetchEntry();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleScoreChange = (category, value) => {
    setScores((prev) => ({ ...prev, [category]: parseFloat(value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:5000/api/carsform/entries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...entry,
          ...form,
          scores: scores,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      alert("Entry updated successfully!");
      navigate("/carsformprevious-entries"); // Change this if your list page route is different
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update entry");
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!entry) return <div className="p-4">Entry not found.</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Entry</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Basic Info */}
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Age</label>
          <input
            name="age"
            type="number"
            value={form.age}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Gender</label>
          <input
            name="gender"
            type="text"
            value={form.gender}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Scores Section */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">CARS Scores</h3>
          {CATEGORIES.map((category) => (
            <div key={category} className="mb-4">
              <label className="block mb-2 font-medium">{category}</label>
              <div className="flex space-x-4">
                {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((score) => (
                  <label key={score} className="flex items-center space-x-1">
                    <input
                      type="radio"
                      name={category}
                      value={score}
                      checked={scores[category] === score}
                      onChange={() => handleScoreChange(category, score)}
                    />
                    <span>{score}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={() => navigate("/carsformprevious-entries")}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCarEntry;
