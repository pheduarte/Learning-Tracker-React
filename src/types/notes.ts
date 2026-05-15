
export type NoteCategory =
  | "house"
  | "study"
  | "Groceries"
  | "bills"
  | "personal"
  | "shopping"
  | "work"
  | "other";


export type NoteData = {
  id: string; // Unique identifier for the note (used as a key in lists)
  title: string; // Short name/title of the note
  content: string; // The main content of the note
  tag: NoteCategory; // Which topic/technology this note is related to
};

export type NewNoteData = Omit<NoteData, "id">;
