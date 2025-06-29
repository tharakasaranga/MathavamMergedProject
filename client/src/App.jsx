
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard'; 
import PatientRecordForm from './pages/RecordSheet/PatientRecordForm';
import SkillAssessmentFlow from './pages/SpeechAndTheropyAssessment/SkillAssessmentFlow';

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


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/record-sheet" element={<PatientRecordForm />} />
          <Route path="/skill-assessment" element={<SkillAssessmentFlow />} />
        

        {/* Varsha */}
         <Route path="/sensory-profile-fill-form" element={<SensoryProfileCreatePage />}/>
        <Route path="/sensory-profile-view" element={<SensoryProfileReadPage />}/>
        <Route path="/sensory-profile/edit/:id" element={<SensoryProfileEditPage />}/>



        {/*Methuja parts */}

                <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/addchild" element={<AddChild />} />
        <Route path="/forms" element={<FormHome />} /> {/* optional alias */}
        <Route path="/forms/carsform" element={<Carsform />} />
        <Route path="/carsformprevious-entries" element={<CarsPrevious />} />
        <Route path="/editcar/:id" element={<EditCarEntry />} />
        <Route path="/forms/mathavamflowchart" element={<MathavamFlowchart />} />
        <Route path="/mathavamflowchartprevious-entries" element={<MFPrevious/>} />
        <Route path="/forms/bc" element={<Bcform />} />
        <Route path="/bcprevious-entries" element={<BcPrevious/>} />
        <Route path="/cars-progress" element={<CarsProgress/>} />
         <Route path="/bc-progress" element={<BcProgress/>} />
        {/* Redirect if no match */}
        <Route path="/editb/:id" element={<EditBcEntry/>} />
        <Route path="/editm/:id" element={<EditMfEntry/>} />



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