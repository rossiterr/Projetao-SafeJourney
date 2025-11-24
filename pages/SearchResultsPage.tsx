import React, { useState, useMemo } from 'react';
import { Program, Agency } from '../types';
import { ProgramCard } from '../components/ProgramCard';

interface ProgramsPageProps {
  allPrograms: Program[];
  allAgencies: Agency[];
  onProgramSelect: (program: Program) => void;
  onBack: () => void;
  initialQuery: string;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ allPrograms, allAgencies, onProgramSelect, onBack, initialQuery }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('');

  const uniqueDestinations = useMemo(() => {
    const destinations = new Set<string>();
    allPrograms.forEach(p => destinations.add(`${p.destinationCity}, ${p.destinationCountry}`));
    return Array.from(destinations).sort();
  }, [allPrograms]);

  const filteredPrograms = useMemo(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return allPrograms.filter(p => {
      const queryMatch = lowerCaseQuery
        ? p.name.toLowerCase().includes(lowerCaseQuery) ||
          p.shortDescription.toLowerCase().includes(lowerCaseQuery)
        : true;
      const destinationMatch = selectedDestination
        ? `${p.destinationCity}, ${p.destinationCountry}` === selectedDestination
        : true;
      const agencyMatch = selectedAgency
        ? p.agency.id.toString() === selectedAgency
        : true;
      return queryMatch && destinationMatch && agencyMatch;
    });
  }, [allPrograms, searchQuery, selectedDestination, selectedAgency]);
  
  return (
    <div className="bg-gray-50 min-h-[calc(100vh-250px)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={onBack} className="mb-8 text-rose-500 hover:text-rose-400 font-semibold">&larr; Voltar</button>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-10 sticky top-24 z-30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
             <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome, tipo..."
              className="w-full px-4 py-3 text-base text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-400"
            />
            <select
              value={selectedDestination}
              onChange={e => setSelectedDestination(e.target.value)}
              className="w-full px-4 py-3 text-base text-gray-900 bg-gray-100 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-400"
            >
              <option value="">Todos os Destinos</option>
              {uniqueDestinations.map(dest => <option key={dest} value={dest}>{dest}</option>)}
            </select>
             <select
              value={selectedAgency}
              onChange={e => setSelectedAgency(e.target.value)}
              className="w-full px-4 py-3 text-base text-gray-900 bg-gray-100 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-400"
            >
              <option value="">Todas as Agências</option>
              {allAgencies.sort((a,b) => a.name.localeCompare(b.name)).map(agency => <option key={agency.id} value={agency.id}>{agency.name}</option>)}
            </select>
          </div>
        </div>

        <div className="text-left mb-10">
          <h1 className="text-3xl font-bold text-gray-800">Programas de Intercâmbio</h1>
          <p className="mt-2 text-lg text-gray-600">
            {filteredPrograms.length} programa(s) encontrado(s).
          </p>
        </div>

        {filteredPrograms.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map(program => (
              <ProgramCard key={program.id} program={program} onSelect={onProgramSelect} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">Nenhum resultado</h3>
            <p className="mt-1 text-sm text-gray-500">Tente ajustar seus filtros de busca.</p>
          </div>
        )}
      </div>
    </div>
  );
};