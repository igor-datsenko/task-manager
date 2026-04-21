import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import KanbanBoard from '../../components/KanbanBoard/KanbanBoard';
import TaskModal from '../../components/TaskModal/TaskModal';
import './Dashboard.css';
import {KanbanWrapper} from "../../components/KanbanWrapper/KanbanWrapper";

function Dashboard() {

  return (
      <KanbanWrapper>
          <div className="dashboard-layout">
              <Sidebar />
              <div className="dashboard-main">
                  <Header title="Board" />
                  <div className="dashboard-content">
                      <KanbanBoard />
                  </div>
              </div>
              <TaskModal />
          </div>
      </KanbanWrapper>
  );
}

export default Dashboard;
