import React, { useState } from 'react';
import { Pencil, X } from 'lucide-react';
import FloatingPetals from '@/components/love/FloatingPetals';
import Hero from '@/components/love/Hero';
import LeafDivider from '@/components/love/LeafDivider';
import OpeningLetter from '@/components/love/OpeningLetter';
import MusicPlayer from '@/components/love/MusicPlayer';
import PhotoCollage from '@/components/love/PhotoCollage';
import LoveNotes from '@/components/love/LoveNotes';
import BucketList from '@/components/love/BucketList';
import AuthGate from '@/components/AuthGate';

export default function Home() {
  const [editMode, setEditMode] = useState(false);

  return (
    <AuthGate>
      <div className="relative min-h-screen bg-gradient-to-b from-ivory via-blush/20 to-ivory overflow-x-hidden">
        <div className="absolute inset-0 scientific-grid pointer-events-none" />
        <FloatingPetals />
        <div className="relative z-10">
          <Hero />
          <LeafDivider />
          <OpeningLetter editMode={editMode} />
          <LeafDivider />
          <MusicPlayer />
          <LeafDivider />
          <PhotoCollage editMode={editMode} />
          <LeafDivider />
          <LoveNotes editMode={editMode} />
          <LeafDivider />
          <BucketList editMode={editMode} />
          <footer className="text-center py-12 px-6 border-t border-botanical/15">
            <p className="font-mono text-[0.6rem] text-botanical uppercase tracking-[0.3em] mb-2">END OF REPORT</p>
            <p className="font-display text-2xl text-deep-rose">Enzaime &amp; Substrate</p>
            <p className="font-mono text-xs text-botanical mt-2">bond status: stable · observation period: indefinite 🧬</p>
          </footer>
        </div>
        <button onClick={() => setEditMode(!editMode)} className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-sm shadow-lg transition-all font-mono text-xs uppercase tracking-wider ${ editMode ? 'bg-white text-botanical border border-botanical/30' : 'bg-botanical text-white' }`}>
          {editMode ? <><X className="w-4 h-4" /> Done</> : <><Pencil className="w-4 h-4" /> Edit</>}
        </button>
        {editMode && (
          <div className="fixed bottom-20 right-6 z-50 bg-blush/90 backdrop-blur text-deep-rose text-xs px-4 py-2 rounded-sm shadow-md font-mono uppercase tracking-wider">
            Edit Mode Active
          </div>
        )}
      </div>
    </AuthGate>
  );
}
