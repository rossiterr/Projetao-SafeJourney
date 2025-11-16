import React, { useState, useMemo, useEffect } from 'react';
import { Course, Program } from '../types';
import { CourseCard } from '../components/CourseCard';
import { ArrowUpIcon } from '../components/icons/ArrowUpIcon';

interface KnowledgeHubPageProps {
    courses: Course[];
    programs: Program[];
    onCourseSelect: (course: Course) => void;
}

export const KnowledgeHubPage: React.FC<KnowledgeHubPageProps> = ({ courses, programs, onCourseSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedPartner, setSelectedPartner] = useState('');
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

    const uniquePartners = useMemo(() => {
        const partners = new Set<string>();
        courses.forEach(c => partners.add(c.partner));
        return Array.from(partners).sort();
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

            return queryMatch && typeMatch && partnerMatch;
        });
    }, [courses, searchQuery, selectedType, selectedPartner]);

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900">Hub de Conhecimento</h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
                        Cursos e mentorias para empoderar sua jornada. Desenvolvido pela equipe SafeJourney e nossos parceiros.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md mb-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Buscar por nome, descrição..."
                            className="w-full px-4 py-3 text-base text-gray-900 placeholder-gray-500 bg-gray-100 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#66CDAA] focus:border-[#66CDAA]"
                        />
                        <select
                            value={selectedType}
                            onChange={e => setSelectedType(e.target.value)}
                            className="w-full px-4 py-3 text-base text-gray-900 bg-gray-100 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#66CDAA] focus:border-[#66CDAA]"
                        >
                            <option value="">Todos os Tipos</option>
                            <option value="Curso">Curso</option>
                            <option value="Mentoria">Mentoria</option>
                        </select>
                        <select
                            value={selectedPartner}
                            onChange={e => setSelectedPartner(e.target.value)}
                            className="w-full px-4 py-3 text-base text-gray-900 bg-gray-100 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#66CDAA] focus:border-[#66CDAA]"
                        >
                            <option value="">Todos os Parceiros</option>
                            {uniquePartners.map(partner => <option key={partner} value={partner}>{partner}</option>)}
                        </select>
                    </div>
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
                    className="fixed bottom-8 right-8 bg-[#66CDAA] text-white p-3 rounded-full shadow-lg hover:bg-[#5F9EA0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#66CDAA] transition-opacity duration-300 z-50"
                    aria-label="Ir para o topo"
                >
                    <ArrowUpIcon className="w-6 h-6" />
                </button>
            )}
        </div>
    );
};