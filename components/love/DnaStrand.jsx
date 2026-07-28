import React from 'react';

export default function DnaStrand({ className = '' }) {
  return (
    <div className={className} aria-hidden="true" style={{ pointerEvents: 'none' }}>
      <span className="sr-only">DNA strand</span>
      <div className="text-xl md:text-2xl">🧬</div>
    </div>
  );
}
