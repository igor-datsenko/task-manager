import './TaskCard.css';

const PRIORITY_CONFIG = {
  high:   { label: 'High',   className: 'priority--high' },
  medium: { label: 'Medium', className: 'priority--medium' },
  low:    { label: 'Low',    className: 'priority--low' },
};

function TaskCard({ title, priority, due, tags = [] }) {
  const p = PRIORITY_CONFIG[priority];
  return (
    <div className="task-card">
      {tags.length > 0 && (
        <div className="task-card-tags">
          {tags.map((tag) => (
            <span key={tag} className="task-tag">{tag}</span>
          ))}
        </div>
      )}
      <p className="task-card-title">{title}</p>
      <div className="task-card-footer">
        <span className={`task-card-priority ${p.className}`}>{p.label}</span>
        <span className="task-card-due">{due}</span>
      </div>
    </div>
  );
}

export default TaskCard;
