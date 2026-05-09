
export type TodoCategory =
  | "house"
  | "study"
  | "Groceries"
  | "bills"
  | "personal"
  | "shopping"
  | "work"
  | "other";

export type TodoStatus = "pending" | "completed";

export type TodoData = {
  id: string; // Unique identifier for the todo (used as a key in lists)
  title: string; // Short name/title of the todo
  description?: string; // Longer explanation of what the todo is about
  category: TodoCategory; // Which topic/technology this todo is related to
  status: TodoStatus; // Whether the todo is pending or completed
};

export type NewTodoData = Omit<TodoData, "id" | "status">;
