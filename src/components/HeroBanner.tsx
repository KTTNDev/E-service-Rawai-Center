/* src/components/HeroBanner.tsx */
import React from 'react';

export const HeroBanner = () => {
  return (
    <div 
      className="relative px-6 pt-40 pb-36 md:pt-52 md:pb-48 text-center text-white overflow-hidden parallax-bg" 
      style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(15, 23, 42, 0.4), #f8fafc), url('/02_promthep-cape-phuket.png')`,
        backgroundSize: 'cover',
        // ✅ ปรับแนวตั้งเป็น 65% เพื่อให้ภาพ "ลงมาอีกนิด" โฟกัสส่วนสำคัญ
        backgroundPosition: 'center 65%', 
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed' 
      }}
    >
      <div className="relative z-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-tight drop-shadow-2xl">
          เข้าถึงทุกบริการ<br /> E-Service <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-200">
            เทศบาลตำบลราไวย์
          </span>
        </h1>
        <p className="text-sm md:text-xl font-medium text-white/80 max-w-2xl mx-auto drop-shadow-md">
          เทศบาลตำบลราไวย์ ยกระดับการให้บริการประชาชน <br className="hidden md:block" /> 
          รวดเร็ว โปร่งใส และปลอดภัย ในที่เดียว
        </p>
      </div>
    </div>
  );
};