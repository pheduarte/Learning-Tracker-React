import { useMemo, useState } from "react";
import type {
  CourseGoalData,
  GoalCategory,
  GoalStatus,
} from "../types/courseGoal";
import type { NewGoalData } from "../components/NewGoalForm";
import { useLocalStorage } from "./useLocalStorage";

type GoalCategoryFilter = GoalCategory | "all";
type GoalStatusFilter = GoalStatus | "all";

const STORAGE_KEY = "course-goals";

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

export function useGoals() {
  const [courseGoals, setCourseGoals] = useLocalStorage<CourseGoalData[]>(
    STORAGE_KEY,
    INITIAL_COURSE_GOALS,
  );

  const [selectedCategory, setSelectedCategory] =
    useState<GoalCategoryFilter>("all");

  const [selectedStatus, setSelectedStatus] = useState<GoalStatusFilter>("all");

  const [searchQuery, setSearchQuery] = useState("");

  function addGoal({ title, description, category }: NewGoalData) {
    const newGoal: CourseGoalData = {
      id: Math.random(),
      title,
      description,
      category,
      status: "active",
    };

    setCourseGoals((currentGoals) => [newGoal, ...currentGoals]);
  }

  function deleteGoal(id: number) {
    setCourseGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== id),
    );
  }

  function completeGoal(id: number) {
    setCourseGoals((currentGoals) =>
      currentGoals.map((goal) =>
        goal.id === id ? { ...goal, status: "completed" } : goal,
      ),
    );
  }

  const visibleGoals = useMemo(() => {
    const categoryFilteredGoals =
      selectedCategory === "all"
        ? courseGoals
        : courseGoals.filter((goal) => goal.category === selectedCategory);

    const statusFilteredGoals =
      selectedStatus === "all"
        ? categoryFilteredGoals
        : categoryFilteredGoals.filter(
            (goal) => goal.status === selectedStatus,
          );

    const normalizedSearch = searchQuery.trim().toLowerCase();

    return statusFilteredGoals.filter((goal) => {
      return (
        goal.title.toLowerCase().includes(normalizedSearch) ||
        goal.description.toLowerCase().includes(normalizedSearch)
      );
    });
  }, [courseGoals, selectedCategory, selectedStatus, searchQuery]);

  return {
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
  };
}
