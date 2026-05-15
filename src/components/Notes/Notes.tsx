import type { NoteData } from "../../types/notes";
import Card from "../ui/Card";
import { memo } from "react";
import { IconTrash } from "@tabler/icons-react";

type NoteProps = {
  note: NoteData;
  onDelete: (id: string) => void;
};

const Note = memo(function Note({ note, onDelete }: NoteProps) {
  return (
    <Card className="note">
      <div>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
      </div>

      <div className="card_btns">
        <button
          className="delete-btn"
          onClick={() => onDelete(note.id)}
          aria-label={`Delete ${note.title}`}
        >
          <IconTrash stroke={2} />
        </button>
      </div>
    </Card>
  );
});

export default memo(Note);
