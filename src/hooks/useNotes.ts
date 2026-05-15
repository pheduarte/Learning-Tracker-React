import type { NewNoteData, NoteData } from "../types/notes";
import { useEffect, useState } from "react";
import {
  createNote,
  removeNote,
  subscribeToNotes,
} from "../services/notesService";

export function useNotes() {
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState<NoteData[]>([]);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  async function addNote(noteData: NewNoteData) {
    try {
      await createNote(noteData);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }

  async function deleteNote(id: string) {
    try {
      await removeNote(id);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  // async function completeNote(id: string) {
  //     try {
  //         await completeNote(id);
  //     } catch (error) {
  //         console.error("Error completing note:", error);
  //     }
  // }

  useEffect(() => {
    const unsubscribe = subscribeToNotes((updatedNotes) => {
      setNotes(updatedNotes);
      setIsLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function filterNotes() {
    const categoryFiltered =
      selectedCategory === "all"
        ? notes
        : notes.filter((note) => note.tag === selectedCategory);

    return categoryFiltered;
  }

  return {
    notes: filterNotes(),
    addNote,
    deleteNote,
    isLoading,
    selectedCategory,
    setSelectedCategory,
    selectedStatus,
    setSelectedStatus,
  };
}
