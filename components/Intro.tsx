import React, { useEffect, useState } from 'react';
import { INTRO_DURATION_MS } from '../constants';
import theguImg from '../images/thegu.png';

interface IntroProps {
  onComplete: () => void;
}

const Intro: React.FC<IntroProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + INTRO_DURATION_MS;

    const timer = setInterval(() => {
      const now = Date.now();
      const remaining = endTime - now;
      const calculatedProgress = Math.min(100, ((INTRO_DURATION_MS - remaining) / INTRO_DURATION_MS) * 100);

      setProgress(calculatedProgress);

      if (remaining <= 0) {
        clearInterval(timer);
        onComplete();
      }
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-indigo-500 rounded-full blur-[120px] opacity-30 animate-pulse"></div>

      {/* The Gu Character with Rotating Border */}
      <div className="relative mb-12 animate-bounce-slow">
        <div className="thegu-box">
          {/* Rotating border 1 */}
          <div className="thegu-border-1"></div>
          {/* Rotating border 2 */}
          <div className="thegu-border-2"></div>
          {/* Inner mask (covers border, shows only border edge) */}
          <div className="thegu-mask"></div>
          {/* Inner content */}
          <div className="thegu-inner flex items-center justify-center overflow-hidden">
            <img
              src={theguImg}
              alt="Thegu"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>

      <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-center px-4">
        TheGuAI Modern Web Course
      </h1>
      <p className="text-lg md:text-xl text-purple-200 mb-12 text-center px-4">
        Final Project Showcase
      </p>

      {/* Progress Bar */}
      <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purple-400 to-indigo-400 transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-sm text-slate-400 font-mono">Loading... {Math.round(progress)}%</p>
    </div>
  );
};

export default Intro;