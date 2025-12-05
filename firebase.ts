// Firebase 초기화 설정
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase 설정
// .env.local 파일에 다음 변수들을 추가하세요:
// VITE_FIREBASE_API_KEY=your_api_key
// VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
// VITE_FIREBASE_PROJECT_ID=your_project_id
// VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
// VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
// VITE_FIREBASE_APP_ID=your_app_id

const firebaseConfig = {
    apiKey: "AIzaSyCr0b9kQGYRujw2CNb_LRZXQ7Udmjkmhew",
    authDomain: "sandae-frountend.firebaseapp.com",
    projectId: "sandae-frountend",
    storageBucket: "sandae-frountend.firebasestorage.app",
    messagingSenderId: "954731104488",
    appId: "1:954731104488:web:bd66c06a91bcaf2759215d",
    measurementId: "G-HCDWSTNTXX"
  };

// Firebase 초기화
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;

