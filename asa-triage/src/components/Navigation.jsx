export default function Navigation({ userRole, onRoleSwitch, activeView, onNavigate, patientCount }) {
  return (
    <header className="nav-header">
      <div className="nav-brand">
        <div className="nav-logo">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div>
          <div className="nav-title">ASA Triage System</div>
          <div className="nav-subtitle">Merrimack Hospital — Anesthesiology</div>
        </div>
      </div>

      <nav className="nav-links">
        {userRole === 'nurse' && (
          <>
            <button
              className={`nav-btn ${activeView === 'nurse-dashboard' ? 'active' : ''}`}
              onClick={() => onNavigate('nurse-dashboard')}
            >
              Patient List
            </button>
            <button
              className={`nav-btn ${activeView === 'intake' ? 'active' : ''}`}
              onClick={() => onNavigate('intake')}
            >
              + New Patient
            </button>
          </>
        )}
        {userRole === 'anesthesiologist' && (
          <button
            className={`nav-btn ${activeView === 'anesthesiologist' ? 'active' : ''}`}
            onClick={() => onNavigate('anesthesiologist')}
          >
            Evaluation Queue
            {patientCount > 0 && <span className="badge">{patientCount}</span>}
          </button>
        )}
      </nav>

      <div className="nav-role">
        <span className="role-label">View as:</span>
        <div className="role-toggle">
          <button
            className={`role-btn ${userRole === 'nurse' ? 'active' : ''}`}
            onClick={() => onRoleSwitch('nurse')}
          >
            Nurse
          </button>
          <button
            className={`role-btn ${userRole === 'anesthesiologist' ? 'active' : ''}`}
            onClick={() => onRoleSwitch('anesthesiologist')}
          >
            Anesthesiologist
          </button>
        </div>
      </div>
    </header>
  );
}
