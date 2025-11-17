import React, { useState, useCallback } from 'react';
import { Page, Program, Agency, Course, User } from './types';
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
        <button onClick={onBack} className="mb-8 text-[#66CDAA] hover:text-[#5F9EA0] font-semibold">&larr; Voltar para Agências</button>
        
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900">{agency.name}</h1>
            <p className="mt-4 text-lg text-gray-600">{agency.description}</p>
             <div className="mt-6 border-t pt-6">
                <h4 className="text-md font-semibold uppercase tracking-wide text-gray-600 mb-4">Certificações de Elite</h4>
                <ul className="space-y-3">
                    {agency.certifications?.map(cert => (
                        <li key={cert} className="flex items-center text-gray-800">
                        <CheckmarkIcon className="w-6 h-6 text-[#66CDAA] mr-3 flex-shrink-0" />
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

interface ContentPageData {
    title: string;
    body: string[];
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isReportModalOpen, setReportModalOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState('');
  const [initialAgencyId, setInitialAgencyId] = useState('');
  const [contentPageData, setContentPageData] = useState<ContentPageData | null>(null);
  const [history, setHistory] = useState<Page[]>(['home']);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const navigate = useCallback((page: Page) => {
    setHistory(prev => (prev[prev.length - 1] !== page ? [...prev, page] : prev));
    setCurrentPage(page);
    window.scrollTo(0, 0);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    navigate('home');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('home');
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

  const handleNavigate = (page: 'home' | 'programs' | 'map' | 'hub' | 'login') => {
    if (page === 'programs') {
        setInitialQuery('');
        setInitialAgencyId('');
    }
    navigate(page);
  };

  const handleContentNavigate = (page: 'contentPage', data: ContentPageData) => {
      setContentPageData(data);
      navigate(page);
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

  const getActivePageForHeader = (): 'home' | 'programs' | 'map' | 'hub' => {
    const lastNavPage = [...history].reverse().find(p => ['home', 'programs', 'map', 'hub'].includes(p));
    return (lastNavPage as 'home' | 'programs' | 'map' | 'hub') || 'home';
  };


  const renderPage = () => {
    switch (currentPage) {
      case 'programs':
        return <ProgramsPage
          allPrograms={programs}
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
          />;
        }
        return <HomePage onProgramSelect={handleProgramSelect} onNavigate={handleNavigate} onSearch={handleSearch}/>;
      case 'agencyDetail':
        if (selectedAgency) {
            return <AgencyDetailPage
                agency={selectedAgency}
                allPrograms={programs}
                onProgramSelect={handleProgramSelect}
                onBack={handleBack}
            />;
        }
         return <HomePage onProgramSelect={handleProgramSelect} onNavigate={handleNavigate} onSearch={handleSearch}/>;
      case 'map':
        return <InteractiveMapPage cities={citySafetyData} onProgramSelect={handleProgramSelect} />;
      case 'hub':
        return <KnowledgeHubPage courses={courses} programs={programs} onCourseSelect={handleCourseSelect} onProgramSelect={handleProgramSelect} />;
       case 'courseDetail':
        if (selectedCourse) {
            const relatedProgram = programs.find(p => p.id === selectedCourse.programId);
            if (relatedProgram) {
                return <CourseDetailPage 
                    course={selectedCourse} 
                    relatedProgram={relatedProgram} 
                    onBack={handleBack} 
                    onViewAgencyPrograms={handleViewAgencyPrograms}
                />;
            }
        }
        return <KnowledgeHubPage courses={courses} programs={programs} onCourseSelect={handleCourseSelect} onProgramSelect={handleProgramSelect} />;
      case 'contentPage':
        if (contentPageData) {
            return <ContentPage title={contentPageData.title} body={contentPageData.body} onBack={handleBack} />;
        }
        return <HomePage onProgramSelect={handleProgramSelect} onNavigate={handleNavigate} onSearch={handleSearch}/>;
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
      <Footer onNavigate={handleContentNavigate} />
      {selectedProgram && (
        <ReportModal 
          isOpen={isReportModalOpen} 
          onClose={() => setReportModalOpen(false)} 
          program={selectedProgram}
        />
      )}
    </div>
  );
};

export default App;