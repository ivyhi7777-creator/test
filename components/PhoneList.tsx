import React from 'react';
import { SAMPLE_PHONES } from '../constants';
import { Star } from 'lucide-react';

const PhoneList: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
          최신 자급제폰 <span className="text-purple-600">특가 기획전</span>
        </h2>
        <p className="text-slate-500">약정/위약금 없는 자급제폰과 알뜰요금제의 꿀조합</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {SAMPLE_PHONES.map(phone => (
          <div key={phone.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all group cursor-pointer">
            <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden">
              <img 
                src={phone.imageUrl} 
                alt={phone.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {phone.badge && (
                <div className="absolute top-3 left-3 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                  {phone.badge}
                </div>
              )}
            </div>
            
            <div className="p-5">
              <div className="text-xs text-slate-500 mb-1 font-medium">{phone.manufacturer}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{phone.name}</h3>
              
              <div className="flex flex-wrap gap-1 mb-4">
                {phone.features.slice(0, 2).map(f => (
                  <span key={f} className="text-[10px] bg-slate-50 text-slate-600 px-2 py-1 rounded border border-slate-100">
                    {f}
                  </span>
                ))}
              </div>

              <div className="flex items-end justify-between mt-4">
                <div>
                   <span className="text-xs text-slate-400 block mb-1">즉시 구매가</span>
                   <span className="text-xl font-black text-slate-900">
                     {(phone.price / 10000).toLocaleString()}만
                     <span className="text-sm font-normal text-slate-600 ml-0.5">원</span>
                   </span>
                </div>
                <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                  <Star className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhoneList;