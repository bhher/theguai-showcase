# 배포 가이드 (GitHub + Vercel)

이 가이드는 프로젝트를 GitHub에 업로드하고 Vercel을 통해 배포하는 방법을 설명합니다.

## 목차
1. [GitHub 저장소 생성 및 업로드](#1-github-저장소-생성-및-업로드)
2. [Vercel 배포](#2-vercel-배포)
3. [환경 변수 설정](#3-환경-변수-설정)
4. [도메인 설정](#4-도메인-설정)
5. [문제 해결](#5-문제-해결)

---

## 1. GitHub 저장소 생성 및 업로드

### 1.1 GitHub 저장소 생성

1. [GitHub](https://github.com)에 로그인
2. 우측 상단의 **"+"** 버튼 클릭 → **"New repository"** 선택
3. 저장소 정보 입력:
   - **Repository name**: `theguai-showcase` (또는 원하는 이름)
   - **Description**: "TheGuAI Modern Web Course Showcase"
   - **Public** 또는 **Private** 선택
   - **README**, **.gitignore**, **license**는 선택사항
4. **"Create repository"** 클릭

### 1.2 프로젝트를 Git 저장소로 초기화

프로젝트 루트 디렉토리에서 다음 명령어 실행:

```bash
# Git 초기화 (이미 초기화되어 있다면 생략)
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: TheGuAI Showcase project"

# GitHub 저장소를 원격 저장소로 추가 (YOUR_USERNAME과 YOUR_REPO_NAME을 실제 값으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 또는 SSH 사용 시
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git

# 메인 브랜치로 푸시
git branch -M main
git push -u origin main
```

### 1.3 .gitignore 확인

프로젝트 루트에 `.gitignore` 파일이 있는지 확인하고, 다음 항목들이 포함되어 있는지 확인:

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Testing
coverage/

# Production
dist/
build/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Firebase
.firebase/
firebase-debug.log
```

---

## 2. Vercel 배포

### 2.1 Vercel 계정 생성

1. [Vercel](https://vercel.com)에 접속
2. **"Sign Up"** 클릭
3. **"Continue with GitHub"** 선택하여 GitHub 계정으로 로그인
4. 권한 승인

### 2.2 프로젝트 배포

1. Vercel 대시보드에서 **"Add New..."** → **"Project"** 클릭
2. GitHub 저장소 목록에서 방금 업로드한 저장소 선택
3. 프로젝트 설정:
   - **Framework Preset**: Vite (자동 감지됨)
   - **Root Directory**: `./` (기본값)
   - **Build Command**: `npm run build` (자동 설정됨)
   - **Output Directory**: `dist` (자동 설정됨)
   - **Install Command**: `npm install` (자동 설정됨)
4. **"Deploy"** 클릭

### 2.3 배포 완료

- 배포가 완료되면 자동으로 URL이 생성됩니다 (예: `your-project.vercel.app`)
- 배포 로그를 확인하여 오류가 없는지 확인하세요

---

## 3. 환경 변수 설정

### 3.1 Vercel 환경 변수 추가

1. Vercel 대시보드에서 프로젝트 선택
2. **"Settings"** 탭 클릭
3. **"Environment Variables"** 메뉴 선택
4. 다음 환경 변수들을 추가:

```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=your_secure_password
```

5. 각 환경 변수에 대해 **"Production"**, **"Preview"**, **"Development"** 환경 선택
6. **"Save"** 클릭

### 3.2 재배포

환경 변수를 추가한 후:
1. **"Deployments"** 탭으로 이동
2. 최신 배포 옆의 **"..."** 메뉴 클릭
3. **"Redeploy"** 선택
4. 또는 코드를 수정하고 GitHub에 푸시하면 자동으로 재배포됩니다

---

## 4. 도메인 설정

### 4.1 커스텀 도메인 추가 (선택사항)

1. Vercel 대시보드에서 프로젝트 선택
2. **"Settings"** → **"Domains"** 탭 클릭
3. 원하는 도메인 입력 (예: `showcase.theguai.com`)
4. **"Add"** 클릭
5. DNS 설정 안내에 따라 도메인 제공업체에서 DNS 레코드 추가:
   - **A Record**: `@` → Vercel IP 주소
   - **CNAME Record**: `www` → `cname.vercel-dns.com`
6. DNS 전파 대기 (보통 몇 분에서 몇 시간 소요)

### 4.2 Vercel 기본 도메인

- Vercel은 자동으로 `your-project.vercel.app` 형식의 도메인을 제공합니다
- 이 도메인도 HTTPS가 자동으로 적용됩니다

---

## 5. 문제 해결

### 5.1 빌드 오류

**문제**: 빌드가 실패하는 경우

**해결 방법**:
1. Vercel 배포 로그 확인
2. 로컬에서 빌드 테스트:
   ```bash
   npm run build
   ```
3. 오류 메시지 확인 및 수정
4. `package.json`의 빌드 스크립트 확인

### 5.2 환경 변수 오류

**문제**: 환경 변수가 적용되지 않는 경우

**해결 방법**:
1. Vercel 환경 변수 설정 확인
2. 변수명이 `VITE_`로 시작하는지 확인
3. 재배포 실행
4. 브라우저 콘솔에서 오류 확인

### 5.3 Firebase 연결 오류

**문제**: Firebase가 작동하지 않는 경우

**해결 방법**:
1. Firebase Console에서 도메인 추가:
   - Firebase Console → 프로젝트 설정 → 일반
   - "승인된 도메인"에 Vercel 도메인 추가
2. Firestore 보안 규칙 확인
3. Firebase API 키 확인

### 5.4 Kakao Map 오류

**문제**: 카카오맵이 표시되지 않는 경우

**해결 방법**:
1. [Kakao Developers Console](https://developers.kakao.com) 접속
2. 앱 설정 → 플랫폼 → Web 플랫폼 등록
3. 사이트 도메인에 Vercel 도메인 추가
4. JavaScript 키 확인

### 5.5 자동 배포가 작동하지 않는 경우

**문제**: GitHub에 푸시해도 자동 배포가 안 되는 경우

**해결 방법**:
1. Vercel → Settings → Git
2. GitHub 연결 상태 확인
3. 필요시 재연결

---

## 6. 지속적인 배포 (CI/CD)

### 6.1 자동 배포 설정

Vercel은 기본적으로 다음 상황에서 자동 배포됩니다:
- **main/master 브랜치에 푸시**: 프로덕션 배포
- **다른 브랜치에 푸시**: 프리뷰 배포
- **Pull Request 생성**: 프리뷰 배포

### 6.2 배포 브랜치 설정

1. Vercel → Settings → Git
2. **"Production Branch"** 설정 (기본값: `main`)
3. 필요시 변경

---

## 7. 추가 팁

### 7.1 성능 최적화

- 이미지 최적화: `images/` 폴더의 이미지들을 압축
- 코드 스플리팅: 필요시 React.lazy() 사용
- 빌드 최적화: Vite의 기본 최적화 설정 활용

### 7.2 모니터링

- Vercel Analytics 사용 (선택사항)
- Firebase Analytics 통합
- 에러 로깅: Sentry 등 통합 고려

### 7.3 보안

- 환경 변수는 절대 코드에 하드코딩하지 않기
- Firebase 보안 규칙 정기적으로 검토
- 관리자 비밀번호는 강력하게 설정

---

## 8. 빠른 참조 명령어

```bash
# 로컬 개발 서버 실행
npm run dev

# 프로덕션 빌드 테스트
npm run build
npm run preview

# Git 작업
git add .
git commit -m "커밋 메시지"
git push origin main

# 배포 확인
# Vercel 대시보드에서 확인
```

---

## 9. 체크리스트

배포 전 확인사항:

- [ ] `.gitignore`에 민감한 정보 제외 확인
- [ ] 환경 변수 모두 설정 완료
- [ ] 로컬 빌드 테스트 통과
- [ ] Firebase 도메인 설정 완료
- [ ] Kakao Map API 키 및 도메인 설정 완료
- [ ] 모든 링크 및 이미지 경로 확인
- [ ] 반응형 디자인 테스트 완료
- [ ] 브라우저 호환성 테스트 완료

---

## 10. 지원 및 참고 자료

- [Vercel 공식 문서](https://vercel.com/docs)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)
- [Firebase 배포 가이드](https://firebase.google.com/docs/hosting)
- [GitHub 문서](https://docs.github.com)

---

**배포 완료 후**: 프로젝트가 성공적으로 배포되면 Vercel에서 제공하는 URL로 접속하여 확인하세요!

