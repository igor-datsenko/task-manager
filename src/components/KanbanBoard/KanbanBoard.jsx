import { useState, useRef, useEffect } from 'react';
import { useKanban } from '../../context/KanbanContext';
import { useTaskDialog } from '../../context/TaskDialogContext';
import KanbanColumn from '../KanbanColumn/KanbanColumn';
import './KanbanBoard.css';

function KanbanBoard() {
  const { tasks, columns, addColumn } = useKanban();
  const { openTaskDialog } = useTaskDialog();
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isAdding) inputRef.current?.focus();
  }, [isAdding]);

  function handleAddColumn() {
    const title = newTitle.trim();
    if (!title) { setIsAdding(false); return; }
    addColumn(title);
    setNewTitle('');
    setIsAdding(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') handleAddColumn();
    if (e.key === 'Escape') { setIsAdding(false); setNewTitle(''); }
  }

  const tasksByStatus = columns.reduce((acc, col) => {
    acc[col.id] = tasks.filter((t) => t.status === col.id);
    return acc;
  }, {});

  return (
    <div className="kanban-board">
      {columns.map((col) => (
        <KanbanColumn
          key={col.id}
          columnId={col.id}
          title={col.title}
          accentColor={col.accentColor}
          tasks={tasksByStatus[col.id]}
          count={tasksByStatus[col.id].length}
          onAddTask={() => openTaskDialog({status: col.id})}
        />
      ))}

      {isAdding ? (
        <div className="kanban-add-column-form">
          <input
            ref={inputRef}
            className="kanban-add-column-input"
            placeholder="Column name"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="kanban-add-column-actions">
            <button className="kanban-add-column-confirm" onClick={handleAddColumn}>Add</button>
            <button className="kanban-add-column-cancel" onClick={() => { setIsAdding(false); setNewTitle(''); }}>✕</button>
          </div>
        </div>
      ) : (
        <button className="kanban-add-column-btn" onClick={() => setIsAdding(true)}>
          + Add column
        </button>
      )}
    </div>
  );
}

export default KanbanBoard;
