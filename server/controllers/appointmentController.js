// server/controllers/appointmentController.js

const Appointment = require('../models/Appointment'); // Appointment model එක import කරගන්නවා

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private (Needs authentication/authorization later)
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ appointmentDate: 1, startTime: 1 });
    res.status(200).json({ success: true, count: appointments.length, data: appointments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Get single appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }
    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private
exports.createAppointment = async (req, res) => {
  try {
    const newAppointment = await Appointment.create(req.body);
    res.status(201).json({ success: true, data: newAppointment });
  } catch (error) {
    // Handle validation errors or duplicate entries
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    } else {
      res.status(500).json({ success: false, error: error.message || 'Server Error' });
    }
  }
};

// @desc    Update appointment
// @route   PUT /api/appointments/:id
// @access  Private
exports.updateAppointment = async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }

    appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    } else {
      res.status(500).json({ success: false, error: error.message || 'Server Error' });
    }
  }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }

    await appointment.deleteOne(); // Use deleteOne() for Mongoose 6+

    res.status(200).json({ success: true, data: {} }); // Return empty data on successful deletion
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update appointment status (for cancellation/reschedule)
// @route   PUT /api/appointments/:id/status
// @access  Private
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ success: false, error: 'Appointment not found' });
    }

    if (!['Booked', 'Confirmed', 'Cancelled', 'Completed', 'Rescheduled'].includes(status)) {
        return res.status(400).json({ success: false, error: 'Invalid status provided' });
    }

    appointment.status = status;
    await appointment.save();

    res.status(200).json({ success: true, data: appointment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};