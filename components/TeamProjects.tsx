import React from 'react';
import { TEAM_PROJECTS } from '../constants';
import { ExternalLink, Github } from 'lucide-react';

const TeamProjects: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-[150px] opacity-20"></div>
       <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">팀 프로젝트</h2>
            <p className="text-slate-400">수강생들이 협업하여 만들어낸 최종 결과물입니다.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TEAM_PROJECTS.map((project) => (
            <div 
              key={project.id} 
              className="group bg-slate-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 border border-slate-700"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex gap-3">
                  <a 
                    href={project.link} 
                    className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    프로젝트 보기
                    <ExternalLink className="ml-2 w-4 h-4" />
                  </a>
                  {project.githubLink && (
                    <a 
                      href={project.githubLink} 
                      className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                      깃허브 보기
                      <Github className="ml-2 w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamProjects;