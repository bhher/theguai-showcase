import React, { useState } from 'react';
import { Lock, User, AlertCircle, X } from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onClose?: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 관리자 계정 정보 (환경 변수 또는 상수로 관리)
  const ADMIN_CREDENTIALS = {
    username: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
    password: import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // 간단한 지연으로 로딩 효과
    await new Promise(resolve => setTimeout(resolve, 500));

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // 로그인 성공 - 세션 스토리지에 저장
      sessionStorage.setItem('adminLoggedIn', 'true');
      sessionStorage.setItem('adminLoginTime', Date.now().toString());
      onLoginSuccess();
    } else {
      setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 p-2 text-slate-400 hover:text-white transition-colors"
            title="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        )}
        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold mb-2">관리자 로그인</h2>
            <p className="text-slate-400 text-sm">관리자 대시보드에 접근하려면 로그인하세요</p>
          </div>

          {/* 로그인 폼 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 아이디 입력 */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                아이디
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none placeholder:text-slate-400"
                placeholder="아이디를 입력하세요"
                autoComplete="username"
              />
            </div>

            {/* 비밀번호 입력 */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                <Lock className="w-4 h-4 inline mr-2" />
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none placeholder:text-slate-400"
                placeholder="비밀번호를 입력하세요"
                autoComplete="current-password"
              />
            </div>

            {/* 에러 메시지 */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* 로그인 버튼 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  로그인 중...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  로그인
                </>
              )}
            </button>
          </form>

          {/* 개발용 힌트 (프로덕션에서는 제거) */}
          {import.meta.env.DEV && (
            <div className="mt-6 p-3 bg-slate-700/50 rounded-lg text-xs text-slate-400 text-center">
              개발 모드: 기본 아이디/비밀번호는 admin / admin123
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

