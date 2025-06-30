const DSMForm = require('../models/DSM5'); 

exports.getAllForms = async (req, res) => {
  try {
    const forms = await DSMForm.find().sort({ createdAt: -1 }); // Sort by creation date, latest first
    res.json(forms);
  } catch (err) {
    console.error('Error fetching forms:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getFormById = async (req, res) => {
  try {
    const form = await DSMForm.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.json(form);
  } catch (err) {
    console.error('Error fetching form by ID:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createForm = async (req, res) => {
  const { patientInfo, answers, severityRatings } = req.body;

  // Basic validation (more robust validation can be added here or with a validation library)
  if (!patientInfo || !answers || !severityRatings) {
    return res.status(400).json({ message: 'Please provide all required form data.' });
  }

  try {
    const newForm = new DSMForm({
      patientInfo,
      answers,
      severityRatings,
    });
    const form = await newForm.save();
    res.status(201).json({ message: 'Form submitted successfully!', formId: form._id, form });
  } catch (err) {
    console.error('Error creating form:', err.message);
    // Check for Mongoose validation errors
    if (err.name === 'ValidationError') {
      let errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateForm = async (req, res) => {
  const { patientInfo, answers, severityRatings } = req.body;
  const { id } = req.params;

  try {
    let form = await DSMForm.findById(id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    // Update fields
    form.patientInfo = patientInfo;
    form.answers = answers;
    form.severityRatings = severityRatings;
    // The pre-save hook in the model will update `updatedAt`

    await form.save(); // Using save() will trigger pre-save hooks
    res.json({ message: 'Form updated successfully!', form });
  } catch (err) {
    console.error('Error updating form:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Form not found' });
    }
    if (err.name === 'ValidationError') {
      let errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ message: 'Validation failed', errors });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteForm = async (req, res) => {
  const { id } = req.params;
  try {
    const form = await DSMForm.findById(id);
    if (!form) {
      return res.status(404).json({ message: 'Form not found' });
    }

    await DSMForm.deleteOne({ _id: id }); // Correct way to delete by ID

    res.json({ message: 'Form deleted successfully!' });
  } catch (err) {
    console.error('Error deleting form:', err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Form not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
};