// src/models/DSMForm.js
const mongoose = require('mongoose');

const DSM5FormSchema = new mongoose.Schema({
  patientInfo: {
    id: { type: String, required: true },
    name: { type: String, required: true },
    dob: { type: Date, required: true },
  },
  answers: {
    socialCommunication: { type: [String], required: true }, // Array of strings
    repetitiveBehaviors: { type: [String], required: true }, // Array of strings
    otherCriteria: { type: [String], required: true },      // Array of strings
  },
  severityRatings: {
    socialCommunication: { type: String, required: true },
    repetitiveBehaviors: { type: String, required: true },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to update 'updatedAt' timestamp
DSM5FormSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('DSM5Form', DSM5FormSchema);