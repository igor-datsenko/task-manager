import { useEffect, useState } from 'react';
import './TaskModal.css';

const EMPTY_FORM = {
  title: '',
  status: 'todo',
  priority: 'medium',
  due: '',
  tags: '',
};

function TaskModal({ isOpen, defaultStatus = 'todo', onClose, onSubmit }) {
  const [form, setForm] = useState({ ...EMPTY_FORM, status: defaultStatus });

  useEffect(() => {
    if (isOpen) setForm({ ...EMPTY_FORM, status: defaultStatus });
  }, [isOpen, defaultStatus]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSubmit({
      ...form,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
    });
    onClose();
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Add Task</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">&times;</button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Task title *</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="What needs to be done?"
              value={form.title}
              onChange={handleChange}
              autoFocus
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Column</label>
              <select id="status" name="status" value={form.status} onChange={handleChange}>
                <option value="todo">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="review">In Review</option>
                <option value="completed">Done</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select id="priority" name="priority" value={form.priority} onChange={handleChange}>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="due">Due date</label>
            <input
              id="due"
              name="due"
              type="date"
              value={form.due}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags <span className="label-hint">(comma-separated)</span></label>
            <input
              id="tags"
              name="tags"
              type="text"
              placeholder="e.g. Design, Bug, Frontend"
              value={form.tags}
              onChange={handleChange}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-submit">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
