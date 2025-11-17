
import React from 'react';
import { Logo } from './Logo';
import { ContentPageData } from '../types';

interface FooterProps {
  onNavigateToContent: (data: ContentPageData) => void;
}

const content: { [key: string]: ContentPageData } = {
  privacy: {
    title: "Política de Privacidade",
    sections: [{
      title: "",
      content: [
        { subtitle: "", text: "A sua privacidade é importante para nós. É política do SafeJourney respeitar a sua privacidade em relação a qualquer informação sua que possamos coletar no site SafeJourney, e outros sites que possuímos e operamos." },
        { subtitle: "", text: "Solicitamos informações pessoais apenas quando realmente precisamos delas para lhe fornecer um serviço. Fazemo-lo por meios justos e legais, com o seu conhecimento e consentimento. Também informamos por que estamos coletando e como será usado." },
        { subtitle: "", text: "Apenas retemos as informações coletadas pelo tempo necessário para fornecer o serviço solicitado. Quando armazenamos dados, protegemos dentro de meios comercialmente aceitáveis ​​para evitar perdas e roubos, bem como acesso, divulgação, cópia, uso ou modificação não autorizados." },
        { subtitle: "", text: "Não compartilhamos informações de identificação pessoal publicamente ou com terceiros, exceto quando exigido por lei." }
      ]
    }]
  },
  terms: {
    title: "Termos de Serviço",
    sections: [{
      title: "",
      content: [
        { subtitle: "", text: "Ao acessar ao site SafeJourney, concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis ​​e concorda que é responsável pelo cumprimento de todas as leis locais aplicáveis." },
        { subtitle: "", text: "É concedida permissão para baixar temporariamente uma cópia dos materiais (informações ou software) no site SafeJourney , apenas para visualização transitória pessoal e não comercial. Esta é a concessão de uma licença, não uma transferência de título." },
        { subtitle: "", text: "Em nenhum caso o SafeJourney ou seus fornecedores serão responsáveis ​​por quaisquer danos (incluindo, sem limitação, danos por perda de dados ou lucro ou devido a interrupção dos negócios) decorrentes do uso ou da incapacidade de usar os materiais em SafeJourney." }
      ]
    }]
  },
  contact: {
    title: "Contato",
    sections: [{
      title: "",
      content: [
        { subtitle: "", text: "Se você tiver alguma dúvida sobre como lidamos com dados do usuário e informações pessoais, entre em contato conosco." },
        { subtitle: "", text: "Nossa equipe de suporte está disponível para ajudar com quaisquer perguntas sobre programas, agências ou sobre a plataforma." },
        { subtitle: "Email", text: "contato@safejourney.com" },
        { subtitle: "Telefone", text: "(11) 99999-8888" },
      ]
    }]
  }
};


export const Footer: React.FC<FooterProps> = ({ onNavigateToContent }) => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <Logo />
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} SafeJourney. Feito por mulheres, para mulheres.
          </p>
          <div className="flex space-x-6">
            <button onClick={() => onNavigateToContent(content.privacy)} className="text-gray-500 hover:text-gray-700 transition-colors">Privacidade</button>
            <button onClick={() => onNavigateToContent(content.terms)} className="text-gray-500 hover:text-gray-700 transition-colors">Termos</button>
            <button onClick={() => onNavigateToContent(content.contact)} className="text-gray-500 hover:text-gray-700 transition-colors">Contato</button>
          </div>
        </div>
      </div>
    </footer>
  );
};