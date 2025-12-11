import React from 'react';
import { CourseModule, Project, Student, Slide } from './types';
import { 
  PenTool, 
  Code, 
  Cpu, 
  Rocket, 
  MessageSquare, 
  Users, 
  Layout, 
  Database, 
  Smartphone 
} from 'lucide-react';
import kun1Img from './images/kun1.jpg';
import kang1Img from './images/1kang1.jpg';
import lee3Img from './images/3leeeun.jpg';
import lee4Img from './images/4leeself.jpg';
import jang5Img from './images/5jang.jpg';
import seo6Img from './images/6jungseo1.jpg';
import jo7Img from './images/7face1.jpg';
import chun8Img from './images/8chun.jpg';
import ham9Img from './images/9ham.jpg';

export const INTRO_DURATION_MS = 5000;

export const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    title: "상상을 현실로 만드는 생성형 AI",
    subtitle: "Stable Diffusion을 활용한 독창적인 이미지 생성과 웹 기술의 융합",
    image: "https://picsum.photos/1920/1080?random=10",
    ctaText: "과정 자세히 보기"
  },
  {
    id: 2,
    title: "실무 중심의 모던 프론트엔드",
    subtitle: "React, TypeScript, TailwindCSS로 구축하는 견고한 웹 애플리케이션",
    image: "https://picsum.photos/1920/1080?random=20",
    ctaText: "학생 포트폴리오"
  },
  {
    id: 3,
    title: "기획부터 배포까지, 팀 프로젝트",
    subtitle: "피그마 UI/UX 설계부터 클라우드 배포까지 경험하는 협업 프로세스",
    image: "https://picsum.photos/1920/1080?random=30",
    ctaText: "팀 프로젝트 보기"
  }
];

export const COURSE_MODULES: CourseModule[] = [
  {
    id: 1,
    title: "프로젝트 기획 및 설계",
    icon: <PenTool className="w-6 h-6" />,
    items: [
      "프로젝트 주제 선정",
      "요구사항 정의",
      "와이어프레임 및 UI 설계(Figma)",
      "일정 및 마일스톤 수립",
      "역할 분담"
    ]
  },
  {
    id: 2,
    title: "프론트엔드 개발",
    icon: <Code className="w-6 h-6" />,
    items: [
      "React 컴포넌트 설계 및 구현",
      "라우팅 및 네비게이션",
      "Figma → 코드 구현",
      "CSS-in-JS / Tailwind 활용"
    ]
  },
  {
    id: 3,
    title: "AI 통합 및 기능 구현",
    icon: <Cpu className="w-6 h-6" />,
    items: [
      "Stable Diffusion API 이미지 생성",
      "ChatGPT API 활용",
      "성능 최적화 및 오류 처리",
      "프롬프트 엔지니어링"
    ]
  },
  {
    id: 4,
    title: "테스트 및 배포",
    icon: <Rocket className="w-6 h-6" />,
    items: [
      "단위 테스트 / 통합 테스트",
      "배포 환경 설정 (Vercel/Netlify)",
      "서비스 배포 및 도메인 연결",
      "라이브 데모 시연 준비"
    ]
  },
  {
    id: 5,
    title: "프로젝트 발표 및 피드백",
    icon: <MessageSquare className="w-6 h-6" />,
    items: [
      "프로젝트 데모 시연",
      "기술적 챌린지 공유",
      "팀 간 피드백 및 개선",
      "최종 회고 진행"
    ]
  }
];

export const TEAM_PROJECTS: Project[] = [
  {
    id: 1,
    title: "1조: 오늘 뭐 하지?",
    description: "\"오늘 뭐 하지?\"라는 주제에 맞춰 할일 관리, 날씨 기반 옷차림 추천, 영화 추천, 지역 기반 맛집 추천을 제공하는 웹 사이트 (팀원: 강연우, 권혜지, 이희수, 천다솜)",
    image: "https://picsum.photos/600/400?random=1",
    link: "https://todo-team2.vercel.app/",
    githubLink: "https://github.com/jamong13/todo-team.git"
  },
  {
    id: 2,
    title: "2조: 동화책 자동 생성 플랫폼",
    description: "아이들을 위한 맞춤형 동화를 ChatGPT로 창작하고, 삽화를 생성형 AI로 그려주는 에듀테크 서비스입니다.",
    image: "https://picsum.photos/600/400?random=2",
    link: "#",
    githubLink: "#"
  }
];

export const STUDENTS: Student[] = Array.from({ length: 9 }, (_, i) => {
  // 학생1 (강연우) 정보
  if (i === 0) {
    return {
      id: 1,
      name: "강연우",
      intro: "창의적인 아이디어를 현실로 구현하는 것을 즐기는 프론트엔드 개발자입니다.",
      link: "https://portfolio-alpha-neon-nrmog8aee2.vercel.app/projects",
      githubLink: "https://github.com/kiteu123/portfolio",
      image: kang1Img
    };
  }
  // 학생2 (권혜지) 정보
  if (i === 1) {
    return {
      id: 2,
      name: "권혜지",
      intro: "사용자 중심의 직관적인 인터페이스를 만드는 것을 좋아하는 프론트엔드 개발자입니다.",
      link: "https://portfolio-lcinuxzt8-hji-ands-projects.vercel.app?_vercel_share=KrVZlesf5quOOiTsr8iSLDOpFpQElpnu",
      githubLink: "https://github.com/hji-and/Portfolio.git",
      image: kun1Img
    };
  }
  // 학생3 (이은섬) 정보
  if (i === 2) {
    return {
      id: 3,
      name: "이은섬",
      intro: "깔끔하고 효율적인 코드로 사용자에게 최고의 경험을 제공하는 프론트엔드 개발자입니다.",
      link: "https://portfolio-drab-one-96.vercel.app/",
      githubLink: "https://github.com/silverlsland20kid",
      image: lee3Img
    };
  }
  // 학생4 (이희수) 정보
  if (i === 3) {
    return {
      id: 4,
      name: "이희수",
      intro: "모던한 웹 기술을 활용하여 혁신적인 솔루션을 만드는 프론트엔드 개발자입니다.",
      link: "https://homepage-lhs.vercel.app/",
      githubLink: "https://github.com/jamong13/homepage.git",
      image: lee4Img
    };
  }
  // 학생5 (장다정) 정보
  if (i === 4) {
    return {
      id: 5,
      name: "장다정",
      intro: "사용자와 소통하며 지속적으로 개선하는 것을 즐기는 프론트엔드 개발자입니다.",
      link: "https://djdropthebeat.vercel.app/",
      githubLink: "https://github.com/djdropthebeat-tech/react-test.git",
      image: jang5Img
    };
  }
  // 학생6 (정서경) 정보
  if (i === 5) {
    return {
      id: 6,
      name: "정서경",
      intro: "세련된 디자인과 뛰어난 사용성을 결합한 웹 애플리케이션을 만드는 프론트엔드 개발자입니다.",
      link: "https://withn.vercel.app/",
      githubLink: "https://github.com/webjsk-dotcom/withn.git",
      image: seo6Img
    };
  }
  // 학생7 (조이한) 정보
  if (i === 6) {
    return {
      id: 7,
      name: "조이한",
      intro: "최신 기술 스택을 활용하여 확장 가능한 웹 애플리케이션을 개발하는 프론트엔드 개발자입니다.",
      link: "https://turborepo-tailwindcss-v3-migration-template-aa24glmdj.vercel.app/",
      githubLink: "https://github.com/Noma9363/turborepo-tailwindcss-v3-migration-template",
      image: jo7Img
    };
  }
  // 학생8 (천다솜) 정보
  if (i === 7) {
    return {
      id: 8,
      name: "천다솜",
      intro: "아름다운 UI와 부드러운 사용자 경험을 추구하는 프론트엔드 개발자입니다.",
      link: "https://portfolio-x1m9.vercel.app/",
      githubLink: "https://github.com/dasomchun/Portfolio",
      image: chun8Img
    };
  }
  // 학생9 (함다슬) 정보
  if (i === 8) {
    return {
      id: 9,
      name: "함다슬",
      intro: "실용적이고 효율적인 솔루션을 통해 사용자에게 가치를 전달하는 프론트엔드 개발자입니다.",
      link: "https://uoy1013.dothome.co.kr/",
      githubLink: "https://github.com/hamdasule/frontend/tree/main/%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A42",
      image: ham9Img
    };
  }
  return {
    id: i + 1,
    name: `학생 ${i + 1}`,
    intro: "사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다.",
    link: "#",
    githubLink: "#"
  };
});

export const HERO_TITLE = "우리 학생들은";
export const HERO_SUBTITLE = "(산대특)_생성형 AI(스테이블 디퓨전) 활용 모던 웹 (피그마, 리액트, 리덕스) 실무자 양성과정 수료생입니다";