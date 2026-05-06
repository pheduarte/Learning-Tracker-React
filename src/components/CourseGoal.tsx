import type { CourseGoalData } from "../types/courseGoal";

type CourseGoalProps = {
  goal: CourseGoalData;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
};

function CourseGoal({ goal, onDelete, onComplete }: CourseGoalProps) {
  return (
    <article className="course-goal">
      <div>
        <h2>{goal.title}</h2>
        <p>{goal.description}</p>
        <p>Category: {goal.category}</p>
        <p>Status: {goal.status}</p>
      </div>
      <div className="card_btns">
        <button
          className="delete-button"
          onClick={() => onDelete(goal.id)}
          aria-label={`Delete ${goal.title}`}
        >
          x
        </button>
        {goal.status === "active" && (
          <button
            className="complete-button"
            onClick={() => onComplete(goal.id)}
            aria-label={`Mark ${goal.title} as completed`}
          >
            ✓
          </button>
        )}
      </div>
    </article>
  );
}

export default CourseGoal;
