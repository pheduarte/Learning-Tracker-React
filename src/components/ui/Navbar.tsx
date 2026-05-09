import { useState } from "react";
import TodoList from "../TodoList";
import CourseGoalList from "../CourseGoalList";
import Settings from "../Settings";
import { IconListDetails, IconSchool, IconSettings } from "@tabler/icons-react";

export function Navbar() {
  const [activeTab, setActiveTab] = useState<"tracker" | "todo" | "settings">(
    "todo",
  );

  return (
    <main>
      {activeTab === "todo" && <TodoList />}
      {activeTab === "tracker" && <CourseGoalList />}
      {activeTab === "settings" && <Settings />}

      <nav className="bottom-nav" aria-label="Main navigation">
        <button
          type="button"
          className={activeTab === "todo" ? "active" : ""}
          onClick={() => setActiveTab("todo")}
        >
          <IconListDetails stroke={2} />
        </button>
        <button
          type="button"
          className={activeTab === "tracker" ? "active" : ""}
          onClick={() => setActiveTab("tracker")}
        >
          <IconSchool stroke={2} />
        </button>
        <button
          type="button"
          className={activeTab === "settings" ? "active" : ""}
          onClick={() => setActiveTab("settings")}
        >
          <IconSettings stroke={2} />
        </button>
      </nav>
    </main>
  );
}

export default Navbar;
