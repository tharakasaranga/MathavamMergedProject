// server/routes/appointments.js (updated)

const express = require('express');
const {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus,
  getPractitionerAppointments, // New: For Doctor/Therapist schedules
  getPatientAppointments      // New: For Patient (Child) appointments
} = require('../controllers/appointmentController'); // Import all controller functions

// You'll need an authentication middleware later to protect these routes
// const authMiddleware = require('../middleware/authMiddleware'); // Example

const router = express.Router();

// Routes accessible by various roles (will be protected by middleware)

// Base /api/appointments routes
router.route('/')
  .get(getAllAppointments) // GET /api/appointments - Get all appointments (Admin/Super Admin)
  .post(createAppointment); // POST /api/appointments - Create new appointment (Parent, Admin, Resource Person)

// Routes for specific appointment by ID
router.route('/:id')
  .get(getAppointmentById)    // GET /api/appointments/:id - Get single appointment
  .put(updateAppointment)     // PUT /api/appointments/:id - Update appointment details
  .delete(deleteAppointment); // DELETE /api/appointments/:id - Delete appointment

// Route for updating appointment status (e.g., for cancellation, confirmation, completion)
router.route('/:id/status')
  .put(updateAppointmentStatus); // PUT /api/appointments/:id/status

// New routes for fetching appointments based on role/entity

// GET /api/appointments/practitioner/:id - Get appointments for a specific Doctor/Therapist
// This route will be used for the "Doctors and Therapists review plan calendar"
router.route('/practitioner/:id')
  .get(getPractitionerAppointments);

// GET /api/appointments/patient/:id - Get appointments for a specific patient (child)
router.route('/patient/:id')
  .get(getPatientAppointments);

module.exports = router;