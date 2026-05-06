// Import TypeScript type definition for course goal data
import type { CourseGoalData } from "../types/courseGoal";

// Define the props (properties) that this component expects to receive
// Props are like function parameters for React components
type CourseGoalProps = {
  goal: CourseGoalData;                    // The goal object to display
  onDelete: (id: number) => void;          // Callback function when delete button is clicked
  onComplete: (id: number) => void;        // Callback function when complete button is clicked
};

// CourseGoal component: Renders a single goal card with its details and action buttons
// This is a "presentational" component - it receives data via props and displays it
// It calls callback functions when buttons are clicked but doesn't manage state itself
function CourseGoal({ goal, onDelete, onComplete }: CourseGoalProps) {
  return (
    <article className="course-goal">
      {/* Section displaying goal information */}
      <div>
        <h2>{goal.title}</h2>
        <p>{goal.description}</p>
        <p>Category: {goal.category}</p>
        <p>Status: {goal.status}</p>
      </div>

      {/* Section containing action buttons */}
      <div className="card_btns">
        {/* Delete button: Always visible, allows user to remove this goal */}
        <button
          className="delete-button"
          onClick={() => onDelete(goal.id)}
          aria-label={`Delete ${goal.title}`}  /* Accessibility: describes button purpose for screen readers */
        >
          x
        </button>

        {/* Complete button: Only shown for active goals, hidden for completed ones */}
        {/* This is conditional rendering: the button only exists when status is "active" */}
        {goal.status === "active" && (
          <button
            className="complete-button"
            onClick={() => onComplete(goal.id)}
            aria-label={`Mark ${goal.title} as completed`}  /* Accessibility: describes button purpose for screen readers */
          >
            ✓
          </button>
        )}
      </div>
    </article>
  );
}

// Export this component so other files can import and use it
export default CourseGoal;
