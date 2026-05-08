import { useState } from "react";
import type { NewTodoData, TodoCategory } from "../types/Todo";
import Button from "./ui/Button";

type NewTodoFormProps = {
  onAddTodo: (todoData: NewTodoData) => void;
};

function NewTodoForm({ onAddTodo }: NewTodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<TodoCategory>("other");

  const isFormInvalid = !title.trim();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isFormInvalid) {
      return;
    }

    onAddTodo({
      title: title.trim(),
      description: description.trim(),
      category,
    });

    // Clear the form after submission
    setTitle("");
    setDescription("");
    setCategory("other");
  }

  return (
    <form className="new-todo-form" onSubmit={handleSubmit}>
      <h2 className="text-3xl font-bold underline">Add New Todo</h2>

      <label htmlFor="todo-title">Title</label>
      <input
        id="todo-title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label htmlFor="todo-description">Description</label>
      <textarea
        id="todo-description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <label htmlFor="todo-category">Category</label>
      <select
        id="todo-category"
        value={category}
        onChange={(event) =>
          setCategory(event.target.value as TodoCategory)
        }
        className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="bills">Bills</option>
        <option value="groceries">Groceries</option>
        <option value="house">House</option>
        <option value="personal">Personal</option>
        <option value="shopping">Shopping</option>
        <option value="study">Study</option>
        <option value="work">Work</option>
        <option value="other">Other</option>
      </select>

      <Button type="submit" disabled={isFormInvalid}>
        Add Todo
      </Button>
    </form>
  );
}

export default NewTodoForm;
