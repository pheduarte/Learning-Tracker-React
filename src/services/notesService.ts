import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

import type { NewNoteData, NoteData } from "../types/notes";

const notesCollection = collection(db, "notes");

export async function createNote(noteData: NewNoteData) {
  console.log("Creating note:", noteData);

  const docRef = await addDoc(notesCollection, {
    title: noteData.title,
    content: noteData.content,
    tag: noteData.tag,
  });

  console.log("Note created with ID:", docRef.id);
}

export async function removeNote(id: string) {
  await deleteDoc(doc(db, "notes", String(id)));
}

export function subscribeToNotes(onUpdate: (notes: NoteData[]) => void) {
  return onSnapshot(notesCollection, (snapshot) => {
    const notes = snapshot.docs.map((document) => {
      const data = document.data();

      return {
        id: document.id,
        title: data.title,
        content: data.content,
        tag: data.tag,
      } as NoteData;
    });

    onUpdate(notes);
  });
}
