import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 text-center text-slate-500">
        <p className="mb-2 font-medium text-slate-900">GenAI Modern Web Development Course</p>
        <p className="text-sm">© {new Date().getFullYear()} All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;