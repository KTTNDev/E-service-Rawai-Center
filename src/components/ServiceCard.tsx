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
      // ปรับ Container ให้เป็นแบบกะทัดรัด (Compact) และมี Overflow Hidden เพื่อตัดลายน้ำที่ล้นออก
      className={`group relative p-5 md:p-6 rounded-[2.5rem] transition-all duration-500 flex flex-col h-full overflow-hidden active:scale-95 border min-h-[160px] md:min-h-[190px]
        ${!isActive ? 'bg-slate-50 border-slate-200 opacity-70 grayscale cursor-not-allowed' : 
          isSpecial ? 'bg-white border-emerald-500/20 shadow-md hover:shadow-2xl hover:border-emerald-500/40 hover:-translate-y-2' : 
          'bg-white border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-200 hover:-translate-y-2'
        }`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* 🟢 1. พื้นหลังเรืองแสงตอน Hover */}
      {isActive && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
      )}

      {/* 🖼️ 2. ลายน้ำขนาดใหญ่ยักษ์ (โผล่มาเกินครึ่งช่องตามที่จารย์สั่ง) */}
      {/* ปรับขนาดเป็น w-64 h-64 และตำแหน่งให้โผล่มาจากมุมขวาล่างแบบเน้นๆ */}
      <div className={`absolute -bottom-20 -right-20 w-56 h-56 md:w-60 md:h-60 transition-all duration-700 pointer-events-none z-0 
        ${isActive ? 'group-hover:scale-110 group-hover:-rotate-12 opacity-[0.5] text-emerald-600' : 'opacity-[0.03] text-slate-900'}`}
      >
        {service.imageUrl && isActive ? (
          // แสดงรูปจริงแบบจางๆ ไม่แวปขาวแล้ว
          <img src={service.imageUrl} alt={service.name} className="w-full h-full object-contain -rotate-12" />
        ) : (
          <ServiceIcon className="w-full h-full -rotate-12" />
        )}
      </div>

      {/* 📝 3. ส่วนเนื้อหา (Foreground) */}
      <div className="relative z-10 flex flex-col h-full pointer-events-none">
        {/* Badge & Top Row */}
        <div className="flex justify-between items-start mb-3">
          {/* เว้นพื้นที่ไอคอนข้างบนให้โล่งขึ้นเพื่อให้ลายน้ำข้างหลังดูเด่น */}
          <div className="flex-1" /> 
          {service.badge && (
            <span className={`px-2.5 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest shadow-sm ${service.badgeColor || 'bg-slate-900 text-white'}`}>
              {service.badge}
            </span>
          )}
        </div>

        {/* รายละเอียดเมนู */}
        <div className="flex-1 mb-4">
          <h3 className={`text-base md:text-lg font-black mb-1 tracking-tight transition-colors line-clamp-1
            ${!isActive ? 'text-slate-500' : isSpecial ? 'text-emerald-900 group-hover:text-emerald-600' : 'text-slate-800 group-hover:text-emerald-600'}`}>
            {service.name}
          </h3>
          <p className="text-[11px] md:text-xs font-medium text-slate-400 leading-relaxed line-clamp-2 max-w-[85%]">
            {service.description}
          </p>
        </div>

        {/* 🔘 4. ส่วนปุ่มกดด้านล่าง */}
        <div className={`mt-auto flex items-center justify-between font-bold text-[10px] uppercase tracking-widest transition-all
          ${!isActive ? 'text-slate-400' : 'text-emerald-500'}`}>
          {isActive ? (
            <>
              <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">คลิกใช้งาน</span>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner border border-slate-100">
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