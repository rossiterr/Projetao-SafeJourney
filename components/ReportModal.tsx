import React, { useState } from 'react';
import { Program } from '../types';
import { CheckmarkIcon } from './icons/CheckmarkIcon';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: Program;
}

export const ReportModal: React.FC<ReportModalProps> = ({ isOpen, onClose, program }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
        onClose();
        // Reset state after transition, so it's fresh for next open
        setTimeout(() => setIsSubmitted(false), 300);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 transition-opacity duration-300">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" disabled={isSubmitted}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
        
        {isSubmitted ? (
            <div className="text-center py-8">
                <CheckmarkIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Denúncia Enviada!</h2>
                <p className="text-gray-600 mt-2">Agradecemos por ajudar a manter nossa comunidade segura.</p>
            </div>
        ) : (
            <>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Denunciar Agência/Programa</h2>
                <p className="text-gray-600 mb-4">Você está denunciando: <span className="font-semibold">{program.name}</span> por <span className="font-semibold">{program.agency.name}</span>.</p>
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">Motivo da Denúncia</label>
                    <select id="reason" name="reason" className="mt-1 block w-full pl-3 pr-10 py-3 text-base text-gray-900 bg-gray-50 border-gray-300 focus:outline-none focus:ring-rose-500 focus:border-rose-400 sm:text-sm rounded-md" required>
                    <option>Informação enganosa</option>
                    <option>Problema de segurança</option>
                    <option>Falta de suporte</option>
                    <option>Problema financeiro</option>
                    <option>Outro</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Data do Incidente</label>
                    <input type="date" id="date" name="date" className="mt-1 focus:ring-rose-500 focus:border-rose-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50 p-3 text-gray-900" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descrição Detalhada</label>
                    <textarea id="description" name="description" rows={4} className="mt-1 focus:ring-rose-500 focus:border-rose-400 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md bg-gray-50 p-3 text-gray-900" placeholder="Por favor, descreva o que aconteceu..." required></textarea>
                </div>
                <div className="flex justify-end space-x-3">
                    <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors">Cancelar</button>
                    <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors">Enviar Denúncia</button>
                </div>
                </form>
            </>
        )}
      </div>
    </div>
  );
};