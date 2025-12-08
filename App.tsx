
import React, { useState, useCallback } from 'react';
import { Page, Program, Agency, Course, User, ContentPageData } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProgramsPage } from './pages/ProgramsPage';
import { ProgramDetailPage } from './pages/ProgramDetailPage';
import { InteractiveMapPage } from './pages/InteractiveMapPage';
import { KnowledgeHubPage } from './pages/KnowledgeHubPage';
import { ReportModal } from './components/ReportModal';
import { citySafetyData, courses, programs, agencies } from './data/mockData';
import { CheckmarkIcon } from './components/icons/CheckmarkIcon';
import { ProgramCard } from './components/ProgramCard';
import { ContentPage } from './pages/ContentPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { LoginPage } from './pages/LoginPage';
import { InfoRequestModal } from './components/InfoRequestModal';
import { AboutPage } from './pages/AboutPage';


import { AgencyDashboardPage } from './pages/AgencyDashboardPage';

const AgencyDetailPage: React.FC<{
  agency: Agency;
  allPrograms: Program[];
  onProgramSelect: (program: Program) => void;
  onBack: () => void;
}> = ({ agency, allPrograms, onProgramSelect, onBack }) => {
  const agencyPrograms = allPrograms.filter(p => p.agency.id === agency.id);

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-250px)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={onBack} className="mb-8 text-rose-500 hover:text-rose-400 font-semibold">&larr; Voltar para Agências</button>
        
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
            <div className="flex items-center gap-6 mb-4">
                <img src={agency.logo} alt={agency.name} className="w-20 h-20 rounded-full border border-gray-100 shadow-sm" />
                <h1 className="text-4xl font-extrabold text-gray-900">{agency.name}</h1>
            </div>
            
            <p className="mt-4 text-lg text-gray-600">{agency.description}</p>
             <div className="mt-6 border-t pt-6">
                <h4 className="text-md font-semibold uppercase tracking-wide text-gray-600 mb-4">Certificações de Elite</h4>
                <ul className="space-y-3">
                    {agency.certifications?.map(cert => (
                        <li key={cert} className="flex items-center text-gray-800">
                        <CheckmarkIcon className="w-6 h-6 text-rose-500 mr-3 flex-shrink-0" />
                        <span>{cert}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Programas Oferecidos ({agencyPrograms.length})</h2>

        {agencyPrograms.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agencyPrograms.map(program => (
              <ProgramCard key={program.id} program={program} onSelect={onProgramSelect} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p>Nenhum programa encontrado para esta agência no momento.</p>
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [allPrograms, setAllPrograms] = useState<Program[]>(programs);
  const [allCourses, setAllCourses] = useState<Course[]>(courses);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');
  const [initialAgencyId, setInitialAgencyId] = useState('');
  const [contentPageData, setContentPageData] = useState<ContentPageData | null>(null);
  const [history, setHistory] = useState<Page[]>(['home']);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [infoRequestProgram, setInfoRequestProgram] = useState<Program | null>(null);

  const navigate = useCallback((page: Page) => {
    setHistory(prev => (prev[prev.length - 1] !== page ? [...prev, page] : prev));
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    if (user.email === 'agencia@app.com.br') {
      navigate('agencyDashboard');
    } else {
      navigate('home');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('home');
  };

  // CRUD Operations for Agency Dashboard
  const handleUpdateProgram = (updatedProgram: Program) => {
    setAllPrograms(prev => prev.map(p => p.id === updatedProgram.id ? updatedProgram : p));
  };

  const handleAddProgram = (newProgram: Program) => {
    setAllPrograms(prev => [...prev, newProgram]);
  };

  const handleDeleteProgram = (programId: number) => {
    setAllPrograms(prev => prev.filter(p => p.id !== programId));
  };

  const handleUpdateCourse = (updatedCourse: Course) => {
    setAllCourses(prev => prev.map(c => c.id === updatedCourse.id ? updatedCourse : c));
  };

  const handleAddCourse = (newCourse: Course) => {
    setAllCourses(prev => [...prev, newCourse]);
  };

  const handleDeleteCourse = (courseId: number) => {
    setAllCourses(prev => prev.filter(c => c.id !== courseId));
  };

  const handleBack = () => {
    const newHistory = [...history];
    newHistory.pop();
    const previousPage = newHistory[newHistory.length - 1] || 'home';
    setHistory(newHistory.length > 0 ? newHistory : ['home']);
    setCurrentPage(previousPage);
    window.scrollTo(0, 0);
  };
  
  const handleProgramSelect = (program: Program) => {
    setSelectedProgram(program);
    navigate('programDetail');
  };
  
  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    navigate('courseDetail');
  };

  const handleAgencySelect = (agency: Agency) => {
    setSelectedAgency(agency);
    navigate('agencyDetail');
  };

  const handleNavigate = (page: Page) => {
    if (page === 'programs') {
        setInitialQuery('');
        setInitialAgencyId('');
    }
    navigate(page);
  };

  const handleNavigateToContent = (data: ContentPageData) => {
      setContentPageData(data);
      navigate('contentPage');
  }
  
  const handleSearch = (query: string) => {
    setInitialQuery(query);
    setInitialAgencyId('');
    navigate('programs');
  };

  const handleViewAgencyPrograms = (agencyId: number) => {
    setInitialQuery('');
    setInitialAgencyId(agencyId.toString());
    navigate('programs');
  };

  const handleInfoRequest = (program: Program) => {
    setInfoRequestProgram(program);
    setInfoModalOpen(true);
  };

  const getActivePageForHeader = (): Page => {
    return currentPage;
  };


  const renderPage = () => {
    switch (currentPage) {
      case 'programs':
        return <ProgramsPage
          allPrograms={allPrograms}
          allAgencies={agencies}
          onProgramSelect={handleProgramSelect}
          onBack={handleBack}
          initialQuery={initialQuery}
          initialAgencyId={initialAgencyId}
        />;
      case 'programDetail':
          if (selectedProgram) {
            return <ProgramDetailPage 
              program={selectedProgram} 
              onBack={handleBack} 
              onReport={() => setReportModalOpen(true)} 
              onInfoRequest={handleInfoRequest}
              onNavigateToContent={handleNavigateToContent}
              courses={allCourses}                        // <-- nova prop: lista completa de cursos
              onCourseSelect={handleCourseSelect}      // <-- nova prop: handler ao selecionar curso
              onNavigateToHub={() => navigate('hub')}
            />;
          }
        return <HomePage onProgramSelect={handleProgramSelect} onNavigate={handleNavigate} onSearch={handleSearch}/>;
      case 'agencyDetail':
        if (selectedAgency) {
            return <AgencyDetailPage
                agency={selectedAgency}
                allPrograms={allPrograms}
                onProgramSelect={handleProgramSelect}
                onBack={handleBack}
            />;
        }
         return <HomePage onProgramSelect={handleProgramSelect} onNavigate={handleNavigate} onSearch={handleSearch}/>;
      case 'map':
        return <InteractiveMapPage cities={citySafetyData} onProgramSelect={handleProgramSelect} />;
      case 'hub':
        return <KnowledgeHubPage courses={allCourses} programs={allPrograms} onCourseSelect={handleCourseSelect} onProgramSelect={handleProgramSelect} />;
       case 'courseDetail':
        if (selectedCourse) {
            const relatedProgram = allPrograms.find(p => p.id === selectedCourse.programId);
            if (relatedProgram) {
                return <CourseDetailPage 
                    course={selectedCourse} 
                    relatedProgram={relatedProgram} 
                    onBack={handleBack} 
                    onViewAgencyPrograms={handleViewAgencyPrograms}
                />;
            }
        }
        return <KnowledgeHubPage courses={allCourses} programs={allPrograms} onCourseSelect={handleCourseSelect} onProgramSelect={handleProgramSelect} />;
      case 'contentPage':
        if (contentPageData) {
            return <ContentPage data={contentPageData} onBack={handleBack} />;
        }
        return <HomePage onProgramSelect={handleProgramSelect} onNavigate={handleNavigate} onSearch={handleSearch}/>;
      case 'about':
        return <AboutPage />;
      case 'agencyDashboard':
        // Mocking the logged-in agency as the first one for now, or finding one that matches the user if we had that link.
        // Since the login is hardcoded, we'll use the first agency from the mock data as the "logged in" agency.
        const loggedInAgency = agencies[0]; 
        return <AgencyDashboardPage 
          agency={loggedInAgency}
          programs={allPrograms}
          courses={allCourses}
          onUpdateProgram={handleUpdateProgram}
          onAddProgram={handleAddProgram}
          onDeleteProgram={handleDeleteProgram}
          onUpdateCourse={handleUpdateCourse}
          onAddCourse={handleAddCourse}
          onDeleteCourse={handleDeleteCourse}
          onLogout={handleLogout}
        />;
      case 'login':
        return <LoginPage onBack={() => navigate('home')} onLogin={handleLogin} />;
      case 'home':
      default:
        return <HomePage onProgramSelect={handleProgramSelect} onNavigate={handleNavigate} onSearch={handleSearch} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header 
        onNavigate={handleNavigate} 
        activePage={getActivePageForHeader()}
        currentUser={currentUser}
        onLogout={handleLogout}
      />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer onNavigateToContent={handleNavigateToContent} />
      {selectedProgram && (
        <ReportModal 
          isOpen={isReportModalOpen} 
          onClose={() => setReportModalOpen(false)} 
          program={selectedProgram}
        />
      )}
      {infoRequestProgram && (
        <InfoRequestModal 
          isOpen={isInfoModalOpen} 
          onClose={() => setInfoModalOpen(false)} 
          program={infoRequestProgram}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

export default App;
