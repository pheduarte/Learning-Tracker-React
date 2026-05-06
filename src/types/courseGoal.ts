// Type definition for GoalCategory
// A "union type" that specifies exactly which string values are allowed
// Any goal MUST have one of these category values - no other strings are accepted
// This prevents typos and ensures data consistency
export type GoalCategory = "react" | "typescript" | "css" | "html" | "other";

// Type definition for GoalStatus
// Represents whether a goal is currently being worked on or has been completed
// A goal can only be in one of these two states
export type GoalStatus = "active" | "completed";

// Type definition for CourseGoalData
// This defines the complete structure of a goal object
// Any goal in the application must have all of these properties with these exact types
export type CourseGoalData = {
  id: number; // Unique identifier for the goal (used as a key in lists)
  title: string; // Short name/title of the goal
  description: string; // Longer explanation of what the goal is about
  category: GoalCategory; // Which topic/technology this goal is related to
  status: GoalStatus; // Whether the goal is active or completed
};
