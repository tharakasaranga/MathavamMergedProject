// server/controllers/appointmentController.js (updated)

const Appointment = require('../models/Appointment');
const User = require('../models/User'); // Assuming User model is available to check roles/practitioners
const Child = require('../models/Child'); // Assuming Child model is available for patients

// @desc    Get all appointments (Admin/Super Admin only)
// @route   GET /api/appointments
// @access  Private (Admin/Super Admin)
exports.getAllAppointments = async (req, res) => {
    try {
        // In a real app, you would have middleware to check user.userType for authorization
        // For now, assuming this is accessed by authorized personnel.
        const appointments = await Appointment.find()
            .populate('patient', 'childRegNo firstName lastName') // Populate child details
            .populate('practitioner', 'firstName lastName userType') // Populate practitioner details
            .populate('bookedBy', 'username userType') // Populate who booked it
            .sort({ appointmentDate: 1, startTime: 1 });
        res.status(200).json({ success: true, count: appointments.length, data: appointments });
    } catch (error) {
        console.error('Error fetching all appointments:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get single appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
exports.getAppointmentById = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id)
            .populate('patient', 'childRegNo firstName lastName')
            .populate('practitioner', 'firstName lastName userType')
            .populate('bookedBy', 'username userType');

        if (!appointment) {
            return res.status(404).json({ success: false, error: 'Appointment not found' });
        }
        res.status(200).json({ success: true, data: appointment });
    } catch (error) {
        console.error('Error fetching appointment by ID:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Private (Accessible by Parent, Admin, Resource Person)
exports.createAppointment = async (req, res) => {
    const { patientId, practitionerId, serviceType, appointmentDate, startTime, endTime, notes } = req.body;
    const bookedBy = req.user.id; // Assuming user ID is available from authentication middleware (req.user)

    // Basic validation
    if (!patientId || !practitionerId || !appointmentDate || !startTime || !endTime || !bookedBy) {
        return res.status(400).json({ success: false, message: 'Please fill all required fields: patient, practitioner, date, start time, end time.' });
    }

    try {
        // Validate practitioner exists and is a Doctor or Therapist
        const practitioner = await User.findById(practitionerId);
        if (!practitioner || (!['Doctor', 'Therapist'].includes(practitioner.userType))) {
            return res.status(400).json({ success: false, message: 'Invalid practitioner selected.' });
        }

        // Validate patient (child) exists
        const patient = await Child.findById(patientId);
        if (!patient) {
            return res.status(400).json({ success: false, message: 'Invalid patient selected.' });
        }

        // Conditional requirement for serviceType if practitioner is a Therapist
        if (practitioner.userType === 'Therapist' && !serviceType) {
            return res.status(400).json({ success: false, message: 'Service Type is required for Therapist appointments.' });
        }

        const newAppointment = new Appointment({
            patient: patientId,
            practitioner: practitionerId,
            serviceType: serviceType || null, // Allow null if not specified
            appointmentDate,
            startTime,
            endTime,
            notes,
            bookedBy,
            status: 'Pending' // Default status
        });

        await newAppointment.save();
        res.status(201).json({ success: true, data: newAppointment, message: 'Appointment created successfully!' });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Update appointment details
// @route   PUT /api/appointments/:id
// @access  Private (Admin/Practitioner)
exports.updateAppointment = async (req, res) => {
    try {
        const { patientId, practitionerId, serviceType, appointmentDate, startTime, endTime, notes, status } = req.body;
        let appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ success: false, error: 'Appointment not found' });
        }

        // Basic authorization check (e.g., only Admin or the practitioner associated with the appointment can update)
        // This will be handled more robustly by middleware later.
        // For now, assuming req.user.id is available and has permissions.
        // if (req.user.userType !== 'Admin' && appointment.practitioner.toString() !== req.user.id) {
        //     return res.status(403).json({ success: false, message: 'Not authorized to update this appointment.' });
        // }

        appointment.patient = patientId || appointment.patient;
        appointment.practitioner = practitionerId || appointment.practitioner;
        appointment.serviceType = serviceType !== undefined ? serviceType : appointment.serviceType;
        appointment.appointmentDate = appointmentDate || appointment.appointmentDate;
        appointment.startTime = startTime || appointment.startTime;
        appointment.endTime = endTime || appointment.endTime;
        appointment.notes = notes !== undefined ? notes : appointment.notes; // Allow notes to be cleared
        // Status updates should ideally go through updateAppointmentStatus, but included here for full update
        appointment.status = status || appointment.status;

        await appointment.save();
        res.status(200).json({ success: true, data: appointment, message: 'Appointment updated successfully!' });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Delete appointment
// @route   DELETE /api/appointments/:id
// @access  Private (Admin/Practitioner - with proper authorization)
exports.deleteAppointment = async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ success: false, error: 'Appointment not found' });
        }

        // Basic authorization check (similar to update)
        // if (req.user.userType !== 'Admin' && appointment.practitioner.toString() !== req.user.id) {
        //     return res.status(403).json({ success: false, message: 'Not authorized to delete this appointment.' });
        // }

        await appointment.deleteOne();
        res.status(200).json({ success: true, data: {}, message: 'Appointment deleted successfully!' });
    } catch (error) {
        console.error('Error deleting appointment:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Update appointment status (e.g., Confirmed, Cancelled, Completed)
// @route   PUT /api/appointments/:id/status
// @access  Private (Practitioner/Admin)
exports.updateAppointmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ success: false, message: 'Status is required.' });
        }

        let appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ success: false, error: 'Appointment not found' });
        }

        if (!['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status provided.' });
        }

        // Ensure only authorized users (the practitioner or Admin) can update status
        // This check will be enhanced with proper middleware later.
        // if (req.user.userType !== 'Admin' && appointment.practitioner.toString() !== req.user.id) {
        //     return res.status(403).json({ success: false, message: 'Not authorized to update status for this appointment.' });
        // }

        appointment.status = status;
        await appointment.save();
        res.status(200).json({ success: true, data: appointment, message: `Appointment status updated to ${status}!` });
    } catch (error) {
        console.error('Error updating appointment status:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get appointments for a specific practitioner (Doctor or Therapist)
// @route   GET /api/appointments/practitioner/:id
// @access  Private (Practitioner themselves or Admin/Super Admin)
exports.getPractitionerAppointments = async (req, res) => {
    try {
        const practitionerId = req.params.id;
        const practitioner = await User.findById(practitionerId);

        if (!practitioner || (!['Doctor', 'Therapist'].includes(practitioner.userType))) {
            return res.status(404).json({ success: false, message: 'Practitioner not found or not a Doctor/Therapist.' });
        }

        // In a real application, ensure the logged-in user is either the practitioner themselves
        // or an Admin/Super Admin to access this route. (Via middleware)
        // if (req.user.id !== practitionerId && req.user.userType !== 'Admin' && req.user.userType !== 'Super Admin') {
        //    return res.status(403).json({ success: false, message: 'Not authorized to view this practitioner\'s appointments.' });
        // }

        const appointments = await Appointment.find({ practitioner: practitionerId })
            .populate('patient', 'childRegNo firstName lastName')
            .populate('practitioner', 'firstName lastName userType')
            .sort({ appointmentDate: 1, startTime: 1 });

        res.status(200).json({ success: true, count: appointments.length, data: appointments });
    } catch (error) {
        console.error('Error fetching practitioner appointments:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};

// @desc    Get appointments for a specific patient (child)
// @route   GET /api/appointments/patient/:id
// @access  Private (Parent who owns the child, Admin/Super Admin, or Practitioner involved)
exports.getPatientAppointments = async (req, res) => {
    try {
        const patientId = req.params.id;
        const patient = await Child.findById(patientId);

        if (!patient) {
            return res.status(404).json({ success: false, message: 'Patient (child) not found.' });
        }

        // Authorization: Ensure logged-in user is the parent of this child,
        // an Admin/Super Admin, or a practitioner involved in the appointment.
        // This will be handled by middleware.
        // if (req.user.userType === 'Parent' && patient.parentId.toString() !== req.user.id) {
        //     return res.status(403).json({ success: false, message: 'Not authorized to view these appointments.' });
        // }


        const appointments = await Appointment.find({ patient: patientId })
            .populate('patient', 'childRegNo firstName lastName')
            .populate('practitioner', 'firstName lastName userType')
            .populate('bookedBy', 'username userType')
            .sort({ appointmentDate: 1, startTime: 1 });

        res.status(200).json({ success: true, count: appointments.length, data: appointments });
    } catch (error) {
        console.error('Error fetching patient appointments:', error);
        res.status(500).json({ success: false, error: 'Server Error' });
    }
};