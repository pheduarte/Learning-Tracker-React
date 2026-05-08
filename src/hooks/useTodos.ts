import type { NewTodoData, TodoData } from "../types/Todo";
import { useEffect, useState } from "react";
import { subscribeToTodos, createTodo, removeTodo, completeTodo as completeTodoService } from "../services/todosService";


export function useTodos() {
    const [isLoading, setIsLoading] = useState(true);
    const [todos, setTodos] = useState<TodoData[]>([]);

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

    return {
        todos,
        addTodo,
        deleteTodo,
        completeTodo,
        isLoading,
    };
}
