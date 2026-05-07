// Import TypeScript type definition for course goal data
import type { CourseGoalData } from "../types/courseGoal";
import { useMemo } from "react";

// Define the props that this component expects
type GoalDashboardProps = {
  goals: CourseGoalData[]; // Array of all goals to calculate statistics from
};

function GoalDashboard({ goals }: GoalDashboardProps) {
  const stats = useMemo(() => {
    // Calculate the total number of goals
    const totalGoals = goals.length;

    const completedGoals = goals.filter(
      (goal) => goal.status === "completed",
    ).length;

    const activeGoals = totalGoals - completedGoals;

    const completionPercentage =
      totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
    return {
      totalGoals,
      completedGoals,
      activeGoals,
      completionPercentage,
    };
  }, [goals]); // Recalculate stats only when the goals array changes -
  // like when a goal is added, deleted, or updated

  return (
    <section>
      <h2>Goal Dashboard</h2>

      {/* Display all calculated statistics */}
      <p>Total goals: {stats.totalGoals}</p>
      <p>Completed goals: {stats.completedGoals}</p>
      <p>Active goals: {stats.activeGoals}</p>
      <p>Completion: {stats.completionPercentage}%</p>
    </section>
  );
}

// Export this component so other files can import and use it
export default GoalDashboard;
