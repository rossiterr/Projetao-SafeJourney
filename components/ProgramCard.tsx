

import React from 'react';
import { Program } from '../types';
import { VerifiedSeal } from './VerifiedSeal';
import { MapPinIcon } from './icons/MapPinIcon';
import { ProgramFeatures } from './FeatureIcons';

interface ProgramCardProps {
  program: Program;
  onSelect: (program: Program) => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, onSelect }) => {
  const agencyCertifications = program.agency.certifications || [];
  const programVerifications = program.verifications || [];

  return (
    <div className="bg-white rounded-xl shadow-md transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col" onClick={() => onSelect(program)}>
      <div className="relative">
        <img className="h-48 w-full object-cover rounded-t-xl" src={program.image} alt={program.name} />
        {program.agency.isVerified && (
          <div className="absolute top-3 right-3 z-10">
            <VerifiedSeal />
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="uppercase tracking-wide text-sm text-[#66CDAA] font-semibold">{program.agency.name}</div>
        <h3 className="block mt-1 text-lg leading-tight font-bold text-black hover:underline">{program.name}</h3>
        <p className="mt-2 text-gray-500 flex-grow">{program.shortDescription}</p>
        
        <div className="mt-auto pt-4">
          {(agencyCertifications.length > 0 || programVerifications.length > 0) && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              {agencyCertifications.length > 0 && (
                  <div className="flex items-center">
                      <ProgramFeatures features={agencyCertifications} />
                  </div>
              )}
              {programVerifications.length > 0 && (
                  <div className={`flex items-center ${agencyCertifications.length > 0 ? 'mt-3 pt-3 border-t border-gray-100' : ''}`}>
                      <ProgramFeatures features={programVerifications} />
                  </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center text-gray-600">
                <MapPinIcon className="h-5 w-5 mr-1 text-gray-400" />
                <span>{program.destinationCity}, {program.destinationCountry}</span>
            </div>
            <p className="text-lg font-bold text-gray-900">${program.price}</p>
        </div>
      </div>
    </div>
  );
};