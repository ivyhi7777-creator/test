import React, { useState } from 'react';
import { SAMPLE_PLANS } from '../constants';
import { CarrierType } from '../types';
import PlanCard from './PlanCard';
import { Filter } from 'lucide-react';

const PlanList: React.FC = () => {
  const [carrierFilter, setCarrierFilter] = useState<CarrierType | 'ALL'>('ALL');
  const [dataFilter, setDataFilter] = useState<string>('ALL');

  const filteredPlans = SAMPLE_PLANS.filter(plan => {
    if (carrierFilter !== 'ALL' && plan.carrier !== carrierFilter) return false;
    // Simple logic for demo purposes. Real logic would parse GB strings.
    if (dataFilter === 'UNLIMITED' && !plan.data.includes('무제한') && !plan.name.includes('무제한') && !plan.data.includes('+')) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
          내게 딱 맞는 <span className="text-blue-600">요금제 찾기</span>
        </h2>
        <p className="text-slate-500">약정 없이 자유롭게, 통신비 반값 혜택을 누려보세요.</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <div className="flex items-center text-slate-400 mr-2">
            <Filter className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">필터</span>
          </div>
          {['ALL', CarrierType.SKT, CarrierType.KT, CarrierType.LGU].map(c => (
             <button
               key={c}
               onClick={() => setCarrierFilter(c as any)}
               className={`px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                 carrierFilter === c 
                 ? 'bg-slate-900 text-white' 
                 : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
               }`}
             >
               {c === 'ALL' ? '전체 통신망' : c}
             </button>
          ))}
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
           <select 
             className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
             onChange={(e) => setDataFilter(e.target.value)}
             value={dataFilter}
           >
             <option value="ALL">데이터 전체</option>
             <option value="UNLIMITED">데이터 무제한 급</option>
             <option value="10GB">10GB 이상</option>
             <option value="5GB">10GB 미만</option>
           </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlans.map(plan => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
      
      {filteredPlans.length === 0 && (
         <div className="text-center py-20">
           <p className="text-slate-500 text-lg">조건에 맞는 요금제가 없습니다.</p>
           <button 
             onClick={() => { setCarrierFilter('ALL'); setDataFilter('ALL'); }}
             className="mt-4 text-blue-600 font-medium hover:underline"
           >
             필터 초기화
           </button>
         </div>
      )}
    </div>
  );
};

export default PlanList;