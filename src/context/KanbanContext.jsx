import {createContext, useContext, useEffect, useState} from 'react';

const INITIAL_TASKS = [
//   { id: 1,  title: 'Design new landing page',        status: 'in-progress', priority: 'high',   due: 'Apr 20', tags: ['Design'] },
//   { id: 2,  title: 'Fix authentication bug',          status: 'in-progress', priority: 'high',   due: 'Apr 19', tags: ['Bug'] },
//   { id: 3,  title: 'Implement dark mode toggle',      status: 'in-progress', priority: 'medium', due: 'Apr 22', tags: ['Frontend'] },
//   { id: 4,  title: 'Write unit tests for API',        status: 'todo',        priority: 'medium', due: 'Apr 25', tags: ['Testing'] },
//   { id: 5,  title: 'Update documentation',            status: 'todo',        priority: 'low',    due: 'Apr 30', tags: ['Docs'] },
//   { id: 6,  title: 'Set up CI/CD pipeline',           status: 'todo',        priority: 'medium', due: 'May 2',  tags: ['DevOps'] },
//   { id: 7,  title: 'Refactor database models',        status: 'todo',        priority: 'low',    due: 'May 5',  tags: ['Backend'] },
//   { id: 8,  title: 'Code review for PR #42',          status: 'review',      priority: 'medium', due: 'Apr 18', tags: ['Review'] },
//   { id: 9,  title: 'Security audit — user endpoints', status: 'review',      priority: 'high',   due: 'Apr 21', tags: ['Security'] },
//   { id: 10, title: 'Migrate to TypeScript',           status: 'completed',   priority: 'medium', due: 'Apr 15', tags: ['Refactor'] },
//   { id: 11, title: 'Deploy staging environment',      status: 'completed',   priority: 'high',   due: 'Apr 14', tags: ['DevOps'] },
//   { id: 12, title: 'User research interviews',        status: 'completed',   priority: 'low',    due: 'Apr 10', tags: ['Research'] },
];

const INITIAL_COLUMNS = [
  { id: 'todo',        title: 'To Do',      accentColor: '#6b7280' },
  { id: 'in-progress', title: 'In Progress', accentColor: '#f59e0b' },
  { id: 'review',      title: 'In Review',   accentColor: '#6366f1' },
  { id: 'completed',   title: 'Done',        accentColor: '#10b981' },
];

const ACCENT_COLORS = ['#ec4899', '#14b8a6', '#f97316', '#8b5cf6', '#06b6d4', '#84cc16'];

export const KanbanContext = createContext(null);

export function KanbanProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('kanban-tasks');
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [columns, setColumns] = useState(() => {
    try {
      const saved = localStorage.getItem('kanban-columns');
      return saved ? JSON.parse(saved) : INITIAL_COLUMNS;
    } catch {
      return INITIAL_COLUMNS;
    }
  });

  function addTask(taskData) {
    setTasks((prev) => [...prev, { ...taskData, id: Date.now() }]);
  }

  function updateTask(taskId, updates) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, ...updates } : t))
    );
  }

  function removeTask(taskId) {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  }

  function moveTask(taskId, newStatus) {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  }

  function addColumn(title) {
    const id =
      title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') +
      '-' +
      Date.now();
    const accentColor = ACCENT_COLORS[columns.length % ACCENT_COLORS.length];
    setColumns((prev) => [...prev, { id, title, accentColor }]);
  }

  function removeColumn(columnId) {
    setColumns((prev) => prev.filter((col) => col.id !== columnId));
  }

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
    localStorage.setItem('kanban-columns', JSON.stringify(columns));
  }, [tasks, columns]);

  return (
    <KanbanContext.Provider value={{ tasks, columns, addTask, moveTask, addColumn, removeColumn, updateTask, removeTask }}>
      {children}
    </KanbanContext.Provider>
  );
}

export function useKanban() {
  return useContext(KanbanContext);
}
