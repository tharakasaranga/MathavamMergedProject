import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faCog, faSignOutAlt, faChartBar, faUsers, faHome, faSearch, faUserCircle, faNotesMedical, faUserGraduate, faQrcode, faHeartbeat, faFolderOpen, faClipboardList, faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleHome = () => {
    navigate("/dashboard");
  };

  const handleSkillAssessmentForms = () => {
    navigate("/forms");
  };

  const handleRecordingSheet = () => {
    navigate("/record-sheet");
  };

  const handleParentalTraining = () => {
    navigate("/parental-training");
  };

  const handleQRAttendance = () => {
    navigate("/qr-attendance");
  };

  const handleTherapyTracking = () => {
    navigate("/therapy-tracking");
  };

  const handleDocuments = () => {
    navigate("/documents");
  };

  const handleTherapySessions = () => {
    navigate("/therapy-sessions");
  };

  const handleReports = () => {
    navigate("/reports");
  };

  const handleManageUsers = () => {
    navigate("/manage-users");
  };

  const handleLogout = () => {
    console.log("Logging out...");
    navigate("/login");
  };

  const isActive = (path) => {
    if (path === "/skill-assessment") {
      return (
        location.pathname === "/skill-assessment" ||
        location.pathname === "/prerequisite-skill" ||
        location.pathname === "/communication" ||
        location.pathname === "/language" ||
        location.pathname === "/speech" ||
        location.pathname === "/oralmotor-assessment"
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
            icon={faNotesMedical}
            label="Assessment Forms"
            isOpen={isSidebarOpen}
            onClick={handleSkillAssessmentForms}
            isActive={isActive("/forms")}
          />
          <NavItem
            icon={faClipboardList}
            label="Recording Sheet"
            isOpen={isSidebarOpen}
            onClick={handleRecordingSheet}
            isActive={isActive("/record-sheet")}
          />
          <NavItem
            icon={faUserGraduate}
            label="Parental Training"
            isOpen={isSidebarOpen}
            onClick={handleParentalTraining}
            isActive={isActive("/parental-training")}
          />
          <NavItem
            icon={faQrcode}
            label="QR Attendance"
            isOpen={isSidebarOpen}
            onClick={handleQRAttendance}
            isActive={isActive("/qr-attendance")}
          />
          <NavItem
            icon={faHeartbeat}
            label="Therapy Tracking"
            isOpen={isSidebarOpen}
            onClick={handleTherapyTracking}
            isActive={isActive("/therapy-tracking")}
          />
          <NavItem
            icon={faFolderOpen}
            label="Documents"
            isOpen={isSidebarOpen}
            onClick={handleDocuments}
            isActive={isActive("/documents")}
          />
          <NavItem
            icon={faCalendarCheck}
            label="Therapy Sessions"
            isOpen={isSidebarOpen}
            onClick={handleTherapySessions}
            isActive={isActive("/therapy-sessions")}
          />
          <NavItem
            icon={faChartBar}
            label="Reports"
            isOpen={isSidebarOpen}
            onClick={handleReports}
            isActive={isActive("/reports")}
          />
          <NavItem
            icon={faUsers}
            label="Manage Users"
            isOpen={isSidebarOpen}
            onClick={handleManageUsers}
            isActive={isActive("/manage-users")}
          />
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-indigo-700 border-opacity-50">
          <NavItem
            icon={faSignOutAlt}
            label="Logout"
            isOpen={isSidebarOpen}
            onClick={handleLogout}
            isActive={false} // Logout is never active
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
                : location.pathname.startsWith("/forms")
                ? "Skill Assessment Forms"
                : location.pathname === "/record-sheet"
                ? "Recording Sheet"
                : location.pathname === "/parental-training"
                ? "Parental Training"
                : location.pathname === "/qr-attendance"
                ? "QR Attendance"
                : location.pathname === "/therapy-tracking"
                ? "Therapy Tracking"
                : location.pathname === "/documents"
                ? "Documents"
                : location.pathname === "/therapy-sessions"
                ? "Therapy Sessions"
                : location.pathname === "/reports"
                ? "Reports"
                : location.pathname === "/manage-users"
                ? "Manage Users"
                : "Welcome"}
            </h2>
            <div className="relative ml-8 group">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2.5 rounded-full border border-gray-200 bg-gray-50 focus:border-indigo-400 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-sm w-72 transition-all duration-300 ease-in-out focus:w-80 shadow-inner outline-none group-hover:border-gray-300"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <IconButton icon={faBell} />
            <IconButton icon={faCog} />
            <IconButton icon={faUserCircle} />
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
    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-200"></span> {/* Subtle hover overlay */}
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