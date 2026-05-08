import type { TodoData } from "../types/Todo";
import { useLocalStorage } from "./useLocalStorage";

const STORAGE_KEY = "todos-v1";

const SAMPLE_TODOS: TodoData[] = [
    {
      id: 1,
      title: "Buy groceries",
      description: "Milk, Bread, Eggs, and Fruits",
      category: "groceries",
      status: "pending",
    },
    {
      id: 2,
      title: "Pay electricity bill",
      category: "bills",
      status: "completed",
    },
    {
      id: 3,
      title: "Study React",
      description: "Complete the React course on Udemy",
      category: "study",
      status: "pending",
    },
  ];

export function useTodos() {
    const [todos, setTodos] = useLocalStorage<TodoData[]>(STORAGE_KEY, SAMPLE_TODOS);

    function addTodo(todoData: Omit<TodoData, "id" | "status">) {
        const newTodo: TodoData = {
            id: Date.now(),
            status: "pending",
            ...todoData,
        };
        setTodos((currentTodos) => [...currentTodos, newTodo]);
    }

    function deleteTodo(id: number) {
        setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
    }

    function completeTodo(id: number) {
        setTodos((currentTodos) =>
            currentTodos.map((todo) =>
                todo.id === id ? { ...todo, status: "completed" } : todo
            )
        );
    }

    return {
        todos,
        addTodo,
        deleteTodo,
        completeTodo,
    };
}