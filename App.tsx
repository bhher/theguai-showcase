import React, { useState, useEffect } from 'react';
import Intro from './components/Intro';
import HeroSlider from './components/HeroSlider';
import CourseSummary from './components/CourseSummary';
import TeamProjects from './components/TeamProjects';
import StudentPortfolio from './components/StudentPortfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminButton from './components/AdminButton';

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
  e.preventDefault();
  const element = document.getElementById(targetId);
  if (element) {
    const headerOffset = 64; // 헤더 높이
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [mainOpacity, setMainOpacity] = useState(0);
  const [isDarkHeader, setIsDarkHeader] = useState(false); // home은 밝은 배경이므로 초기값 false

  // 어두운 배경 섹션 목록 (summary, portfolio)
  const darkSections = ['summary', 'portfolio'];

  // 스크롤 위치에 따라 헤더 스타일 변경
  useEffect(() => {
    if (showIntro) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const headerHeight = 80; // 헤더 높이 + 여유 공간
          
          const sections = ['home', 'summary', 'team', 'portfolio', 'contact'];
          let currentSection = 'home'; // 기본값
          
          // 스크롤 위치가 섹션의 상단 부분에 있을 때 감지
          for (const sectionId of sections) {
            const element = document.getElementById(sectionId);
            if (element) {
              const elementTop = element.offsetTop;
              const elementBottom = elementTop + element.offsetHeight;
              
              // 헤더 위치 기준으로 현재 섹션 판단
              if (scrollY + headerHeight >= elementTop && scrollY + headerHeight < elementBottom) {
                currentSection = sectionId;
                break;
              }
            }
          }

          // 어두운 섹션에 있으면 헤더를 어두운 스타일로 변경
          setIsDarkHeader(darkSections.includes(currentSection));
          ticking = false;
        });
        ticking = true;
      }
    };

    // 초기 상태 확인
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [showIntro, darkSections]);

  const handleIntroComplete = () => {
    // Start fading out intro logic handled inside Intro visual exit if needed,
    // but here we just toggle state. To make it smoother:
    // We could fade out intro, then unmount. 
    // For this implementation, we switch immediately and fade-in Main.
    setShowIntro(false);
    
    // Slight delay to trigger CSS transition for main content
    setTimeout(() => {
      setMainOpacity(1);
    }, 50);
  };

  if (showIntro) {
    return <Intro onComplete={handleIntroComplete} />;
  }

  return (
    <div 
      className="min-h-screen flex flex-col transition-opacity duration-1000 ease-in-out"
      style={{ opacity: mainOpacity }}
    >
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-all duration-300 ${
        isDarkHeader 
          ? 'bg-slate-900/80 border-slate-700' 
          : 'bg-white/80 border-slate-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => {
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }}
            className={`font-bold text-xl tracking-tighter transition-colors duration-300 cursor-pointer hover:opacity-80 ${
              isDarkHeader ? 'text-indigo-400' : 'text-indigo-600'
            }`}
          >
            TheGuAI<span className={isDarkHeader ? 'text-white' : 'text-slate-800'}>.Course</span>
          </button>
          <nav className="hidden md:flex gap-6 text-sm font-medium">
            <a 
              href="#summary" 
              onClick={(e) => handleSmoothScroll(e, 'summary')}
              className={`transition-colors cursor-pointer ${
                isDarkHeader 
                  ? 'text-slate-300 hover:text-indigo-400' 
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              과정 소개
            </a>
            <a 
              href="#team" 
              onClick={(e) => handleSmoothScroll(e, 'team')}
              className={`transition-colors cursor-pointer ${
                isDarkHeader 
                  ? 'text-slate-300 hover:text-indigo-400' 
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              팀 프로젝트
            </a>
            <a 
              href="#portfolio" 
              onClick={(e) => handleSmoothScroll(e, 'portfolio')}
              className={`transition-colors cursor-pointer ${
                isDarkHeader 
                  ? 'text-slate-300 hover:text-indigo-400' 
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              개인 포트폴리오
            </a>
            <a 
              href="#contact" 
              onClick={(e) => handleSmoothScroll(e, 'contact')}
              className={`transition-colors cursor-pointer ${
                isDarkHeader 
                  ? 'text-slate-300 hover:text-indigo-400' 
                  : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              연락하기
            </a>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Added Hero Slider Section */}
        <section id="home">
          <HeroSlider />
        </section>

        <div id="summary">
            <CourseSummary />
        </div>
        <div id="team">
            <TeamProjects />
        </div>
        <div id="portfolio">
            <StudentPortfolio />
        </div>
        <div id="contact">
            <Contact />
        </div>
      </main>

      <Footer />
      
      {/* 관리자 버튼 */}
      <AdminButton />
    </div>
  );
};

export default App;