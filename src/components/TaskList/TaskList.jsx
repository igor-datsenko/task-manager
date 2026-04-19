import './TaskList.css';

const STATUS_LABELS = {
  'todo': 'To Do',
  'in-progress': 'In Progress',
  'completed': 'Completed',
};

const PRIORITY_COLORS = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#10b981',
};

function TaskList({ tasks }) {
  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Recent Tasks</h2>
      <table className="task-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="task-row">
              <td className="task-title">{task.title}</td>
              <td>
                <span className={`task-status task-status--${task.status}`}>
                  {STATUS_LABELS[task.status]}
                </span>
              </td>
              <td>
                <span
                  className="task-priority"
                  style={{ color: PRIORITY_COLORS[task.priority] }}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </td>
              <td className="task-due">{task.due}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;
