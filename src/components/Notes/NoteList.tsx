import { useNotes } from "../../hooks/useNotes";
import Notes from "./Notes";
import NewNoteForm from "./NewNoteForm";

function NoteList() {
  const {
    notes,
    addNote,
    deleteNote,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
  } = useNotes();

  if (isLoading) {
    return <p>Loading notes...</p>;
  }

  function categoryGroup(tag: string) {
    const filtered = notes.filter((note) => note.tag === tag);

    if (filtered.length === 0) {
      return null;
    }

    return (
      <div>
        <h2 className="category-group-label">
          {tag.charAt(0).toUpperCase() + tag.slice(1)}
        </h2>
        <ul>
          {filtered.map((note) => (
            <li key={note.id}>
              <Notes note={note} onDelete={deleteNote} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function renderCategoryGroups() {
    const categories = Array.from(new Set(notes.map((note) => note.tag)));

    return categories.map((category) => (
      <div key={category}>{categoryGroup(category)}</div>
    ));
  }

  return (
    <section className="todo-list">
      <NewNoteForm onAddNote={addNote} />

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

      {notes.length === 0 ? (
        <p>No notes found. Add a new note to get started!</p>
      ) : (
        renderCategoryGroups()
      )}
    </section>
  );
}

export default NoteList;
