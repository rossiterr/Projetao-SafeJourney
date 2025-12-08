
import React, { useState } from 'react';
import { Logo } from './Logo';
import { User, Page } from '../types';

interface HeaderProps {
    onNavigate: (page: Page) => void;
    activePage: Page;
    currentUser: User | null;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activePage, currentUser, onLogout }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { page: Page, label: string }[] = [
    { page: 'home', label: 'Início' },
    { page: 'programs', label: 'Programas' },
    // { page: 'map', label: 'Mapa de Avaliações' }, // Removido temporariamente
    { page: 'hub', label: 'Hub de Conhecimento' },
    { page: 'about', label: 'Sobre' },
  ];

  // Filter out nav items that might not be suitable for main menu if necessary, 
  // but here we just stick to the 4 main ones.

  const baseClasses = "relative px-1 py-2 text-md font-medium transition-colors duration-300 ease-in-out group";
  const inactiveClasses = "text-gray-600 hover:text-rose-500";
  const activeClasses = "text-rose-500";

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-[2000]">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
            <Logo />
          </div>
          <div className="hidden md:flex items-center">
            <div className="flex items-baseline space-x-8">
              {navItems.map(item => (
                <button 
                  key={item.page}
                  onClick={() => onNavigate(item.page)} 
                  className={`${baseClasses} ${activePage === item.page ? activeClasses : inactiveClasses}`}
                >
                  <span>{item.label}</span>
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-rose-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out ${activePage === item.page ? 'scale-x-100' : ''}`}></span>
                </button>
              ))}
            </div>
            <div className="ml-12">
                {currentUser ? (
                  <div className="flex items-center gap-4">
                    <div 
                        onClick={() => currentUser.email === 'agencia@app.com.br' && onNavigate('agencyDashboard')}
                        className={`flex items-center gap-2 ${currentUser.email === 'agencia@app.com.br' ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
                        title={currentUser.email === 'agencia@app.com.br' ? "Ir para o Painel da Agência" : "Perfil"}
                    >
                        <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover shadow-sm"/>
                    </div>
                    <button
                        onClick={onLogout}
                        className="px-5 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        Sair
                    </button>
                  </div>
                ) : (
                  <button
                      onClick={() => onNavigate('login')}
                      className="px-5 py-2 bg-rose-400 text-white font-semibold rounded-md shadow-md hover:bg-cyan-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                  >
                      Entrar
                  </button>
                )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menu principal</span>
              {isMobileMenuOpen ? (
                 <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                 </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
      {isMobileMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map(item => (
                <button
                key={item.page}
                onClick={() => {
                    onNavigate(item.page);
                    setMobileMenuOpen(false);
                }}
                className={`w-full text-left block px-3 py-2 rounded-md text-base font-medium ${activePage === item.page ? 'bg-rose-500 text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'}`}
                >
                {item.label}
                </button>
            ))}
             <div className="border-t my-2"></div>
              {currentUser ? (
                <div className="pt-2 pb-1 space-y-2">
                    <div 
                        className="flex items-center gap-3 px-3 py-2 cursor-pointer"
                        onClick={() => {
                            if (currentUser.email === 'agencia@app.com.br') {
                                onNavigate('agencyDashboard');
                                setMobileMenuOpen(false);
                            }
                        }}
                    >
                        <img src={currentUser.avatar} alt={currentUser.name} className="w-10 h-10 rounded-full object-cover"/>
                        <span className="font-medium text-gray-800">{currentUser.name}</span>
                    </div>
                    <button
                        onClick={() => {
                            onLogout();
                            setMobileMenuOpen(false);
                        }}
                        className="w-full text-center block px-3 py-2 rounded-md text-base font-medium bg-red-600 text-white hover:bg-red-700"
                    >
                        Sair
                    </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                      onNavigate('login');
                      setMobileMenuOpen(false);
                  }}
                  className="w-full text-center block px-3 py-2 rounded-md text-base font-medium bg-rose-400 text-white hover:bg-cyan-700"
                >
                  Entrar
                </button>
              )}
            </div>
        </div>
      )}
    </header>
  );
};
