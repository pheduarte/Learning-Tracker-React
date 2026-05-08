type Props = {
  type: "tracker" | "todo" | "settings";
};

function Header({ type }: Props) {

  return (
    type === "tracker" ? 
      <header>
        <h1>Learning Tracker</h1>
        <p>This app will help you track your learning progress.</p>
      </header>
      : type === "todo" ?
      <header>
        <h1>Todo List</h1>
        <p>Keep track of your tasks and stay organized.</p>
      </header>
      :
      <header>
        <h1>Settings</h1>
        <p>Customize your app experience.</p>
      </header>
  );
}

export default Header;