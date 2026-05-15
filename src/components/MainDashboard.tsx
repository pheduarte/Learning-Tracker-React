// Import React and TypeScript type definition for course goal data
import { useMemo } from "react";
import { useTodos } from "../hooks/useTodos";
import { useNotes } from "../hooks/useNotes";
import type { ActiveTab } from "./ui/Navbar";

type DashboardProps = {
  onNavigate: (tab: ActiveTab) => void;
};

function Dashboard({ onNavigate }: DashboardProps) {
  const { completedTasks, totalTasks } = useTodos();
  const { notes } = useNotes();

  const stats = useMemo(() => {
    // Calculate the total number of goals`
    const totalNotes = notes.length;

    const activeNotes = totalNotes;

    const completed = completedTasks("completed").length;
    const activeTasks = totalTasks - completed;
    const completionPercentage =
      totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;

    return {
      totalNotes,
      totalTasks,
      completed,
      activeNotes,
      activeTasks,
      completionPercentage,
    };
  }, [notes, completedTasks, totalTasks]);

  function handleNotesClick() {
    onNavigate("notes");
  }

  function handleTasksClick() {
    onNavigate("todo");
  }

  return (
    <section className="dashboard">
      <button
        onClick={handleNotesClick}
        className="dashboard-btn-box"
        type="button"
      >
        <div className="dashboard-boxes">
          <div className="dashboard-stats-header">
            <h2>Notes</h2>
            <p>{stats.totalNotes}</p>
          </div>
        </div>
      </button>

      <button
        onClick={handleTasksClick}
        className="dashboard-btn-box"
        type="button"
      >
        <div className="dashboard-boxes">
          <div className="dashboard-stats-header">
            <h2>Tasks</h2>
            <p>{stats.totalTasks}</p>
          </div>

          <div className="dashboard-stats-body">
            <p>Completed: {stats.completed}</p>
            <p>Pending: {stats.activeTasks}</p>
            <p>Completion: {stats.completionPercentage}%</p>
          </div>
        </div>
      </button>
    </section>
  );
}

export default Dashboard;
