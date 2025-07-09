const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientName: { type: String, required: true },
    patientPhone: { type: String, required: true },
    patientEmail: { type: String, required: false }, // Optional
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // User Model එකට සම්බන්ධයි
        required: true
    },
    appointmentDate: { type: Date, required: true },
    appointmentTime: { type: String, required: true }, // "HH:MM" format
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
        default: 'Pending'
    },
    notes: { type: String, required: false }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);