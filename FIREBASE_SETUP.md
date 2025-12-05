# Firebase 설정 가이드

## 1. Firebase 프로젝트 생성

1. [Firebase Console](https://console.firebase.google.com/)에 접속
2. "프로젝트 추가" 클릭
3. 프로젝트 이름 입력 후 생성

## 2. Firestore Database 설정

### 단계별 가이드:

1. **Firestore Database 메뉴 접근**
   - Firebase Console 왼쪽 사이드바에서 "Firestore Database" 클릭
   - 또는 "빌드(Build)" 섹션에서 "Firestore Database" 선택

2. **데이터베이스 생성 시작**
   - "데이터베이스 만들기" 버튼 클릭

3. **보안 규칙 선택**
   - **개발 단계**: "테스트 모드에서 시작" 선택
     - ⚠️ 주의: 테스트 모드는 모든 읽기/쓰기를 허용하므로 개발 단계에서만 사용
   - **프로덕션**: "프로덕션 모드에서 시작" 선택 (인증 필요)

4. **위치 선택**
   - 드롭다운에서 위치 선택
   - **권장**: `asia-northeast3` (서울)
   - 다른 옵션: `asia-northeast1` (도쿄), `asia-northeast2` (오사카)
   - 위치 선택 후 "사용 설정" 클릭

5. **생성 완료 대기**
   - 데이터베이스 생성에 몇 분 소요될 수 있음
   - "데이터베이스 준비 완료" 메시지 확인

6. **컬렉션 생성 (선택사항)**
   - 자동으로 생성되지만, 수동으로 생성하려면:
   - "컬렉션 시작" 클릭
   - 컬렉션 ID: `contacts` 입력
   - 문서 ID: "자동 ID" 선택
   - 필드 추가:
     - `name` (문자열)
     - `email` (문자열)
     - `message` (문자열)
     - `createdAt` (타임스탬프)
   - "저장" 클릭

### 스크린샷 가이드:

```
Firebase Console
├── Firestore Database 클릭
│   ├── "데이터베이스 만들기" 버튼
│   ├── 보안 규칙 선택 (테스트 모드)
│   ├── 위치 선택 (asia-northeast3)
│   └── "사용 설정" 클릭
└── 데이터베이스 생성 완료 대기
```

## 3. 웹 앱 등록

1. Firebase Console에서 프로젝트 설정(톱니바퀴 아이콘) 클릭
2. "프로젝트 설정" → "일반" 탭
3. "내 앱" 섹션에서 웹 아이콘(</>) 클릭
4. 앱 닉네임 입력 후 "앱 등록"
5. Firebase SDK 설정 정보 복사

## 4. 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# 관리자 로그인 정보 (선택사항)
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=admin123
```

**주의**: 프로덕션 환경에서는 반드시 강력한 비밀번호를 사용하세요!

## 5. Firebase 패키지 설치

```bash
npm install firebase
```

## 6. Firestore 보안 규칙 설정

Firebase Console → Firestore Database → 규칙 탭에서 다음 규칙을 설정하세요:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // contacts 컬렉션에 대한 규칙
    match /contacts/{document=**} {
      // 읽기: 모든 사용자 허용 (관리자 대시보드용)
      allow read: if true;
      // 쓰기: 모든 사용자 허용 (Contact 폼 제출용)
      allow write: if true;
    }
  }
}
```

**주의**: 프로덕션 환경에서는 인증을 추가하여 보안을 강화하세요.

## 7. 실행

```bash
npm install
npm run dev
```

## 문제 해결

- Firebase 연결 오류가 발생하면 `.env.local` 파일의 환경 변수가 올바른지 확인하세요
- Firestore 규칙이 올바르게 설정되었는지 확인하세요
- 브라우저 콘솔에서 에러 메시지를 확인하세요

