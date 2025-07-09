import React from 'react';
import {
  LineChart as LineChartIcon, // Renaming to avoid conflict with Chart.js line chart if used
  BarChart as BarChartIcon,
  Users as UsersIcon,
  Award as AwardIcon, // Used for Achievements/Awards
  Activity as ActivityIcon, // Used for general activity
  Link as LinkIcon, // Used for quick links
  Bell as BellIcon, // Used for notifications
  CheckCircle as CheckCircleIcon, // For completion or success
  BookOpen as BookOpenIcon // For courses
} from 'lucide-react'; // A popular icon library compatible with Tailwind

// If you don't want to use lucide-react, you can use heroicons or another icon library,
// or even SVG directly. For this example, I'm using lucide-react as it's modern and easy to use.
// Install it: npm install lucide-react

const AdminDashboard = () => {
  return (
    <div className="flex-grow p-6 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 text-center transition-all duration-300 hover:shadow-xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Welcome to Mathavam!
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Your personalized hub for insights, progress, and valuable resources. Explore what's new and dive into your journey.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
          {/* Quick Stats/Highlights */}
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 text-center transition-all duration-300 hover:bg-gray-100">
            <div className="text-primary-500 text-5xl mb-3">
              <AwardIcon size={60} className="text-green-500" />
            </div>
            <h2 className="text-4xl font-extrabold text-green-600">1200+</h2>
            <p className="text-lg text-gray-600">Total Achievements</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 text-center transition-all duration-300 hover:bg-gray-100">
            <div className="text-primary-500 text-5xl mb-3">
              <BarChartIcon size={60} className="text-blue-500" />
            </div>
            <h2 className="text-4xl font-extrabold text-blue-600">95%</h2>
            <p className="text-lg text-gray-600">Completion Rate</p>
          </div>
          <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 text-center transition-all duration-300 hover:bg-gray-100">
            <div className="text-primary-500 text-5xl mb-3">
              <UsersIcon size={60} className="text-orange-500" />
            </div>
            <h2 className="text-4xl font-extrabold text-orange-600">50K+</h2>
            <p className="text-lg text-gray-600">Community Members</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white p-8 rounded-2xl shadow-lg h-full transition-all duration-300 hover:shadow-xl">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Recent Activity & Updates
            </h2>
            <div className="border-t border-gray-200 pt-4">
              {/* Example content - replace with actual data */}
              <div className="flex items-center mb-4">
                <CheckCircleIcon className="text-green-500 mr-3" size={24} />
                <p className="text-lg text-gray-700">
                  You just completed "Introduction to AI"! Keep up the great work.
                </p>
              </div>
              <div className="flex items-center mb-4">
                <BookOpenIcon className="text-blue-500 mr-3" size={24} />
                <p className="text-lg text-gray-700">
                  New module "Advanced Machine Learning" is now available.
                </p>
              </div>
              <div className="flex items-center">
                <UsersIcon className="text-purple-500 mr-3" size={24} />
                <p className="text-lg text-gray-700">
                  Your community post received 15 likes.
                </p>
              </div>
              {/* More activity items here */}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 transition-all duration-300 hover:shadow-xl">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Quick Links
            </h2>
            <div className="border-t border-gray-200 pt-4">
              <p className="mb-3 text-lg">
                <a href="#" className="text-blue-600 hover:underline font-medium flex items-center">
                  <LinkIcon size={20} className="mr-2" /> Explore Courses
                </a>
              </p>
              <p className="mb-3 text-lg">
                <a href="#" className="text-blue-600 hover:underline font-medium flex items-center">
                  <LinkIcon size={20} className="mr-2" /> View Progress Report
                </a>
              </p>
              <p className="text-lg">
                <a href="#" className="text-blue-600 hover:underline font-medium flex items-center">
                  <LinkIcon size={20} className="mr-2" /> Contact Support
                </a>
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Notifications
            </h2>
            <div className="border-t border-gray-200 pt-4">
              {/* Example notifications */}
              <div className="flex items-start mb-3">
                <BellIcon className="text-yellow-500 mr-3 mt-1" size={20} />
                <p className="text-md text-gray-600">
                  New message from your mentor.
                </p>
              </div>
              <div className="flex items-start">
                <BellIcon className="text-yellow-500 mr-3 mt-1" size={20} />
                <p className="text-md text-gray-600">
                  Upcoming webinar: "Future of AI" on July 10th.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;