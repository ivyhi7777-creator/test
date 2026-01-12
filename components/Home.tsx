import React from 'react';
import { ViewState } from '../types';
import { SAMPLE_PLANS } from '../constants';
import PlanCard from './PlanCard';
import { ChevronRight, Zap, PiggyBank, ShieldCheck } from 'lucide-react';

interface HomeProps {
  onChangeView: (view: ViewState) => void;
}

const Home: React.FC<HomeProps> = ({ onChangeView }) => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-indigo-900 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform origin-top-right"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-200 text-sm font-bold mb-6">
              2024년 통신비 절약 프로젝트
            </span>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              통신비 반값,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                품질은 그대로.
              </span>
            </h1>
            <p className="text-lg text-blue-100 mb-10 leading-relaxed max-w-lg">
              약정 없이, 위약금 없이. 대한민국 1등 통신망을 그대로 사용하는 
              알뜰폰 요금제를 지금 만나보세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onChangeView('plans')}
                className="px-8 py-4 bg-white text-blue-900 font-bold rounded-xl hover:bg-blue-50 transition-colors flex items-center justify-center"
              >
                요금제 보러가기
                <ChevronRight className="w-4 h-4 ml-2" />
              </button>
              <button 
                onClick={() => onChangeView('advisor')}
                className="px-8 py-4 bg-blue-600/30 backdrop-blur-sm border border-blue-400/30 text-white font-bold rounded-xl hover:bg-blue-600/50 transition-colors"
              >
                AI에게 추천받기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-2xl">
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">초고속 데이터</h3>
              <p className="text-slate-600 leading-relaxed">
                SKT, KT, LGU+ 3사 통신망을 그대로 사용하여 속도와 품질 저하 없이 쾌적합니다.
              </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <PiggyBank className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">통신비 절약</h3>
              <p className="text-slate-600 leading-relaxed">
                불필요한 멤버십 거품을 빼고 평균 50% 이상 저렴한 요금제를 제공합니다.
              </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">무약정/무위약금</h3>
              <p className="text-slate-600 leading-relaxed">
                언제든 자유롭게 해지하고 이동하세요. 노예 계약 없는 자유를 드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Plans Preview */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">MD 강력 추천 요금제</h2>
              <p className="text-slate-500">지금 가장 많이 가입하는 인기 요금제입니다.</p>
            </div>
            <button 
              onClick={() => onChangeView('plans')}
              className="text-blue-600 font-bold text-sm hover:underline"
            >
              전체보기 &rarr;
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAMPLE_PLANS.slice(0, 3).map(plan => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;