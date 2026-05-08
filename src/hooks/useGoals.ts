import { useMemo, useState } from "react";
import type {
  CourseGoalData,
  GoalCategory,
  GoalStatus,
} from "../types/courseGoal";
import type { NewGoalData } from "../components/NewGoalForm";
import { useLocalStorage } from "./useLocalStorage";
import { goalsReducer } from "../reducers/goalsReducer";

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

  function dispatch(action: Parameters<typeof goalsReducer>[1]) {
    setCourseGoals((currentGoals) => goalsReducer(currentGoals, action));
  }

  function deleteGoal(id: number) {
    dispatch({ type: "DELETE_GOAL", payload: id });
  }

  function completeGoal(id: number) {
    dispatch({ type: "COMPLETE_GOAL", payload: id });
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
    addGoal: (goalData: NewGoalData) => dispatch({ type: "ADD_GOAL", payload: goalData }),
    deleteGoal,
    completeGoal,
  };
}
