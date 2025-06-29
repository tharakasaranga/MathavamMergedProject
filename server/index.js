// --- Corrected Code ---

// 1. Load environment variables at the very top, using CommonJS syntax.
require('dotenv').config();

// 2. Use CommonJS require() for all module imports to be consistent.
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// Import all route files using CommonJS require()
const therapyAssessmentRoutes = require('./routes/therapyAssessmentRoutes');
const medicalAssessmentRoutes = require('./routes/medicalAssessmentRoutes');
const patientRecordsRouter = require('./routes/patientRecords');
const assessmentRoutes = require('./routes/assessmentRoutes');

// Mathuja's routes
const ChildRoutes = require('./routes/ChildRoutes.js');
const CarsformRoutes = require('./routes/CarsformRoutes.js');
const MflowchartRoutes = require('./routes/MflowchartRoutes.js');
const BcRoutes = require('./routes/BcRoutes.js');


const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
// IMPORTANT: Place these BEFORE your routes for proper request body parsing and CORS handling
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Body parser for JSON data

// Use Routes
app.use('/api/therapyAssessments', therapyAssessmentRoutes);
app.use('/api/medicalAssessments', medicalAssessmentRoutes);
app.use('/api/patientRecords', patientRecordsRouter);
app.use('/api/assessments', assessmentRoutes);


// Mathuja's Routes
app.use('/api/child', ChildRoutes);
app.use('/api/carsform', CarsformRoutes);
app.use('/api/mflow', MflowchartRoutes);
app.use('/api/bc', BcRoutes);


// Basic Root Route
app.get('/', (req, res) => {
    res.send('Mathavam Backend API is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});