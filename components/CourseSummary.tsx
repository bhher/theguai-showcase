import React from 'react';
import { COURSE_MODULES, HERO_TITLE, HERO_SUBTITLE } from '../constants';

const CourseSummary: React.FC = () => {
  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="inline-block py-1 px-3 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
          Course Curriculum
        </span>
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
          {HERO_TITLE}
        </h2>
        <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed word-keep break-keep">
          {HERO_SUBTITLE}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COURSE_MODULES.map((module) => (
          <div 
            key={module.id} 
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
              {module.icon}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">
              {module.title}
            </h3>
            <ul className="space-y-2">
              {module.items.map((item, idx) => (
                <li key={idx} className="flex items-start text-slate-600 text-sm">
                  <span className="mr-2 text-indigo-400 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CourseSummary;