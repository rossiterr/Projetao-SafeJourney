import React, { useState, useMemo, useEffect } from 'react';
import { Program, Agency } from '../types';
import { ProgramCard } from '../components/ProgramCard';
import { CERTIFICATIONS, VERIFICATIONS } from '../data/mockData';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';
import { ArrowUpIcon } from '../components/icons/ArrowUpIcon';

interface ProgramsPageProps {
  allPrograms: Program[];
  allAgencies: Agency[];
  onProgramSelect: (program: Program) => void;
  onBack: () => void;
  initialQuery: string;
  initialAgencyId?: string;
}

export const ProgramsPage: React.FC<ProgramsPageProps> = ({ allPrograms, allAgencies, onProgramSelect, onBack, initialQuery, initialAgencyId }) => {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedAgency, setSelectedAgency] = useState(initialAgencyId || '');
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [selectedVerifications, setSelectedVerifications] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScrollTop && window.pageYOffset > 400) {
        setShowScrollTop(true);
      } else if (showScrollTop && window.pageYOffset <= 400) {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScrollTop]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
      const certificationMatch = selectedCertifications.length > 0
        ? selectedCertifications.every(cert => p.agency.certifications?.includes(cert))
        : true;
      const verificationMatch = selectedVerifications.length > 0
        ? selectedVerifications.every(verif => p.verifications?.includes(verif))
        : true;

      return queryMatch && destinationMatch && agencyMatch && certificationMatch && verificationMatch;
    });
  }, [allPrograms, searchQuery, selectedDestination, selectedAgency, selectedCertifications, selectedVerifications]);

  const toggleCertification = (cert: string) => {
    setSelectedCertifications(prev =>
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  };

  const toggleVerification = (verif: string) => {
    setSelectedVerifications(prev =>
      prev.includes(verif) ? prev.filter(v => v !== verif) : [...prev, verif]
    );
  };
  
  return (
    <div className="bg-gray-50 overflow-x-hidden">
      <div className="relative bg-white overflow-hidden">
        <div className="relative flex flex-col justify-center items-center py-20 md:pt-40 pb-12 px-4 sm:px-6 lg:px-8">
            <img 
                src="https://images.unsplash.com/photo-1749183778740-960ad6364bb4?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                alt="Mulher viajante feliz e empoderada, simbolizando a segurança e a alegria de viajar."
                className="absolute inset-0 w-full h-full object-cover opacity-20 md:object-top"
                aria-hidden="true"
            />
            <div className="relative container mx-auto text-center">
                <h1 className="text-4xl font-extrabold text-gray-900">Programas de Intercâmbio</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
                    Encontre a jornada perfeita para você. Explore centenas de programas verificados, com foco na sua segurança e bem-estar.
                </p>
            </div>
            
            <div className="relative container mx-auto mt-24 w-full max-w-5xl">
                <div className="bg-white p-6 rounded-lg shadow-md">
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
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <button
                        onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                        className="flex items-center justify-center w-full text-center text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors"
                        >
                        <span>Mais filtros</span>
                        <ChevronDownIcon className={`w-5 h-5 ml-2 transform transition-transform duration-300 ${showAdvancedFilters ? 'rotate-180' : ''}`} />
                        </button>
                    </div>

                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showAdvancedFilters ? 'max-h-[500px] opacity-100 pt-4 mt-4 border-t' : 'max-h-0 opacity-0'}`}>
                        <div className="space-y-4">
                        <div>
                            <h4 className="text-sm font-semibold text-gray-600 mb-2">Filtrar por Certificações da Agência:</h4>
                            <div className="flex flex-wrap gap-2">
                            {CERTIFICATIONS.map(cert => (
                                <button
                                key={cert}
                                onClick={() => toggleCertification(cert)}
                                className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                                    selectedCertifications.includes(cert)
                                        ? 'bg-rose-400 text-white border-[#5F9EA0]'
                                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                                }`}
                                >
                                {cert}
                                </button>
                            ))}
                            </div>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-gray-600 mb-2">Filtrar por Selos do Programa:</h4>
                            <div className="flex flex-wrap gap-2">
                            {VERIFICATIONS.map(verif => (
                                <button
                                key={verif}
                                onClick={() => toggleVerification(verif)}
                                className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                                    selectedVerifications.includes(verif)
                                        ? 'bg-[#DAA520] text-white border-[#DAA520]'
                                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                                }`}
                                >
                                {verif}
                                </button>
                            ))}
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-6">
          <p className="text-lg text-gray-600">
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
      {showScrollTop && (
        <button
          onClick={scrollTop}
          className="fixed bottom-8 right-8 bg-rose-500 text-white p-3 rounded-full shadow-lg hover:bg-rose-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-opacity duration-300 z-50"
          aria-label="Ir para o topo"
        >
          <ArrowUpIcon className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};
