import type { CourseGoalData } from "../types/courseGoal";

type GoalDashboardProps = {
  goals: CourseGoalData[];
};

function GoalDashboard({ goals }: GoalDashboardProps) {
  const totalGoals = goals.length;
  const completedGoals = goals.filter(
    (goal) => goal.status === "completed",
  ).length;
  const activeGoals = totalGoals - completedGoals;

  const completionPercentage =
    totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  return (
    <section>
      <h2>Goal Dashboard</h2>

      <p>Total goals: {totalGoals}</p>
      <p>Completed goals: {completedGoals}</p>
      <p>Active goals: {activeGoals}</p>
      <p>Completion: {completionPercentage}%</p>
    </section>
  );
}

export default GoalDashboard;
