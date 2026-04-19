import KanbanColumn from '../KanbanColumn/KanbanColumn';
import './KanbanBoard.css';

const COLUMNS = [
  { id: 'todo',        title: 'To Do',       accentColor: '#6b7280' },
  { id: 'in-progress', title: 'In Progress',  accentColor: '#f59e0b' },
  { id: 'review',      title: 'In Review',    accentColor: '#6366f1' },
  { id: 'completed',   title: 'Done',         accentColor: '#10b981' },
];

function KanbanBoard({ tasks, onAddTask }) {
  const tasksByStatus = COLUMNS.reduce((acc, col) => {
    acc[col.id] = tasks.filter((t) => t.status === col.id);
    return acc;
  }, {});

  return (
    <div className="kanban-board">
      {COLUMNS.map((col) => (
        <KanbanColumn
          key={col.id}
          title={col.title}
          accentColor={col.accentColor}
          tasks={tasksByStatus[col.id]}
          count={tasksByStatus[col.id].length}
          onAddTask={() => onAddTask(col.id)}
        />
      ))}
    </div>
  );
}

export default KanbanBoard;
