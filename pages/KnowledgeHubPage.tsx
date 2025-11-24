import React, { useState, useMemo, useEffect } from 'react';
import { Course, Program } from '../types';
import { CourseCard } from '../components/CourseCard';
import { ArrowUpIcon } from '../components/icons/ArrowUpIcon';
import { ChevronDownIcon } from '../components/icons/ChevronDownIcon';

interface KnowledgeHubPageProps {
    courses: Course[];
    programs: Program[];
    onCourseSelect: (course: Course) => void;
    onProgramSelect: (program: Program) => void;
}

export const KnowledgeHubPage: React.FC<KnowledgeHubPageProps> = ({ courses, programs, onCourseSelect, onProgramSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedPartner, setSelectedPartner] = useState('');
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
    const [selectedOffer, setSelectedOffer] = useState<'discounted' | 'free' | ''>('');
    const [selectedInstructor, setSelectedInstructor] = useState('');

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

    const uniquePartners = useMemo(() => {
        const partners = new Set<string>();
        courses.forEach(c => partners.add(c.partner));
        return Array.from(partners).sort();
    }, [courses]);

    const uniqueInstructors = useMemo(() => {
        const instructors = new Set<string>();
        courses.forEach(c => instructors.add(c.instructor));
        return Array.from(instructors).sort();
    }, [courses]);

    const filteredCourses = useMemo(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        return courses.filter(course => {
            const queryMatch = lowerCaseQuery
                ? course.title.toLowerCase().includes(lowerCaseQuery) ||
                  course.description.toLowerCase().includes(lowerCaseQuery)
                : true;

            const typeMatch = selectedType
                ? course.type === selectedType
                : true;

            const partnerMatch = selectedPartner
                ? course.partner === selectedPartner
                : true;
            
            const offerMatch = (() => {
                if (!selectedOffer) return true;
                if (selectedOffer === 'discounted') return course.discountPercentage && course.discountPercentage > 0;
                if (selectedOffer === 'free') return course.discountPercentage === 100;
                return true;
            })();

            const instructorMatch = selectedInstructor
                ? course.instructor === selectedInstructor
                : true;

            return queryMatch && typeMatch && partnerMatch && offerMatch && instructorMatch;
        });
    }, [courses, searchQuery, selectedType, selectedPartner, selectedOffer, selectedInstructor]);

    return (
        <div className="bg-gray-50">
            <div className="relative bg-white overflow-hidden">
                <div className="relative flex flex-col justify-center items-center py-20 md:pt-40 pb-12 px-4 sm:px-6 lg:px-8">
                    <img 
                        src="https://s2.glbimg.com/g18hv5FkXbv8BdUJ9WCD9kjkZIM=/smart/e.glbimg.com/og/ed/f/original/2022/03/08/alexandra-fuller-wkgv7i2vtzm-unsplash.jpg"
                        alt="Mulher lendo um livro, simbolizando conhecimento e preparação."
                        className="absolute inset-0 w-full h-full object-cover opacity-20 md:object-[center_85%]"
                        aria-hidden="true"
                    />
                    <div className="relative container mx-auto text-center">
                        <h1 className="text-4xl font-extrabold text-gray-900">Hub de Conhecimento</h1>
                        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
                            Cursos e mentorias para empoderar sua jornada. Desenvolvido pela equipe Woman GO Safe e nossos parceiros.
                        </p>
                    </div>
                    
                    <div className="relative container mx-auto mt-24 w-full max-w-5xl">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                    placeholder="Buscar por nome, descrição..."
                                    className="w-full px-4 py-3 text-base text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-400"
                                />
                                <select
                                    value={selectedType}
                                    onChange={e => setSelectedType(e.target.value)}
                                    className="w-full px-4 py-3 text-base text-gray-900 bg-gray-100 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-400"
                                >
                                    <option value="">Todos os Tipos</option>
                                    <option value="Curso">Curso</option>
                                    <option value="Mentoria">Mentoria</option>
                                </select>
                                <select
                                    value={selectedPartner}
                                    onChange={e => setSelectedPartner(e.target.value)}
                                    className="w-full px-4 py-3 text-base text-gray-900 bg-gray-100 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-400"
                                >
                                    <option value="">Todos os Parceiros</option>
                                    {uniquePartners.map(partner => <option key={partner} value={partner}>{partner}</option>)}
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
                                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Filtrar por Ofertas Especiais:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <button
                                            onClick={() => setSelectedOffer(prev => prev === 'discounted' ? '' : 'discounted')}
                                            className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                                                selectedOffer === 'discounted'
                                                    ? 'bg-rose-400 text-white border-[#5F9EA0]'
                                                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                                            }`}
                                        >
                                            Com Desconto
                                        </button>
                                        <button
                                            onClick={() => setSelectedOffer(prev => prev === 'free' ? '' : 'free')}
                                            className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                                                selectedOffer === 'free'
                                                    ? 'bg-[#DAA520] text-white border-[#DAA520]'
                                                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
                                            }`}
                                        >
                                            Grátis com Programa
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-gray-600 mb-2">Filtrar por Instrutor(a):</h4>
                                    <select
                                        value={selectedInstructor}
                                        onChange={e => setSelectedInstructor(e.target.value)}
                                        className="w-full px-4 py-3 text-base text-gray-900 bg-gray-100 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-400"
                                    >
                                        <option value="">Todos os Instrutores</option>
                                        {uniqueInstructors.map(instructor => <option key={instructor} value={instructor}>{instructor}</option>)}
                                    </select>
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
                        {filteredCourses.length} curso(s) encontrado(s).
                    </p>
                </div>
                {filteredCourses.length > 0 ? (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {filteredCourses.map(course => {
                            const relatedProgram = programs.find(p => p.id === course.programId);
                            return (
                                <CourseCard 
                                    key={course.id} 
                                    course={course} 
                                    program={relatedProgram}
                                    onSelect={onCourseSelect} 
                                    onProgramLinkSelect={onProgramSelect}
                                />
                            );
                        })}
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