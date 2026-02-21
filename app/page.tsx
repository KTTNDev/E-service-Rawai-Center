'use client';

import React, { useEffect } from 'react';
import { 
  Calendar, MapPinned, Megaphone, Building2, Globe, 
  Video, ArrowRight, LayoutGrid, ShieldCheck,
  FileSignature, Syringe, HeartPulse, BookOpen, Recycle, Store, Lock
} from 'lucide-react';

// 🗂️ ฐานข้อมูลลิงก์ E-Service ของเทศบาลตำบลราไวย์
// 💡 อนาคตสามารถดึงข้อมูลนี้มาจาก Firebase ได้เลย เพื่อให้ Admin เปิด/ปิดได้
const SERVICES = [
  // --- 🌟 หมวดระบบที่เปิดใช้งานแล้ว (isActive: true) ---
  { 
    id: 'cctv',
    name: "ระบบคำร้องขอภาพ CCTV", 
    description: "ยื่นคำร้องออนไลน์ขอดูภาพหรือดาวน์โหลดไฟล์วิดีโอจากกล้องวงจรปิด",
    url: "https://db-rawaicctv.web.app/", 
    icon: Video, 
    imageUrl: "https://lh3.googleusercontent.com/d/1FJrVPCxuFeZU4rO9RROFSn-2zv8X7-rW=w250?authuser=0", 
    isHighlight: true,
    isActive: true, // ✅ เปิดใช้งาน
    badge: "New Service",
    badgeColor: "bg-blue-600 text-white animate-pulse"
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
    iconBg: "bg-pink-100",
    isActive: true // ✅ เปิดใช้งาน
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
    iconBg: "bg-blue-100",
    isActive: true // ✅ เปิดใช้งาน
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
    iconBg: "bg-indigo-100",
    isActive: true // ✅ เปิดใช้งาน
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
    iconBg: "bg-teal-100",
    isActive: true // ✅ เปิดใช้งาน
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
    iconBg: "bg-orange-100",
    isActive: true // ✅ เปิดใช้งาน
  },
  { 
    id: 'manual',
    name: "คู่มือประชาชนติดต่อราชการ", 
    description: "ดาวน์โหลดคู่มือและขั้นตอนการเตรียมเอกสารติดต่อรับบริการต่างๆ",
    url: "https://rawaicity.app/document", 
    icon: BookOpen, 
    color: "text-emerald-600",
    bgColor: "bg-emerald-50 border-emerald-100",
    iconBg: "bg-emerald-100",
    isActive: true // ✅ เปิดใช้งาน
  },

  // --- 🚧 หมวดระบบที่ยังไม่เปิดให้บริการ หรือ นอกเวลาโครงการ (isActive: false) ---
  { 
    id: 'vaccine',
    name: "ลงทะเบียนฉีดวัคซีนสุนัข-แมว", 
    description: "บริการลงทะเบียนล่วงหน้าเพื่อรับวัคซีนป้องกันโรคพิษสุนัขบ้า (เฉพาะช่วงระยะเวลาโครงการ)",
    url: "#", 
    icon: Syringe, 
    color: "text-slate-500", bgColor: "bg-slate-100 border-slate-200", iconBg: "bg-slate-200",
    isActive: false, // ❌ ปิดการใช้งาน
    badge: "ไม่อยู่ในระยะเวลาโครงการ",
    badgeColor: "bg-red-100 text-red-700 border border-red-200"
  },
  { 
    id: 'neuter',
    name: "ลงทะเบียนทำหมันสุนัข-แมว", 
    description: "โครงการควบคุมประชากรสัตว์จรจัดและสัตว์เลี้ยงในพื้นที่ (เฉพาะช่วงระยะเวลาโครงการ)",
    url: "#", 
    icon: HeartPulse, 
    color: "text-slate-500", bgColor: "bg-slate-100 border-slate-200", iconBg: "bg-slate-200",
    isActive: false, // ❌ ปิดการใช้งาน
    badge: "ปิดรับลงทะเบียนชั่วคราว",
    badgeColor: "bg-red-100 text-red-700 border border-red-200"
  },
  { 
    id: 'commerce',
    name: "แจ้งจดทะเบียนพาณิชย์", 
    description: "ระบบรับเรื่องและตรวจสอบเอกสารการจดทะเบียนพาณิชย์ (กองสาธารณสุขและสิ่งแวดล้อม)",
    url: "#", 
    icon: FileSignature, 
    color: "text-slate-500", bgColor: "bg-slate-100 border-slate-200", iconBg: "bg-slate-200",
    isActive: false, // ❌ ปิดการใช้งาน
    badge: "กำลังพัฒนาระบบ",
    badgeColor: "bg-amber-100 text-amber-700 border border-amber-200"
  },
  { 
    id: 'garbage-bank',
    name: "ธนาคารขยะ (Garbage Bank)", 
    description: "ระบบสมุดบัญชีออนไลน์ ตรวจสอบราคารับซื้อขยะปัจจุบัน และเช็คยอดเงินฝากสะสมของสมาชิก",
    url: "#", 
    icon: Recycle, 
    color: "text-slate-500", bgColor: "bg-slate-100 border-slate-200", iconBg: "bg-slate-200",
    isActive: false, // ❌ ปิดการใช้งาน
    badge: "เร็วๆ นี้",
    badgeColor: "bg-slate-800 text-white"
  },
  { 
    id: 'tourism-promo',
    name: "พื้นที่โปรโมทธุรกิจท้องถิ่น", 
    description: "ลงทะเบียนประชาสัมพันธ์ร้านค้า ห้างร้าน และแหล่งท่องเที่ยว (ระบบต้องผ่านการอนุมัติจากเจ้าหน้าที่)",
    url: "#", 
    icon: Store, 
    color: "text-slate-500", bgColor: "bg-slate-100 border-slate-200", iconBg: "bg-slate-200",
    isActive: false, // ❌ ปิดการใช้งาน
    badge: "Coming Soon",
    badgeColor: "bg-slate-800 text-white"
  }
];

export default function RawaiPortal() {
  const brandGradient = "linear-gradient(135deg, hsla(222, 51%, 34%, 1) 0%, hsla(119, 37%, 45%, 1) 100%)";

  useEffect(() => {
    document.title = "ศูนย์รวม E-Service ราไวย์";
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-100 text-slate-900 pb-20 overflow-hidden">
      
      {/* 🌟 Hero Banner */}
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
            <span className="text-emerald-300">ราไวย์</span>
          </h1>
          <h2 className="text-sm md:text-xl lg:text-2xl font-bold text-white mb-4 md:mb-6 drop-shadow-sm px-2">
            เทศบาลตำบลราไวย์ อำเภอเมืองภูเก็ต จังหวัดภูเก็ต
          </h2>
          <p className="text-xs md:text-base font-medium text-blue-50 max-w-2xl mx-auto leading-relaxed opacity-80 drop-shadow-sm px-4">
            ยกระดับการให้บริการประชาชน เข้าถึงทุกระบบงานของเทศบาลได้ง่าย รวดเร็ว และปลอดภัย ในที่เดียว
          </p>
        </div>
      </div>

      {/* 🎯 Services Grid */}
      <div className="max-w-7xl mx-auto px-3 md:px-8 -mt-16 md:-mt-24 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
          
          {SERVICES.map((service, index) => {
            const isSpecial = service.isHighlight;
            const isActive = service.isActive;
            
            // ✅ เปลี่ยน tag <a> เป็น <div> ถ้ายังไม่เปิดใช้งาน เพื่อไม่ให้คลิกได้
            const CardWrapper = isActive ? 'a' : 'div';
            const linkProps = isActive ? { href: service.url, target: "_blank", rel: "noopener noreferrer" } : {};

            return (
              <CardWrapper 
                key={service.id}
                {...linkProps}
                className={`group block p-4 md:p-10 rounded-3xl md:rounded-[2.5rem] transition-all duration-500 relative overflow-hidden flex flex-col justify-between
                  ${!isActive ? 'bg-slate-50 border border-slate-200 opacity-90 cursor-not-allowed grayscale-[40%]' : 
                    isSpecial ? 'bg-white border-2 border-blue-500/20 shadow-lg hover:shadow-2xl hover:-translate-y-2' : 
                    'bg-white border border-slate-100 shadow-lg hover:shadow-2xl hover:-translate-y-2'
                  }
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* 🌊 ลายน้ำพื้นหลัง (Watermark Icon) */}
                <service.icon 
                  className={`absolute -bottom-4 -right-4 md:-bottom-10 md:-right-10 w-24 h-24 md:w-48 md:h-48 -rotate-12 transition-transform duration-700 pointer-events-none
                    ${isActive ? 'group-hover:scale-110 group-hover:-rotate-6' : ''}
                    ${isSpecial ? 'text-blue-600 opacity-[0.04]' : 'text-slate-900 opacity-[0.03]'}
                  `} 
                />

                <div className="relative z-10 h-full flex flex-col">
                  {/* 📌 ป้ายกำกับ (Badge) - รองรับสีแบบ Custom */}
                  {service.badge && (
                    <span className={`absolute -top-1 -right-1 md:-top-2 md:-right-2 px-2 py-0.5 md:px-4 md:py-1.5 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-sm
                      ${service.badgeColor || 'bg-slate-900 text-white'}
                    `}>
                      {service.badge}
                    </span>
                  )}

                  {/* 📌 ไอคอนบริการ หรือ รูปภาพ */}
                  <div className={`w-12 h-12 md:w-20 md:h-20 rounded-xl md:rounded-[1.5rem] flex items-center justify-center mb-3 md:mb-8 overflow-hidden shrink-0 
                    ${!isActive ? 'bg-slate-200 text-slate-400 shadow-inner' : 
                      isSpecial ? 'shadow-xl text-white group-hover:scale-110 transition-transform duration-300' : 
                      `${service.iconBg} ${service.color} shadow-inner group-hover:scale-110 transition-transform duration-300`
                    }`}
                    style={isSpecial && isActive ? { background: brandGradient } : {}}
                  >
                    {service.imageUrl && isActive ? (
                      <img src={service.imageUrl} alt={service.name} className={`w-full h-full object-contain p-1.5 md:p-2.5 ${isSpecial ? 'bg-white' : ''}`} />
                    ) : (
                      <service.icon className={`w-5 h-5 md:w-10 md:h-10 ${isSpecial && isActive ? 'drop-shadow-sm' : ''}`} />
                    )}
                  </div>

                  {/* 📌 เนื้อหา */}
                  <div className="flex-1">
                    <h3 className={`text-sm md:text-xl font-black mb-1 md:mb-3 tracking-tight transition-colors line-clamp-2 md:line-clamp-none
                      ${!isActive ? 'text-slate-500' : isSpecial ? 'text-blue-900 group-hover:text-blue-600' : 'text-slate-800 group-hover:text-slate-600'}
                    `}>
                      {service.name}
                    </h3>
                    <p className={`text-[9px] md:text-sm font-medium leading-relaxed mb-3 md:mb-8 line-clamp-2 md:line-clamp-3
                      ${!isActive ? 'text-slate-400' : 'text-slate-500'}
                    `}>
                      {service.description}
                    </p>
                  </div>

                  {/* 📌 ปุ่มกดด้านล่าง */}
                  <div className={`flex items-center text-[9px] md:text-[13px] font-bold transition-colors mt-auto
                    ${!isActive ? 'text-slate-400' : isSpecial ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-800'}
                  `}>
                    {isActive ? (
                      <>
                        <span>เข้าใช้งาน</span>
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 group-hover:translate-x-2 transition-transform" />
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        <span>ระบบปิดให้บริการ</span>
                      </>
                    )}
                  </div>
                </div>
              </CardWrapper>
            );
          })}

        </div>
      </div>

      {/* 🛡️ Footer */}
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