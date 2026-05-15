import { useEffect, useMemo, useState } from "react";
import type {
  NewTodoData,
  TodoCategory,
  TodoData,
  TodoStatus,
} from "../types/Todo";
import {
  subscribeToTodos,
  createTodo,
  removeTodo,
  completeTodo as completeTodoService,
} from "../services/todosService";

export function useTodos() {
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<TodoData[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState<TodoCategory | "all">("all");
  const [selectedStatus, setSelectedStatus] =
    useState<TodoStatus | "all">("all");

  async function addTodo(todoData: NewTodoData) {
    try {
      await createTodo(todoData);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  }

  async function deleteTodo(id: string) {
    try {
      await removeTodo(id);
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }

  async function completeTodo(id: string) {
    try {
      await completeTodoService(id);
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  }

  useEffect(() => {
    const unsubscribe = subscribeToTodos((updatedTodos) => {
      setTodos(updatedTodos);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const visibleTodos = useMemo(() => {
    const categoryFiltered =
      selectedCategory === "all"
        ? todos
        : todos.filter((todo) => todo.category === selectedCategory);

    const statusFiltered =
      selectedStatus === "all"
        ? categoryFiltered
        : categoryFiltered.filter((todo) => todo.status === selectedStatus);

    return statusFiltered;
  }, [todos, selectedCategory, selectedStatus]);

  const completedTasks = (status: TodoStatus) => {
    return todos.filter((todo) => todo.status === status);
  };

  const totalTasks = todos.length;

  return {
    todos: visibleTodos,
    addTodo,
    deleteTodo,
    completeTodo,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    completedTasks,
    totalTasks,
  };
}
