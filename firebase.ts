// Firebase 초기화 설정
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase 설정
// 환경 변수에서 Firebase 설정 정보 가져오기
// .env.local 파일 또는 Vercel 환경 변수에 다음 변수들을 추가하세요:
// VITE_FIREBASE_API_KEY=your_api_key
// VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
// VITE_FIREBASE_PROJECT_ID=your_project_id
// VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
// VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
// VITE_FIREBASE_APP_ID=your_app_id

// 환경 변수 타입 안전성을 위한 헬퍼 함수
const getEnvVar = (key: string, defaultValue: string): string => {
  const env = import.meta.env as any;
  return env[key] || defaultValue;
};

const firebaseConfig = {
  apiKey: getEnvVar('VITE_FIREBASE_API_KEY', 'AIzaSyCr0b9kQGYRujw2CNb_LRZXQ7Udmjkmhew'),
  authDomain: getEnvVar('VITE_FIREBASE_AUTH_DOMAIN', 'sandae-frountend.firebaseapp.com'),
  projectId: getEnvVar('VITE_FIREBASE_PROJECT_ID', 'sandae-frountend'),
  storageBucket: getEnvVar('VITE_FIREBASE_STORAGE_BUCKET', 'sandae-frountend.firebasestorage.app'),
  messagingSenderId: getEnvVar('VITE_FIREBASE_MESSAGING_SENDER_ID', '954731104488'),
  appId: getEnvVar('VITE_FIREBASE_APP_ID', '1:954731104488:web:bd66c06a91bcaf2759215d'),
  measurementId: 'G-HCDWSTNTXX'
};

// 환경 변수 확인 (개발 모드에서만)
const env = import.meta.env as any;
if (env.DEV) {
  const requiredEnvVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID'
  ];

  const missingVars = requiredEnvVars.filter(
    (varName) => !env[varName]
  );

  if (missingVars.length > 0) {
    console.warn(
      '⚠️ Firebase 환경 변수가 설정되지 않았습니다:',
      missingVars.join(', ')
    );
    console.warn('기본값을 사용합니다. 프로덕션 배포 전에 환경 변수를 설정하세요.');
  }
}

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;

