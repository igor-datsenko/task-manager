import { useTaskDialog } from '../../context/TaskDialogContext';
import './Header.css';

function Header({ title }) {
  const { openTaskDialog } = useTaskDialog();

  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <div className="header-actions">
        <button className="btn-add-task" onClick={() => openTaskDialog({status :'todo'})}>+ New Task</button>
        <div className="header-avatar">JD</div>
      </div>
    </header>
  );
}

export default Header;
