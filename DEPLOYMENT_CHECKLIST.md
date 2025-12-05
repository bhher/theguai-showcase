# 배포 전 체크리스트 ✅

Vercel에 배포하기 전에 다음 사항들을 확인하세요!

## 1. 코드 준비 ✅

- [ ] 모든 코드가 정상 작동하는지 확인
- [ ] 로컬에서 `npm run build` 성공 확인
- [ ] `.gitignore`에 `.env.local` 포함 확인
- [ ] 하드코딩된 민감한 정보 제거 확인

## 2. GitHub 업로드 ✅

- [ ] Git 저장소 초기화 완료
- [ ] 모든 파일 커밋 완료
- [ ] GitHub 저장소 생성 완료
- [ ] 코드 푸시 완료

```bash
git add .
git commit -m "배포 준비 완료"
git push origin main
```

## 3. Firebase 설정 ✅

### 3.1 Firebase 프로젝트
- [ ] Firebase 프로젝트 생성 완료
- [ ] Firestore Database 생성 완료
- [ ] Firestore 보안 규칙 설정 완료

### 3.2 Firebase 설정 정보 확인
- [ ] Firebase Console → 프로젝트 설정 → 일반 탭 접근
- [ ] 웹 앱 설정 정보 확인:
  - [ ] API 키
  - [ ] Auth 도메인
  - [ ] 프로젝트 ID
  - [ ] Storage 버킷
  - [ ] 메시징 발신자 ID
  - [ ] App ID

## 4. Vercel 배포 ✅

### 4.1 프로젝트 배포
- [ ] Vercel 계정 생성 완료
- [ ] GitHub 저장소 연결 완료
- [ ] 프로젝트 배포 완료
- [ ] 배포 URL 확인 (예: `your-project.vercel.app`)

### 4.2 환경 변수 설정
Vercel → Settings → Environment Variables에서 다음 변수들 추가:

- [ ] `VITE_FIREBASE_API_KEY`
- [ ] `VITE_FIREBASE_AUTH_DOMAIN`
- [ ] `VITE_FIREBASE_PROJECT_ID`
- [ ] `VITE_FIREBASE_STORAGE_BUCKET`
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `VITE_FIREBASE_APP_ID`
- [ ] `VITE_KAKAO_MAP_API_KEY` (카카오맵 사용 시 필수)
- [ ] `VITE_ADMIN_USERNAME` (선택사항)
- [ ] `VITE_ADMIN_PASSWORD` (선택사항)

**각 변수에 대해 Production, Preview, Development 모두 선택**

### 4.3 재배포
- [ ] 환경 변수 추가 후 재배포 실행
- [ ] 배포 로그에서 오류 없는지 확인

## 5. Firebase 도메인 승인 ✅ (중요!)

**배포 후 반드시 해야 할 작업:**

- [ ] Firebase Console → **Authentication** → **설정** 탭
- [ ] **"승인된 도메인"** 섹션 찾기
- [ ] Vercel 도메인 추가:
  - [ ] `your-project.vercel.app` (기본 도메인)
  - [ ] 커스텀 도메인 사용 시 해당 도메인도 추가
- [ ] 도메인 앞에 `https://`는 붙이지 않기

**이 설정이 없으면 Firebase가 작동하지 않습니다!**

## 6. Kakao Map 설정 ✅ (중요!)

**카카오맵이 Vercel에서 표시되지 않는 경우 다음을 확인하세요:**

- [ ] [Kakao Developers Console](https://developers.kakao.com) 접속
- [ ] 내 애플리케이션 → 앱 선택 → 앱 설정 → 플랫폼
- [ ] **Web 플랫폼 등록** (이미 등록되어 있으면 수정)
- [ ] **사이트 도메인**에 Vercel 도메인 추가:
  - [ ] `your-project.vercel.app` (기본 도메인)
  - [ ] 커스텀 도메인 사용 시 해당 도메인도 추가
  - [ ] 도메인 앞에 `https://`는 붙이지 않기 (예: `theguai-showcase.vercel.app`)
- [ ] **JavaScript 키** 확인 및 복사
- [ ] Vercel 환경 변수에 `VITE_KAKAO_MAP_API_KEY` 추가 (JavaScript 키 값)
- [ ] 환경 변수 추가 후 **재배포** 실행

**⚠️ 중요:**
- 카카오맵은 HTTPS에서만 작동합니다 (Vercel은 자동으로 HTTPS 제공)
- 도메인을 추가한 후 즉시 적용됩니다
- 여러 도메인을 사용하는 경우 모두 추가해야 합니다

## 7. 배포 후 확인 ✅

배포가 완료되면 다음을 확인하세요:

- [ ] 웹사이트가 정상적으로 로드되는지 확인
- [ ] 인트로 화면이 정상 작동하는지 확인
- [ ] 연락 폼이 정상 작동하는지 확인
- [ ] Firebase 연결 확인 (브라우저 콘솔에서 오류 없는지 확인)
- [ ] 관리자 대시보드 로그인 테스트
- [ ] 카카오맵이 정상 표시되는지 확인
- [ ] 반응형 디자인 테스트 (모바일, 태블릿, 데스크톱)

## 8. 문제 해결 🔧

문제가 발생하면:

1. **브라우저 콘솔 확인** (F12 → Console 탭)
   - Firebase 오류 확인
   - 네트워크 오류 확인

2. **Vercel 배포 로그 확인**
   - Vercel → Deployments → 최신 배포 클릭
   - 빌드 로그 확인

3. **일반적인 문제들:**
   - Firebase 도메인 미승인 → Authentication 설정 확인
   - 환경 변수 오류 → Vercel 환경 변수 재확인
   - 빌드 오류 → 로컬에서 `npm run build` 테스트

---

## 빠른 배포 가이드

1. ✅ 코드 준비 및 GitHub 푸시
2. ✅ Vercel에서 프로젝트 배포
3. ✅ Vercel 환경 변수 설정
4. ✅ 재배포
5. ✅ Firebase 승인된 도메인 추가
6. ✅ 테스트 및 확인

**모든 체크리스트를 완료하면 배포 완료!** 🎉

---

## 추가 팁

- 환경 변수는 재배포 후에만 적용됩니다
- Firebase 도메인 승인은 즉시 적용됩니다
- 문제가 있으면 브라우저 콘솔을 먼저 확인하세요
- 자세한 내용은 [DEPLOYMENT.md](./DEPLOYMENT.md) 참고

