import { useState } from "react";
import type { GoalCategory } from "./CourseGoal";

export type NewGoalData = {
  title: string;
  description: string;
  category: GoalCategory;
};

type NewGoalFormProps = {
  onAddGoal: (goalData: NewGoalData) => void;
};

function NewGoalForm({ onAddGoal }: NewGoalFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<GoalCategory>("other");

  const isFormInvalid = !title.trim() || !description.trim();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isFormInvalid) {
      return;
    }

    onAddGoal({
      title: title.trim(),
      description: description.trim(),
      category,
    });

    setTitle("");
    setDescription("");
    setCategory("other");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Goal title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <small>{title.length} characters</small>
      </div>

      <div>
        <label htmlFor="description">Goal description</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <small>{description.length} characters</small>
      </div>

      <div>
        <label htmlFor="category">Category</label>
        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value as GoalCategory)}
        >
          <option value="other">Other</option>
          <option value="react">React</option>
          <option value="typescript">TypeScript</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
        </select>
      </div>

      <button type="submit" disabled={isFormInvalid}>
        Add Goal
      </button>
    </form>
  );
}

export default NewGoalForm;
