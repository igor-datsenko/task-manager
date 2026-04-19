import { useState } from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import KanbanBoard from '../components/KanbanBoard/KanbanBoard';
import TaskModal from '../components/TaskModal/TaskModal';
import './Dashboard.css';

const INITIAL_TASKS = [
  { id: 1,  title: 'Design new landing page',        status: 'in-progress', priority: 'high',   due: 'Apr 20', tags: ['Design'] },
  { id: 2,  title: 'Fix authentication bug',          status: 'in-progress', priority: 'high',   due: 'Apr 19', tags: ['Bug'] },
  { id: 3,  title: 'Implement dark mode toggle',      status: 'in-progress', priority: 'medium', due: 'Apr 22', tags: ['Frontend'] },
  { id: 4,  title: 'Write unit tests for API',        status: 'todo',        priority: 'medium', due: 'Apr 25', tags: ['Testing'] },
  { id: 5,  title: 'Update documentation',            status: 'todo',        priority: 'low',    due: 'Apr 30', tags: ['Docs'] },
  { id: 6,  title: 'Set up CI/CD pipeline',           status: 'todo',        priority: 'medium', due: 'May 2',  tags: ['DevOps'] },
  { id: 7,  title: 'Refactor database models',        status: 'todo',        priority: 'low',    due: 'May 5',  tags: ['Backend'] },
  { id: 8,  title: 'Code review for PR #42',          status: 'review',      priority: 'medium', due: 'Apr 18', tags: ['Review'] },
  { id: 9,  title: 'Security audit — user endpoints', status: 'review',      priority: 'high',   due: 'Apr 21', tags: ['Security'] },
  { id: 10, title: 'Migrate to TypeScript',           status: 'completed',   priority: 'medium', due: 'Apr 15', tags: ['Refactor'] },
  { id: 11, title: 'Deploy staging environment',      status: 'completed',   priority: 'high',   due: 'Apr 14', tags: ['DevOps'] },
  { id: 12, title: 'User research interviews',        status: 'completed',   priority: 'low',    due: 'Apr 10', tags: ['Research'] },
];

function Dashboard() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [modal, setModal] = useState({ open: false, defaultStatus: 'todo' });

  function openModal(defaultStatus = 'todo') {
    setModal({ open: true, defaultStatus });
  }

  function closeModal() {
    setModal((prev) => ({ ...prev, open: false }));
  }

  function addTask(taskData) {
    setTasks((prev) => [
      ...prev,
      { ...taskData, id: Date.now() },
    ]);
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header title="Board" onAddTask={() => openModal('todo')} />
        <div className="dashboard-content">
          <KanbanBoard tasks={tasks} onAddTask={openModal} />
        </div>
      </div>

      <TaskModal
        isOpen={modal.open}
        defaultStatus={modal.defaultStatus}
        onClose={closeModal}
        onSubmit={addTask}
      />
    </div>
  );
}

export default Dashboard;
