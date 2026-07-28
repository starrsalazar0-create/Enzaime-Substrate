import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Save, X } from 'lucide-react';

const DEFAULT_LETTER = `Field Note 001 — Observation Log Subject: Enzaime Observer: Substrate Date of Initial Contact: January 13, 2026 It was in biology class that I first observed you — not through a microscope, but across the room, where something in your smile catalyzed a reaction I wasn't prepared for. What began as a glance has compounded into something extraordinary. You are my favorite variable, the constant in every equation, the element that makes every day an experiment worth running. Thank you for being the enzyme to my substrate — for lowering the activation energy of my happiness, for making every reaction faster, warmer, better. The data is clear: this bond is irreversible. Here's to a lifetime of discoveries. Yours in perpetuity, Substrate 🧬`;

export default function OpeningLetter({ editMode }) {
  const [text, setText] = useState('');
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replaced database call with local storage state to avoid errors
    const savedLetter = localStorage.getItem('site_letter_text');
    setText(savedLetter || DEFAULT_LETTER);
    setLoading(false);
  }, []);

  const handleSave = () => {
    localStorage.setItem('site_letter_text', draft);
    setText(draft);
    setEditing(false);
  };

  if (loading) return null;

  if (editing) {
    return (
      <section className="py-16 px-6 max-w-2xl mx-auto">
        <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={16} className="w-full bg-ivory/80 rounded-lg p-6 text-foreground leading-relaxed border border-botanical/30 shadow-sm focus:outline-none focus:ring-2 focus:ring-botanical/30 font-body text-lg" />
        <div className="flex gap-3 mt-4 justify-center">
          <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2 bg-botanical text-white rounded-sm hover:opacity-90 transition font-mono text-xs uppercase tracking-wider">
            <Save className="w-4 h-4" /> Save
          </button>
          <button onClick={() => setEditing(false)} className="flex items-center gap-2 px-5 py-2 bg-white text-botanical border border-botanical/30 rounded-sm hover:opacity-90 transition font-mono text-xs uppercase tracking-wider">
            <X className="w-4 h-4" /> Cancel
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative">
        {editMode && (
          <button onClick={() => { setDraft(text); setEditing(true); }} className="absolute -top-2 right-0 flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white text-botanical border border-botanical/30 rounded-sm shadow-sm hover:bg-botanical/5 transition z-10 font-mono text-xs uppercase tracking-wider">
            <Pencil className="w-3.5 h-3.5" /> Edit
          </button>
        )}
        <div className="bg-ivory/90 backdrop-blur rounded-lg p-8 md:p-14 shadow-xl border border-botanical/20">
          <p className="font-mono text-[0.6rem] text-botanical uppercase tracking-[0.3em] text-center mb-1">LOG 001</p>
          <p className="font-display text-3xl md:text-4xl text-deep-rose mb-6 text-center">Observation Log</p>
          <div className="font-body text-foreground/80 whitespace-pre-wrap leading-relaxed text-base md:text-lg">
            {text}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
