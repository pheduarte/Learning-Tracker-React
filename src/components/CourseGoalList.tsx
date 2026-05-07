// Import TypeScript type definitions from the types module
// These define the shape of our data structures

import CourseGoal from "./CourseGoal";
import GoalDashboard from "./GoalDashboard";
import { useGoals } from "../hooks/useGoals";
import NewGoalForm from "./NewGoalForm";



// Main component function
// This component manages the list of course goals and all the logic for filtering and manipulating them
function CourseGoalList() {
  const {
    courseGoals,
    visibleGoals,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
    searchQuery,
    setSearchQuery,
    addGoal,
    deleteGoal,
    completeGoal,
  } = useGoals();

  const filteredGoalLabel: string =
    visibleGoals.length === 1 ? "goal" : "goals"; // Label for filtered results
  const totalGoalLabel: string = courseGoals.length === 1 ? "goal" : "goals"; // Label for all goals

  // Return the JSX that renders the UI
  // This is what users see in the browser
  return (
    <section>
      {/* Main heading for this section */}
      <h2 className="title">Course Goals</h2>

      {/* NewGoalForm component: Renders the form for adding new goals */}
      {/* Passes handleAddGoal so the form can notify the parent when a new goal is submitted */}
      <NewGoalForm onAddGoal={addGoal} />

      {/* GoalDashboard component: Displays summary statistics about all goals */}
      {/* Passes the complete courseGoals array so the dashboard can calculate stats */}
      <section className="dashboard">
        <GoalDashboard goals={courseGoals} />
      </section>

      <div className="searchbar">
        <label htmlFor="goal-search">Search goals</label>
        <input
          id="goal-search"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Type title or description"
        />
      </div>

      {/* Filter controls: Allow users to filter the goal list */}
      <div className="filters">
        {/* Category filter dropdown */}
        <label htmlFor="category-filter">Filter by category</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(event) =>
            // When user selects a new category, update the selectedCategory state
            setSelectedCategory(event.target.value as typeof selectedCategory)
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
            setSelectedStatus(event.target.value as typeof selectedStatus)
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
                onDelete={deleteGoal}
                onComplete={completeGoal}
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
