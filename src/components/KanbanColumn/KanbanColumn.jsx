import TaskCard from '../TaskCard/TaskCard';
import './KanbanColumn.css';

function KanbanColumn({ title, tasks, accentColor, count, onAddTask }) {
  return (
    <div className="kanban-column">
      <div className="kanban-column-header">
        <div className="kanban-column-title-row">
          <span className="kanban-column-dot" style={{ backgroundColor: accentColor }} />
          <h3 className="kanban-column-title">{title}</h3>
          <span className="kanban-column-count">{count}</span>
        </div>
        <button className="kanban-add-btn" title="Add task" onClick={onAddTask}>+</button>
      </div>
      <div className="kanban-column-body">
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;
