

import React from 'react';
import { Program, ContentPageData } from '../types';
import { VerifiedSeal } from '../components/VerifiedSeal';
import { CheckmarkIcon } from '../components/icons/CheckmarkIcon';
import { StarIcon } from '../components/icons/StarIcon';
import { WarningIcon } from '../components/icons/WarningIcon';
import { ProgramFeatures } from '../components/FeatureIcons';
import { certificationsContent } from '../data/contentData';

interface ProgramDetailPageProps {
  program: Program;
  onBack: () => void;
  onReport: () => void;
  onInfoRequest: (program: Program) => void;
  onNavigateToContent: (data: ContentPageData) => void;
}

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <StarIcon key={i} className={`w-5 h-5 ${i < rating ? 'text-[#DAA520]' : 'text-gray-300'}`} />
    ))}
  </div>
);

export const ProgramDetailPage: React.FC<ProgramDetailPageProps> = ({ program, onBack, onReport, onInfoRequest, onNavigateToContent }) => {
  const avgRating = program.feedbacks.reduce((acc, curr) => acc + curr.rating, 0) / program.feedbacks.length;
  const agencyCertifications = program.agency.certifications || [];
  const programVerifications = program.verifications || [];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button onClick={onBack} className="mb-8 text-[#66CDAA] hover:text-[#5F9EA0] font-semibold">&larr; Voltar para a busca</button>

        <div className="lg:grid lg:grid-cols-3 lg:gap-x-12">
          {/* Left Column - Image and Core Info */}
          <div className="lg:col-span-2 relative z-10">
            <img src={program.image} alt={program.name} className="w-full h-96 object-cover rounded-lg shadow-lg mb-6" />
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-gray-900">{program.name}</h1>
                    <p className="mt-2 text-xl text-gray-600">Oferecido por <span className="font-bold">{program.agency.name}</span></p>
                </div>
                {program.agency.isVerified && 
                  <div className="flex-shrink-0 ml-4">
                    <VerifiedSeal />
                  </div>
                }
            </div>
            <p className="text-lg text-gray-700 mt-4">{program.longDescription}</p>

            <div className="mt-8 border-t pt-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">Diferenciais da Agência e Programa</h3>
                    <button 
                        onClick={() => onNavigateToContent(certificationsContent)}
                        className="text-sm font-semibold text-[#66CDAA] hover:text-[#5F9EA0] transition-colors"
                    >
                        Saiba mais &rarr;
                    </button>
                </div>
                <div className="space-y-4">
                {(agencyCertifications.length > 0 || programVerifications.length > 0) && (
                    <div className="space-y-4">
                        {agencyCertifications.length > 0 && (
                            <div className="flex items-center">
                                <ProgramFeatures features={agencyCertifications} />
                            </div>
                        )}
                        {programVerifications.length > 0 && (
                            <div className={`flex items-center ${agencyCertifications.length > 0 ? 'mt-3 pt-3 border-t border-gray-100' : ''}`}>
                                <ProgramFeatures features={programVerifications} />
                            </div>
                        )}
                    </div>
                )}
                </div>
            </div>

            {program.agency.isVerified && (
                <div className="mt-8 bg-[#66CDAA]/10 border-l-4 border-[#66CDAA] p-4 rounded-r-lg">
                    <h3 className="text-lg font-semibold text-[#5F9EA0]">Motivos do Selo de Verificação SafeJourney</h3>
                    <p className="mt-2 text-[#5F9EA0]">{program.agency.verificationReason}</p>
                </div>
            )}
          </div>

          {/* Right Column - Booking and Details */}
          <div className="mt-10 lg:mt-0">
            <div className="bg-gray-50 rounded-lg shadow-lg p-6 sticky top-28">
              <p className="text-3xl font-bold text-gray-900">${program.price}</p>
              <p className="text-sm text-gray-500">Preço estimado por estudante</p>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">O que está incluído:</h3>
                <ul className="mt-3 space-y-2">
                  {program.includes.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <CheckmarkIcon className="w-5 h-5 text-[#66CDAA] mr-2 flex-shrink-0 mt-1" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <button 
                onClick={() => onInfoRequest(program)}
                className="mt-8 w-full bg-[#66CDAA] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#5F9EA0] transition-transform transform hover:scale-105">
                Solicitar Informações
              </button>
            </div>
          </div>
        </div>

        {/* Feedback Section */}
        <div className="mt-16 border-t pt-12">
          <div className="flex justify-between items-center">
            <h2 className="text-3xl font-bold text-gray-900">Feedbacks de Usuárias ({program.feedbacks.length})</h2>
            <div className="flex items-center">
                <RatingStars rating={Math.round(avgRating)} />
                <span className="ml-2 text-gray-600 font-semibold">{avgRating.toFixed(1)} de 5 estrelas</span>
            </div>
          </div>
          <div className="mt-8 space-y-8">
            {program.feedbacks.map(feedback => (
              <div key={feedback.id} className="flex items-start space-x-4">
                <img className="h-12 w-12 rounded-full" src={feedback.avatar} alt={feedback.author} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-md font-semibold text-gray-900">{feedback.author}</p>
                      <p className="text-sm text-gray-500">{feedback.date}</p>
                    </div>
                    <RatingStars rating={feedback.rating} />
                  </div>
                  <p className="mt-2 text-gray-700">{feedback.comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Report Button */}
        <div className="mt-12 text-center border-t pt-8">
            <button onClick={onReport} className="inline-flex items-center text-sm text-red-600 hover:text-red-800 font-semibold transition-colors">
                <WarningIcon className="w-5 h-5 mr-2" />
                Denunciar Agência/Programa
            </button>
        </div>
      </div>
    </div>
  );
};