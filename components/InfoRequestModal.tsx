import React, { useState, useEffect } from 'react';
import { Program, User } from '../types';
import { CheckmarkIcon } from './icons/CheckmarkIcon';

interface InfoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: Program;
  currentUser: User | null;
}

export const InfoRequestModal: React.FC<InfoRequestModalProps> = ({ isOpen, onClose, program, currentUser }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
    }
  }, [currentUser, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
        onClose();
        // Reset state after transition, so it's fresh for next open
        setTimeout(() => setIsSubmitted(false), 300);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[3000] flex justify-center items-center p-4 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" disabled={isSubmitted}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        {isSubmitted ? (
            <div className="text-center py-8">
                <CheckmarkIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Solicitação Enviada!</h2>
                <p className="text-gray-600 mt-2">A agência <span className="font-semibold">{program.agency.name}</span> entrará em contato em breve.</p>
            </div>
        ) : (
            <>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Solicitar Informações</h2>
                <p className="text-gray-600 mb-4">Preencha o formulário para saber mais sobre: <span className="font-semibold">{program.name}</span>.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                    <input type="text" id="name" name="name" value={name} onChange={e => setName(e.target.value)} className="mt-1 focus:ring-rose-500 focus:border-rose-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50 p-3 text-gray-900" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 focus:ring-rose-500 focus:border-rose-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50 p-3 text-gray-900" required />
                  </div>
                   <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone (Opcional)</label>
                    <input type="tel" id="phone" name="phone" className="mt-1 focus:ring-rose-500 focus:border-rose-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50 p-3 text-gray-900" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensagem (Opcional)</label>
                    <textarea id="message" name="message" rows={3} className="mt-1 focus:ring-rose-500 focus:border-rose-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50 p-3 text-gray-900" placeholder="Gostaria de saber mais sobre..."></textarea>
                  </div>
                  <div className="flex justify-end space-x-3 pt-2">
                      <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">Cancelar</button>
                      <button type="submit" className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-400 transition-colors">Enviar Solicitação</button>
                  </div>
                </form>
            </>
        )}
      </div>
    </div>
  );
};
