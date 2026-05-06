import CourseGoal, { type CourseGoalData } from "./CourseGoal";
import { useState } from "react";
import NewGoalForm, { type NewGoalData } from "./NewGoalForm";

const INITIAL_COURSE_GOALS: CourseGoalData[] = [
  {
    id: 1,
    title: "Learn React",
    description: "Stage 0: Get familiar with the basics.",
    category: "react",
  },
  {
    id: 2,
    title: "Learn TypeScript",
    description: "Stage 1: Get familiar with the basics.",
    category: "typescript",
  },
  {
    id: 3,
    title: "Learn React with TypeScript",
    description: "Stage 2: Get familiar with the basics.",
    category: "react",
  },
];

function CourseGoalList() {
  const [courseGoals, setCourseGoals] =
    useState<CourseGoalData[]>(INITIAL_COURSE_GOALS);

  function handleDeleteGoal(id: number) {
    setCourseGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== id),
    );
  }

  function handleAddGoal({ title, description, category }: NewGoalData) {
    const newGoal: CourseGoalData = {
      id: Math.random(),
      title,
      description,
      category,
    };
    setCourseGoals((currentGoals) => [newGoal, ...currentGoals]);
  }

  return (
    <section>
      <h2>Course Goals</h2>

      <NewGoalForm onAddGoal={handleAddGoal} />

      {courseGoals.length === 0 ? (
        <p>No course goals found. Add one to get started!</p>
      ) : (
        <ul>
          {courseGoals.map((goal) => (
            <li key={goal.id}>
              <CourseGoal goal={goal} onDelete={handleDeleteGoal} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default CourseGoalList;
