import React from 'react';
import { ArrowRight, Lock, Globe } from 'lucide-react';
import { ICON_MAP, brandGradient } from '../lib/constants';

export const ServiceCard = ({ service, index }: { service: any, index: number }) => {
  const isSpecial = service.isHighlight;
  const isActive = service.isActive;
  const ServiceIcon = ICON_MAP[service.icon] || Globe;
  const CardWrapper = isActive ? 'a' : 'div';
  const linkProps = isActive ? { href: service.url, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <CardWrapper 
      {...linkProps}
      className={`group block p-4 md:p-10 rounded-3xl md:rounded-[2.5rem] transition-all duration-500 relative overflow-hidden flex flex-col justify-between
        ${!isActive ? 'bg-slate-50 border border-slate-200 opacity-90 cursor-not-allowed grayscale-[40%]' : 
          isSpecial ? 'bg-white border-2 border-blue-500/20 shadow-lg hover:shadow-2xl hover:-translate-y-2' : 
          'bg-white border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2'
        }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <ServiceIcon className={`absolute -bottom-4 -right-4 md:-bottom-10 md:-right-10 w-24 h-24 md:w-48 md:h-48 -rotate-12 transition-transform duration-700 pointer-events-none ${isActive ? 'group-hover:scale-110 group-hover:-rotate-6' : ''} ${isSpecial ? 'text-blue-600 opacity-[0.04]' : 'text-slate-900 opacity-[0.03]'}`} />
      
      <div className="relative z-10 h-full flex flex-col">
        {service.badge && (
          <span className={`absolute -top-1 -right-1 md:-top-2 md:-right-2 px-2 py-0.5 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-sm ${service.badgeColor || 'bg-slate-900 text-white'}`}>
            {service.badge}
          </span>
        )}
        
        <div className={`w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-[1.5rem] flex items-center justify-center mb-3 md:mb-8 overflow-hidden shrink-0 
          ${!isActive ? 'bg-slate-200 text-slate-400 shadow-inner' : isSpecial ? 'shadow-xl text-white group-hover:scale-110 transition-transform duration-300' : `${service.iconBg || 'bg-slate-100'} ${service.color || 'text-slate-600'} shadow-inner group-hover:scale-110 transition-transform duration-300`}`}
          style={isSpecial && isActive ? { background: brandGradient } : {}}
        >
          {service.imageUrl && isActive ? (
            <img src={service.imageUrl} alt={service.name} className={`w-full h-full object-contain p-1.5 md:p-2.5 ${isSpecial ? 'bg-white' : ''}`} />
          ) : (
            <ServiceIcon className={`w-5 h-5 md:w-10 md:h-10 ${isSpecial && isActive ? 'drop-shadow-sm' : ''}`} />
          )}
        </div>

        <div className="flex-1">
          <h3 className={`text-sm md:text-xl font-black mb-1 md:mb-3 tracking-tight transition-colors line-clamp-2 md:line-clamp-none ${!isActive ? 'text-slate-500' : isSpecial ? 'text-blue-900 group-hover:text-blue-600' : 'text-slate-800 group-hover:text-slate-600'}`}>
            {service.name}
          </h3>
          <p className={`text-[9px] md:text-sm font-medium leading-relaxed mb-3 md:mb-8 line-clamp-2 md:line-clamp-3 ${!isActive ? 'text-slate-400' : 'text-slate-500'}`}>
            {service.description}
          </p>
        </div>

        <div className={`flex items-center text-[9px] md:text-[13px] font-bold transition-colors mt-auto ${!isActive ? 'text-slate-400' : isSpecial ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-800'}`}>
          {isActive ? (
            <><span>เข้าใช้งาน</span><ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 group-hover:translate-x-2 transition-transform" /></>
          ) : (
            <><Lock className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" /><span>ระบบปิดให้บริการ</span></>
          )}
        </div>
      </div>
    </CardWrapper>
  );
};
