import { useState, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import Navigation from './components/Navigation.jsx';
import NurseDashboard from './components/NurseDashboard.jsx';
import NurseIntake from './components/NurseIntake.jsx';
import TriageResult from './components/TriageResult.jsx';
import AnesthesiologistDashboard from './components/AnesthesiologistDashboard.jsx';

export default function App() {
  const [patients, setPatients] = useLocalStorage('asa-triage-patients', []);
  const [view, setView] = useState('nurse-dashboard'); // nurse-dashboard | intake | result | anesthesiologist
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [userRole, setUserRole] = useState('nurse'); // nurse | anesthesiologist

  const handleAddPatient = useCallback((patientData) => {
    const id = `pt-${Date.now()}`;
    const newPatient = { ...patientData, id, createdAt: new Date().toISOString(), evaluationComplete: false };
    setPatients(prev => [newPatient, ...prev]);
    setSelectedPatientId(id);
    setView('result');
  }, [setPatients]);

  const handleUpdateAvailable = useCallback((patientId, availableItems) => {
    setPatients(prev => prev.map(p =>
      p.id === patientId ? { ...p, availableItems } : p
    ));
  }, [setPatients]);

  const handleMarkEvaluated = useCallback((patientId) => {
    setPatients(prev => prev.map(p =>
      p.id === patientId ? { ...p, evaluationComplete: true, evaluatedAt: new Date().toISOString() } : p
    ));
  }, [setPatients]);

  const handleDeletePatient = useCallback((patientId) => {
    setPatients(prev => prev.filter(p => p.id !== patientId));
    if (selectedPatientId === patientId) {
      setView(userRole === 'nurse' ? 'nurse-dashboard' : 'anesthesiologist');
    }
  }, [setPatients, selectedPatientId, userRole]);

  const selectedPatient = patients.find(p => p.id === selectedPatientId) || null;

  const handleRoleSwitch = (role) => {
    setUserRole(role);
    setView(role === 'nurse' ? 'nurse-dashboard' : 'anesthesiologist');
  };

  const renderView = () => {
    switch (view) {
      case 'nurse-dashboard':
        return (
          <NurseDashboard
            patients={patients}
            onNewPatient={() => setView('intake')}
            onSelectPatient={(id) => { setSelectedPatientId(id); setView('result'); }}
            onDeletePatient={handleDeletePatient}
          />
        );
      case 'intake':
        return (
          <NurseIntake
            onSubmit={handleAddPatient}
            onCancel={() => setView('nurse-dashboard')}
          />
        );
      case 'result':
        return selectedPatient ? (
          <TriageResult
            patient={selectedPatient}
            onBack={() => setView(userRole === 'nurse' ? 'nurse-dashboard' : 'anesthesiologist')}
            onUpdateAvailable={handleUpdateAvailable}
            onMarkEvaluated={handleMarkEvaluated}
            userRole={userRole}
          />
        ) : null;
      case 'anesthesiologist':
        return (
          <AnesthesiologistDashboard
            patients={patients}
            onSelectPatient={(id) => { setSelectedPatientId(id); setView('result'); }}
            onMarkEvaluated={handleMarkEvaluated}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <Navigation
        userRole={userRole}
        onRoleSwitch={handleRoleSwitch}
        activeView={view}
        onNavigate={setView}
        patientCount={patients.filter(p => !p.evaluationComplete && p.needsEvaluation).length}
      />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}
