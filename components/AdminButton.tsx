import React, { useState, useEffect } from 'react';
import { Settings, LogOut } from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import LoginPage from './LoginPage';

const AdminButton: React.FC = () => {
  const [showDashboard, setShowDashboard] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  // 세션 스토리지에서 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
      const loginTime = sessionStorage.getItem('adminLoginTime');
      
      // 24시간 후 자동 로그아웃
      if (loginTime) {
        const timeDiff = Date.now() - parseInt(loginTime);
        const hours24 = 24 * 60 * 60 * 1000;
        
        if (timeDiff > hours24) {
          sessionStorage.removeItem('adminLoggedIn');
          sessionStorage.removeItem('adminLoginTime');
          setIsLoggedIn(false);
          return;
        }
      }
      
      setIsLoggedIn(loggedIn);
    };

    checkLoginStatus();
    
    // 주기적으로 로그인 상태 확인
    const interval = setInterval(checkLoginStatus, 60000); // 1분마다
    
    return () => clearInterval(interval);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setShowDashboard(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminLoggedIn');
    sessionStorage.removeItem('adminLoginTime');
    setIsLoggedIn(false);
    setShowDashboard(false);
  };

  const handleDashboardClick = () => {
    if (isLoggedIn) {
      setShowDashboard(true);
    } else {
      setShowLogin(true);
    }
  };

  return (
    <>
      <button
        onClick={handleDashboardClick}
        className="fixed top-20 right-4 z-50 p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 transform hover:scale-110"
        title={isLoggedIn ? "관리자 대시보드" : "관리자 로그인"}
      >
        <Settings className="w-5 h-5" />
      </button>

      {/* 로그인 페이지 */}
      {showLogin && !isLoggedIn && (
        <LoginPage 
          onLoginSuccess={handleLoginSuccess}
          onClose={() => setShowLogin(false)}
        />
      )}

      {/* 관리자 대시보드 */}
      {showDashboard && isLoggedIn && (
        <AdminDashboard 
          onClose={() => setShowDashboard(false)}
          onLogout={handleLogout}
        />
      )}
    </>
  );
};

export default AdminButton;

