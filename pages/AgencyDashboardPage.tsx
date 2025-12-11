import React, { useState } from 'react';
import { Program, Course, Agency, Feedback } from '../types';
import { StarIcon } from '../components/icons/StarIcon';
import { CheckmarkIcon } from '../components/icons/CheckmarkIcon';
import { ProgramCard } from '../components/ProgramCard';
import { CourseCard } from '../components/CourseCard';

interface AgencyDashboardProps {
  agency: Agency;
  programs: Program[];
  courses: Course[];
  onUpdateProgram: (program: Program) => void;
  onAddProgram: (program: Program) => void;
  onDeleteProgram: (programId: number) => void;
  onUpdateCourse: (course: Course) => void;
  onAddCourse: (course: Course) => void;
  onDeleteCourse: (courseId: number) => void;
  onLogout: () => void;
}

export const AgencyDashboardPage: React.FC<AgencyDashboardProps> = ({
  agency,
  programs,
  courses,
  onUpdateProgram,
  onAddProgram,
  onDeleteProgram,
  onUpdateCourse,
  onAddCourse,
  onDeleteCourse,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'programs' | 'courses'>('overview');
  const [isProgramModalOpen, setProgramModalOpen] = useState(false);
  const [isCourseModalOpen, setCourseModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isCourseViewModalOpen, setCourseViewModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [viewingProgram, setViewingProgram] = useState<Program | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [viewingCourse, setViewingCourse] = useState<Course | null>(null);
  const [selectedProgramForFeedbacks, setSelectedProgramForFeedbacks] = useState<Program | null>(null);
  const [isFeedbacksModalOpen, setFeedbacksModalOpen] = useState(false);

  // Filter data for this agency
  const myPrograms = programs.filter(p => p.agency.id === agency.id);
  const myCourses = courses.filter(c => myPrograms.some(p => p.id === c.programId));

  // Enhanced Stats with more details
  const totalPrograms = myPrograms.length;
  const totalCourses = myCourses.length;
  const allFeedbacks = myPrograms.flatMap(p => p.feedbacks);
  const totalFeedbacks = allFeedbacks.length;
  const avgRating = allFeedbacks.length > 0 
    ? allFeedbacks.reduce((acc, curr) => acc + curr.rating, 0) / allFeedbacks.length 
    : 0;

  // Program performance stats
  const programStats = myPrograms.map(program => {
    const programFeedbacks = program.feedbacks;
    const programAvgRating = programFeedbacks.length > 0
      ? programFeedbacks.reduce((acc, curr) => acc + curr.rating, 0) / programFeedbacks.length
      : 0;
    return {
      program,
      avgRating: programAvgRating,
      feedbackCount: programFeedbacks.length
    };
  }).sort((a, b) => b.avgRating - a.avgRating);

  // Get feedbacks with program context
  const feedbacksWithProgram = allFeedbacks.map(feedback => {
    const program = myPrograms.find(p => p.feedbacks.some(f => f.id === feedback.id));
    return { feedback, program };
  }).sort((a, b) => new Date(b.feedback.date).getTime() - new Date(a.feedback.date).getTime());

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newProgram: Program = {
      id: editingProgram ? editingProgram.id : Date.now(),
      name: formData.get('name') as string,
      agency: agency,
      destinationCity: formData.get('destinationCity') as string,
      destinationCountry: formData.get('destinationCountry') as string,
      price: Number(formData.get('price')),
      shortDescription: (formData.get('longDescription') as string).substring(0, 100) + '...',
      longDescription: formData.get('longDescription') as string,
      includes: (formData.get('includes') as string).split(',').map(s => s.trim()).filter(s => s !== ''),
      feedbacks: editingProgram ? editingProgram.feedbacks : [],
      image: editingProgram ? editingProgram.image : 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', // Default image
      verifications: editingProgram ? editingProgram.verifications : []
    };

    if (editingProgram) {
      onUpdateProgram(newProgram);
    } else {
      onAddProgram(newProgram);
    }
    setProgramModalOpen(false);
    setEditingProgram(null);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const newCourse: Course = {
      id: editingCourse ? editingCourse.id : Date.now(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      instructor: formData.get('instructor') as string,
      partner: formData.get('partner') as string,
      price: Number(formData.get('price')),
      programId: Number(formData.get('programId')),
      type: formData.get('type') as 'Curso' | 'Mentoria',
      discountPercentage: Number(formData.get('discountPercentage')) || 0
    };

    if (editingCourse) {
      onUpdateCourse(newCourse);
    } else {
      onAddCourse(newCourse);
    }
    setCourseModalOpen(false);
    setEditingCourse(null);
  };

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-80px)]">
      {/* CSS Local para forçar scrollbar clara e inputs claros */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6; /* cinza bem claro */
          border-radius: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #d1d5db; /* cinza médio */
          border-radius: 6px;
          border: 2px solid #f3f4f6;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #9ca3af;
        }
        /* Forçar esquema de cor clara para controles nativos neste componente */
        .force-light-scheme {
          color-scheme: light;
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Dashboard Title & Welcome */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">Painel da Agência</h1>
            <p className="mt-2 text-lg text-gray-600">Gerencie seus programas, cursos e visualize seu desempenho.</p>
          </div>
          <div className="flex items-center">
            <span className="px-4 py-2 rounded-full bg-rose-100 text-rose-800 text-lg font-bold shadow-sm">
              {agency.name}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {['overview', 'programs', 'courses'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`${
                  activeTab === tab
                    ? 'border-rose-500 text-rose-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-lg capitalize transition-colors`}
              >
                {tab === 'overview' ? 'Visão Geral' : tab === 'programs' ? 'Meus Programas' : 'Cursos e Mentorias'}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              <div className="bg-gradient-to-br from-rose-500 to-pink-600 overflow-hidden shadow-lg rounded-xl p-6 text-white">
                  <dt className="text-sm font-medium uppercase tracking-wider opacity-90">Total de Programas</dt>
                  <dd className="mt-2 text-5xl font-extrabold">{totalPrograms}</dd>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-indigo-600 overflow-hidden shadow-lg rounded-xl p-6 text-white">
                  <dt className="text-sm font-medium uppercase tracking-wider opacity-90">Cursos/Mentorias</dt>
                  <dd className="mt-2 text-5xl font-extrabold">{totalCourses}</dd>
              </div>
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 overflow-hidden shadow-lg rounded-xl p-6 text-white">
                  <dt className="text-sm font-medium uppercase tracking-wider opacity-90">Avaliação Média</dt>
                  <dd className="mt-2 text-5xl font-extrabold flex items-center">
                    {avgRating.toFixed(1)} <StarIcon className="w-8 h-8 ml-2" />
                  </dd>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-teal-600 overflow-hidden shadow-lg rounded-xl p-6 text-white">
                  <dt className="text-sm font-medium uppercase tracking-wider opacity-90">Total de Feedbacks</dt>
                  <dd className="mt-2 text-5xl font-extrabold">{totalFeedbacks}</dd>
              </div>
            </div>

            {/* Programs Performance */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-1 h-8 bg-rose-500 mr-3 rounded"></span>
                Desempenho dos Programas
              </h3>
              <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                {programStats.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Programa</th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Destino</th>
                          <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Avaliação</th>
                          <th className="px-6 py-4 text-center text-xs font-bold text-gray-600 uppercase tracking-wider">Feedbacks</th>
                          <th className="px-6 py-4 text-right text-xs font-bold text-gray-600 uppercase tracking-wider">Preço</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {programStats.map(({ program, avgRating, feedbackCount }) => (
                          <tr 
                            key={program.id} 
                            className="hover:bg-gray-50 transition-colors cursor-pointer"
                            onClick={() => {
                              setSelectedProgramForFeedbacks(program);
                              setFeedbacksModalOpen(true);
                            }}
                          >
                            <td className="px-6 py-4">
                              <div className="text-sm font-semibold text-gray-900">{program.name}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="text-sm text-gray-600">{program.destinationCity}, {program.destinationCountry}</div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <div className="inline-flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                                <span className="text-sm font-bold text-yellow-700 mr-1">
                                  {feedbackCount > 0 ? avgRating.toFixed(1) : 'N/A'}
                                </span>
                                {feedbackCount > 0 && <StarIcon className="h-4 w-4 text-yellow-400" />}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                                {feedbackCount}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className="text-sm font-bold text-gray-900">${program.price}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="px-6 py-12 text-center text-gray-500">
                    <p>Nenhum programa cadastrado ainda.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Recent Feedbacks with Program Context */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-1 h-8 bg-rose-500 mr-3 rounded"></span>
                Feedbacks Recentes
              </h3>
              <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                {feedbacksWithProgram.length > 0 ? (
                  <ul className="divide-y divide-gray-100">
                    {feedbacksWithProgram.slice(0, 8).map(({ feedback, program }) => (
                      <li key={feedback.id} className="px-6 py-5 hover:bg-gray-50 transition-colors">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div className="flex items-start flex-1">
                            <img className="h-12 w-12 rounded-full border-2 border-rose-200 shadow-sm flex-shrink-0" src={feedback.avatar} alt={feedback.author} />
                            <div className="ml-4 flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <p className="text-base font-semibold text-gray-900">{feedback.author}</p>
                                <span className="text-xs text-gray-500">•</span>
                                <span className="text-xs text-gray-500">{feedback.date}</span>
                              </div>
                              {program && (
                                <p className="text-sm text-rose-600 font-medium mt-1">
                                  {program.name}
                                </p>
                              )}
                              <p className="text-sm text-gray-600 mt-2 line-clamp-2">"{feedback.comment}"</p>
                            </div>
                          </div>
                          <div className="flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 px-4 py-2 rounded-full shadow-sm flex-shrink-0">
                            <span className="text-base font-bold text-yellow-700 mr-1">{feedback.rating}</span>
                            <StarIcon className="h-5 w-5 text-yellow-400" />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-6 py-12 text-center text-gray-500">
                    <p>Nenhum feedback recebido ainda.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'programs' && (
          <div>
            <div className="flex justify-end mb-8">
              <button
                onClick={() => { setEditingProgram(null); setProgramModalOpen(true); }}
                className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 font-bold shadow-md transition-transform transform hover:scale-105"
              >
                + Novo Programa
              </button>
            </div>
            
            {myPrograms.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {myPrograms.map(program => (
                  <ProgramCard 
                    key={program.id} 
                    program={program} 
                    onSelect={(p) => {
                      setViewingProgram(p);
                      setViewModalOpen(true);
                    }} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-200">
                <p className="text-lg">Você ainda não tem programas cadastrados.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <div className="flex justify-end mb-8">
              <button
                onClick={() => { setEditingCourse(null); setCourseModalOpen(true); }}
                className="bg-rose-500 text-white px-6 py-3 rounded-lg hover:bg-rose-600 font-bold shadow-md transition-transform transform hover:scale-105"
              >
                + Novo Curso/Mentoria
              </button>
            </div>
            
            {myCourses.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {myCourses.map((course) => {
                  const relatedProgram = myPrograms.find(p => p.id === course.programId);
                  return (
                    <CourseCard 
                      key={course.id} 
                      course={course} 
                      program={relatedProgram}
                      onSelect={(c) => {
                        setViewingCourse(c);
                        setCourseViewModalOpen(true);
                      }}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-24 text-gray-500 bg-white rounded-xl shadow-sm border border-gray-200">
                <p className="text-lg">Você ainda não tem cursos ou mentorias cadastradas.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Program Modal */}
      {isProgramModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[3000] backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto custom-scrollbar force-light-scheme">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">{editingProgram ? 'Editar Programa' : 'Novo Programa'}</h2>
            <form onSubmit={handleSaveProgram} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Nome do Programa</label>
                <input name="name" defaultValue={editingProgram?.name} required className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white text-gray-900" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Cidade</label>
                    <input name="destinationCity" defaultValue={editingProgram?.destinationCity} required className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white text-gray-900" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">País</label>
                    <input name="destinationCountry" defaultValue={editingProgram?.destinationCountry} required className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white text-gray-900" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Preço ($)</label>
                <input name="price" type="number" defaultValue={editingProgram?.price} required className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição Detalhada</label>
                <textarea name="longDescription" defaultValue={editingProgram?.longDescription} required rows={4} className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Inclusos (separados por vírgula)</label>
                <input name="includes" defaultValue={editingProgram?.includes?.join(', ') || ''} className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white text-gray-900" placeholder="Ex: Acomodação, Voo, Curso..." />
              </div>
              <div className="flex justify-end space-x-3 mt-8 pt-4 border-t">
                <button type="button" onClick={() => setProgramModalOpen(false)} className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 font-bold shadow-md">Salvar Programa</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Program View Modal */}
      {isViewModalOpen && viewingProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[3000] backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto custom-scrollbar force-light-scheme">
             <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-extrabold text-gray-900">{viewingProgram.name}</h2>
                <button onClick={() => setViewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Fechar</span>
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
             </div>
             
             <img src={viewingProgram.image} alt={viewingProgram.name} className="w-full h-64 object-cover rounded-xl shadow-md mb-8" />
             
             <div className="space-y-6">
                <div className="flex justify-between text-lg border-b border-gray-100 pb-3">
                    <span className="font-semibold text-gray-700">Localização:</span>
                    <span>{viewingProgram.destinationCity}, {viewingProgram.destinationCountry}</span>
                </div>
                <div className="flex justify-between text-lg border-b border-gray-100 pb-3">
                    <span className="font-semibold text-gray-700">Preço:</span>
                    <span className="font-bold text-rose-600 text-2xl">${viewingProgram.price}</span>
                </div>

                <div>
                    <h3 className="font-bold text-gray-800 mb-2">Descrição Completa</h3>
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">{viewingProgram.longDescription}</p>
                </div>

                <div>
                    <h3 className="font-bold text-gray-800 mb-2">O que está incluso</h3>
                    <div className="flex flex-wrap gap-2">
                        {viewingProgram.includes.map((item, idx) => (
                            <span key={idx} className="bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-sm font-medium border border-rose-100">{item}</span>
                        ))}
                    </div>
                </div>
             </div>

             <div className="mt-10 flex justify-end space-x-4 border-t pt-6">
                <button 
                    onClick={() => {
                        setViewModalOpen(false);
                        setEditingProgram(viewingProgram);
                        setProgramModalOpen(true);
                    }}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold shadow-sm"
                >
                    Editar
                </button>
                <button 
                    onClick={() => {
                        if(confirm('Tem certeza que deseja excluir este programa?')) {
                            onDeleteProgram(viewingProgram.id);
                            setViewModalOpen(false);
                        }
                    }}
                    className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold shadow-sm"
                >
                    Excluir
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Course Modal */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[3000] backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto custom-scrollbar force-light-scheme">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">{editingCourse ? 'Editar Curso/Mentoria' : 'Novo Curso/Mentoria'}</h2>
            <form onSubmit={handleSaveCourse} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Título</label>
                <input name="title" defaultValue={editingCourse?.title} required className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white text-gray-900" />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo</label>
                    <select name="type" defaultValue={editingCourse?.type || 'Curso'} className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white text-gray-900">
                        <option value="Curso">Curso</option>
                        <option value="Mentoria">Mentoria</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Programa Vinculado</label>
                    <select name="programId" defaultValue={editingCourse?.programId} required className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white text-gray-900">
                        {myPrograms.map(p => (
                            <option key={p.id} value={p.id}>{p.name}</option>
                        ))}
                    </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Instrutor</label>
                    <input name="instructor" defaultValue={editingCourse?.instructor} required className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white text-gray-900" />
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Parceiro</label>
                    <input name="partner" defaultValue={editingCourse?.partner} required className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white text-gray-900" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                 <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Preço ($)</label>
                    <input name="price" type="number" defaultValue={editingCourse?.price} required className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white text-gray-900" />
                 </div>
                 <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Desconto (%)</label>
                    <input name="discountPercentage" type="number" min="0" max="100" defaultValue={editingCourse?.discountPercentage} className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white text-gray-900" />
                 </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Descrição</label>
                <textarea name="description" defaultValue={editingCourse?.description} required rows={3} className="w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-rose-500 focus:outline-none bg-white text-gray-900" />
              </div>
              <div className="flex justify-end space-x-3 mt-8 pt-4 border-t">
                <button type="button" onClick={() => setCourseModalOpen(false)} className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">Cancelar</button>
                <button type="submit" className="px-5 py-2.5 bg-rose-600 text-white rounded-lg hover:bg-rose-700 font-bold shadow-md">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Program Feedbacks Modal */}
      {isFeedbacksModalOpen && selectedProgramForFeedbacks && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[3000] backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full p-8 max-h-[90vh] overflow-y-auto custom-scrollbar force-light-scheme">
            <div className="flex justify-between items-start mb-6 border-b pb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedProgramForFeedbacks.name}</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {selectedProgramForFeedbacks.destinationCity}, {selectedProgramForFeedbacks.destinationCountry}
                </p>
              </div>
              <button onClick={() => setFeedbacksModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">Fechar</span>
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-100">
                <p className="text-xs font-semibold text-gray-600 uppercase">Avaliação Média</p>
                <div className="flex items-center mt-2">
                  <span className="text-3xl font-bold text-yellow-700">
                    {selectedProgramForFeedbacks.feedbacks.length > 0 
                      ? (selectedProgramForFeedbacks.feedbacks.reduce((acc, f) => acc + f.rating, 0) / selectedProgramForFeedbacks.feedbacks.length).toFixed(1)
                      : 'N/A'
                    }
                  </span>
                  {selectedProgramForFeedbacks.feedbacks.length > 0 && <StarIcon className="w-6 h-6 text-yellow-400 ml-2" />}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
                <p className="text-xs font-semibold text-gray-600 uppercase">Total de Feedbacks</p>
                <p className="text-3xl font-bold text-blue-700 mt-2">{selectedProgramForFeedbacks.feedbacks.length}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-teal-50 p-4 rounded-lg border border-green-100">
                <p className="text-xs font-semibold text-gray-600 uppercase">Recomendações</p>
                <p className="text-3xl font-bold text-green-700 mt-2">
                  {selectedProgramForFeedbacks.feedbacks.filter(f => f.rating >= 4).length}
                </p>
              </div>
            </div>

            {/* Feedbacks List */}
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Todos os Feedbacks</h3>
              {selectedProgramForFeedbacks.feedbacks.length > 0 ? (
                <div className="space-y-4">
                  {selectedProgramForFeedbacks.feedbacks
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((feedback) => (
                      <div key={feedback.id} className="bg-gray-50 rounded-lg p-5 border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center">
                            <img 
                              src={feedback.avatar} 
                              alt={feedback.author} 
                              className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
                            />
                            <div className="ml-3">
                              <p className="font-semibold text-gray-900">{feedback.author}</p>
                              <p className="text-xs text-gray-500">{feedback.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1.5 rounded-full border border-yellow-200">
                            <span className="text-sm font-bold text-yellow-800 mr-1">{feedback.rating}</span>
                            <StarIcon className="h-4 w-4 text-yellow-600" />
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">"{feedback.comment}"</p>
                      </div>
                    ))
                  }
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Este programa ainda não recebeu nenhum feedback.</p>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t flex justify-end">
              <button 
                onClick={() => setFeedbacksModalOpen(false)}
                className="px-6 py-2.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold shadow-sm"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Course View Modal */}
      {isCourseViewModalOpen && viewingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[3000] backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto custom-scrollbar force-light-scheme">
             <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{viewingCourse.title}</h2>
                <button onClick={() => setCourseViewModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <span className="sr-only">Fechar</span>
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
             </div>
             
             <div className="space-y-6">
                <div className="flex justify-between text-lg border-b border-gray-100 pb-3">
                    <span className="font-semibold text-gray-700">Tipo:</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide ${viewingCourse.type === 'Curso' ? 'bg-rose-100 text-rose-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {viewingCourse.type}
                    </span>
                </div>
                <div className="flex justify-between text-lg border-b border-gray-100 pb-3">
                    <span className="font-semibold text-gray-700">Preço:</span>
                    <div className="text-right">
                        {viewingCourse.discountPercentage && viewingCourse.discountPercentage > 0 ? (
                            <>
                                <span className="text-gray-400 line-through text-base mr-2">${viewingCourse.price}</span>
                                <span className="font-bold text-rose-600 text-2xl">${Math.round(viewingCourse.price * (1 - viewingCourse.discountPercentage / 100))}</span>
                                <span className="ml-2 text-xs text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded-full">({viewingCourse.discountPercentage}% OFF)</span>
                            </>
                        ) : (
                            <span className="font-bold text-rose-600 text-2xl">${viewingCourse.price}</span>
                        )}
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Instrutor</h3>
                        <p className="text-gray-800 font-medium">{viewingCourse.instructor}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Parceiro</h3>
                        <p className="text-gray-800 font-medium">{viewingCourse.partner}</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold text-gray-800 mb-2">Descrição</h3>
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">{viewingCourse.description}</p>
                </div>

                <div className="bg-rose-50 p-4 rounded-lg border border-rose-100">
                    <h3 className="font-bold text-rose-800 mb-1">Programa Vinculado</h3>
                    <p className="text-rose-600 font-medium">
                        {myPrograms.find(p => p.id === viewingCourse.programId)?.name || 'Programa não encontrado'}
                    </p>
                </div>
             </div>

             <div className="mt-10 flex justify-end space-x-4 border-t pt-6">
                <button 
                    onClick={() => {
                        setCourseViewModalOpen(false);
                        setEditingCourse(viewingCourse);
                        setCourseModalOpen(true);
                    }}
                    className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold shadow-sm"
                >
                    Editar
                </button>
                <button 
                    onClick={() => {
                        if(confirm('Tem certeza que deseja excluir este curso/mentoria?')) {
                            onDeleteCourse(viewingCourse.id);
                            setCourseViewModalOpen(false);
                        }
                    }}
                    className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold shadow-sm"
                >
                    Excluir
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};