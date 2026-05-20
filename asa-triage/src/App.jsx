import { useState, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage.js';
import { getPreopRequirements, isReadyForEvaluation } from './utils/preopRequirements.js';
import Navigation from './components/Navigation.jsx';
import NurseDashboard from './components/NurseDashboard.jsx';
import NurseIntake from './components/NurseIntake.jsx';
import TriageResult from './components/TriageResult.jsx';
import AnesthesiologistDashboard from './components/AnesthesiologistDashboard.jsx';

export default function App() {
  const [patients, setPatients] = useLocalStorage('asa-triage-patients', []);
  const [view, setView] = useState('nurse-dashboard');
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [userRole, setUserRole] = useState('nurse');

  const handleAddPatient = useCallback((patientData) => {
    const id = `pt-${Date.now()}`;
    const newPatient = { ...patientData, id, createdAt: new Date().toISOString(), evaluationComplete: false };
    setPatients(prev => [newPatient, ...prev]);
    setSelectedPatientId(id);
    setView('result');
  }, [setPatients]);

  const handleUpdateAvailable = useCallback((patientId, availableItems) => {
    setPatients(prev => prev.map(p => {
      if (p.id !== patientId) return p;
      const preopReqs = getPreopRequirements(
        p.conditions || [], p.surgeryRisk, p.asaLevel, p.functionalStatus
      );
      const ready = p.needsEvaluation ? isReadyForEvaluation(preopReqs, availableItems) : false;
      return { ...p, availableItems, isReadyForEval: ready };
    }));
  }, [setPatients]);

  const handleMarkEvaluated = useCallback((patientId) => {
    setPatients(prev => prev.map(p =>
      p.id === patientId
        ? { ...p, evaluationComplete: true, evaluatedAt: new Date().toISOString() }
        : p
    ));
  }, [setPatients]);

  const handleUpdateAnesNotes = useCallback((patientId, anesNotes) => {
    setPatients(prev => prev.map(p =>
      p.id === patientId ? { ...p, anesNotes } : p
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

  const pendingCount = patients.filter(p => p.needsEvaluation && !p.evaluationComplete).length;

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
            onUpdateAnesNotes={handleUpdateAnesNotes}
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
        patientCount={pendingCount}
      />
      <main className="main-content">
        {renderView()}
      </main>
    </div>
  );
}
