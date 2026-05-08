import "./App.css";
import Header from "./components/Header";
import CourseGoalList from "./components/CourseGoalList";
import TodoList from "./components/TodoList";
import Settings from "./components/Settings";
import { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState<"tracker" | "todo" | "settings">(
    "todo",
  );

  return (
    <main>
      <Header type={activeTab} />
      {activeTab === "todo" ? <TodoList /> : <section />}
      {activeTab === "tracker" ? <CourseGoalList /> : <section />}
      {activeTab === "settings" ? <Settings /> : <section />}

      <nav className="bottom-nav" aria-label="Main navigation">
        <button
          type="button"
          className={activeTab === "todo" ? "active" : ""}
          onClick={() => setActiveTab("todo")}
        >
          Todo
        </button>
        <button
          type="button"
          className={activeTab === "tracker" ? "active" : ""}
          onClick={() => setActiveTab("tracker")}
        >
          Learning Tracker
        </button>
        <button
          type="button"
          className={activeTab === "settings" ? "active" : ""}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </button>
      </nav>
    </main>
  );
}

export default App;
