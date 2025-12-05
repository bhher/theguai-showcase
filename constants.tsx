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
    title: "1조: AI 기반 인테리어 추천 서비스",
    description: "사용자의 취향을 분석하여 Stable Diffusion을 활용해 맞춤형 인테리어 디자인을 제안하는 플랫폼입니다.",
    image: "https://picsum.photos/600/400?random=1",
    link: "#",
    githubLink: "#"
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

export const STUDENTS: Student[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  name: `학생 ${i + 1}`,
  intro: "사용자 경험을 최우선으로 생각하는 프론트엔드 개발자입니다.",
  link: "#",
  githubLink: "#"
}));

export const HERO_TITLE = "우리 학생들은";
export const HERO_SUBTITLE = "(산대특)_생성형 AI(스테이블 디퓨전) 활용 모던 웹 (피그마, 리액트, 리덕스) 실무자 양성과정 수료생입니다";