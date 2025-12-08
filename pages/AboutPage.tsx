import React from 'react';

interface TeamMember {
  name: string;
  course: string;
  role: string;
  avatar: string;
  roleColor: string;
}

export const AboutPage: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Rayane Leite",
      course: "Hotelaria",
      role: "Líder Geral",
      avatar: "/images/team/Ray.jpeg",
      roleColor: "text-purple-600"
    },
    {
      name: "Gabriel Monteiro",
      course: "Ciência da Computação",
      role: "Líder Técnico",
      avatar: "/images/team/Gabriel.jpeg",
      roleColor: "text-pink-500"
    },
    {
      name: "Claudio Willamy",
      course: "Hotelaria",
      role: "Líder de Pesquisa",
      avatar: "/images/team/Claudio.jpeg",
      roleColor: "text-pink-400"
    },
    {
      name: "Júlia Vitória",
      course: "Hotelaria",
      role: "Líder de Comunicação",
      avatar: "/images/team/Julia.jpeg",
      roleColor: "text-pink-500"
    },
    {
      name: "Rodrigo Rossiter",
      course: "Ciência da Computação",
      role: "Auxiliar Técnico",
      avatar: "/images/team/rodrigo.jpeg",
      roleColor: "text-pink-400"
    },
    {
      name: "Beatriz de Oliveira",
      course: "Ciência da Computação",
      role: "Auxiliar Técnica",
      avatar: "/images/team/Bia.jpeg",
      roleColor: "text-pink-400"
    },
    {
      name: "Matheus Ayres",
      course: "Engenharia da Computação",
      role: "Auxiliar Técnico",
      avatar: "/images/team/Ayres.jpeg",
      roleColor: "text-pink-400"
    },
    {
      name: "Ruy Samico",
      course: "Hotelaria",
      role: "Auxiliar de Pesquisa",
      avatar: "/images/team/Ruy.jpeg",
      roleColor: "text-pink-400"
    },
    {
      name: "Manuelly França",
      course: "Hotelaria",
      role: "Auxiliar de Pesquisa",
      avatar: "/images/team/Manuelly.jpeg",
      roleColor: "text-pink-400"
    },
  ];

  return (
    <div className="bg-gray-50 min-h-[calc(100vh-250px)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl shadow-xl p-12 mb-12 text-white">
          <h1 className="text-5xl font-extrabold mb-6">Sobre Nós</h1>
          <div className="h-1 w-32 bg-white mb-8"></div>
          <p className="text-xl leading-relaxed max-w-4xl">
            Somos um grupo de estudantes da <span className="font-bold">Universidade Federal de Pernambuco (UFPE)</span> que 
            desenvolveu o <span className="font-bold">SafeJourney</span> como parte da disciplina de <span className="font-bold">Projetão</span>. 
            Nossa missão é tornar viagens internacionais mais seguras e acessíveis para mulheres, combinando tecnologia, 
            pesquisa e paixão pela hospitalidade.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Nossa Missão</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-rose-500 mb-3">O Desafio</h3>
              <p className="text-gray-700 leading-relaxed">
                Identificamos que muitas mulheres enfrentam barreiras e inseguranças ao planejar viagens internacionais. 
                Faltam informações confiáveis e plataformas dedicadas a promover experiências seguras e empoderadoras.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-rose-500 mb-3">Nossa Solução</h3>
              <p className="text-gray-700 leading-relaxed">
                Criamos uma plataforma completa que conecta viajantes a programas verificados, cursos de capacitação, 
                avaliações comunitárias e recursos educacionais, tudo focado na segurança e empoderamento feminino.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Nossa Equipe</h2>
          <p className="text-center text-gray-600 mb-10">Conheça os integrantes que tornaram este projeto realidade</p>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-rose-200 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 text-center mb-1">{member.name}</h3>
                <p className="text-sm text-gray-600 text-center mb-2">{member.course}</p>
                <span className={`text-sm font-semibold ${member.roleColor} text-center px-3 py-1 bg-gray-50 rounded-full`}>
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Project Info */}
        <div className="mt-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Sobre Projetão</h2>
          <p className="text-gray-700 leading-relaxed">
            Projetão é uma disciplina interdisciplinar da UFPE que desafia estudantes a desenvolverem soluções 
            inovadoras para problemas reais. Este projeto representa a união de conhecimentos, demonstrando o poder da colaboração multidisciplinar na criação de impacto social positivo.
          </p>
        </div>
      </div>
    </div>
  );
};
