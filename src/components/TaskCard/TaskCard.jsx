import './TaskCard.css';
import {useTaskDialog} from "../../context/TaskDialogContext";

const PRIORITY_CONFIG = {
  high:   { label: 'High',   className: 'priority--high' },
  medium: { label: 'Medium', className: 'priority--medium' },
  low:    { label: 'Low',    className: 'priority--low' },
};

function TaskCard({ id, title, details, priority, due, tags = [] }) {
  const p = PRIORITY_CONFIG[priority];

  const { openTaskDialog } = useTaskDialog();

  function handleDragStart(e) {
    e.dataTransfer.setData('taskId', id);
    e.dataTransfer.effectAllowed = 'move';
  }

  return (
    <div
      className="task-card"
      draggable
      onDragStart={handleDragStart}
      onClick={() => openTaskDialog({id, title, details, priority, due, tags}, true)}
      style={{
        backgroundColor: p.className === 'priority--high' ? '#fef2f2' : p.className === 'priority--medium' ? '#fffbeb' : '#f3f9ff',
      }}
      title={details ? `${title}\n${details}` : title}
      onDoubleClick={() => openTaskDialog({id, title, details, priority, due, tags}, true)}
    >
      {tags.length > 0 && (
        <div className="task-card-tags">
          {tags.map((tag) => (
            <span key={tag} className="task-tag">{tag}</span>
          ))}
        </div>
      )}
      <p className="task-card-title">{title}</p>
      {details ? <p className="task-card-details">{details}</p> : null}
      <div className="task-card-footer">
        <span className={`task-card-priority ${p.className}`}>{p.label}</span>
        <span className="task-card-due">{due}</span>
      </div>
    </div>
  );
}

export default TaskCard;
