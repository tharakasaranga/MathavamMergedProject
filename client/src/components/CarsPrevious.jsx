import React, { useEffect, useState } from "react";
import { exportEntriesToPDF } from "../utills/exportUtills"; 
import "jspdf-autotable";
import { saveAs } from "file-saver";
import { useNavigate } from "react-router-dom";

const CarsPrevious = () => {
  const [entries, setEntries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [childNoFilter, setChildNoFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
   const navigate =useNavigate();
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/carsform/entries");
        const data = await res.json();
        setEntries(data);
        setFiltered(data);
      } catch (err) {
        console.error("Failed to fetch entries:", err);
      }
    };

    fetchEntries();
  }, []);

  const applyFiltersAndSort = () => {
    let results = [...entries];

    if (childNoFilter) {
      results = results.filter(entry =>
        entry.childNo.toLowerCase().includes(childNoFilter.toLowerCase())
      );
    }

    if (dateFilter) {
      results = results.filter(entry => entry.date === dateFilter);
    }

    if (sortBy === "date-desc") {
      results.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "date-asc") {
      results.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "score-desc") {
      results.sort((a, b) => getTotalScore(b.scores) - getTotalScore(a.scores));
    } else if (sortBy === "score-asc") {
      results.sort((a, b) => getTotalScore(a.scores) - getTotalScore(b.scores));
    }

    setFiltered(results);
    setCurrentPage(1); // Reset to first page
  };

  const getTotalScore = (scoresObj) => {
    return Object.values(scoresObj || {}).reduce((acc, val) => acc + val, 0);
  };

  const handleReset = () => {
    setChildNoFilter("");
    setDateFilter("");
    setSortBy("date-desc");
    setFiltered(entries);
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);





const handleDelete = async (id) => {
  if (!confirm("Delete this entry?")) return;
   console.log("Deleting entry with ID:", id);

  try {
    const res = await fetch(`http://localhost:5000/api/carsform/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setEntries((prev) => prev.filter((e) => e._id !== id));
    } else {
      const error = await res.json();
      alert(`Delete failed: ${error.message}`);
    }
  } catch (err) {
    console.error("Delete error:", err);
  }
};


const handleEdit = (entry) => {
  // You can open a modal or navigate to a form page and pass the entry data
  console.log("Edit entry:", entry);
  console.log("Navigating to:", `/edit/${entry._id}`);

  navigate(`/editcar/${entry._id}`);
};

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Previous Entries</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by Child No"
          value={childNoFilter}
          onChange={(e) => setChildNoFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="date-desc">Sort by Date (Newest)</option>
          <option value="date-asc">Sort by Date (Oldest)</option>
          <option value="score-desc">Sort by Score (High → Low)</option>
          <option value="score-asc">Sort by Score (Low → High)</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={applyFiltersAndSort}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Apply
          </button>
          <button
            onClick={handleReset}
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 w-full"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Entry List */}
      {currentItems.map((entry, index) => (
        <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
          <p><strong>Child No:</strong> {entry.childNo}</p>
          <p><strong>Name:</strong> {entry.name}</p>
          <p><strong>Age:</strong> {entry.age}</p>
          <p><strong>Gender:</strong> {entry.gender}</p>
          <p><strong>Date:</strong> {entry.date}</p>
          <p className="mt-2"><strong>Severity:</strong></p>
          <span className={`inline-block mt-1 px-3 py-1 rounded-full ${entry.severity?.color}`}>
            {entry.severity?.label || "N/A"}
          </span>
          <div className="mt-4">
            <p className="font-semibold mb-1">Scores:</p>
            <ul className="list-disc list-inside">
              {entry.scores &&
                Object.entries(entry.scores).map(([category, score]) => (
                  <li key={category}>
                    <strong>{category}:</strong> {score}
                  </li>
                ))}
            </ul>
            <p className="mt-2 font-semibold">Total Score: {getTotalScore(entry.scores).toFixed(1)}</p>
            <button className="text-blue-600" onClick={() => handleEdit(entry)}>Edit</button>
            <button className="text-red-600 ml-2" onClick={() => handleDelete(entry._id)}>Delete</button>
  

    
          </div>
        </div>
      ))}


    
       
      <div className="flex gap-2 mb-4">
   <button onClick={() => exportEntriesToPDF(entries)}
    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Export PDF</button>
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-4 py-2 font-semibold">{currentPage} / {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>

        

      </div>
    </div>
  );
};

export default CarsPrevious;
