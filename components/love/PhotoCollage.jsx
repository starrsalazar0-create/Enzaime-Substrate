import React from 'react';

export default function PhotoCollage({ editMode }) {
  return (
    <div className="py-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
      <div className="bg-gray-100 h-40 rounded-md flex items-center justify-center">Photo</div>
      <div className="bg-gray-100 h-40 rounded-md flex items-center justify-center">Photo</div>
      <div className="bg-gray-100 h-40 rounded-md flex items-center justify-center">Photo</div>
    </div>
  );
}
