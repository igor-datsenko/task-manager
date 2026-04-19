import { useState } from 'react';
import { useKanban } from '../context/KanbanContext';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import KanbanBoard from '../components/KanbanBoard/KanbanBoard';
import TaskModal from '../components/TaskModal/TaskModal';
import './Dashboard.css';

function Dashboard() {
  const { addTask } = useKanban();
  const [modal, setModal] = useState({ open: false, defaultStatus: 'todo' });

  function openModal(defaultStatus = 'todo') {
    setModal({ open: true, defaultStatus });
  }

  function closeModal() {
    setModal((prev) => ({ ...prev, open: false }));
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-main">
        <Header title="Board" onAddTask={() => openModal('todo')} />
        <div className="dashboard-content">
          <KanbanBoard onAddTask={openModal} />
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
