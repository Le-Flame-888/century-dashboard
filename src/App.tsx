import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { cn } from './lib/utils';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Formation from './components/pages/Formation';
import StudentsList from './components/pages/StudentsList';
import AddStudentForm from './components/pages/AddStudentForm';
import SettingsPage from './components/pages/SettingsPage';
import CalendarPage from './components/pages/reservations/CalendarPage';
import AssistantTasks from './components/layout/AssistantTasks';
import { Toaster } from './components/ui/toaster';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="bg-gray-50">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className={cn(
          "transition-all duration-300 ease-in-out",
          sidebarOpen ? "lg:ml-64" : "lg:ml-20"
        )}>
          <div className="flex flex-col h-screen">
            <Header 
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
              toggleRightSidebar={() => setRightSidebarOpen(!rightSidebarOpen)}
            />
            <main className="flex-1 overflow-y-auto p-6">
              <div className="max-w-7xl mx-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/formation" element={<Formation />} />
                  <Route path="/etudiants" element={<StudentsList />} />
                  <Route path="/etudiants/nouveau" element={<AddStudentForm />} />
                  <Route path="/reservations/calendar" element={<CalendarPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>

        <AssistantTasks isOpen={rightSidebarOpen} onClose={() => setRightSidebarOpen(false)} />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
