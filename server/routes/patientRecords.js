// D:\Computer Science - University of Jaffna\3rd Year\Group Project\Mathavam Project\server\routes\patientRecords.js

const express = require('express');
const router = express.Router();
const PatientRecord = require('../models/PatientRecord'); // Import the PatientRecord model

// POST /api/patientRecords - Create a new patient record
router.post('/', async (req, res) => {
    try {
        const newRecord = new PatientRecord(req.body);
        await newRecord.save();
        res.status(201).json({ message: 'Patient record created successfully!', record: newRecord });
    } catch (err) {
        if (err.code === 11000) { // Duplicate key error (e.g., childNo already exists)
            return res.status(400).json({ message: 'Child No already exists. Please use a unique Child No.' });
        }
        // Handle Mongoose validation errors
        if (err.name === 'ValidationError') {
            let errors = {};
            Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message;
            });
            return res.status(400).json({ message: 'Validation Error', errors });
        }
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/patientRecords - Get all patient records
router.get('/', async (req, res) => {
    try {
        const records = await PatientRecord.find();
        res.status(200).json(records);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// GET /api/patientRecords/:id - Get a single patient record by ID
router.get('/:id', async (req, res) => {
    try {
        const record = await PatientRecord.findById(req.params.id);
        if (!record) {
            return res.status(404).json({ message: 'Patient record not found' });
        }
        res.status(200).json(record);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// PUT /api/patientRecords/:id - Update a patient record by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedRecord = await PatientRecord.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Return the updated document and run schema validators
        );
        if (!updatedRecord) {
            return res.status(404).json({ message: 'Patient record not found' });
        }
        res.status(200).json({ message: 'Patient record updated successfully!', record: updatedRecord });
    } catch (err) {
        if (err.code === 11000) { // Duplicate key error (e.g., childNo already exists)
            return res.status(400).json({ message: 'Child No already exists. Please use a unique Child No.' });
        }
        if (err.name === 'ValidationError') {
            let errors = {};
            Object.keys(err.errors).forEach((key) => {
                errors[key] = err.errors[key].message;
            });
            return res.status(400).json({ message: 'Validation Error', errors });
        }
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /api/patientRecords/:id - Delete a patient record by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedRecord = await PatientRecord.findByIdAndDelete(req.params.id);
        if (!deletedRecord) {
            return res.status(404).json({ message: 'Patient record not found' });
        }
        res.status(200).json({ message: 'Patient record deleted successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;