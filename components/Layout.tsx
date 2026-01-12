import React from 'react';
import { ViewState } from '../types';
import { Smartphone, Signal, MessageSquareText, Search, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onChangeView }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'plans', label: '요금제 찾기', icon: Signal },
    { id: 'phones', label: '휴대폰 구매', icon: Smartphone },
    { id: 'advisor', label: 'AI 맞춤추천', icon: MessageSquareText },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer" 
              onClick={() => onChangeView('home')}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center mr-2">
                <Signal className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                알뜰모바일
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onChangeView(item.id as ViewState)}
                  className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                    currentView === item.id 
                      ? 'text-blue-600' 
                      : 'text-slate-600 hover:text-blue-600'
                  }`}
                >
                  <item.icon className="w-4 h-4 mr-1.5" />
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-4">
               <button className="p-2 text-slate-500 hover:text-blue-600 transition-colors">
                 <Search className="w-5 h-5" />
               </button>
               <button className="px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">
                 로그인
               </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600"
              >
                {isMobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onChangeView(item.id as ViewState);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-4 rounded-md text-base font-medium ${
                    currentView === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-white text-lg font-bold mb-4">알뜰모바일</h3>
              <p className="text-sm leading-relaxed mb-4">
                통신비 거품을 빼고 가치를 더하다.<br/>
                대한민국 1등 알뜰폰 비교/추천 플랫폼
              </p>
              <div className="flex space-x-4">
                {/* Social placeholders */}
                <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
                <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
                <div className="w-8 h-8 bg-slate-700 rounded-full"></div>
              </div>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">서비스</h4>
              <ul className="space-y-2 text-sm">
                <li>요금제 찾기</li>
                <li>내게 맞는 요금제 추천</li>
                <li>자급제폰 구매</li>
                <li>이벤트/혜택</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">고객센터</h4>
              <ul className="space-y-2 text-sm">
                <li>1:1 문의하기</li>
                <li>자주 묻는 질문</li>
                <li>공지사항</li>
                <li className="text-blue-400">1544-0000</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-xs text-center">
            &copy; 2024 SmartMobile Inc. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;