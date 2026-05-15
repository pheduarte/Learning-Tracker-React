import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import type { NewTodoData, TodoData } from "../types/Todo";

const todosCollection = collection(db, "todos");

export async function createTodo(todoData: NewTodoData) {
  console.log("Creating todo:", todoData);

  const docRef = await addDoc(todosCollection, {
    title: todoData.title,
    description: todoData.description,
    category: todoData.category,
    status: "pending",
  });

  console.log("Todo created with ID:", docRef.id);
}

export async function removeTodo(id: string) {
  await deleteDoc(doc(db, "todos", String(id)));
}

export async function completeTodo(id: string) {
  const todoRef = doc(db, "todos", String(id));

  await updateDoc(todoRef, {
    status: "completed",
  });
}

export function subscribeToTodos(onUpdate: (todos: TodoData[]) => void) {
  return onSnapshot(todosCollection, (snapshot) => {
    const todos = snapshot.docs.map((document) => {
      const data = document.data();

      return {
        id: document.id,
        title: data.title,
        description: data.description,
        category: data.category,
        status: data.status,
      } as TodoData;
    });

    onUpdate(todos);
  });
}
