// App.jsx Update
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import PatientRecordForm from './pages/RecordSheet/PatientRecordForm';
import SkillAssessmentFlow from './pages/SpeechAndTheropyAssessment/SkillAssessmentFlow';
import PatientRecordList from './pages/RecordSheet/PatientRecordList';
import LoginForm from './pages/Auth/LoginForm';
import ManageUser from './pages/ManageUsers/ManageUser';
import AddNewUser from './pages/ManageUsers/AddNewUser';
//varsha parts

import "./App.css";
import SensoryProfileCreatePage from "./pages/SensoryProfile/SensoryProfileCreatePage";
import SensoryProfileReadPage from "./pages/SensoryProfile/SensoryProfileReadPage";
import SensoryProfileEditPage from "./pages/SensoryProfile/SensoryProfileEditPage";


//Mathuja parts
import AdminDashboard from './components/AdminDashboard';
import Carsform from './forms/carsform';
import MathavamFlowchart from './forms/MathavamFlowchart';
import CarsPrevious from "./components/CarsPrevious";
import FormHome from "./components/FormHome";
import AddChild from './components/AddChild';

import EditCarEntry from "./components/EditCarEntry";
import MFPrevious from './components/MFPrevious';
import Bcform from './forms/Bcform';
import BcPrevious from './components/BcPrevious';
import CarsProgress from './components/CarsProgress';
import BcProgress from './components/BcProgress';
import EditBcEntry from './components/EditBcEntry';
import EditMfEntry from './components/EditMfEntry';
import ViewPatientRecord from './pages/RecordSheet/ViewPatientRecord';
import AppointmentManagement from './pages/Appointment/AppointmentManagement';
import DoctorAppointmentBooking from './pages/Appointment/DoctorAppointmentBooking';
// New imports for appointment forms
import SessionBookingForm from './pages/Appointment/SessionBookingForm';
import ServiceBookingForm from './pages/Appointment/ServiceBookingForm';


function App() {
  return (
    <Router>
      <Routes>
        {/* Route for LoginForm - No Dashboard Layout */}
        <Route path="/" element={<LoginForm />} />

        {/* Dashboard Layout - All nested routes will render inside the Dashboard's Outlet */}
        <Route path="/dashboard" element={<Dashboard />}>
          {/* Default content for /dashboard. You can choose any component here, or redirect */}
          <Route index element={<AdminDashboard />} /> {/* This will be the content for /dashboard if you navigate directly to it */}
          <Route path="dashboard" element={<AdminDashboard />} /> {/* Also handle direct /dashboard access */}

          {/* Patient Record Routes */}
          <Route path="record-sheet" element={<PatientRecordForm />} />
          <Route path="skill-assessment" element={<SkillAssessmentFlow />} /> {/* This seems like a specific flow, consider if it needs the full layout */}
          <Route path="patient-records" element={<PatientRecordList />} />
          <Route path="patient-records/new" element={<PatientRecordForm />} />
          <Route path="patient-records/:id" element={<ViewPatientRecord />} />
          <Route path="patient-records/edit/:id" element={<PatientRecordForm />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-users/add" element={<AddNewUser />} />
          {/* Updated Appointment Routes */}
          <Route path="appointments" element={<AppointmentManagement />} /> {/* This route will display the type selection */}
          <Route path="appointments/session-booking" element={<SessionBookingForm />} />
          <Route path="appointments/service-booking" element={<ServiceBookingForm />} />
          <Route path="appointments/doctor-booking" element={<DoctorAppointmentBooking />} /> {/* Already existing DoctorAppointmentBooking */}


          {/* Varsha's Sensory Profile Routes */}
          <Route path="sensory-profile-fill-form" element={<SensoryProfileCreatePage />} />
          <Route path="sensory-profile-view" element={<SensoryProfileReadPage />} />
          <Route path="sensory-profile/edit/:id" element={<SensoryProfileEditPage />} />

          {/* Mathuja's Parts */}
          <Route path="admin-dashboard" element={<AdminDashboard />} />
          <Route path="addchild" element={<AddChild />} />
          <Route path="forms" element={<FormHome />} />
          <Route path="forms/carsform" element={<Carsform />} />
          <Route path="carsformprevious-entries" element={<CarsPrevious />} />
          <Route path="editcar/:id" element={<EditCarEntry />} />
          <Route path="forms/mathavamflowchart" element={<MathavamFlowchart />} />
          <Route path="mathavamflowchartprevious-entries" element={<MFPrevious />} />
          <Route path="forms/bc" element={<Bcform />} />
          <Route path="bcprevious-entries" element={<BcPrevious />} />
          <Route path="cars-progress" element={<CarsProgress />} />
          <Route path="bc-progress" element={<BcProgress />} />
          <Route path="editb/:id" element={<EditBcEntry />} />
          <Route path="editm/:id" element={<EditMfEntry />} />

          {/* Catch-all for routes within Dashboard layout (optional, but good for empty states) */}
          <Route path="*" element={
            <div className="flex justify-center items-center h-full">
              <p className="text-xl text-gray-600">Select an option from the sidebar.</p>
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;