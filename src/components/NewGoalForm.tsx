// Import the useState hook to manage form state
import { useState } from "react";

// Import TypeScript type definitions
// GoalCategory: type for the category dropdown options
import type { GoalCategory } from "../types/courseGoal";
import Button from "./ui/Button";

// Define the shape of data that will be submitted from this form
// This type is exported so other components can use it
export type NewGoalData = {
  title: string; // The goal's title
  description: string; // The goal's description
  category: GoalCategory; // The selected category
};

// Define the props that this component expects
type NewGoalFormProps = {
  onAddGoal: (goalData: NewGoalData) => void; // Callback function called when form is submitted
};

// NewGoalForm component: A controlled form component for creating new goals
// "Controlled" means React manages the form's state instead of the DOM
function NewGoalForm({ onAddGoal }: NewGoalFormProps) {
  // State hook #1: title
  // Stores the value of the title input field
  // setTitle updates the state and triggers a re-render
  const [title, setTitle] = useState("");

  // State hook #2: description
  // Stores the value of the description textarea
  const [description, setDescription] = useState("");

  // State hook #3: category
  // Stores the selected category from the dropdown
  // Initialized to "other" (the default option)
  const [category, setCategory] = useState<GoalCategory>("other");

  // Validation check: Is the form currently in an invalid state?
  // The form is invalid if either title or description is empty or only contains whitespace
  // trim() removes whitespace from both ends of a string
  // This variable is used to disable the submit button when the form is incomplete
  const isFormInvalid = !title.trim() || !description.trim();

  // Event handler: Called when the form is submitted
  // Parameter: event - the form submission event
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevent the default form behavior (page reload)
    event.preventDefault();

    // Early return: Don't submit if the form is invalid
    if (isFormInvalid) {
      return;
    }

    // Call the parent component's onAddGoal callback with the form data
    // trim() removes whitespace from the input values for cleaner data
    onAddGoal({
      title: title.trim(),
      description: description.trim(),
      category,
    });

    // Clear the form after successful submission
    // This resets all inputs to empty values (except category reverts to "other")
    setTitle("");
    setDescription("");
    setCategory("other");
  }

  return (
    <form className="new-goal-form" onSubmit={handleSubmit}>
      {/* Title input field */}
      <div className="new-goal-form-title">
        <label htmlFor="title">Goal title</label>
        <input
          id="title"
          type="text"
          value={title}
          // Update state whenever the user types in this input
          onChange={(event) => setTitle(event.target.value)}
        />
        {/* Display character count so user knows how much they've typed */}
        <small>{title.length} characters</small>
      </div>

      {/* Description input field */}
      <div className="new-goal-form-description">
        <label htmlFor="description">Goal description</label>
        <textarea
          id="description"
          value={description}
          // Update state whenever the user types in this textarea
          onChange={(event) => setDescription(event.target.value)}
        />
        {/* Display character count */}
        <small>{description.length} characters</small>
      </div>

      {/* Category dropdown selector */}
      <div className="new-goal-form-category">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          // Update state when user selects a different category
          // Cast the value as GoalCategory type since TypeScript needs to verify it matches the type
          onChange={(event) => setCategory(event.target.value as GoalCategory)}
        >
          <option value="other">Other</option>
          <option value="react">React</option>
          <option value="typescript">TypeScript</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
        </select>
      </div>

      {/* Submit button */}
      {/* The button is disabled (grayed out) when the form is invalid */}
      {/* This prevents users from submitting incomplete forms */}
      <Button type="submit" disabled={isFormInvalid}>
        Add Goal
      </Button>
    </form>
  );
}

// Export this component so other files can import and use it
export default NewGoalForm;
