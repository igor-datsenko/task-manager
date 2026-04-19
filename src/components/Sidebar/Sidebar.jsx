import './Sidebar.css';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: '⊞', active: true },
  { label: 'My Tasks', icon: '✓', active: false },
  { label: 'Projects', icon: '◫', active: false },
  { label: 'Calendar', icon: '⊟', active: false },
  { label: 'Settings', icon: '⚙', active: false },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="sidebar-logo-icon">T</span>
        <span className="sidebar-logo-text">TaskFlow</span>
      </div>
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.label}
            className={`sidebar-nav-item${item.active ? ' active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
