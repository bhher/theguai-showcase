import React, { useState, useEffect } from 'react';
import { X, Mail, User, MessageSquare, Calendar, RefreshCw, LogOut, Trash2, Lock, AlertCircle } from 'lucide-react';
import { getAllContacts, deleteContact } from '../firebaseService';

interface ContactData {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

interface AdminDashboardProps {
  onClose: () => void;
  onLogout?: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose, onLogout }) => {
  const [contacts, setContacts] = useState<ContactData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; contactId: string | null; contactName: string }>({
    show: false,
    contactId: null,
    contactName: ''
  });
  const [deleteUsername, setDeleteUsername] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // 관리자 계정 정보
  const ADMIN_CREDENTIALS = {
    username: import.meta.env.VITE_ADMIN_USERNAME || 'admin',
    password: import.meta.env.VITE_ADMIN_PASSWORD || 'admin123'
  };

  const fetchContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllContacts();
      setContacts(data as ContactData[]);
    } catch (err) {
      setError('데이터를 불러오는데 실패했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateFull = (date: Date) => {
    return new Date(date).toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const handleDeleteClick = (contactId: string, contactName: string) => {
    setDeleteConfirm({
      show: true,
      contactId,
      contactName
    });
    setDeleteUsername('');
    setDeletePassword('');
    setDeleteError('');
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm.contactId) return;

    setDeleteError('');
    
    // 아이디/비밀번호 확인
    if (deleteUsername !== ADMIN_CREDENTIALS.username || deletePassword !== ADMIN_CREDENTIALS.password) {
      setDeleteError('아이디 또는 비밀번호가 올바르지 않습니다.');
      return;
    }

    setIsDeleting(true);
    try {
      await deleteContact(deleteConfirm.contactId);
      // 목록에서 제거
      setContacts(contacts.filter(c => c.id !== deleteConfirm.contactId));
      setDeleteConfirm({ show: false, contactId: null, contactName: '' });
      setDeleteUsername('');
      setDeletePassword('');
    } catch (err) {
      setDeleteError('삭제 중 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ show: false, contactId: null, contactName: '' });
    setDeleteUsername('');
    setDeletePassword('');
    setDeleteError('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900 text-white overflow-hidden">
      {/* 헤더 */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">관리자 대시보드</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchContacts}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            새로고침
          </button>
          {onLogout && (
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              title="로그아웃"
            >
              <LogOut className="w-4 h-4" />
              로그아웃
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            title="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* 본문 */}
      <div className="h-[calc(100vh-73px)] overflow-y-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4 text-indigo-400" />
              <p className="text-slate-400">데이터를 불러오는 중...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <p className="text-red-400 mb-4">{error}</p>
              <button
                onClick={fetchContacts}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                다시 시도
              </button>
            </div>
          </div>
        ) : contacts.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Mail className="w-16 h-16 mx-auto mb-4 text-slate-600" />
              <p className="text-slate-400 text-lg">신청 내역이 없습니다.</p>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            {/* 통계 카드 */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-200 text-sm mb-1">총 신청 건수</p>
                    <p className="text-3xl font-bold text-white">{contacts.length}</p>
                  </div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact) => (
                <div
                  key={contact.id}
                  className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
                >
                  {/* 카드 헤더 */}
                  <div className="flex items-start justify-between mb-4 pb-4 border-b border-slate-700">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-lg">{contact.name}</p>
                        <p className="text-xs text-slate-400">신청자</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-slate-400 mb-1">
                        <Calendar className="w-3 h-3" />
                        <span>신청일</span>
                      </div>
                      <p className="text-xs text-slate-300 whitespace-nowrap">
                        {formatDateFull(contact.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* 카드 본문 */}
                  <div className="flex-1 space-y-4">
                    {/* 이메일 */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Mail className="w-4 h-4 text-indigo-400" />
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">이메일</p>
                      </div>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm break-all"
                      >
                        {contact.email}
                      </a>
                    </div>
                    
                    {/* 메시지 */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-indigo-400" />
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">메시지</p>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-3">
                        <p className="text-slate-300 text-sm whitespace-pre-wrap line-clamp-4">
                          {contact.message}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 카드 푸터 */}
                  <div className="mt-4 pt-4 border-t border-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">ID: {contact.id.slice(0, 8)}...</span>
                      <button
                        onClick={() => handleDeleteClick(contact.id, contact.name)}
                        className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 삭제 확인 모달 */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-[60] bg-slate-900/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-xl shadow-2xl p-6 border border-slate-700 max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold">삭제 확인</h3>
                <p className="text-sm text-slate-400">이 작업은 되돌릴 수 없습니다.</p>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-slate-300 mb-2">
                <span className="font-semibold">{deleteConfirm.contactName}</span>님의 신청 내역을 삭제하시겠습니까?
              </p>
              <p className="text-sm text-slate-400 mb-4">삭제하려면 관리자 아이디와 비밀번호를 입력하세요.</p>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Lock className="w-4 h-4 inline mr-2" />
                    아이디
                  </label>
                  <input
                    type="text"
                    value={deleteUsername}
                    onChange={(e) => setDeleteUsername(e.target.value)}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                    placeholder="관리자 아이디"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    <Lock className="w-4 h-4 inline mr-2" />
                    비밀번호
                  </label>
                  <input
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleDeleteConfirm();
                      }
                    }}
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all outline-none"
                    placeholder="관리자 비밀번호"
                  />
                </div>

                {deleteError && (
                  <div className="flex items-center gap-2 p-3 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{deleteError}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
                disabled={isDeleting}
              >
                취소
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={isDeleting || !deleteUsername || !deletePassword}
                className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    삭제 중...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    삭제
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

