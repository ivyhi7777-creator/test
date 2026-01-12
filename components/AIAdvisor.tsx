import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Plan } from '../types';
import { SAMPLE_PLANS } from '../constants';
import { getPlanRecommendation } from '../services/geminiService';
import PlanCard from './PlanCard';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

const AIAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '안녕하세요! 저는 알뜰모바일 AI 상담사입니다. 어떤 요금제를 찾고 계신가요? (예: 유튜브를 많이 봐서 데이터가 무제한이었으면 좋겠어)',
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await getPlanRecommendation(userMsg.text);
      
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: result.text,
        recommendedPlanIds: result.recommendedIds
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
       console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-80px)] p-4 flex flex-col">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 flex-grow flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center shadow-md">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3 backdrop-blur-sm">
            <Sparkles className="text-white w-5 h-5" />
          </div>
          <div>
            <h2 className="text-white font-bold text-lg">AI 요금제 상담소</h2>
            <p className="text-indigo-100 text-xs">Gemini Pro가 최적의 요금제를 분석해드립니다.</p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-grow overflow-y-auto p-4 space-y-6 bg-slate-50">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                  msg.role === 'user' ? 'bg-slate-200 ml-3' : 'bg-indigo-100 mr-3'
                }`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-slate-500" /> : <Bot className="w-5 h-5 text-indigo-600" />}
                </div>

                {/* Bubble */}
                <div className="flex flex-col">
                  <div className={`p-4 rounded-2xl shadow-sm text-sm leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user' 
                      ? 'bg-slate-800 text-white rounded-tr-none' 
                      : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Recommendations */}
                  {msg.recommendedPlanIds && msg.recommendedPlanIds.length > 0 && (
                    <div className="mt-4 grid grid-cols-1 gap-4">
                      {msg.recommendedPlanIds.map(id => {
                        const plan = SAMPLE_PLANS.find(p => p.id === id);
                        return plan ? <PlanCard key={plan.id} plan={plan} /> : null;
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="bg-indigo-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
                  <Bot className="w-5 h-5 text-indigo-600" />
               </div>
               <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 flex items-center">
                 <Loader2 className="w-4 h-4 animate-spin text-indigo-600 mr-2" />
                 <span className="text-sm text-slate-500">최적의 요금제를 찾는 중입니다...</span>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="예: 데이터 10기가 정도 쓰고 2만원 이하로 추천해줘"
              className="w-full pl-4 pr-12 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all text-sm"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AIAdvisor;