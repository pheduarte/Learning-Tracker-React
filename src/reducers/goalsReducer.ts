import type { CourseGoalData } from "../types/courseGoal";
import type { NewGoalData } from "../components/NewGoalForm";

type GoalsAction =
  | { type: "ADD_GOAL"; payload: NewGoalData }
  | { type: "DELETE_GOAL"; payload: number }
  | { type: "COMPLETE_GOAL"; payload: number };

export function goalsReducer(
  goals: CourseGoalData[],
  action: GoalsAction,
): CourseGoalData[] {
  switch (action.type) {
    case "ADD_GOAL": {
      const newGoal: CourseGoalData = {
        id: Math.random(),
        title: action.payload.title,
        description: action.payload.description,
        category: action.payload.category,
        status: "active",
      };

      return [newGoal, ...goals];
    }

    case "DELETE_GOAL":
      return goals.filter((goal) => goal.id !== action.payload);

    case "COMPLETE_GOAL":
      return goals.map((goal) =>
        goal.id === action.payload
          ? { ...goal, status: "completed" }
          : goal,
      );

    default:
      return goals;
  }
}