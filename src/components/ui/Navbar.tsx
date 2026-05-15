import { useState } from "react";
import TodoList from "../Todo/TodoList";
import Settings from "../Settings/Settings";
import { IconListDetails, IconNote, IconSettings, IconHome } from "@tabler/icons-react";
import NoteList from "../Notes/NoteList";
import Home from "../Home/Home";
import Header from "../Header";

export type ActiveTab = "home" | "notes" | "todo" | "settings";

export function Navbar() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");

  return (
    <main className="navbar-container">
      <Header tab={activeTab} />
      
      {activeTab === "home" && <Home onNavigate={setActiveTab} />}
      {activeTab === "todo" && <TodoList />}
      {activeTab === "notes" && <NoteList />}
      {activeTab === "settings" && <Settings />}

      <nav className="bottom-nav" aria-label="Main navigation">
        <button
          type="button"
          className={activeTab === "home" ? "active" : ""}
          onClick={() => setActiveTab("home")}
        >
          <IconHome stroke={2} />
          Home
        </button>
        <button
          type="button"
          className={activeTab === "todo" ? "active" : ""}
          onClick={() => setActiveTab("todo")}
        >
          <IconListDetails stroke={2} />
          Tasks
        </button>
        <button
          type="button"
          className={activeTab === "notes" ? "active" : ""}
          onClick={() => setActiveTab("notes")}
        >
          <IconNote stroke={2} />
          Notes
        </button>
        <button
          type="button"
          className={activeTab === "settings" ? "active" : ""}
          onClick={() => setActiveTab("settings")}
        >
          <IconSettings stroke={2} />
          Settings
        </button>
      </nav>
    </main>
  );
}

export default Navbar;
