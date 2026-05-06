import type {
  CourseGoalData,
  GoalCategory,
  GoalStatus,
} from "../types/courseGoal";
import { useState } from "react";
import NewGoalForm, { type NewGoalData } from "./NewGoalForm";
import CourseGoal from "./CourseGoal";
import GoalDashboard from "./GoalDashboard";

type GoalCategoryFilter = GoalCategory | "all";
type GoalStatusFilter = GoalStatus | "all";

const INITIAL_COURSE_GOALS: CourseGoalData[] = [
  {
    id: 1,
    title: "Learn React",
    description: "Stage 0: Get familiar with the basics.",
    category: "react",
    status: "active",
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

function CourseGoalList() {
  const [courseGoals, setCourseGoals] =
    useState<CourseGoalData[]>(INITIAL_COURSE_GOALS);

  const [selectedCategory, setSelectedCategory] =
    useState<GoalCategoryFilter>("all");

  const [selectedStatus, setSelectedStatus] = useState<GoalStatusFilter>("all");

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
      status: "active",
    };
    setCourseGoals((currentGoals) => [newGoal, ...currentGoals]);
  }

  function handleCompleteGoal(id: number) {
    setCourseGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === id ? { ...goal, status: "completed" } : goal,
      ),
    );
  }

  const categoryFilteredGoals =
    selectedCategory === "all"
      ? courseGoals
      : courseGoals.filter((goal) => goal.category === selectedCategory);

  const visibleGoals =
    selectedStatus === "all"
      ? categoryFilteredGoals
      : categoryFilteredGoals.filter((goal) => goal.status === selectedStatus);

  const filteredGoalLabel = visibleGoals.length === 1 ? "goal" : "goals";
  const totalGoalLabel = courseGoals.length === 1 ? "goal" : "goals";

  return (
    <section>
      <h2 className="title">Course Goals</h2>

      <NewGoalForm onAddGoal={handleAddGoal} />

      <section className="dashboard">
        <GoalDashboard goals={courseGoals} />
      </section>

      <div>
        <label htmlFor="category-filter">Filter by category</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(event) =>
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

        <label htmlFor="status-filter">Filter by status</label>
        <select
          id="status-filter"
          value={selectedStatus}
          onChange={(event) =>
            setSelectedStatus(event.target.value as GoalStatusFilter)
          }
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <p>
        Showing {visibleGoals.length} {filteredGoalLabel} of{" "}
        {courseGoals.length} {totalGoalLabel}
      </p>

      {visibleGoals.length === 0 ? (
        <p>
          {courseGoals.length === 0
            ? "No course goals found. Add one to get started!"
            : "No course goals found for the selected category."}
        </p>
      ) : (
        <ul>
          {visibleGoals.map((goal) => (
            <li key={goal.id}>
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

export default CourseGoalList;
