import React, { useState, useEffect } from "react"; // Import useEffect
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faCog, faSignOutAlt, faChartBar, faUsers, faHome, faSearch, faNotesMedical, faUserGraduate, faQrcode, faHeartbeat, faFolderOpen, faClipboardList, faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null); // State to store logged-in user info
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Retrieve user information from localStorage when the component mounts
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setLoggedInUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        // Clear invalid user data and log out if parsing fails
        handleLogout();
      }
    } else {
      // If no user data, redirect to login
      navigate("/");
    }
  }, [navigate]); // Depend on navigate to avoid lint warnings and ensure effect runs if navigate changes

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleHome = () => {
    navigate("/dashboard");
  };

  const handleSkillAssessmentForms = () => {
    navigate("/dashboard/forms");
  };

  const handleRecordingSheet = () => {
    navigate("/dashboard/patient-records");
  };

  const handleAppointmentManagement = () => {
    navigate("/dashboard/appointments");
  }

  const handleParentalTraining = () => {
    navigate("/dashboard/parental-training");
  };

  const handleQRAttendance = () => {
    navigate("/dashboard/qr-attendance");
  };

  const handleTherapyTracking = () => {
    navigate("/dashboard/therapy-tracking");
  };

  const handleDocuments = () => {
    navigate("/dashboard/documents");
  };

  const handleTherapySessions = () => {
    navigate("/dashboard/therapy-sessions");
  };

  const handleReports = () => {
    navigate("/dashboard/reports");
  };

  const handleManageUsers = () => {
    navigate("/dashboard/manage-users");
  };

  const handleAddNewUser = () => {
    navigate("manage-users/add");
  }
  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setLoggedInUser(null); // Clear user state
    navigate("/");
  };

  const isActive = (path) => {
    if (path === "/dashboard/skill-assessment") {
      return (
        location.pathname === "/dashboard/skill-assessment" ||
        location.pathname === "/dashboard/prerequisite-skill" ||
        location.pathname === "/dashboard/communication" ||
        location.pathname === "/dashboard/language" ||
        location.pathname === "/dashboard/speech" ||
        location.pathname === "/dashboard/oralmotor-assessment"
      );
    }
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800 antialiased overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-gradient-to-b from-indigo-700 to-purple-800 text-white transition-all duration-300 ease-in-out ${
           isSidebarOpen ? "w-80" : "w-20"} flex flex-col shadow-2xl relative z-20`}>

        <div className="flex items-center justify-center h-20 bg-indigo-900 bg-opacity-30 relative px-4">
          {isSidebarOpen ? (
            <h1 className="text-3xl font-extrabold tracking-wide text-white drop-shadow-lg leading-tight">
              Mathavam
            </h1>
          ) : (
            <FontAwesomeIcon
              icon={faHome}
              className="text-3xl text-white opacity-90 transition-transform duration-200 hover:scale-110"
            />
          )}
          <button
            onClick={toggleSidebar}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-indigo-600 p-2.5 rounded-full shadow-lg border-2 border-white border-opacity-30 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-60 transition-all duration-300 transform hover:scale-110 active:scale-95 z-30"
            aria-label="Toggle Sidebar"
          >
            <FontAwesomeIcon icon={faBars} className="text-white text-lg" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          {/* Navigation items */}
          <NavItem
            icon={faHome}
            label="Dashboard Home"
            isOpen={isSidebarOpen}
            onClick={handleHome}
            isActive={isActive("/dashboard")}
          />
           <NavItem
            icon={faClipboardList}
            label="Patient Information"
            isOpen={isSidebarOpen}
            onClick={handleRecordingSheet}
            isActive={isActive("/dashboard/patient-records")}
          />
          <NavItem
            icon={faNotesMedical}
            label="Assessment Forms"
            isOpen={isSidebarOpen}
            onClick={handleSkillAssessmentForms}
            isActive={isActive("/dashboard/forms")}
          />
          <NavItem
            icon={faHeartbeat}
            label="Therapy Tracking"
            isOpen={isSidebarOpen}
            onClick={handleTherapyTracking}
            isActive={isActive("/dashboard/therapy-tracking")}
          />
          <NavItem
            icon={faCalendarCheck}
            label="Appointment Management"
            isOpen={isSidebarOpen}
            onClick={handleAppointmentManagement}
            isActive={isActive("/dashboard/appointment-management")}
          />
           <NavItem
            icon={faQrcode}
            label="QR Attendance"
            isOpen={isSidebarOpen}
            onClick={handleQRAttendance}
            isActive={isActive("/dashboard/qr-attendance")}
          />
           <NavItem
            icon={faQrcode}
            label="RDHS"
            isOpen={isSidebarOpen}
            onClick={handleQRAttendance}
            isActive={isActive("/dashboard/qr-attendance")}
          />

          <NavItem
            icon={faUserGraduate}
            label="Parental Training"
            isOpen={isSidebarOpen}
            onClick={handleParentalTraining}
            isActive={isActive("/dashboard/parental-training")}
          />

          <NavItem
            icon={faUsers}
            label="Manage Users"
            isOpen={isSidebarOpen}
            onClick={handleManageUsers}
            isActive={isActive("/dashboard/manage-users")}
          />

        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-indigo-700 border-opacity-50">
          <NavItem
            icon={faSignOutAlt}
            label="Logout"
            isOpen={isSidebarOpen}
            onClick={handleLogout}
            isActive={false}
            isLogout={true}
          />
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-white rounded-l-3xl shadow-xl overflow-hidden my-4 ml-4 transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="flex items-center justify-between p-5 bg-white border-b border-gray-100 shadow-md rounded-tl-3xl z-10">
          <div className="relative flex items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {location.pathname === "/dashboard"
                ? "Dashboard Overview"
                : location.pathname.startsWith("/dashboard/forms")
                ? "Assessment Forms"
                : location.pathname === "/dashboard/patient-records"
                ? "Patient Information"
                : location.pathname === "/dashboard/parental-training"
                ? "Parental Training"
                : location.pathname === "/dashboard/qr-attendance"
                ? "QR Attendance"
                : location.pathname === "/dashboard/therapy-tracking"
                ? "Therapy Tracking"
                : location.pathname === "/dashboard/therapy-sessions"
                ? "Therapy Sessions"
                : location.pathname === "/dashboard/appointments"
                ? "Appointment Management"
                : location.pathname === "/dashboard/manage-users"
                ? "Manage Users"
                : "Welcome"}
            </h2>
          
          </div>
          <div className="flex items-center space-x-3">
            <IconButton icon={faBell} />
            <IconButton icon={faCog} />
            {/* Display user's name instead of faUserCircle icon */}
            {loggedInUser ? (
              <div className="flex items-center px-3 py-2 rounded-full bg-indigo-50 text-indigo-700 font-semibold text-sm shadow-inner cursor-pointer hover:bg-indigo-100 transition-colors duration-200">
                Hi, {loggedInUser.firstName} {loggedInUser.lastName}
              </div>
            ) : (
              // Optionally show a placeholder or nothing if user is not loaded yet
              <div className="flex items-center px-3 py-2 rounded-full bg-gray-200 text-gray-700 font-semibold text-sm">
                Loading User...
              </div>
            )}
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 p-1 bg-gray-100 overflow-y-auto rounded-br-3xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

// Reusable NavItem Component for Sidebar
const NavItem = ({ icon, label, isOpen, onClick, isActive, isLogout = false }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full py-2.5 px-4 rounded-lg text-left text-base font-medium transition-all duration-200 ease-in-out group
      ${
        isActive
          ? "bg-indigo-600 text-white shadow-lg transform translate-x-1"
          : "text-indigo-200 hover:bg-indigo-700 hover:text-white hover:translate-x-1"
      }
      ${isLogout ? "text-red-300 hover:bg-red-700 hover:text-white" : ""}
      focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-60
      relative overflow-hidden
    `}
  >
    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></span>
    <FontAwesomeIcon
      icon={icon}
      className={`${
        isOpen ? "mr-4" : "mr-0"
      } text-xl transition-all duration-200 group-hover:scale-110 transform relative z-10`}
    />
    <span
      className={`${
        isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full absolute"
      } transition-all duration-200 whitespace-nowrap relative z-10`}
    >
      {label}
    </span>
  </button>
);

// Reusable IconButton for Header
const IconButton = ({ icon }) => (
  <button className="text-gray-500 hover:text-indigo-600 focus:outline-none transition-colors duration-200 text-xl p-2.5 rounded-full hover:bg-indigo-50 transform hover:scale-110 focus:ring-2 focus:ring-indigo-300 active:scale-95">
    <FontAwesomeIcon icon={icon} />
  </button>
);


export default Dashboard;