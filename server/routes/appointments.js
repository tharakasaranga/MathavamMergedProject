// server/routes/appointments.js

const express = require('express');
const {
  getAllAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  updateAppointmentStatus // New function for status updates
} = require('../controllers/appointmentController'); // Import all controller functions

const router = express.Router();

// Route for getting all appointments and creating a new one
router.route('/')
  .get(getAllAppointments) // GET /api/appointments
  .post(createAppointment); // POST /api/appointments

// Routes for specific appointment by ID
router.route('/:id')
  .get(getAppointmentById)    // GET /api/appointments/:id
  .put(updateAppointment)     // PUT /api/appointments/:id
  .delete(deleteAppointment); // DELETE /api/appointments/:id

// Route for updating appointment status (e.g., for cancellation)
router.route('/:id/status')
  .put(updateAppointmentStatus); // PUT /api/appointments/:id/status

module.exports = router;