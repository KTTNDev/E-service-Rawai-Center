/* src/components/HeroBanner.tsx */
import React from 'react';
import { LayoutGrid } from 'lucide-react';

export const HeroBanner = () => {
  return (
    <div 
      className="relative px-6 pt-16 pb-24 md:pt-24 md:pb-36 text-center text-white overflow-hidden parallax-bg" 
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(15, 23, 42, 0.7)), url('/02_promthep-cape-phuket.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center', // โฟกัสกลางภาพตามที่จารย์สั่ง
        backgroundAttachment: 'fixed' 
      }}
    >
      <div className="absolute top-0 inset-x-0 h-full bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex justify-center mb-6">
          <div className="p-3 md:p-4 bg-white/10 backdrop-blur-md rounded-[2.5rem] border border-white/20 shadow-2xl inline-block group hover:scale-105 transition-all duration-500">
            {/* ปรับขนาดโลโก้ให้ใหญ่ขึ้นเล็กน้อย (w-16 -> w-20) */}
            <img 
              src="https://www.rawai.go.th/images/header-72-1/logo_0004.png" 
              alt="โลโก้เทศบาลตำบลราไวย์" 
              className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-2xl" 
            />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-400/30 text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] mb-6 text-emerald-200">
          <LayoutGrid className="w-4 h-4" />
          <span>Rawai Digital Portal 2026</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 leading-tight drop-shadow-2xl text-white">
          ศูนย์รวม E-Service <span className="text-emerald-300">ราไวย์</span>
        </h1>
        
        <h2 className="text-base md:text-2xl font-bold text-white mb-6 tracking-wide drop-shadow-md">
          เทศบาลตำบลราไวย์ จังหวัดภูเก็ต
        </h2>

        <p className="hidden md:block text-sm md:text-lg font-medium text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow-sm opacity-90">
          ยกระดับการให้บริการประชาชน เข้าถึงทุกระบบงานได้ง่าย รวดเร็ว และปลอดภัย
        </p>
      </div>
    </div>
  );
};