import { useState } from "react";
import TodoList from "../TodoList";
import CourseGoalList from "../CourseGoalList";
import Settings from "../Settings";
import WaterTracker from "../WaterTracker";
import {
  IconListDetails,
  IconDroplets,
  IconSchool,
  IconSettings,
} from "@tabler/icons-react";

export function Navbar() {
  const [activeTab, setActiveTab] = useState<
    "tracker" | "water" | "todo" | "settings"
  >("todo");

  return (
    <main className="navbar-container">
      {activeTab === "todo" && <TodoList />}
      {activeTab === "water" && <WaterTracker />}
      {/* {activeTab === "tracker" && <CourseGoalList />} */}
      {activeTab === "settings" && <Settings />}

      <nav className="bottom-nav" aria-label="Main navigation">
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
          className={activeTab === "water" ? "active" : ""}
          onClick={() => setActiveTab("water")}
        >
          <IconDroplets stroke={2} />
          Water
        </button>
        {/* <button
          type="button"
          className={activeTab === "tracker" ? "active" : ""}
          onClick={() => setActiveTab("tracker")}
        >
          <IconSchool stroke={2} />
          Tracker
        </button> */}
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
