// Import TypeScript type definitions from the types module
// These define the shape of our data structures
import type {
  CourseGoalData, // The main interface for a course goal object
  GoalCategory, // The type for goal categories (e.g., "react", "typescript")
  GoalStatus, // The type for goal status (e.g., "active", "completed")
} from "../types/courseGoal";

// Import the useState hook from React
// This hook allows us to manage component state (data that changes over time)
import { useState } from "react";

// Import child components and their types
// NewGoalForm: Component for creating new goals
// NewGoalData: Type definition for the data submitted from the form
import NewGoalForm, { type NewGoalData } from "./NewGoalForm";

// CourseGoal: Component that renders a single goal
import CourseGoal from "./CourseGoal";

// GoalDashboard: Component that displays summary statistics about goals
import GoalDashboard from "./GoalDashboard";

// Define local types that extend the imported types with an "all" option
// This allows filters to show either a specific category/status OR everything
// GoalCategoryFilter can be: "react" | "typescript" | "css" | "html" | "other" | "all"
type GoalCategoryFilter = GoalCategory | "all";

// GoalStatusFilter can be: "active" | "completed" | "all"
type GoalStatusFilter = GoalStatus | "all";

// Sample data that will be used to initialize the component's state
// This gives us some example goals to display when the app first loads
// In a real app, this data would typically come from a database or API
const INITIAL_COURSE_GOALS: CourseGoalData[] = [
  {
    id: 1, // Unique identifier for the goal
    title: "Learn React", // Short name of the goal
    description: "Stage 0: Get familiar with the basics.", // More detailed explanation
    category: "react", // Which tech/topic this goal is about
    status: "active", // Whether the goal is active or completed
  },
  {
    id: 2,
    title: "Learn TypeScript",
    description: "Stage 1: Get familiar with the basics.",
    category: "typescript",
    status: "active",
  },
  {
    id: 3,
    title: "Learn React with TypeScript",
    description: "Stage 2: Get familiar with the basics.",
    category: "react",
    status: "active",
  },
];

// Main component function
// This component manages the list of course goals and all the logic for filtering and manipulating them
function CourseGoalList() {
  // State hook #1: courseGoals
  // Stores the array of all course goals in the component
  // setState function (setCourseGoals) is used to update the goals and trigger a re-render
  // Initialized with the INITIAL_COURSE_GOALS data
  const [courseGoals, setCourseGoals] =
    useState<CourseGoalData[]>(INITIAL_COURSE_GOALS);

  // State hook #2: selectedCategory
  // Tracks which category filter is currently selected by the user
  // Can be: "react", "typescript", "css", "html", "other", or "all"
  // Initialized to "all" (show goals from all categories)
  const [selectedCategory, setSelectedCategory] =
    useState<GoalCategoryFilter>("all");

  // State hook #3: selectedStatus
  // Tracks which status filter is currently selected by the user
  // Can be: "active", "completed", or "all"
  // Initialized to "all" (show goals with all statuses)
  const [selectedStatus, setSelectedStatus] = useState<GoalStatusFilter>("all");

  // State hook #4: searchQuery
  // Stores the text that the user types into a search box
  // Can be used to filter goals by title or description
  // Initialized to an empty string (no search active)
  // const [searchQuery, setSearchQuery] = useState("");

  // Event handler function #1: handleDeleteGoal
  // Called when a user clicks the delete button on a goal
  // Parameter 'id': the unique identifier of the goal to delete
  // Uses the filter method to create a new array without the deleted goal
  // This is passed down to child components as a prop
  function handleDeleteGoal(id: number) {
    // Update courseGoals with all goals EXCEPT the one being deleted
    setCourseGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== id),
    );
  }

  // Event handler function #2: handleAddGoal
  // Called when the NewGoalForm is submitted with a new goal
  // Parameter: NewGoalData object containing title, description, and category
  // Creates a new goal object with a unique ID and default status, then adds it to the list
  function handleAddGoal({ title, description, category }: NewGoalData) {
    // Create a new goal object with all required properties
    const newGoal: CourseGoalData = {
      id: Math.random(), // Generate a simple random ID (in production, use a proper ID system)
      title, // Copy title from the form input
      description, // Copy description from the form input
      category, // Copy category from the form input
      status: "active", // New goals always start with active status
    };
    // Add the new goal to the beginning of the goals array
    setCourseGoals((currentGoals) => [newGoal, ...currentGoals]);
  }

  // Event handler function #3: handleCompleteGoal
  // Called when a user marks a goal as completed
  // Parameter 'id': the unique identifier of the goal to mark as completed
  // Updates only that specific goal's status while leaving others unchanged
  function handleCompleteGoal(id: number) {
    // Update courseGoals by mapping over each goal
    setCourseGoals((currentGoals) =>
      currentGoals.map((goal) =>
        // If this is the goal we want to complete, update its status
        goal.id === id ? { ...goal, status: "completed" } : goal,
      ),
    );
  }

  // Filtering logic - Step 1: Filter by category
  // This reduces the full goals list to only goals in the selected category
  // If "all" is selected, keep all goals; otherwise, filter by the selected category
  const categoryFilteredGoals =
    selectedCategory === "all"
      ? courseGoals // Show all goals if no category filter is applied
      : courseGoals.filter((goal) => goal.category === selectedCategory); // Show only matching category

  // Filtering logic - Step 2: Filter by status
  // This further reduces the categoryFilteredGoals to only those with the selected status
  // Applied AFTER the category filter for a two-stage filtering process
  const visibleGoals =
    selectedStatus === "all"
      ? categoryFilteredGoals // Show all goals from step 1 if no status filter is applied
      : categoryFilteredGoals.filter((goal) => goal.status === selectedStatus); // Show only matching status

  // Create dynamic labels that change based on the count of results
  // If there's only 1 goal, use singular "goal"; otherwise use plural "goals"
  // This improves the user experience with proper grammar
  const filteredGoalLabel = visibleGoals.length === 1 ? "goal" : "goals"; // Label for filtered results
  const totalGoalLabel = courseGoals.length === 1 ? "goal" : "goals"; // Label for all goals

  // Return the JSX that renders the UI
  // This is what users see in the browser
  return (
    <section>
      {/* Main heading for this section */}
      <h2 className="title">Course Goals</h2>

      {/* NewGoalForm component: Renders the form for adding new goals */}
      {/* Passes handleAddGoal so the form can notify the parent when a new goal is submitted */}
      <NewGoalForm onAddGoal={handleAddGoal} />

      {/* GoalDashboard component: Displays summary statistics about all goals */}
      {/* Passes the complete courseGoals array so the dashboard can calculate stats */}
      <section className="dashboard">
        <GoalDashboard goals={courseGoals} />
      </section>

      {/* Filter controls: Allow users to filter the goal list */}
      <div>
        {/* Category filter dropdown */}
        <label htmlFor="category-filter">Filter by category</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(event) =>
            // When user selects a new category, update the selectedCategory state
            setSelectedCategory(event.target.value as GoalCategoryFilter)
          }
        >
          <option value="all">All</option>
          <option value="react">React</option>
          <option value="typescript">TypeScript</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
          <option value="other">Other</option>
        </select>

        {/* Status filter dropdown */}
        <label htmlFor="status-filter">Filter by status</label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(event) =>
            // When user selects a new status, update the selectedStatus state
            setSelectedStatus(event.target.value as GoalStatusFilter)
          }
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Summary text: Shows how many goals are visible vs total goals */}
      <p>
        Showing {visibleGoals.length} {filteredGoalLabel} of{" "}
        {courseGoals.length} {totalGoalLabel}
      </p>

      {/* Conditional rendering: Show either a message or the list of goals */}
      {visibleGoals.length === 0 ? (
        // If no goals match the filters, show an appropriate message
        <p>
          {courseGoals.length === 0
            ? "No course goals found. Add one to get started!" // No goals at all
            : "No course goals found for the selected category."}{" "}
          // Goals exist but don't match filter
        </p>
      ) : (
        // If there are goals to display, render them as a list
        <ul>
          {/* Loop through each visible goal and render a CourseGoal component for it */}
          {visibleGoals.map((goal) => (
            <li key={goal.id}>
              {/* CourseGoal component: Renders a single goal with its details and action buttons */}
              {/* Passes the goal data, delete handler, and complete handler as props */}
              <CourseGoal
                goal={goal}
                onDelete={handleDeleteGoal}
                onComplete={handleCompleteGoal}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// Export the CourseGoalList component as the default export
// This allows other files to import it like: import CourseGoalList from "./CourseGoalList"
export default CourseGoalList;
