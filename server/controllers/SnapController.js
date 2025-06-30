const SnapForm = require("../models/Snap");

// POST - Create a new SNAP form entry
const createForm = async (req, res) => {
  try {
    const { studentInfo, answers, totalScore } = req.body;

    // --- Input Validation ---
    // Check if studentInfo object exists and its required fields are present
    if (!studentInfo) {
      return res.status(400).json({ message: "Student information is required." });
    }
    if (
      !studentInfo.id ||
      !studentInfo.name ||
      !studentInfo.age ||
      !studentInfo.class ||
      !studentInfo.address ||
      !studentInfo.gender ||
      !studentInfo.completedBy
    ) {
      return res.status(400).json({ message: "All student information fields (ID, Name, Age, Class, Address, Gender, Completed By) are required." });
    }
    if (!answers || Object.keys(answers).length === 0) {
      return res.status(400).json({ message: "Answers to questions are required." });
    }
    if (totalScore === undefined || totalScore === null) {
      return res.status(400).json({ message: "Total score is required." });
    }

    if (!['Male', 'Female', 'Other'].includes(studentInfo.gender)) {
        return res.status(400).json({ message: "Invalid gender provided." });
    }
    // You can add more specific validation for 'answers' if needed, e.g., checking if all expected questions are answered


    // Create a new form instance using the SnapForm model
    const newForm = new SnapForm({
      studentInfo: { // Pass the entire studentInfo object to the schema
        id: studentInfo.id,
        name: studentInfo.name,
        age: studentInfo.age,
        class: studentInfo.class,
        address: studentInfo.address,
        gender: studentInfo.gender,
        completedBy: studentInfo.completedBy,
      },
      answers,
      totalScore,
    });

    const savedForm = await newForm.save(); // Save the new form to the database
    res.status(201).json({ message: "Form created successfully!", data: savedForm });
  } catch (error) {
    // Handle Mongoose duplicate key errors (for unique: true fields like studentInfo.id)
    if (error.code === 11000) {
      return res.status(409).json({ message: `A form with Student ID '${error.keyValue["studentInfo.id"]}' already exists.`, details: error.message });
    }
    // Handle Mongoose validation errors (e.g., missing required fields, enum violations)
    if (error.name === 'ValidationError') {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({ message: "Validation Error", errors });
    }
    // Catch any other unexpected errors
    console.error("Error creating form:", error);
    res.status(500).json({ message: "Server error creating form.", details: error.message });
  }
};

// GET - Retrieve all SNAP forms
const getForms = async (req, res) => {
  try {
    const forms = await SnapForm.find({}); // Find all forms
    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ message: "Server error fetching forms.", details: error.message });
  }
};

// GET - Retrieve a single SNAP form by ID
const getFormById = async (req, res) => {
  try {
    const form = await SnapForm.findById(req.params.id); // Find by Mongoose's document _id
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    // Handle invalid ID format
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid form ID format." });
    }
    console.error("Error fetching form by ID:", error);
    res.status(500).json({ message: "Server error fetching form.", details: error.message });
  }
};

// PUT - Update an existing SNAP form by ID
const updateForm = async (req, res) => {
  try {
    const { studentInfo, answers, totalScore } = req.body;

    // --- Input Validation for Update (similar to create, but fields might be optional depending on partial update logic) ---
    // For a full update, validate all required fields
    if (!studentInfo || !studentInfo.id || !studentInfo.name || !studentInfo.age || !studentInfo.class || !studentInfo.address || !studentInfo.gender || !studentInfo.completedBy || !answers || totalScore === undefined || totalScore === null) {
      return res.status(400).json({ message: "All required fields must be provided for update." });
    }

    if (!['Male', 'Female', 'Other'].includes(studentInfo.gender)) {
        return res.status(400).json({ message: "Invalid gender provided." });
    }

    const updatedForm = await SnapForm.findByIdAndUpdate(
      req.params.id, // Document ID from URL
      {
        studentInfo: { // Update the nested studentInfo object
          id: studentInfo.id,
          name: studentInfo.name,
          age: studentInfo.age,
          class: studentInfo.class,
          address: studentInfo.address,
          gender: studentInfo.gender,
          completedBy: studentInfo.completedBy,
        },
        answers,
        totalScore,
      },
      { new: true, runValidators: true } // `new: true` returns the updated document; `runValidators: true` ensures schema validators run on update
    );

    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({ message: "Form updated successfully!", data: updatedForm });
  } catch (error) {
    // Handle duplicate key errors (e.g., if studentInfo.id is changed to an existing one)
    if (error.code === 11000) {
      return res.status(409).json({ message: `A form with Student ID '${error.keyValue["studentInfo.id"]}' already exists.`, details: error.message });
    }
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({ message: "Validation Error", errors });
    }
    // Handle invalid ID format
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid form ID format." });
    }
    console.error("Error updating form:", error);
    res.status(500).json({ message: "Server error updating form.", details: error.message });
  }
};


// DELETE - Delete a SNAP form by ID
const deleteForm = async (req, res) => {
  try {
    const deletedForm = await SnapForm.findByIdAndDelete(req.params.id);
    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({ message: "Form deleted successfully!", data: deletedForm });
  } catch (error) {
    // Handle invalid ID format
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid form ID format." });
    }
    console.error("Error deleting form:", error);
    res.status(500).json({ message: "Server error deleting form.", details: error.message });
  }
};

// GET - Retrieve student information (re-evaluate if this specific endpoint is still necessary)
// This function would typically be used to get just the student's personal info, not the entire form.
// Adjust the query based on how you uniquely identify students (e.g., by studentInfo.id)
const getStudentInfoByStudentId = async (req, res) => {
  try {
    // Assuming req.params.studentId contains the actual student ID (e.g., patientInfo.id from frontend)
    const form = await SnapForm.findOne({ 'studentInfo.id': req.params.studentId }).select('studentInfo -_id'); // Select only studentInfo and exclude _id
    if (!form) {
      return res.status(404).json({ message: 'Student information not found for this ID.' });
    }
    res.status(200).json(form.studentInfo); // Return just the nested studentInfo object
  } catch (error) {
    console.error("Error fetching student info:", error);
    res.status(500).json({ message: "Server error fetching student information.", details: error.message });
  }
};


module.exports = {
  createForm,
  getForms,
  getFormById,
  updateForm, // Added updateForm to exports
  deleteForm,
  getStudentInfoByStudentId // Renamed for clarity if you still need this specific endpoint
};