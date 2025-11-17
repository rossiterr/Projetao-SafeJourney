
import React, { useState, useRef, useEffect } from 'react';
import { Program } from '../types';
import { ProgramCard } from '../components/ProgramCard';
import { programs, feedbacks } from '../data/mockData';
import { FeedbackCard } from '../components/FeedbackCard';
import { MapPinIcon } from '../components/icons/MapPinIcon';

const BookOpenIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
);


interface HomePageProps {
  onProgramSelect: (program: Program) => void;
  onNavigate: (page: 'map' | 'hub' | 'programs') => void;
  onSearch: (query: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onProgramSelect, onNavigate, onSearch }) => {
  const [query, setQuery] = useState('');
  const recommendedPrograms = programs.slice(0, 3);
  const testimonialFeedbacks = feedbacks.filter(f => f.rating >= 4).slice(0, 15);

  const marqueeRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!marqueeRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - marqueeRef.current.offsetLeft;
    scrollLeft.current = marqueeRef.current.scrollLeft;
    marqueeRef.current.style.cursor = 'grabbing';
    marqueeRef.current.style.scrollBehavior = 'auto';
  };

  const handleMouseLeave = () => {
    if (!marqueeRef.current) return;
    isDragging.current = false;
    marqueeRef.current.style.cursor = 'grab';
  };

  const handleMouseUp = () => {
    if (!marqueeRef.current) return;
    isDragging.current = false;
    marqueeRef.current.style.cursor = 'grab';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !marqueeRef.current) return;
    e.preventDefault();
    const x = e.pageX - marqueeRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    marqueeRef.current.scrollLeft = scrollLeft.current - walk;
  };

  useEffect(() => {
    let animationFrameId: number;
    const marquee = marqueeRef.current;

    const scroll = () => {
        if (marquee && !isPaused.current && !isDragging.current) {
            marquee.scrollLeft += 0.5;
            if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
                marquee.scrollLeft = 0;
            }
        }
        animationFrameId = requestAnimationFrame(scroll);
    };

    const pause = () => { isPaused.current = true; };
    const play = () => { isPaused.current = false; };

    if (marquee) {
        marquee.addEventListener('mouseenter', pause);
        marquee.addEventListener('mouseleave', play);
        scroll();
    }
    
    return () => {
        cancelAnimationFrame(animationFrameId);
        if (marquee) {
            marquee.removeEventListener('mouseenter', pause);
            marquee.removeEventListener('mouseleave', play);
        }
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="bg-gray-50 w-full overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <img 
            src="https://borealisexpedicoes.com.br/wp-content/uploads/2025/06/mulher-viagem-solo-suecia-agnieszka-boeske-cfdh_t5xbxk-unsplash-scaled-1.jpg" 
            alt="Mulher viajante com capa de chuva amarela contempla uma paisagem montanhosa, simbolizando aventura, segurança e a alegria de viajar sozinha."
            className="absolute inset-0 w-full h-full object-cover opacity-20"
            aria-hidden="true"
        />
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
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
                        className="flex-grow w-full px-5 py-3 text-base text-gray-900 placeholder-gray-500 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#66CDAA] focus:border-[#66CDAA]"
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
                <div className="relative bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden" onClick={() => onNavigate('map')}>
                    <img src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=2531&auto=format&fit=crop" alt="Mapa mundi decorativo em uma parede de tijolos" className="absolute inset-0 w-full h-full object-cover opacity-10" />
                    <div className="relative">
                        <div className="flex justify-center mb-4">
                            <MapPinIcon className="w-12 h-12 text-[#5F9EA0]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#5F9EA0]">Mapa Interativo de Avaliações</h3>
                        <p className="mt-2 text-gray-600">Explore destinos com base em feedbacks reais de avaliações de outras intercambistas.</p>
                    </div>
                </div>
                <div className="relative bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden" onClick={() => onNavigate('hub')}>
                    <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2670&auto=format&fit=crop" alt="Fundo de biblioteca" className="absolute inset-0 w-full h-full object-cover opacity-10" />
                    <div className="relative">
                        <div className="flex justify-center mb-4">
                            <BookOpenIcon className="w-12 h-12 text-[#5F9EA0]" />
                        </div>
                        <h3 className="text-2xl font-bold text-[#5F9EA0]">Hub de Conhecimento e Cursos</h3>
                        <p className="mt-2 text-gray-600">Acesse cursos e mentorias para se preparar para sua jornada.</p>
                    </div>
                </div>
            </div>
        </div>

      {/* Testimonials Section */}
      <div className="bg-white py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">O que nossas viajantes dizem</h2>
          <div 
            className="relative w-full overflow-x-scroll hide-scrollbar"
            ref={marqueeRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            style={{ cursor: 'grab' }}
          >
            <div className="flex">
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
