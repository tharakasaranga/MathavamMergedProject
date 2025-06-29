import Child from '../models/Child.js';
import Carsform from '../models/Carsform.js'; // You'll need to create this schema




// @desc Submit a new CARS form entry
export const submitForm = async (req, res) => {
  try {
    const form = new Carsform(req.body);
    const saved = await form.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Form submission failed', error: err.message });
  }
};

// @desc Get all CARS form entries
export const getAllEntries = async (req, res) => {
  try {
    const entries = await Carsform.find();
    res.json(entries);
  } catch (err) {
    res.status(500).json({ message: 'Fetching entries failed', error: err.message });
  }
};

// @desc Get child data by childNo
export const getChildByChildNo = async (req, res) => {
  try {
    const child = await Child.findOne({ childNo: req.params.childNo });
    if (!child) return res.status(404).json({ message: 'Child not found' });
    res.json(child);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching child', error: err.message });
  }
};



export const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;
    

    const deletedEntry = await Carsform.findByIdAndDelete(id);

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
    const updated = await Carsform.findByIdAndUpdate(id, req.body, {
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
    const entry = await Carsform.findById(req.params.id);
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
