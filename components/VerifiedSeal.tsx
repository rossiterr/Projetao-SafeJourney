import React from 'react';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

export const VerifiedSeal: React.FC = () => {
  return (
    <div 
      className="relative group flex items-center justify-center bg-rose-400/40 backdrop-blur-sm text-emerald w-9 h-9 rounded-full shadow-md"
    >
      <ShieldCheckIcon className="w-5 h-5" />
      <div 
        className="absolute bottom-full mb-2 w-max px-3 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50"
        role="tooltip"
      >
        Verificado pela Woman GO Safe
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
      </div>
    </div>
  );
};