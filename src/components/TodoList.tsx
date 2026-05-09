import { useTodos } from "../hooks/useTodos";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

function TodoList() {
  const {
    todos,
    addTodo,
    deleteTodo,
    completeTodo,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
  } = useTodos();

  if (isLoading) {
    return <p>Loading tasks...</p>;
  }

  function categoryGroup(category: string) {
    const filtered = todos.filter((todo) => todo.category === category);

    if (filtered.length === 0) {
      return null;
    }

    return (
      <div>
        <h2 className="category-group-label">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h2>
        <ul>
          {filtered.map((todo) => (
            <li key={todo.id}>
              <Todo
                task={todo}
                onComplete={completeTodo}
                onDelete={deleteTodo}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function renderCategoryGroups() {
    const categories = Array.from(new Set(todos.map((todo) => todo.category)));

    return categories.map((category) => (
      <div key={category}>{categoryGroup(category)}</div>
    ));
  }

  return (
    <section className="todo-list">
      <NewTodoForm onAddTodo={addTodo} />

      <div className="filter-group">
        <label className="filter-label" htmlFor="category-filter">
          Category:
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(event) =>
            // When user selects a new category, update the selectedCategory state
            setSelectedCategory(event.target.value as typeof selectedCategory)
          }
        >
          <option value="all">All</option>
          <option value="bills">Bills</option>
          <option value="groceries">Groceries</option>
          <option value="house">House</option>
          <option value="personal">Personal</option>
          <option value="shopping">Shopping</option>
          <option value="study">Study</option>
          <option value="work">Work</option>
          <option value="other">Other</option>
        </select>

        <label className="filter-label" htmlFor="status-filter">
          Status:
        </label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(event) =>
            // When user selects a new status, update the selectedStatus state
            setSelectedStatus(event.target.value as typeof selectedStatus)
          }
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {todos.length === 0 ? (
        <p>No tasks found. Add a new task to get started!</p>
      ) : (
        renderCategoryGroups()
      )}
    </section>
  );
}

export default TodoList;
