
import React from 'react';

// --- Icon components (self-contained SVGs) ---

const PhoneIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
  </svg>
);

const HomeIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const AcademicCapIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 0 1 3-3h.008c1.657 0 3.002 1.343 3.002 3v8.25a3 3 0 0 1-3 3z" />
  </svg>
);

const BanknotesIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0 .75-.75v-.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
);

const UsersIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962c.513-.96 1.487-1.591 2.571-1.82m-2.571 1.82a3.498 3.498 0 0 0-2.571-1.82m0 0a3.498 3.498 0 0 0-2.571 1.82m2.571-1.82V11.25m6.75 5.25v-1.608c0-.96-.784-1.75-1.75-1.75h-1.5a1.75 1.75 0 0 0-1.75 1.75v1.608m12.036-6.328A9.026 9.026 0 0 1 21 12c0 .528-.045 1.05-.132 1.567m-.132 1.567c-.201.445-.43 1.256-.635 2.44A9.06 9.06 0 0 1 12 21a9.06 9.06 0 0 1-8.233-4.423c-.205-1.183-.434-1.995-.635-2.44m17.5-3.134a9.026 9.026 0 0 0-.132-1.567c-.201-.445-.43-1.256-.635-2.44A9.06 9.06 0 0 0 12 3a9.06 9.06 0 0 0-8.233 4.423c-.205-1.183-.434-1.995-.635-2.44m0 0A9.026 9.026 0 0 0 3 12c0 .528.045 1.05.132 1.567" />
    </svg>
);

const TrophyIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497M12 7.5h.008v.008H12V7.5Zm-3.75 0h.008v.008H8.25V7.5Zm7.5 0h.008v.008h-.008V7.5Zm-3.75 2.25h.008v.008H12v-.008Zm-3.75 0h.008v.008H8.25v-.008Zm7.5 0h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008v-.008Zm-3.75 0h.008v.008H12v-.008Zm-3.75 0h.008v.008H8.25v-.008Z" />
    </svg>
);

const SparklesIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);

const UserGroupIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962c.513-.96 1.487-1.591 2.571-1.82m-2.571 1.82a3.498 3.498 0 0 0-2.571-1.82m0 0a3.498 3.498 0 0 0-2.571 1.82m2.571-1.82V11.25a2.25 2.25 0 0 1 2.25-2.25h1.5a2.25 2.25 0 0 1 2.25 2.25v.632m-7.5-3.632A8.963 8.963 0 0 1 12 6.75c2.665 0 5.122.956 7.03 2.568m-14.06 0A8.963 8.963 0 0 1 12 6.75c-2.665 0-5.122.956-7.03 2.568m14.06 0a8.963 8.963 0 0 1 2.25 3.367m-18.5 0a8.963 8.963 0 0 1 2.25-3.367" />
    </svg>
);

const GlobeAltIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c.504 0 1.002-.02 1.49-.06M12 3c.504 0 1.002.02 1.49.06M3 9h18M3 9a9.004 9.004 0 0 0-1.256 3.07M22.256 12a9.004 9.004 0 0 0-1.256-3.07M12 3v9" />
    </svg>
);

const ChatBubbleLeftRightIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.722.537a56.096 56.096 0 0 1-3.582 0l-3.722-.537A2.122 2.122 0 0 1 3 17.002V12.715c0-.97 0.616-1.813 1.5-2.097L6.6 9.553a56.096 56.096 0 0 0 3.582 0l2.622-1.047a56.096 56.096 0 0 0 3.582 0l2.622 1.047Zm-8.25-3.728-2.622 1.047a56.096 56.096 0 0 0-3.582 0L3 8.511c-.884.284-1.5 1.128-1.5 2.097v4.286c0 1.136.847 2.1 1.98 2.193l3.722.537a56.096 56.096 0 0 0 3.582 0l3.722-.537A2.122 2.122 0 0 0 21 17.002V12.715c0-.97-.616-1.813-1.5-2.097l-2.622-1.047a56.096 56.096 0 0 0-3.582 0Z" />
    </svg>
);

const AccessibilityIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM12 7.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0 5.25a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm3.75 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm-7.5 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm1.5 3.75a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm3-3.75a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm-1.5-3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm0 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 21a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
    </svg>
);

const LeafIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 2.32a18.29 18.29 0 0 1 5.82-.24c1.67.23 2.82 1.25 3.1 2.81.28 1.56-.27 3.03-1.3 4.25-1.02 1.2-2.55 1.9-4.2 1.9-1.66 0-3.18-.7-4.2-1.9-1.03-1.22-1.58-2.69-1.3-4.25.28-1.56 1.43-2.58 3.1-2.81ZM12 21.75c-4.47-1.7-7.25-5.92-7.25-10.75 0-1.8.44-3.46 1.24-4.91M12 21.75c4.47-1.7 7.25-5.92 7.25-10.75 0-1.8-.44-3.46-1.24-4.91" />
    </svg>
);

const ShareIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm0 0v2.25m0-2.25h1.597M9.25 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm0 0v2.25m0-2.25h-1.5m6.75 9a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm0 0v-2.25m0 2.25h-1.5m-3.353-2.53a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Zm-1.53.07a8.956 8.956 0 0 1-2.91 2.91m-1.598-6.198a8.956 8.956 0 0 1-2.91-2.91" />
    </svg>
);

const CalendarDaysIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M12 12.75h.008v.008H12v-.008Zm0 3h.008v.008H12v-.008Zm.375-6.375h.008v.008h-.008V9.375Zm0 3h.008v.008h-.008v-.008Zm-.375 3h.008v.008h-.008v-.008Zm3.75-6.375h.008v.008h-.008V9.375Zm0 3h.008v.008h-.008v-.008Zm-.375 3h.008v.008h-.008v-.008Zm3.75-6.375h.008v.008h-.008V9.375Zm0 3h.008v.008h-.008v-.008Zm-.375 3h.008v.008h-.008v-.008Zm-9-6.375h.008v.008H8.25V9.375Zm0 3h.008v.008H8.25v-.008Zm-.375 3h.008v.008H7.875v-.008Z" />
    </svg>
);

const StarIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.321l5.584.532c.565.053.795.814.382 1.21l-4.238 3.523a.563.563 0 0 0-.182.531l1.295 5.395c.125.523-.462.935-.928.66l-4.992-2.922a.563.563 0 0 0-.572 0l-4.992 2.922c-.467.274-1.053-.137-.928-.66l1.295-5.395a.563.563 0 0 0-.182-.531l-4.238-3.523c-.413-.396-.183-1.157.382-1.21l5.584-.532a.563.563 0 0 0 .475-.321L11.48 3.5Z" />
    </svg>
);

// --- Feature Mapping ---

const featureMap: { [key: string]: { Icon: React.FC<any>; colorClasses: string } } = {
  // Certifications
  "Suporte Local 24/7": { Icon: PhoneIcon, colorClasses: 'bg-teal-100 text-teal-600' },
  "Acomodações Seguras Verificadas": { Icon: HomeIcon, colorClasses: 'bg-cyan-100 text-cyan-600' },
  "Treinamento Pré-Partida Abrangente": { Icon: AcademicCapIcon, colorClasses: 'bg-blue-100 text-blue-600' },
  "Transparência Financeira Total": { Icon: BanknotesIcon, colorClasses: 'bg-green-100 text-green-600' },
  "Parcerias Comunitárias Éticas": { Icon: UsersIcon, colorClasses: 'bg-indigo-100 text-indigo-600' },
  // Verifications
  "Selo SafeJourney Premium": { Icon: TrophyIcon, colorClasses: 'bg-amber-100 text-amber-600' },
  "Ideal para Primeira Viagem": { Icon: SparklesIcon, colorClasses: 'bg-yellow-100 text-yellow-600' },
  "Foco em Liderança Feminina": { Icon: UserGroupIcon, colorClasses: 'bg-pink-100 text-pink-600' },
  "Imersão Cultural Profunda": { Icon: GlobeAltIcon, colorClasses: 'bg-orange-100 text-orange-600' },
  "Conexão com a Comunidade Local": { Icon: ChatBubbleLeftRightIcon, colorClasses: 'bg-purple-100 text-purple-600' },
  "Acessibilidade para PCD": { Icon: AccessibilityIcon, colorClasses: 'bg-gray-100 text-gray-600' },
  "Programa Sustentável e Ecológico": { Icon: LeafIcon, colorClasses: 'bg-lime-100 text-lime-600' },
  "Oportunidades de Networking": { Icon: ShareIcon, colorClasses: 'bg-sky-100 text-sky-600' },
  "Flexibilidade de Datas e Pagamento": { Icon: CalendarDaysIcon, colorClasses: 'bg-rose-100 text-rose-600' },
  "Avaliação Excepcional das Alunas": { Icon: StarIcon, colorClasses: 'bg-amber-100 text-amber-600' },
};

// --- Single Icon Component ---

const FeatureIcon: React.FC<{ name: string }> = ({ name }) => {
  const feature = featureMap[name];
  if (!feature) return null;

  const { Icon, colorClasses } = feature;

  return (
    <div className="relative group">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${colorClasses}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div 
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] px-3 py-1.5 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
        role="tooltip"
      >
        {name}
        <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-gray-900"></div>
      </div>
    </div>
  );
};

// --- Main Exported Component ---

export const ProgramFeatures: React.FC<{ features: string[] }> = ({ features }) => {
  if (!features || features.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {features.map((featureName) => (
        <FeatureIcon key={featureName} name={featureName} />
      ))}
    </div>
  );
};
