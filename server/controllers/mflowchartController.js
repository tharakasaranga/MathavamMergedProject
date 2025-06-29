import MFlowchart from "../models/MFlowchart.js";

// @desc Submit Mathavam Flowchart
export const submitMFlowchart = async (req, res) => {
  try {
    const { name, childNo, age, gender, date, ...rest } = req.body;

    // Extract section data into schema format
    const sections = Object.entries(rest).map(([key, value]) => ({
      name: key,
      dates: value,
    }));

    const form = new MFlowchart({
      name,
      childNo,
      age,
      gender,
      date,
      sections,
    });

    const saved = await form.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Submission failed", error: err.message });
  }
};

// @desc Get all entries
export const getMFlowchart = async (req, res) => {
  try {
    const forms = await MFlowchart.find();
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: "Error fetching entries", error: err.message });
  }
};

// @desc Get by ID
export const getMFlowchartById = async (req, res) => {
  try {
    const form = await MFlowchart.findById(req.params.id);
    if (!form) return res.status(404).json({ message: "Form not found" });
    res.json(form);
  } catch (err) {
    res.status(500).json({ message: "Error fetching form", error: err.message });
  }
};
export const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;
    

    const deletedEntry = await MFlowchart.findByIdAndDelete(id);

    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }

    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await MFlowchart.findByIdAndUpdate(id, req.body, {
      new: true, // return the updated document
      runValidators: true, // enforce schema validation
    });

    if (!updated) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error('Update failed:', error);
    res.status(500).json({ message: 'Server error while updating entry' });
  }
};



export const getEntryById = async (req, res) => {
  try {
    console.log("Fetching entry with ID:", req.params.id);  // <-- debug log
    const entry = await MFlowchart.findById(req.params.id);
    if (!entry) {
      console.log("Entry not found for ID:", req.params.id);
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json(entry);
  } catch (err) {
    console.error("Error fetching entry by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
};