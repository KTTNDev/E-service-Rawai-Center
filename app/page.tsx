'use client';

import React, { useEffect } from 'react';
import { 
  Calendar, MapPinned, Megaphone, Building2, Globe, 
  Video, ArrowRight, LayoutGrid, ShieldCheck
} from 'lucide-react';

// 🗂️ ฐานข้อมูลลิงก์ E-Service ของเทศบาลตำบลราไวย์
const SERVICES = [
  { 
    id: 'cctv',
    name: "ระบบคำร้องขอภาพ CCTV", 
    description: "ยื่นคำร้องออนไลน์ขอดูภาพหรือดาวน์โหลดไฟล์วิดีโอจากกล้องวงจรปิด",
    url: "https://db-rawaicctv.web.app/", 
    icon: Video, 
    // ✅ อัปเดตลิงก์รูป CCTV ใหม่
    imageUrl: "https://lh3.googleusercontent.com/d/1FJrVPCxuFeZU4rO9RROFSn-2zv8X7-rW=w250?authuser=0", 
    isHighlight: true,
    badge: "New Service"
  },
  { 
    id: 'traffy',
    name: "Traffy Fondue", 
    description: "ระบบรับแจ้งเหตุและจัดการปัญหาเมืองเพื่อการแก้ไขที่รวดเร็ว",
    url: "https://landing.traffy.in.th?key=elqOlHUe", 
    icon: Megaphone, 
    imageUrl: "https://www.nstda.or.th/nac/2023/wp-content/uploads/2023/03/ex-faeature-image_ex07.webp",
    color: "text-pink-600",
    bgColor: "bg-pink-50 border-pink-100",
    iconBg: "bg-pink-100"
  },
  { 
    id: 'onemap',
    name: "Rawai One Map", 
    description: "แผนที่ภูมิสารสนเทศออนไลน์เทศบาลตำบลราไวย์",
    url: "https://rawai-one-map.web.app/", 
    icon: MapPinned, 
    imageUrl: "https://www.rawai.go.th/images/header-72-1/logo_0004.png", 
    color: "text-blue-600",
    bgColor: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100"
  },
  { 
    id: 'eoffice',
    name: "ระบบ E-Office", 
    description: "ระบบสำนักงานอิเล็กทรอนิกส์สำหรับเจ้าหน้าที่",
    url: "https://rawai.s.eoffice.go.th/portal/home", 
    icon: Building2,
    imageUrl: "https://www.eoffice.go.th/img/Logo-e-Office.png", 
    color: "text-indigo-600",
    bgColor: "bg-indigo-50 border-indigo-100",
    iconBg: "bg-indigo-100"
  },
  { 
    id: 'oss',
    name: "ศูนย์บริการ OSS", 
    description: "ศูนย์บริการร่วม / ศูนย์บริการเบ็ดเสร็จ (One Stop Service)",
    url: "https://www.dla.go.th/land/oss.do", 
    icon: Globe, 
    imageUrl: "https://www.dla.go.th/images/logo.png",
    color: "text-teal-600",
    bgColor: "bg-teal-50 border-teal-100",
    iconBg: "bg-teal-100"
  },
  { 
    id: 'event',
    name: "กิจกรรมราไวย์", 
    description: "ปฏิทินกิจกรรมและข่าวสารประชาสัมพันธ์ของเทศบาล",
    url: "https://www.rawai.go.th/event.php", 
    icon: Calendar, 
    imageUrl: "https://www.rawai.go.th/images/header-72-1/logo_0004.png", 
    color: "text-orange-600",
    bgColor: "bg-orange-50 border-orange-100",
    iconBg: "bg-orange-100"
  }
];

export default function RawaiPortal() {
  // 🎨 ธีมสีประจำเทศบาล/โปรเจกต์ที่เราใช้กันมาตลอด
  const brandGradient = "linear-gradient(135deg, hsla(222, 51%, 34%, 1) 0%, hsla(119, 37%, 45%, 1) 100%)";

  // ✅ เปลี่ยนชื่อแท็บ (Title) ด้านบนของเบราว์เซอร์
  useEffect(() => {
    document.title = "ศูนย์รวม E-Service ราไวย์";
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-100 text-slate-900 pb-20 overflow-hidden">
      
      {/* 🌟 ส่วนหัว (Hero Banner) แบบโค้งมน Overlap Design */}
      <div 
        className="relative px-6 pt-16 md:pt-20 pb-28 md:pb-40 text-center text-white"
        style={{ background: brandGradient }}
      >
        {/* ลวดลายพื้นหลังจางๆ ของ Banner */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* ✅ เพิ่มโลโก้เทศบาลตำบลราไวย์ที่หัวเว็บ (อยู่ในกรอบกระจกใส) */}
          <div className="flex justify-center mb-6">
            <div className="p-2 md:p-3 bg-white/10 backdrop-blur-md rounded-3xl md:rounded-[2rem] border border-white/20 shadow-xl inline-block group hover:bg-white/20 transition-all duration-300">
              <img 
                src="https://www.rawai.go.th/images/header-72-1/logo_0004.png" 
                alt="โลโก้เทศบาลตำบลราไวย์" 
                className="w-16 h-16 md:w-24 md:h-24 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[9px] md:text-[10px] font-black uppercase tracking-widest mb-4 md:mb-6 shadow-sm">
            <LayoutGrid className="w-3 h-3 md:w-4 md:h-4" />
            <span>Rawai Digital Portal 2026</span>
          </div>
          
          {/* ✅ เปลี่ยนชื่อหัวเว็บเป็น ศูนย์รวม E-Service ราไวย์ */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tight mb-3 md:mb-4 leading-tight drop-shadow-md">
            ศูนย์รวม E-Service <br className="hidden md:block" />
            <span className="text-emerald-300">ราไวย์</span>
          </h1>
          
          {/* ✅ ปรับคำอธิบายรองให้เหมาะสม */}
          <h2 className="text-sm md:text-xl lg:text-2xl font-bold text-white mb-4 md:mb-6 drop-shadow-sm px-2">
            เทศบาลตำบลราไวย์ อำเภอเมืองภูเก็ต จังหวัดภูเก็ต
          </h2>
          
          <p className="text-xs md:text-base font-medium text-blue-50 max-w-2xl mx-auto leading-relaxed opacity-80 drop-shadow-sm px-4">
            ยกระดับการให้บริการประชาชน เข้าถึงทุกระบบงานของเทศบาลได้ง่าย รวดเร็ว และปลอดภัย ในที่เดียว
          </p>
        </div>
      </div>

      {/* 🎯 ส่วนเมนู (Services Grid) ลอยทับแบนเนอร์ */}
      <div className="max-w-7xl mx-auto px-3 md:px-8 -mt-16 md:-mt-24 relative z-20">
        {/* ✅ ปรับ Grid เป็น 2 คอลัมน์บนมือถือ (grid-cols-2) */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          
          {SERVICES.map((service, index) => {
            const isSpecial = service.isHighlight;
            
            return (
              <a 
                key={service.id}
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                // ✅ ลด padding (p-4) และความโค้งให้เหมาะกับมือถือแบบ 2 คอลัมน์
                className={`group block p-4 md:p-10 rounded-3xl md:rounded-[2.5rem] transition-all duration-500 relative overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 flex flex-col justify-between
                  ${isSpecial ? 'bg-white border-2 border-blue-500/20' : `bg-white border border-slate-100`}
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* 🌊 ลายน้ำพื้นหลัง (Watermark Icon) */}
                <service.icon 
                  className={`absolute -bottom-4 -right-4 md:-bottom-10 md:-right-10 w-24 h-24 md:w-48 md:h-48 -rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6 pointer-events-none
                    ${isSpecial ? 'text-blue-600 opacity-[0.04]' : 'text-slate-900 opacity-[0.03]'}
                  `} 
                />

                {/* เนื้อหาด้านบน (ต้องใช้ relative z-10 ให้อยู่เหนือลายน้ำ) */}
                <div className="relative z-10 h-full flex flex-col">
                  {/* 📌 ป้ายกำกับ (Badge) */}
                  {service.badge && (
                    <span className={`absolute -top-1 -right-1 md:-top-2 md:-right-2 px-2 py-0.5 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-sm
                      ${isSpecial ? 'bg-blue-600 text-white animate-pulse' : 'bg-slate-900 text-white'}
                    `}>
                      {service.badge}
                    </span>
                  )}

                  {/* 📌 ไอคอนบริการ หรือ รูปภาพ */}
                  {isSpecial ? (
                    // ไอคอนพิเศษสำหรับ CCTV
                    // ✅ ปรับขนาดไอคอนให้พอดีกับ 2 คอลัมน์ (w-12 h-12)
                    <div className="w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-[1.5rem] flex items-center justify-center mb-3 md:mb-8 shadow-xl text-white group-hover:scale-110 transition-transform duration-300 overflow-hidden shrink-0" style={{ background: brandGradient }}>
                      {service.imageUrl ? (
                        <img src={service.imageUrl} alt={service.name} className="w-full h-full object-contain p-1.5 md:p-2.5 bg-white" />
                      ) : (
                        <service.icon className="w-5 h-5 md:w-10 md:h-10 drop-shadow-sm" />
                      )}
                    </div>
                  ) : (
                    // ไอคอนปกติ หรือ รูปภาพที่ระบุ
                    <div className={`w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-[1.5rem] flex items-center justify-center mb-3 md:mb-8 shadow-inner group-hover:scale-110 transition-transform duration-300 overflow-hidden shrink-0 ${service.imageUrl ? 'bg-white border border-slate-100 shadow-sm' : `${service.iconBg} ${service.color}`}`}>
                      {service.imageUrl ? (
                        <img src={service.imageUrl} alt={service.name} className="w-full h-full object-contain p-1.5 md:p-2.5" />
                      ) : (
                        <service.icon className="w-5 h-5 md:w-10 md:h-10" />
                      )}
                    </div>
                  )}

                  {/* 📌 เนื้อหา */}
                  <div className="flex-1">
                    {/* ✅ ย่อชื่อหัวข้อให้เล็กลงในมือถือ */}
                    <h3 className={`text-sm md:text-xl font-black mb-1 md:mb-3 tracking-tight transition-colors line-clamp-2 md:line-clamp-none
                      ${isSpecial ? 'text-blue-900 group-hover:text-blue-600' : 'text-slate-800 group-hover:text-slate-600'}
                    `}>
                      {service.name}
                    </h3>
                    {/* ✅ ซ่อน/ย่อ คำอธิบายเพื่อไม่ให้การ์ดดูรกบนมือถือ */}
                    <p className="text-slate-500 text-[9px] md:text-sm font-medium leading-relaxed mb-3 md:mb-8 line-clamp-2">
                      {service.description}
                    </p>
                  </div>

                  {/* 📌 ปุ่มกดด้านล่าง */}
                  <div className={`flex items-center text-[9px] md:text-[13px] font-bold transition-colors mt-auto
                    ${isSpecial ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-800'}
                  `}>
                    <span>เข้าใช้งาน</span>
                    <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>

                {/* เอฟเฟกต์เรืองแสงเวลาเอาเมาส์ชี้ */}
                <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity pointer-events-none
                  ${isSpecial ? 'bg-blue-200' : 'bg-slate-200'}
                `}></div>
              </a>
            );
          })}

        </div>
      </div>

      {/* 🛡️ Footer (PDPA & ความน่าเชื่อถือ) */}
      <div className="max-w-4xl mx-auto px-6 mt-16 md:mt-32 text-center relative z-10">
        <div className="flex flex-col items-center justify-center space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 md:gap-3 text-slate-400">
            <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
            <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-center">Smart City Portal • Data Privacy</p>
          </div>
          <p className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center px-4">
            ลิขสิทธิ์ © 2026 เทศบาลตำบลราไวย์ อำเภอเมืองภูเก็ต จังหวัดภูเก็ต
          </p>
        </div>
      </div>

    </div>
  );
}