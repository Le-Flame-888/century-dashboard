import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { cn } from './lib/utils';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './components/auth/LoginPage';
import UnauthorizedPage from './components/auth/UnauthorizedPage';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './components/dashboard/Dashboard';
import Formation from './components/pages/Formation';
import GroupesPage from './components/pages/formation/GroupesPage';
import SallesPage from './components/pages/formation/SallesPage';
import ProfesseursPage from './components/pages/formation/ProfesseursPage';
import ExamsPage from './components/pages/exams/ExamsPage';
import OperationsSallePage from './components/pages/OperationsSallePage';
import PaiementPage from './components/pages/PaiementPage';
import ResultsPage from './components/pages/results/ResultsPage';
import AssignmentsPage from './components/pages/assignments/AssignmentsPage';
import AnnouncementsPage from './components/pages/announcements/AnnouncementsPage';
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
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <DashboardLayout 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                rightSidebarOpen={rightSidebarOpen}
                setRightSidebarOpen={setRightSidebarOpen}
              />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                rightSidebarOpen={rightSidebarOpen}
                setRightSidebarOpen={setRightSidebarOpen}
              />
            </ProtectedRoute>
          } />
          <Route path="/formation" element={
            <ProtectedRoute>
              <DashboardLayout 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                rightSidebarOpen={rightSidebarOpen}
                setRightSidebarOpen={setRightSidebarOpen}
              />
            </ProtectedRoute>
          } />
          <Route path="/formation/groupes" element={
            <ProtectedRoute>
              <DashboardLayout 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                rightSidebarOpen={rightSidebarOpen}
                setRightSidebarOpen={setRightSidebarOpen}
              />
            </ProtectedRoute>
          } />
          <Route path="/formation/salles" element={
            <ProtectedRoute>
              <DashboardLayout 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                rightSidebarOpen={rightSidebarOpen}
                setRightSidebarOpen={setRightSidebarOpen}
              />
            </ProtectedRoute>
          } />
          <Route path="/formation/professeurs" element={
            <ProtectedRoute>
              <DashboardLayout 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                rightSidebarOpen={rightSidebarOpen}
                setRightSidebarOpen={setRightSidebarOpen}
              />
            </ProtectedRoute>
          } />
          <Route path="/operations" element={
            <ProtectedRoute>
              <DashboardLayout 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                rightSidebarOpen={rightSidebarOpen}
                setRightSidebarOpen={setRightSidebarOpen}
              />
            </ProtectedRoute>
          } />
          <Route path="/paiement" element={
            <ProtectedRoute>
              <DashboardLayout 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                rightSidebarOpen={rightSidebarOpen}
                setRightSidebarOpen={setRightSidebarOpen}
              />
            </ProtectedRoute>
          } />
          <Route path="/exams" element={
            <ProtectedRoute>
              <DashboardLayout 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                rightSidebarOpen={rightSidebarOpen}
                setRightSidebarOpen={setRightSidebarOpen}
              />
            </ProtectedRoute>
          } />
          <Route path="/results" element={
            <ProtectedRoute>
              <DashboardLayout 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                rightSidebarOpen={rightSidebarOpen}
                setRightSidebarOpen={setRightSidebarOpen}
              />
            </ProtectedRoute>
          } />
          <Route path="/assignments" element={
            <ProtectedRoute>
              <DashboardLayout 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                rightSidebarOpen={rightSidebarOpen}
                setRightSidebarOpen={setRightSidebarOpen}
              />
            </ProtectedRoute>
          } />
          <Route path="/announcements" element={
            <ProtectedRoute>
              <DashboardLayout 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                rightSidebarOpen={rightSidebarOpen}
                setRightSidebarOpen={setRightSidebarOpen}
              />
            </ProtectedRoute>
          } />
          <Route path="/etudiants" element={
            <ProtectedRoute>
              <DashboardLayout 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                rightSidebarOpen={rightSidebarOpen}
                setRightSidebarOpen={setRightSidebarOpen}
              />
            </ProtectedRoute>
          } />
          <Route path="/etudiants/nouveau" element={
            <ProtectedRoute>
              <DashboardLayout 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                rightSidebarOpen={rightSidebarOpen}
                setRightSidebarOpen={setRightSidebarOpen}
              />
            </ProtectedRoute>
          } />
          <Route path="/reservations/calendar" element={
            <ProtectedRoute>
              <DashboardLayout 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                rightSidebarOpen={rightSidebarOpen}
                setRightSidebarOpen={setRightSidebarOpen}
              />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <DashboardLayout 
                sidebarOpen={sidebarOpen} 
                setSidebarOpen={setSidebarOpen}
                rightSidebarOpen={rightSidebarOpen}
                setRightSidebarOpen={setRightSidebarOpen}
              />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Dashboard Layout Component
const DashboardLayout = ({ 
  sidebarOpen, 
  setSidebarOpen, 
  rightSidebarOpen, 
  setRightSidebarOpen 
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  rightSidebarOpen: boolean;
  setRightSidebarOpen: (open: boolean) => void;
}) => {
  return (
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
              <DashboardContent />
            </div>
          </main>
        </div>
      </div>

      <AssistantTasks isOpen={rightSidebarOpen} onClose={() => setRightSidebarOpen(false)} />
      <Toaster />
    </div>
  );
};

// Dashboard Content Component
const DashboardContent = () => {
  const location = useLocation();
  
  switch (location.pathname) {
    case '/':
    case '/dashboard':
      return <Dashboard />;
    case '/formation':
      return <Formation />;
    case '/formation/groupes':
      return <GroupesPage />;
    case '/formation/salles':
      return <SallesPage />;
    case '/formation/professeurs':
      return <ProfesseursPage />;
    case '/exams':
      return <ExamsPage />;
    case '/results':
      return <ResultsPage />;
    case '/assignments':
      return <AssignmentsPage />;
    case '/announcements':
      return <AnnouncementsPage />;
    case '/etudiants':
      return <StudentsList />;
    case '/etudiants/nouveau':
      return <AddStudentForm />;
    case '/reservations/calendar':
      return <CalendarPage />;
    case '/settings':
      return <SettingsPage />;
    case '/operations':
      return <OperationsSallePage />;
    case '/paiement':
      return <PaiementPage />;
    default:
      return <Dashboard />;
  }
};

export default App;
