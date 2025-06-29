import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { exportMFEntriesToPDF } from "../utills/exportMFEntriesToPDF";
const MFPrevious = () => {
  const [entries, setEntries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [childNoFilter, setChildNoFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [sortBy, setSortBy] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/mflow`);
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
    }

    setFiltered(results);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setChildNoFilter("");
    setDateFilter("");
    setSortBy("date-desc");
    setFiltered(entries);
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this entry?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/mflow/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setEntries(prev => prev.filter(e => e._id !== id));
        setFiltered(prev => prev.filter(e => e._id !== id));
      } else {
        const error = await res.json();
        alert(`Delete failed: ${error.message}`);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (entry) => {
    navigate(`/editm/${entry._id}`);
  };

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Previous Mathavam Flowchart Entries</h2>

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
      {currentItems.map((entry) => (
        <div key={entry._id} className="mb-4 p-4 border rounded bg-gray-50">
          <p><strong>Child No:</strong> {entry.childNo}</p>
          <p><strong>Name:</strong> {entry.name}</p>
          <p><strong>Age:</strong> {entry.age}</p>
          <p><strong>Gender:</strong> {entry.gender}</p>
          <p><strong>Date:</strong> {entry.date}</p>

          <div className="mt-4">
            <h4 className="font-semibold mb-1">Flowchart Activities:</h4>
  {Object.entries(entry)
  .filter(([key]) => !["name", "childNo", "age", "gender", "date", "_id", "__v"].includes(key))
  .map(([key, values]) => (
    <div key={key} className="mb-2">
      <strong>{key}:</strong>
      {Array.isArray(values) ? (
        <ul className="list-disc list-inside ml-4">
          {values.map((item, i) => {
            if (typeof item === "string") {
              return <li key={i}>{item}</li>;
            } else if (typeof item === "object" && item !== null) {
              return (
                <li key={i}>
                  {item.name && <div><strong>{item.name}</strong></div>}
                  {Array.isArray(item.dates) && (
                    <ul className="list-disc list-inside ml-4">
                      {item.dates.map((d, j) => (
                        <li key={j}>{d}</li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            } else {
              return <li key={i}>{JSON.stringify(item)}</li>;
            }
          })}
        </ul>
      ) : (
        <p className="ml-4 text-gray-600 italic">No data</p>
      )}
    </div>
))}


            <button className="text-blue-600 mt-2" onClick={() => handleEdit(entry)}>Edit</button>
            <button className="text-red-600 mt-2 ml-2" onClick={() => handleDelete(entry._id)}>Delete</button>
          </div>
        </div>
      ))}

      {/* PDF Export */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => exportMFEntriesToPDF(entries)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Export PDF
        </button>
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

export default MFPrevious;
