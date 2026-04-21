import {KanbanProvider} from "../../context/KanbanContext";
import {TaskDialogProvider} from "../../context/TaskDialogContext";

export const KanbanWrapper = function ({children}) {
    return (
        <KanbanProvider>
            <TaskDialogProvider>
                {children}
            </TaskDialogProvider>
        </KanbanProvider>
    );
}
