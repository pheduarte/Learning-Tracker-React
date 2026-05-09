import type { TodoData } from "../types/Todo";
import Card from "./ui/Card";
import { memo } from "react";
import { IconCheck, IconTrash } from "@tabler/icons-react";

type TodoProps = {
  task: TodoData;
  onDelete: (id: string) => void;
  onComplete: (id: string) => void;
};

const Todo = memo(function Todo({ task, onDelete, onComplete }: TodoProps) {
  return (
    <Card className="todo">
      <div>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
        <p>Category: {task.category}</p>
        <p>Status: {task.status}</p>
      </div>

      <div className="card_btns">
        {task.status === "pending" && (
          <button
            className="complete-btn"
            onClick={() => onComplete(task.id)}
            aria-label={`Mark ${task.title} as completed`}
          >
            <IconCheck stroke={2} />
          </button>
        )}
        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
          aria-label={`Delete ${task.title}`}
        >
          <IconTrash stroke={2} />
        </button>
      </div>
    </Card>
  );
});

export default memo(Todo);
