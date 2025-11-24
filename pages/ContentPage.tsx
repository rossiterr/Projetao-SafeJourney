import React from 'react';
import { ContentPageData } from '../types';

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
          {data.sections.map((section, sectionIndex) => (
            <section key={sectionIndex}>
              {section.title && <h2 className="text-2xl font-bold text-gray-700 mb-6">{section.title}</h2>}
              <div className="space-y-6">
                {section.content.map((item, itemIndex) => (
                  <div key={itemIndex}>
                    {item.subtitle && <h3 className="text-lg font-semibold text-rose-400">{item.subtitle}</h3>}
                    <p className={`mt-1 text-gray-600 ${!item.subtitle ? 'text-lg' : ''}`}>{item.text}</p>
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
