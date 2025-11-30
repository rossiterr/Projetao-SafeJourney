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

  // Filter data for this agency
  const myPrograms = programs.filter(p => p.agency.id === agency.id);
  const myCourses = courses.filter(c => myPrograms.some(p => p.id === c.programId)); // Assuming courses are linked to programs, or we filter by agency if course had agencyId directly. 
  // Looking at types.ts, Course has programId. Program has agency. So this logic holds.

  // Stats
  const totalPrograms = myPrograms.length;
  const totalCourses = myCourses.length;
  const allFeedbacks = myPrograms.flatMap(p => p.feedbacks);
  const avgRating = allFeedbacks.length > 0 
    ? allFeedbacks.reduce((acc, curr) => acc + curr.rating, 0) / allFeedbacks.length 
    : 0;

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Painel da Agência</h1>
            <span className="ml-4 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-sm font-medium">
              {agency.name}
            </span>
          </div>
          <button onClick={onLogout} className="text-gray-600 hover:text-gray-900">Sair</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm capitalize`}
              >
                {tab === 'overview' ? 'Visão Geral' : tab === 'programs' ? 'Meus Programas' : 'Cursos e Mentorias'}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total de Programas</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{totalPrograms}</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Total de Cursos/Mentorias</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900">{totalCourses}</dd>
              </div>
            </div>
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <dt className="text-sm font-medium text-gray-500 truncate">Avaliação Média</dt>
                <dd className="mt-1 text-3xl font-semibold text-gray-900 flex items-center">
                  {avgRating.toFixed(1)} <StarIcon className="w-6 h-6 text-yellow-400 ml-2" />
                </dd>
              </div>
            </div>
            
            <div className="col-span-3 mt-8">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Feedbacks Recentes</h3>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {allFeedbacks.slice(0, 5).map((feedback) => (
                            <li key={feedback.id} className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <img className="h-10 w-10 rounded-full" src={feedback.avatar} alt="" />
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-rose-600 truncate">{feedback.author}</p>
                                            <p className="text-sm text-gray-500">{feedback.comment}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-sm text-gray-500 mr-2">{feedback.rating}</span>
                                        <StarIcon className="h-5 w-5 text-yellow-400" />
                                    </div>
                                </div>
                            </li>
                        ))}
                        {allFeedbacks.length === 0 && <li className="px-4 py-4 text-gray-500">Nenhum feedback ainda.</li>}
                    </ul>
                </div>
            </div>
          </div>
        )}

        {activeTab === 'programs' && (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => { setEditingProgram(null); setProgramModalOpen(true); }}
                className="bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700"
              >
                Novo Programa
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
              <div className="text-center py-16 text-gray-500 bg-white rounded-lg shadow">
                <p>Nenhum programa cadastrado.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'courses' && (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => { setEditingCourse(null); setCourseModalOpen(true); }}
                className="bg-rose-600 text-white px-4 py-2 rounded-md hover:bg-rose-700"
              >
                Novo Curso/Mentoria
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
              <div className="text-center py-16 text-gray-500 bg-white rounded-lg shadow">
                <p>Nenhum curso ou mentoria cadastrado.</p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Program Modal */}
      {isProgramModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">{editingProgram ? 'Editar Programa' : 'Novo Programa'}</h2>
            <form onSubmit={handleSaveProgram} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nome</label>
                <input name="name" defaultValue={editingProgram?.name} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Cidade</label>
                    <input name="destinationCity" defaultValue={editingProgram?.destinationCity} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">País</label>
                    <input name="destinationCountry" defaultValue={editingProgram?.destinationCountry} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preço</label>
                <input name="price" type="number" defaultValue={editingProgram?.price} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea name="longDescription" defaultValue={editingProgram?.longDescription} required rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Inclusos (separados por vírgula)</label>
                <input name="includes" defaultValue={editingProgram?.includes?.join(', ') || ''} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setProgramModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Program View Modal */}
      {isViewModalOpen && viewingProgram && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
             <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{viewingProgram.name}</h2>
                <button onClick={() => setViewModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Fechar</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
             </div>
             
             <img src={viewingProgram.image} alt={viewingProgram.name} className="w-full h-64 object-cover rounded-lg mb-6" />
             
             <div className="space-y-4">
                <div className="flex justify-between text-lg border-b pb-2">
                    <span className="font-semibold text-gray-700">Localização:</span>
                    <span>{viewingProgram.destinationCity}, {viewingProgram.destinationCountry}</span>
                </div>
                <div className="flex justify-between text-lg border-b pb-2">
                    <span className="font-semibold text-gray-700">Preço:</span>
                    <span className="font-bold text-rose-600">${viewingProgram.price}</span>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Descrição Completa</h3>
                    <p className="text-gray-600 whitespace-pre-line text-sm">{viewingProgram.longDescription}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">O que está incluso</h3>
                    <ul className="list-disc list-inside text-gray-600 text-sm">
                        {viewingProgram.includes.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
             </div>

             <div className="mt-8 flex justify-end space-x-3 border-t pt-6">
                <button 
                    onClick={() => {
                        setViewModalOpen(false);
                        setEditingProgram(viewingProgram);
                        setProgramModalOpen(true);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
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
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    Excluir
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Course Modal */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-xl font-bold mb-4">{editingCourse ? 'Editar Curso/Mentoria' : 'Novo Curso/Mentoria'}</h2>
            <form onSubmit={handleSaveCourse} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input name="title" defaultValue={editingCourse?.title} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo</label>
                <select name="type" defaultValue={editingCourse?.type || 'Curso'} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                    <option value="Curso">Curso</option>
                    <option value="Mentoria">Mentoria</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Programa Vinculado</label>
                <select name="programId" defaultValue={editingCourse?.programId} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
                    {myPrograms.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Instrutor</label>
                <input name="instructor" defaultValue={editingCourse?.instructor} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Parceiro</label>
                <input name="partner" defaultValue={editingCourse?.partner} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Preço</label>
                <input name="price" type="number" defaultValue={editingCourse?.price} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <textarea name="description" defaultValue={editingCourse?.description} required rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button type="button" onClick={() => setCourseModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Course View Modal */}
      {isCourseViewModalOpen && viewingCourse && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
             <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{viewingCourse.title}</h2>
                <button onClick={() => setCourseViewModalOpen(false)} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Fechar</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
             </div>
             
             <div className="space-y-4">
                <div className="flex justify-between text-lg border-b pb-2">
                    <span className="font-semibold text-gray-700">Tipo:</span>
                    <span className={`px-2 py-1 rounded-full text-sm font-semibold ${viewingCourse.type === 'Curso' ? 'bg-rose-100 text-rose-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {viewingCourse.type}
                    </span>
                </div>
                <div className="flex justify-between text-lg border-b pb-2">
                    <span className="font-semibold text-gray-700">Preço:</span>
                    <div className="text-right">
                        {viewingCourse.discountPercentage && viewingCourse.discountPercentage > 0 ? (
                            <>
                                <span className="text-gray-500 line-through text-sm mr-2">${viewingCourse.price}</span>
                                <span className="font-bold text-rose-600">${Math.round(viewingCourse.price * (1 - viewingCourse.discountPercentage / 100))}</span>
                                <span className="ml-2 text-xs text-red-600 font-semibold">({viewingCourse.discountPercentage}% OFF)</span>
                            </>
                        ) : (
                            <span className="font-bold text-rose-600">${viewingCourse.price}</span>
                        )}
                    </div>
                </div>
                
                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Instrutor</h3>
                    <p className="text-gray-600">{viewingCourse.instructor}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Parceiro</h3>
                    <p className="text-gray-600">{viewingCourse.partner}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Descrição</h3>
                    <p className="text-gray-600 whitespace-pre-line">{viewingCourse.description}</p>
                </div>

                <div>
                    <h3 className="font-semibold text-gray-700 mb-2">Programa Vinculado</h3>
                    <p className="text-gray-600">
                        {myPrograms.find(p => p.id === viewingCourse.programId)?.name || 'Programa não encontrado'}
                    </p>
                </div>
             </div>

             <div className="mt-8 flex justify-end space-x-3 border-t pt-6">
                <button 
                    onClick={() => {
                        setCourseViewModalOpen(false);
                        setEditingCourse(viewingCourse);
                        setCourseModalOpen(true);
                    }}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
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
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
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
