export type GoalCategory = "react" | "typescript" | "css" | "html" | "other";

export type GoalStatus = "active" | "completed";

export type CourseGoalData = {
  id: number;
  title: string;
  description: string;
  category: GoalCategory;
  status: GoalStatus;
};