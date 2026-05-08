import { useTodos } from "../hooks/useTodos";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

function TodoList() {
  const { todos, addTodo, deleteTodo, completeTodo } = useTodos();

  return (
    <section className="todo-list">
      <NewTodoForm onAddTodo={addTodo} />

      {todos.length === 0 ? (
        <p>No tasks found. Please add some tasks to get started!</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <Todo
                task={todo}
                onComplete={completeTodo}
                onDelete={deleteTodo}
              />
            </li>
          ))}
        </ul>
      )}
      
    </section>
  );
}

export default TodoList;
