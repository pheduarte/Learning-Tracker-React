type Props = {
  type: "tracker" | "todo" | "settings";
};

function Header({ type }: Props) {

  return (
    type === "tracker" ? 
      <header className="tracker-header">
        <h1>Learning Tracker</h1>
      </header>
      : type === "todo" ?
      <header className="todo-header">
        <h1>Todo List</h1>
      </header>
      :
      <header className="settings-header">
        <h1>Settings</h1>
      </header>
  );
}

export default Header;