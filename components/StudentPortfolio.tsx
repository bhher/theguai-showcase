import React from 'react';
import { STUDENTS } from '../constants';
import { User, ArrowRight, Github } from 'lucide-react';

const StudentPortfolio: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto bg-slate-50">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          수강생 개인 포트폴리오
        </h2>
        <p className="text-slate-600">
          준비된 인재들의 개인 역량을 확인해보세요.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {STUDENTS.map((student) => (
          <div 
            key={student.id} 
            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-200 flex flex-col items-center text-center group"
          >
            {student.image ? (
              <div className="w-20 h-20 rounded-full overflow-hidden mb-4 ring-2 ring-slate-200 group-hover:ring-indigo-300 transition-all duration-300">
                <img 
                  src={student.image} 
                  alt={student.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4 group-hover:bg-indigo-50 group-hover:text-indigo-500 transition-colors duration-300">
                <User className="w-8 h-8" />
              </div>
            )}
            <h3 className="text-xl font-bold text-slate-800 mb-2">{student.name}</h3>
            <p className="text-slate-500 text-sm mb-6 px-4 h-10 line-clamp-2">
              {student.intro}
            </p>
            <div className="mt-auto w-full flex flex-col gap-2">
              <a 
                href={student.link} 
                className="w-full py-2 px-4 border border-slate-200 rounded-lg text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-medium text-sm"
              >
                포트폴리오 보기
                <ArrowRight className="w-4 h-4" />
              </a>
              {student.githubLink && (
                <a 
                  href={student.githubLink} 
                  className="w-full py-2 px-4 border border-slate-200 rounded-lg text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 font-medium text-sm"
                >
                  깃허브 보기
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StudentPortfolio;