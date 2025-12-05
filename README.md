# TheGuAI Modern Web Course Showcase

생성형 AI(Stable Diffusion) 활용 모던 웹 개발 과정 수료생 포트폴리오 쇼케이스 웹사이트입니다.

![TheGuAI](https://img.shields.io/badge/TheGuAI-Course-purple)
![React](https://img.shields.io/badge/React-19.2.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-blue)
![Vite](https://img.shields.io/badge/Vite-6.2.0-purple)
![Firebase](https://img.shields.io/badge/Firebase-10.14.1-orange)

## 📋 목차

- [프로젝트 소개](#프로젝트-소개)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [시작하기](#시작하기)
- [프로젝트 구조](#프로젝트-구조)
- [환경 변수 설정](#환경-변수-설정)
- [배포](#배포)
- [기여하기](#기여하기)

## 🎯 프로젝트 소개

이 프로젝트는 **더조은 컴퓨터아트학원**의 생성형 AI(Stable Diffusion) 활용 모던 웹 개발 과정 수료생들의 최종 프로젝트와 개인 포트폴리오를 소개하는 쇼케이스 웹사이트입니다.

### 주요 특징

- ✨ **모던한 UI/UX**: Tailwind CSS를 활용한 반응형 디자인
- 🎨 **인터랙티브 애니메이션**: 부드러운 스크롤 및 애니메이션 효과
- 📍 **카카오맵 통합**: 학원 위치 정보 제공
- 📧 **연락 폼**: Firebase를 통한 문의사항 수집
- 🔐 **관리자 대시보드**: 문의 내역 관리 기능

## 🚀 주요 기능

### 1. 인트로 화면
- 더구 캐릭터 애니메이션
- 회전하는 테두리 효과
- 로딩 진행률 표시

### 2. 과정 소개
- 모듈별 상세 설명
- 아이콘과 함께 시각화된 정보 제공

### 3. 팀 프로젝트
- 수강생들의 협업 프로젝트 소개
- 프로젝트 보기 및 깃허브 링크

### 4. 개인 포트폴리오
- 수강생 개인 포트폴리오 카드
- 포트폴리오 및 깃허브 링크

### 5. 연락하기
- 카카오맵으로 학원 위치 표시
- 연락 폼을 통한 문의사항 제출
- Firebase를 통한 데이터 저장

### 6. 관리자 대시보드
- 로그인 기능
- 문의 내역 확인 및 관리
- 삭제 기능 (관리자 인증 필요)

## 🛠 기술 스택

### Frontend
- **React 19.2.1** - UI 라이브러리
- **TypeScript 5.8.2** - 타입 안정성
- **Vite 6.2.0** - 빌드 도구
- **Tailwind CSS** - 스타일링
- **Lucide React** - 아이콘

### Backend & Services
- **Firebase Firestore** - 데이터베이스
- **Kakao Maps API** - 지도 서비스

### 개발 도구
- **Git** - 버전 관리
- **Vercel** - 배포 플랫폼

## 📦 시작하기

### 필수 요구사항

- Node.js 18.0 이상
- npm 또는 yarn
- Git

### 설치 방법

1. **저장소 클론**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd showcase
   ```

2. **의존성 설치**
   ```bash
   npm install
   ```

3. **환경 변수 설정**
   
   프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:
   ```env
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_firebase_app_id
   
   VITE_ADMIN_USERNAME=admin
   VITE_ADMIN_PASSWORD=your_secure_password
   ```

4. **개발 서버 실행**
   ```bash
   npm run dev
   ```

5. **브라우저에서 확인**
   
   브라우저에서 `http://localhost:5173` (또는 표시된 포트)로 접속하세요.

### 빌드

프로덕션 빌드를 생성하려면:

```bash
npm run build
```

빌드된 파일은 `dist` 폴더에 생성됩니다.

빌드 결과를 미리보려면:

```bash
npm run preview
```

## 📁 프로젝트 구조

```
showcase/
├── public/                 # 정적 파일
├── src/
│   ├── components/        # React 컴포넌트
│   │   ├── Intro.tsx      # 인트로 화면
│   │   ├── HeroSlider.tsx # 히어로 슬라이더
│   │   ├── CourseSummary.tsx # 과정 소개
│   │   ├── TeamProjects.tsx  # 팀 프로젝트
│   │   ├── StudentPortfolio.tsx # 개인 포트폴리오
│   │   ├── Contact.tsx    # 연락하기
│   │   ├── Footer.tsx     # 푸터
│   │   ├── AdminButton.tsx # 관리자 버튼
│   │   ├── AdminDashboard.tsx # 관리자 대시보드
│   │   └── LoginPage.tsx  # 로그인 페이지
│   ├── images/            # 이미지 파일
│   ├── App.tsx           # 메인 앱 컴포넌트
│   ├── constants.tsx     # 상수 정의
│   ├── types.ts          # TypeScript 타입 정의
│   ├── firebase.ts       # Firebase 설정
│   └── firebaseService.ts # Firebase 서비스 함수
├── .env.local            # 환경 변수 (gitignore됨)
├── index.html           # HTML 엔트리 포인트
├── package.json         # 프로젝트 설정
├── tsconfig.json        # TypeScript 설정
├── vite.config.ts       # Vite 설정
├── DEPLOYMENT.md        # 배포 가이드
├── FIREBASE_SETUP.md    # Firebase 설정 가이드
└── README.md           # 프로젝트 문서
```

## ⚙️ 환경 변수 설정

### Firebase 설정

Firebase 프로젝트를 생성하고 설정하는 방법은 [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)를 참고하세요.

### Kakao Map API

1. [Kakao Developers Console](https://developers.kakao.com)에 접속
2. 애플리케이션 생성
3. JavaScript 키 발급
4. 플랫폼 설정에서 도메인 등록
5. `components/Contact.tsx`에서 API 키 설정 (또는 환경 변수 사용)

### 관리자 계정

기본 관리자 계정:
- 아이디: `admin`
- 비밀번호: `admin123`

환경 변수 `VITE_ADMIN_USERNAME`과 `VITE_ADMIN_PASSWORD`로 변경 가능합니다.

## 🚀 배포

Vercel을 통한 배포 방법은 [DEPLOYMENT.md](./DEPLOYMENT.md)를 참고하세요.

### 빠른 배포

1. GitHub에 코드 푸시
2. [Vercel](https://vercel.com)에 로그인
3. GitHub 저장소 연결
4. 환경 변수 설정
5. 배포 완료!

## 📝 주요 컴포넌트 설명

### Intro.tsx
인트로 화면 컴포넌트. 더구 캐릭터 애니메이션과 로딩 진행률을 표시합니다.

### Contact.tsx
연락하기 섹션. 카카오맵과 연락 폼을 포함합니다.

### AdminDashboard.tsx
관리자 대시보드. Firebase에서 문의 내역을 불러와 카드 형식으로 표시합니다.

### AdminButton.tsx
관리자 버튼 컴포넌트. 로그인 상태를 관리하고 대시보드를 열어줍니다.

## 🔒 보안

- 환경 변수는 절대 코드에 하드코딩하지 마세요
- Firebase 보안 규칙을 정기적으로 검토하세요
- 관리자 비밀번호는 강력하게 설정하세요
- 프로덕션 환경에서는 테스트 모드가 아닌 프로덕션 모드를 사용하세요

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.

## 👥 팀

- **더조은 컴퓨터아트학원** - 교육 기관
- **수강생들** - 프로젝트 개발자

## 📞 연락처

- **학원 주소**: 서울특별시 구로구 디지털로 306 (구로동, 대륭포스트타워 2차 203, 205, 212호)
- **전화번호**: 02-838-1680
- **영업시간**: PM 10:00까지

## 🙏 감사의 말

- 더조은 컴퓨터아트학원
- 모든 수강생들
- 오픈소스 커뮤니티

---

**Made with ❤️ by TheGuAI Course Students**
