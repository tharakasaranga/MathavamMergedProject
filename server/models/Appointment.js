// server/models/Appointment.js
const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    // Link to the patient (child) being seen
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Child', // Assuming you have a 'Child' model for patients
        required: true
    },
    // Link to the Doctor or Therapist conducting the appointment
    practitioner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Refers to the User model (specifically Doctors/Therapists)
        required: true
    },
    // For service-based appointments (e.g., Speech Therapy Session)
    serviceType: {
        type: String,
        required: function() {
            // This field is required if the practitioner is a 'Therapist'
            // or if the appointment is specifically a 'service' type booking
            // We'll enforce this in the controller based on how it's created.
            // For now, making it generally optional at the schema level if not every appointment has a specific service type
            return false; // Will be conditionally required by controller
        },
        enum: ['General Consultation', 'Speech Therapy', 'Occupational Therapy', 'Physiotherapy', 'Counseling Session', 'Other'], // Example service types
        default: null
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String, // e.g., "09:00"
        required: true
    },
    endTime: {
        type: String, // e.g., "10:00"
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled'],
        default: 'Pending'
    },
    notes: {
        type: String,
        required: false
    },
    // To track who booked the appointment (e.g., Parent, Admin, Resource Person)
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // User who created this appointment
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);