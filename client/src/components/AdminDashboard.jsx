import React from 'react';
import './../App.css'
const AdminDashboard = () => {
  const cards = [
    { title: 'Register' },
    { title: 'Therapy Tracking' },
    { title: 'Patient & Parent Details Management' },
    { title: 'Parental Training' },
    { title: 'QR Based Attendance System' },
    { title: 'Automate Letter & Document Handling' },
    { title: 'Automate Letter & Document Handling of RDHS' },
    { title: 'Parent Interaction & Knowledge Base' },
    { title: 'Book and Notify Therapy Sessions' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-indigo-900 text-white flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="bg-white text-black px-2 py-1 rounded font-bold">LOGO</div>
          <h1 className="text-lg font-semibold">MATHAVAM CARE SYSYEM</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="hover:underline">Logout</button>
          <div className="bg-white text-black px-3 py-1 rounded-full">Profile</div>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 p-6">
        <h2 className="text-xl font-semibold mb-4">Hi, Super Admin <span>😊</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-purple-100 p-4 rounded shadow hover:shadow-md cursor-pointer transition-all">
              <h3 className="font-medium">{card.title}</h3>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-indigo-900 text-white text-center py-2 mt-auto">
        Copyright
      </footer>
    </div>
  );
};

export default AdminDashboard;
