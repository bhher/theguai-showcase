import React, { useState, useEffect, useRef } from 'react';
import { Mail, Send, User, MessageSquare, MapPin, Clock, Phone } from 'lucide-react';
import { saveContactForm } from '../firebaseService';

const Contact: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [mapError, setMapError] = useState<string | null>(null);

  // 카카오맵 초기화
  useEffect(() => {
    // 카카오맵 API 키 설정
    const KAKAO_API_KEY = 'bceccd594bb478b5533d7d2ec63f8bb0';
    
    let mapInstance: any = null;
    let retryCount = 0;
    const MAX_RETRIES = 10;

    const loadKakaoMap = () => {
      const container = mapRef.current;
      if (!container) {
        console.warn('카카오맵: 컨테이너를 찾을 수 없습니다.');
        if (retryCount < MAX_RETRIES) {
          retryCount++;
          setTimeout(loadKakaoMap, 200);
        }
        return;
      }

      if (window.kakao && window.kakao.maps) {
        try {
          // 구로디지털단지역 근처 좌표 (기본 중심점)
          const options = {
            center: new window.kakao.maps.LatLng(37.4852, 126.9014), // 구로디지털단지역 근처
            level: 3,
            mapTypeId: window.kakao.maps.MapTypeId.HYBRID // 하이브리드 지도 (위성+일반)
          };

          mapInstance = new window.kakao.maps.Map(container, options);
          console.log('카카오맵: 지도 초기화 완료');
          
          // 지도 컨트롤 추가 (줌 컨트롤)
          const zoomControl = new window.kakao.maps.ZoomControl();
          mapInstance.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
          
          // 지도 타입 컨트롤 추가 (일반/위성/하이브리드 전환)
          const mapTypeControl = new window.kakao.maps.MapTypeControl();
          mapInstance.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

          // 기본 좌표 (구로디지털단지역 근처 - 대륭포스트타워 2차 추정 위치)
          // 디지털로 306 근처 좌표
          const defaultCoords = new window.kakao.maps.LatLng(37.4852, 126.9014);

          // 마커를 생성하는 함수
          const createMarker = (coords: any) => {
            try {
              console.log('카카오맵: 마커 생성 시작', coords);
              
              // 기존 마커가 있으면 제거
              if ((window as any).currentMarker) {
                (window as any).currentMarker.setMap(null);
              }
              
              // 마커 생성
              const marker = new window.kakao.maps.Marker({
                position: coords,
                map: mapInstance
              });
              
              // 전역 변수에 저장 (나중에 제거하기 위해)
              (window as any).currentMarker = marker;
              
              console.log('카카오맵: 마커 생성 완료', marker);

              // 커스텀 오버레이로 "클릭" 말풍선 생성 (둥둥 떠다니는 효과)
              const bubbleDiv = document.createElement('div');
              bubbleDiv.innerHTML = `
                <div style="
                  position:relative;
                  background-color:#3b82f6;
                  color:#ffffff;
                  padding:8px 16px;
                  border-radius:20px;
                  font-size:13px;
                  font-weight:bold;
                  white-space:nowrap;
                  box-shadow:0 4px 12px rgba(59,130,246,0.4);
                  cursor:pointer;
                  font-family:'Noto Sans KR', sans-serif;
                  animation:bounce-bubble 2s ease-in-out infinite;
                ">
                  클릭
                  <div style="
                    position:absolute;
                    bottom:-8px;
                    left:50%;
                    transform:translateX(-50%);
                    width:0;
                    height:0;
                    border-left:8px solid transparent;
                    border-right:8px solid transparent;
                    border-top:8px solid #3b82f6;
                  "></div>
                </div>
              `;
              
              const customOverlay = new window.kakao.maps.CustomOverlay({
                position: coords,
                content: bubbleDiv,
                yAnchor: 2.5,
                xAnchor: 0.5
              });
              
              customOverlay.setMap(mapInstance);
              
              // 마커 클릭 시 카카오맵 링크로 이동
              if ((window.kakao.maps as any).event) {
                (window.kakao.maps as any).event.addListener(marker, 'click', () => {
                  window.open('https://map.kakao.com/?map_type=TYPE_MAP&itemId=1356421216&q=%EB%8D%94%EC%A1%B0%EC%9D%80%EC%BB%B4%ED%93%A8%ED%84%B0%ED%95%99%EC%9B%90+%EA%B5%AC%EB%A1%9C%EC%A0%90&urlLevel=3&urlX=477300&urlY=1107366', '_blank');
                });
                
                // 커스텀 오버레이도 클릭 가능하도록
                const overlayElement = bubbleDiv.querySelector('div');
                if (overlayElement) {
                  overlayElement.addEventListener('click', () => {
                    window.open('https://map.kakao.com/?map_type=TYPE_MAP&itemId=1356421216&q=%EB%8D%94%EC%A1%B0%EC%9D%80%EC%BB%B4%ED%93%A8%ED%84%B0%ED%95%99%EC%9B%90+%EA%B5%AC%EB%A1%9C%EC%A0%90&urlLevel=3&urlX=477300&urlY=1107366', '_blank');
                  });
                }
              }
              
              console.log('카카오맵: 마커 및 말풍선 생성 완료', coords);
            } catch (error) {
              console.error('카카오맵: 마커 생성 중 오류', error);
            }
          };

          // 주소로 좌표 검색 (services가 로드되었는지 확인)
          if (!window.kakao.maps.services || !window.kakao.maps.services.Geocoder) {
            console.error('카카오맵: Geocoder 서비스를 사용할 수 없습니다. services 라이브러리가 로드되지 않았습니다.');
            // Geocoder를 사용할 수 없으면 기본 좌표로 마커 생성
            mapInstance.setCenter(defaultCoords);
            createMarker(defaultCoords);
            return;
          }
          
          const geocoder = new window.kakao.maps.services.Geocoder();
          
          // 여러 주소 형식으로 시도 (더 정확한 검색을 위해)
          const addresses = [
            '서울특별시 구로구 디지털로 306', // 도로명 주소
            '서울특별시 구로구 디지털로 306 대륭포스트타워 2차', // 상세 주소
            '서울특별시 구로구 구로동 대륭포스트타워 2차', // 건물명 포함
            '서울특별시 구로구 구로동' // 기본 지번 주소
          ];
          
          let searchIndex = 0;
          let markerCreated = false;
          
          const tryAddressSearch = (addr: string) => {
            console.log(`카카오맵: 주소 검색 시도: ${addr}`);
            geocoder.addressSearch(addr, (result: any, status: any) => {
              if (status === window.kakao.maps.services.Status.OK && result && result.length > 0) {
                const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                console.log('카카오맵: 주소 검색 성공', addr, coords, result[0]);
                
                // 지도 중심을 결과값으로 설정
                mapInstance.setCenter(coords);
                
                // 마커 생성
                if (!markerCreated) {
                  createMarker(coords);
                  markerCreated = true;
                }
              } else {
                console.log(`카카오맵: 주소 검색 실패: ${addr}`, status);
                // 다음 주소로 시도
                searchIndex++;
                if (searchIndex < addresses.length) {
                  console.log(`카카오맵: 다음 주소 시도: ${addresses[searchIndex]}`);
                  tryAddressSearch(addresses[searchIndex]);
                } else {
                  // 모든 주소 검색 실패 시 기본 좌표 사용
                  console.warn('카카오맵: 모든 주소 검색 실패, 기본 좌표 사용');
                  if (!markerCreated) {
                    mapInstance.setCenter(defaultCoords);
                    createMarker(defaultCoords);
                    markerCreated = true;
                  }
                }
              }
            });
          };
          
          // 주소 검색 시작 (비동기이므로 타임아웃 설정)
          tryAddressSearch(addresses[0]);
          
          // 주소 검색이 너무 오래 걸리면 기본 좌표로 마커 생성
          setTimeout(() => {
            if (!markerCreated) {
              console.warn('카카오맵: 주소 검색 타임아웃, 기본 좌표로 마커 생성');
              mapInstance.setCenter(defaultCoords);
              createMarker(defaultCoords);
              markerCreated = true;
            }
          }, 3000); // 3초 후 타임아웃
        } catch (error) {
          console.error('카카오맵: 지도 생성 중 오류', error);
        }
      } else {
        // 카카오맵 API가 아직 로드되지 않았으면 재시도
        if (retryCount < MAX_RETRIES) {
          retryCount++;
          setTimeout(loadKakaoMap, 200);
        } else {
          console.error('카카오맵: API 로드 실패 - 최대 재시도 횟수 초과');
          setMapError('지도 API를 불러오는데 시간이 오래 걸립니다.');
        }
      }
    };

    // 이미 스크립트가 로드되어 있는지 확인
    const existingScript = document.querySelector('script[src*="dapi.kakao.com"]') as HTMLScriptElement;
    
    // 기존 스크립트에 services 라이브러리가 없으면 제거하고 다시 로드
    if (existingScript && !existingScript.src.includes('libraries=services')) {
      console.log('카카오맵: 기존 스크립트에 services 라이브러리가 없어 재로드합니다.');
      existingScript.remove();
    }
    
    if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
      // 이미 로드되어 있고 services도 있으면 바로 실행
      loadKakaoMap();
    } else if (existingScript && existingScript.src.includes('libraries=services')) {
      // 스크립트는 있지만 아직 로드 중이면 대기
      const checkInterval = setInterval(() => {
        if (window.kakao && window.kakao.maps && window.kakao.maps.services) {
          clearInterval(checkInterval);
          loadKakaoMap();
        }
      }, 100);
      
      // 5초 후 타임아웃
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!window.kakao || !window.kakao.maps || !window.kakao.maps.services) {
          console.error('카카오맵: 스크립트 로드 타임아웃');
        }
      }, 5000);
    } else {
      // 스크립트가 없으면 새로 로드
      const script = document.createElement('script');
      // services 라이브러리를 포함하여 Geocoder 사용 가능하도록 설정
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_API_KEY}&libraries=services&autoload=false`;
      
      script.onload = () => {
        console.log('카카오맵: 스크립트 로드 완료');
        if (window.kakao) {
          window.kakao.maps.load(() => {
            console.log('카카오맵: API 로드 완료');
            // services가 로드될 때까지 약간의 지연
            setTimeout(() => {
              loadKakaoMap();
            }, 100);
          });
        }
      };
      
      script.onerror = (error) => {
        console.error('카카오맵: 스크립트 로드 실패', error);
        setMapError('지도를 불러오는데 실패했습니다. API 키와 도메인 설정을 확인해주세요.');
      };
      
      document.head.appendChild(script);
    }

    // cleanup
    return () => {
      if (mapInstance) {
        // 지도 인스턴스 정리 (필요시)
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Firebase에 연락 폼 데이터 저장
      await saveContactForm({
        name: formData.name,
        email: formData.email,
        message: formData.message
      });
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } catch (error) {
      console.error('연락 폼 저장 중 오류:', error);
      setSubmitStatus('error');
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-8 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 rounded-full blur-[150px] opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            연락하기
          </h2>
          <p className="text-slate-400 text-lg">
            궁금한 점이 있으시면 언제든지 연락주세요.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 왼쪽: 지도 및 학원 정보 */}
          <div className="space-y-6">
            {/* 지도 */}
            <div className="bg-slate-800 rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
              <div ref={mapRef} className="w-full h-[400px]"></div>
              {mapError && (
                <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm text-center">
                  {mapError}
                  <br />
                  <span className="text-xs text-red-400 mt-2 block">
                    브라우저 콘솔(F12)에서 자세한 오류를 확인하세요.
                  </span>
                </div>
              )}
            </div>

            {/* 학원 정보 */}
            <div className="bg-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-700">
              <h3 className="text-xl font-bold mb-6">학원 정보</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-300 mb-1">주소</p>
                    <p className="text-slate-400 text-sm">
                      서울특별시 구로구 디지털로 306<br />
                      (구로동, 대륭포스트타워 2차 203, 205, 212호)<br />
                      더조은컴퓨터아트학원
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-300 mb-1">영업시간</p>
                    <p className="text-slate-400 text-sm">
                      영업 중 · PM 10:00에 영업 종료
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-slate-300 mb-1">전화번호</p>
                    <a 
                      href="tel:02-838-1680" 
                      className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                    >
                      02-838-1680
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 연락 폼 */}
          <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 md:p-12 border border-slate-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 이름 입력 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                이름
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none placeholder:text-slate-400"
                placeholder="이름을 입력해주세요"
              />
            </div>

            {/* 이메일 입력 */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                이메일
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none placeholder:text-slate-400"
                placeholder="your.email@example.com"
              />
            </div>

            {/* 메시지 입력 */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                메시지
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none placeholder:text-slate-400"
                placeholder="문의 내용을 입력해주세요"
              />
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  전송 중...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  메시지 보내기
                </>
              )}
            </button>

            {/* 성공/에러 메시지 */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-900/30 border border-green-700 rounded-lg text-green-300 text-center">
                메시지가 성공적으로 전송되었습니다!
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-center">
                전송 중 오류가 발생했습니다. 다시 시도해주세요.
              </div>
            )}
          </form>

          {/* 직접 연락처 정보 */}
          <div className="mt-12 pt-12 border-t border-slate-700">
            <h3 className="text-lg font-semibold mb-4 text-center">또는 직접 연락하기</h3>
            <div className="flex flex-col items-center justify-center gap-4">
              <a
                href="mailto:contact@genai-course.com"
                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                <Mail className="w-5 h-5" />
                contact@genai-course.com
              </a>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

