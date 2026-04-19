import { useState } from 'react';
import { useKanban } from '../../context/KanbanContext';
import TaskCard from '../TaskCard/TaskCard';
import './KanbanColumn.css';

function KanbanColumn({ columnId, title, tasks, accentColor, count, onAddTask }) {
  const { moveTask, removeColumn } = useKanban();
  const [isDragOver, setIsDragOver] = useState(false);

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e) {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = Number(e.dataTransfer.getData('taskId'));
    if (taskId) moveTask(taskId, columnId);
  }

  return (
    <div className="kanban-column">
      <div className="kanban-column-header">
        <div className="kanban-column-title-row">
          <span className="kanban-column-dot" style={{ backgroundColor: accentColor }} />
          <h3 className="kanban-column-title">{title}</h3>
          <span className="kanban-column-count">{count}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {count === 0 && (
              <button className="kanban-add-btn" title="Remove column" onClick={() => removeColumn(columnId)}>-</button>
          )}
          <button className="kanban-add-btn" title="Add task" onClick={onAddTask}>+</button>
        </div>
      </div>
      <div
        className={`kanban-column-body${isDragOver ? ' kanban-column-body--drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {tasks.length === 0 ? (
          <div className="kanban-column-empty">Drop tasks here</div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} {...task} />
          ))
        )}
      </div>
    </div>
  );
}

export default KanbanColumn;
