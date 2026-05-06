// Import TypeScript type definition for course goal data
import type { CourseGoalData } from "../types/courseGoal";

// Define the props that this component expects
type GoalDashboardProps = {
  goals: CourseGoalData[]; // Array of all goals to calculate statistics from
};

// GoalDashboard component: Displays summary statistics about the user's goals
// This component takes all goals and calculates various metrics to show the user
// It's a presentational component that doesn't manage state
function GoalDashboard({ goals }: GoalDashboardProps) {
  // Calculate the total number of goals
  const totalGoals = goals.length;

  // Calculate how many goals are completed
  // filter() returns a new array containing only goals where the status is "completed"
  // Then .length gives us the count
  const completedGoals = goals.filter(
    (goal) => goal.status === "completed",
  ).length;

  // Calculate how many goals are still active
  // Active goals = Total goals - Completed goals
  const activeGoals = totalGoals - completedGoals;

  // Calculate the completion percentage
  // Formula: (completed / total) * 100, rounded to nearest whole number
  // If totalGoals is 0, set percentage to 0 to avoid division by zero
  const completionPercentage =
    totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  return (
    <section>
      <h2>Goal Dashboard</h2>

      {/* Display all calculated statistics */}
      <p>Total goals: {totalGoals}</p>
      <p>Completed goals: {completedGoals}</p>
      <p>Active goals: {activeGoals}</p>
      <p>Completion: {completionPercentage}%</p>
    </section>
  );
}

// Export this component so other files can import and use it
export default GoalDashboard;
