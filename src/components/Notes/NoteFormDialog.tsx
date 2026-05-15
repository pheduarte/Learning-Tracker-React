import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import type { NewNoteData, NoteCategory } from "../../types/notes";

interface NoteFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (note: NewNoteData) => void;
}

export function NoteFormDialog({
  open,
  onOpenChange,
  onAdd,
}: NoteFormDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<NoteCategory>("other");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      title: title.trim(),
      content: description.trim(),
      tag: category,
    });

    setTitle("");
    setDescription("");
    setCategory("other");
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
              >
                <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-3xl shadow-2xl p-6 mx-4">
                  <div className="flex items-center justify-between mb-6">
                    <Dialog.Title className="text-2xl font-semibold text-white">
                      Add New Note
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button className="w-10 h-10 rounded-xl bg-blue-500 hover:bg-blue-600 transition-colors flex items-center justify-center text-white">
                        <X className="w-5 h-5" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-white mb-2">Title</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                        autoFocus
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2">Content</label>
                      <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add content (optional)"
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2">Tag</label>
                      <select
                        value={category}
                        onChange={(e) =>
                          setCategory(e.target.value as NoteCategory)
                        }
                        className="w-full px-4 py-3 rounded-xl bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                      >
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        <option value="house">House</option>
                        <option value="health">Health</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={!title.trim()}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-500/30"
                    >
                      Add Note
                    </button>
                  </form>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
