import React from 'react';
import { LayoutGrid } from 'lucide-react';
import { brandGradient } from '../lib/constants';

export const HeroBanner = () => {
  return (
    <div className="relative px-6 pt-16 md:pt-20 pb-28 md:pb-40 text-center text-white" style={{ background: brandGradient }}>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="relative z-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="flex justify-center mb-6">
          <div className="p-2 md:p-3 bg-white/10 backdrop-blur-md rounded-3xl md:rounded-[2rem] border border-white/20 shadow-xl inline-block group hover:bg-white/20 transition-all duration-300">
            <img src="https://www.rawai.go.th/images/header-72-1/logo_0004.png" alt="โลโก้เทศบาลตำบลราไวย์" className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-4 md:mb-6 shadow-sm">
          <LayoutGrid className="w-3 h-3 md:w-4 md:h-4" /><span>Rawai Digital Portal 2026</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-3 md:mb-4 leading-tight drop-shadow-md">
          ศูนย์รวม E-Service <br className="hidden md:block" />
        <span className="text-emerald-300">ราไวย์ ซิตี้</span>
        </h1>
        <h2 className="text-sm md:text-xl lg:text-2xl font-bold text-white mb-4 md:mb-6 drop-shadow-sm px-2">
          เทศบาลตำบลราไวย์ อำเภอเมืองภูเก็ต จังหวัดภูเก็ต
        </h2>
        <p className="text-xs md:text-base font-medium text-blue-50 max-w-2xl mx-auto leading-relaxed opacity-80 drop-shadow-sm px-4">
          ยกระดับการให้บริการประชาชน เข้าถึงทุกระบบงานของเทศบาลได้ง่าย รวดเร็ว และปลอดภัย ในที่เดียว
        </p>
      </div>
    </div>
  );
};