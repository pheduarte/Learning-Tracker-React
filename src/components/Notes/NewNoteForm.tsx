import { useState } from "react";
import { NoteFormDialog } from "./NoteFormDialog";
import type { NewNoteData } from "../../types/notes";

type NewNoteFormProps = {
  onAddNote: (noteData: NewNoteData) => void;
};

function NewNoteForm({ onAddNote }: NewNoteFormProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg font-bold"></p>
        <button
          className="btn-add-task"
          type="button"
          onClick={() => setIsCollapsed((prev) => !prev)}
        >
          {isCollapsed ? "+ New Note" : "X"}
        </button>
      </div>

      {!isCollapsed && (
        <NoteFormDialog
          open={true}
          onOpenChange={() => setIsCollapsed(true)}
          onAdd={onAddNote}
        />
      )}
    </div>
  );
}

export default NewNoteForm;
