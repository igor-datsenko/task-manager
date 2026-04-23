import { createContext, useContext, useState } from 'react';

const DEFAULT_DIALOG_STATE = {
  isOpen: false,
  defaultStatus: 'todo',
  task: null,
};

export const TaskDialogContext = createContext(null);

export function TaskDialogProvider({ children }) {
  const [dialog, setDialog] = useState(DEFAULT_DIALOG_STATE);

  function openTaskDialog(task, isEditing = false) {
    setDialog({
      isOpen: true,
      isEditing,
      task,
    });
  }

  function closeTaskDialog() {
    setDialog((prev) => ({
      ...prev,
      isOpen: false,
      isEditing: false,
      task: null,
    }));
  }

  return (
    <TaskDialogContext.Provider
      value={{
        isTaskDialogOpen: dialog.isOpen,
        task: dialog.task,
        isEditing: dialog.isEditing,
        openTaskDialog,
        closeTaskDialog,
      }}
    >
      {children}
    </TaskDialogContext.Provider>
  );
}

export function useTaskDialog() {
  return useContext(TaskDialogContext);
}
