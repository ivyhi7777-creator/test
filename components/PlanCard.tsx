import React from 'react';
import { Plan, CarrierType } from '../types';
import { Wifi, Phone, MessageSquare } from 'lucide-react';

interface PlanCardProps {
  plan: Plan;
}

const CarrierBadge: React.FC<{ type: CarrierType }> = ({ type }) => {
  const colors = {
    [CarrierType.SKT]: 'bg-red-100 text-red-700',
    [CarrierType.KT]: 'bg-sky-100 text-sky-700',
    [CarrierType.LGU]: 'bg-pink-100 text-pink-700',
  };

  return (
    <span className={`text-xs font-bold px-2 py-1 rounded ${colors[type]}`}>
      {type}망
    </span>
  );
};

const PlanCard: React.FC<PlanCardProps> = ({ plan }) => {
  const discountRate = Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col h-full relative overflow-hidden group">
      {plan.promoMonths && (
        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl z-10">
          {plan.promoMonths}개월 할인
        </div>
      )}
      
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center">
             <CarrierBadge type={plan.carrier} />
             <span className="text-xs text-slate-500 font-medium">{plan.provider}</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 leading-tight mt-1 group-hover:text-blue-600 transition-colors">
            {plan.name}
          </h3>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
           <div className="flex items-center text-slate-600 text-sm">
             <Wifi className="w-4 h-4 mr-2 text-blue-500" />
             데이터
           </div>
           <span className="font-bold text-slate-900">{plan.data}</span>
        </div>
        <div className="flex items-center justify-between px-2">
           <div className="flex items-center text-slate-500 text-xs">
             <Phone className="w-3.5 h-3.5 mr-2" />
             통화
           </div>
           <span className="text-sm text-slate-700">{plan.voice}</span>
        </div>
        <div className="flex items-center justify-between px-2">
           <div className="flex items-center text-slate-500 text-xs">
             <MessageSquare className="w-3.5 h-3.5 mr-2" />
             문자
           </div>
           <span className="text-sm text-slate-700">{plan.message}</span>
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {plan.tags.map(tag => (
            <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        <div className="flex justify-between items-end">
          <div>
             <span className="text-xs text-slate-400 line-through block">월 {plan.originalPrice.toLocaleString()}원</span>
             <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-blue-600">
                  {plan.price.toLocaleString()}
                </span>
                <span className="text-sm font-bold text-slate-700">원</span>
             </div>
          </div>
          <button className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
            신청하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;