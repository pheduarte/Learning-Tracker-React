import { useState } from "react";
import type { NewTodoData } from "../types/Todo";
import { TestFormDialog } from "./TestFormDialog";

type NewTodoFormProps = {
  onAddTodo: (todoData: NewTodoData) => void;
};

function NewTodoForm({ onAddTodo }: NewTodoFormProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg font-bold">Hello! 👋</p>
        <button
          className="btn-add-task"
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          {isCollapsed ? "+ New Task" : "X"}
        </button>
      </div>

      {!isCollapsed && (
        <TestFormDialog
          open={true}
          onOpenChange={() => setIsCollapsed(true)}
          onAdd={onAddTodo}
        />
      )}
    </div>
  );
}

export default NewTodoForm;
