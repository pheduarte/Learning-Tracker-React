export type GoalCategory = "react" | "typescript" | "css" | "html" | "other";

export type CourseGoalData = {
  id: number;
  title: string;
  description: string;
  category: GoalCategory;
};

type CourseGoalProps = {
  goal: CourseGoalData;
  onDelete: (id: number) => void;
};

function CourseGoal({ goal, onDelete }: CourseGoalProps) {
  return (
    <article className="course-goal">
      <div>
        <h2>{goal.title}</h2>
        <p>{goal.description}</p>
        <p>Category: {goal.category}</p>
      </div>
      <div>
        <button onClick={() => onDelete(goal.id)}>Delete</button>
      </div>
    </article>
  );
}

export default CourseGoal;
