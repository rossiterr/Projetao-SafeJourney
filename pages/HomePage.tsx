import React, { useState } from 'react';
import { Program } from '../types';
import { ProgramCard } from '../components/ProgramCard';
import { programs, feedbacks } from '../data/mockData';
import { FeedbackCard } from '../components/FeedbackCard';

interface HomePageProps {
  onProgramSelect: (program: Program) => void;
  onNavigate: (page: 'map' | 'hub' | 'programs') => void;
  onSearch: (query: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onProgramSelect, onNavigate, onSearch }) => {
  const [query, setQuery] = useState('');
  const recommendedPrograms = programs.slice(0, 3);
  const testimonialFeedbacks = feedbacks.filter(f => f.rating >= 4).slice(0, 15);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
                <span className="block">Sua Jornada de Intercâmbio,</span>
                <span className="block text-[#66CDAA]">com Segurança e Confiança.</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-600">
                A SafeJourney é a sua plataforma para encontrar programas de intercâmbio verificados, feita por mulheres, para mulheres.
            </p>
            <div className="mt-8 max-w-xl mx-auto">
                <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Busque por Destino ou tipo de intercâmbio"
                        className="flex-grow w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#66CDAA] focus:border-[#66CDAA]"
                        aria-label="Search for exchange programs"
                    />
                    <button
                        type="submit"
                        className="px-8 py-3 bg-[#66CDAA] text-white font-bold rounded-md shadow-md hover:bg-[#5F9EA0] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#66CDAA]"
                    >
                        Buscar
                    </button>
                </form>
            </div>
        </div>
      </div>

      {/* Recommended Programs Section */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Programas Recomendados</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recommendedPrograms.map(program => (
              <ProgramCard key={program.id} program={program} onSelect={onProgramSelect} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <button
                onClick={() => onNavigate('programs')}
                className="px-8 py-3 bg-[#5F9EA0] text-white font-bold rounded-md shadow-md hover:bg-[#66CDAA] transition-all duration-300 transform hover:scale-105"
            >
                Ver todos os programas
            </button>
          </div>
        </div>
      </div>
      
       {/* Feature Links Section */}
       <div className="bg-[#66cdaa]/10 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 text-center">
                <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('map')}>
                    <h3 className="text-2xl font-bold text-[#5F9EA0]">Mapa Interativo de Avaliações</h3>
                    <p className="mt-2 text-gray-600">Explore destinos com base em feedbacks reais de avaliações de outras intercambistas.</p>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onNavigate('hub')}>
                    <h3 className="text-2xl font-bold text-[#5F9EA0]">Hub de Conhecimento e Cursos</h3>
                    <p className="mt-2 text-gray-600">Acesse cursos e mentorias para se preparar para sua jornada.</p>
                </div>
            </div>
        </div>

      {/* Testimonials Section */}
      <div className="bg-white py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">O que nossas viajantes dizem</h2>
          <div className="relative w-full">
            <div className="flex animate-marquee">
              {[...testimonialFeedbacks, ...testimonialFeedbacks].map((feedback, index) => (
                <FeedbackCard key={`${feedback.id}-${index}`} feedback={feedback} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};