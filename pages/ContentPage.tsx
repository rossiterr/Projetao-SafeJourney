import React from 'react';
import { ContentPageData } from '../types';
import { FeatureIcon } from '../components/FeatureIcons';
import { certificationsContent } from '../data/contentData';

interface ContentPageProps {
  data: ContentPageData;
  onBack: () => void;
}

export const ContentPage: React.FC<ContentPageProps> = ({ data, onBack }) => {
  return (
    <div className="bg-white py-16 min-h-[calc(100vh-250px)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <button onClick={onBack} className="mb-8 text-rose-500 hover:text-rose-400 font-semibold">&larr; Voltar</button>
        <h1 className="text-4xl font-bold text-gray-800 mb-8 border-b pb-4">{data.title}</h1>
        
        <div className="space-y-12">
          {certificationsContent.sections.map((section, idx) => (
            <section key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b border-gray-100 pb-4">
                {section.title}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                {section.content.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex flex-col gap-3">
                    {/* AQUI ESTÁ A MUDANÇA: O cabeçalho agora tem o ícone e o título */}
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 transform scale-90 origin-left">
                        <FeatureIcon name={item.subtitle} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {item.subtitle}
                      </h3>
                    </div>
                    
                    <p className="text-gray-600 leading-relaxed pl-[44px]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};
