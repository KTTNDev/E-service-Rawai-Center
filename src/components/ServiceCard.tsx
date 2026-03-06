/* src/components/ServiceCard.tsx */
import React from 'react';
import { ArrowRight, Lock, Globe } from 'lucide-react';
import { ICON_MAP } from '../lib/constants';

export const ServiceCard = ({ service, index }: { service: any, index: number }) => {
  const isActive = service.isActive;
  const isSpecial = service.isHighlight;
  const ServiceIcon = ICON_MAP[service.icon] || Globe;
  const CardWrapper = isActive ? 'a' : 'div';
  const linkProps = isActive ? { href: service.url, target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <CardWrapper 
      {...linkProps}
      className={`group relative p-5 md:p-6 rounded-[2.5rem] transition-all duration-500 flex flex-col h-full overflow-hidden active:scale-95 border min-h-[170px] md:min-h-[200px]
        ${!isActive ? 'bg-slate-50 border-slate-200 opacity-70 grayscale cursor-not-allowed' : 
          isSpecial ? 'bg-white border-emerald-500/20 shadow-md hover:shadow-2xl hover:border-emerald-500/40 hover:-translate-y-2' : 
          'bg-white border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 hover:-translate-y-2'
        }`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* 🟢 1. Glow Effect ตอน Hover */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
      )}

      {/* 🖼️ 2. ลายน้ำวงกลมหลุดขอบ (ปรับให้ภาพเต็มวง) */}
      <div className={`absolute -bottom-16 -right-16 w-45 h-45 md:w-55 md:h-55 rounded-full transition-all duration-700 pointer-events-none z-0 
        flex items-center justify-center overflow-hidden border border-slate-100/50 shadow-inner
        ${isActive ? 'group-hover:scale-110 group-hover:-rotate-12 opacity-[0.25] bg-emerald-50/30' : 'opacity-[0.06] bg-slate-100/50'}`}
      >
        {/* ✅ ปรับจาก w-2/3 h-2/3 เป็น w-full h-full เพื่อให้ภาพเต็มวง */}
        <div className="w-full h-full flex items-center justify-center">
           {service.imageUrl && isActive ? (
             <img 
               src={service.imageUrl} 
               alt={service.name} 
               // ใช้ object-cover เพื่อให้ภาพถมเต็มวงกลม หรือ object-contain ถ้าไม่อยากให้ภาพโดนตัดขอบ
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
             />
           ) : (
             <ServiceIcon className={`w-1/2 h-1/2 ${isActive ? 'text-emerald-600' : 'text-slate-400'}`} />
           )}
        </div>
      </div>

      {/* 📝 3. ส่วนเนื้อหาด้านบน (Foreground) */}
      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1" /> 
          {service.badge && (
            <span className={`px-3 py-1 rounded-xl text-[8px] font-black uppercase tracking-widest shadow-sm ${service.badgeColor || 'bg-slate-900 text-white'}`}>
              {service.badge}
            </span>
          )}
        </div>

        <div className="flex-1 mb-4">
          <h3 className={`text-base md:text-lg font-black mb-1.5 tracking-tight transition-colors line-clamp-1
            ${!isActive ? 'text-slate-500' : isSpecial ? 'text-emerald-900 group-hover:text-emerald-600' : 'text-slate-800 group-hover:text-emerald-600'}`}>
            {service.name}
          </h3>
          <p className="text-[11px] md:text-xs font-medium text-slate-400 leading-relaxed line-clamp-2 max-w-[80%]">
            {service.description}
          </p>
        </div>

        {/* 🔘 4. ปุ่ม Action ด้านล่าง */}
        <div className={`mt-auto flex items-center justify-between font-bold text-[10px] uppercase tracking-widest transition-all
          ${!isActive ? 'text-slate-400' : 'text-emerald-500'}`}>
          {isActive ? (
            <>
              <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">คลิกเข้าใช้งาน</span>
              <div className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm border border-slate-100">
                <ArrowRight className="w-4 h-4" />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 italic">
              <Lock className="w-3 h-3" />
              <span>Closed</span>
            </div>
          )}
        </div>
      </div>
    </CardWrapper>
  );
};