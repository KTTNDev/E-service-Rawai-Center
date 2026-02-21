import { 
  Video, Megaphone, MapPinned, Building2, Globe, Calendar, 
  BookOpen, Syringe, HeartPulse, FileSignature, Recycle, Store 
} from 'lucide-react';

export const brandGradient = "linear-gradient(135deg, hsla(222, 51%, 34%, 1) 0%, hsla(119, 37%, 45%, 1) 100%)";



export const COLOR_PRESETS = [
  { name: 'ฟ้า (Blue)', color: "text-blue-600", bgColor: "bg-blue-50 border-blue-100", iconBg: "bg-blue-100" },
  { name: 'ชมพู (Pink)', color: "text-pink-600", bgColor: "bg-pink-50 border-pink-100", iconBg: "bg-pink-100" },
  { name: 'เขียว (Teal)', color: "text-teal-600", bgColor: "bg-teal-50 border-teal-100", iconBg: "bg-teal-100" },
  { name: 'ส้ม (Orange)', color: "text-orange-600", bgColor: "bg-orange-50 border-orange-100", iconBg: "bg-orange-100" },
  { name: 'ม่วง (Indigo)', color: "text-indigo-600", bgColor: "bg-indigo-50 border-indigo-100", iconBg: "bg-indigo-100" },
  { name: 'มรกต (Emerald)', color: "text-emerald-600", bgColor: "bg-emerald-50 border-emerald-100", iconBg: "bg-emerald-100" },
];
export const DEFAULT_SERVICES = [
  { 
    id: 'cctv', name: "ระบบคำร้องขอภาพ CCTV", description: "ยื่นคำร้องออนไลน์ขอดูภาพหรือดาวน์โหลดไฟล์วิดีโอจากกล้องวงจรปิด",
    url: "https://db-rawaicctv.web.app/", icon: 'Video', imageUrl: "https://lh3.googleusercontent.com/d/1FJrVPCxuFeZU4rO9RROFSn-2zv8X7-rW=w250?authuser=0", 
    isHighlight: true, isActive: true, badge: "New Service", badgeColor: "bg-blue-600 text-white animate-pulse"
  },
  { 
    id: 'traffy', name: "Traffy Fondue", description: "ระบบรับแจ้งเหตุและจัดการปัญหาเมืองเพื่อการแก้ไขที่รวดเร็ว",
    url: "https://landing.traffy.in.th?key=elqOlHUe", icon: 'Megaphone', imageUrl: "https://www.nstda.or.th/nac/2023/wp-content/uploads/2023/03/ex-faeature-image_ex07.webp",
    color: "text-pink-600", bgColor: "bg-pink-50 border-pink-100", iconBg: "bg-pink-100", isActive: true
  },
  { 
    id: 'onemap', name: "Rawai One Map", description: "แผนที่ภูมิสารสนเทศออนไลน์เทศบาลตำบลราไวย์",
    url: "https://rawai-one-map.web.app/", icon: 'MapPinned', imageUrl: "https://www.rawai.go.th/images/header-72-1/logo_0004.png", 
    color: "text-blue-600", bgColor: "bg-blue-50 border-blue-100", iconBg: "bg-blue-100", isActive: true
  },
  { 
    id: 'eoffice', name: "ระบบ E-Office", description: "ระบบสำนักงานอิเล็กทรอนิกส์สำหรับเจ้าหน้าที่",
    url: "https://rawai.s.eoffice.go.th/portal/home", icon: 'Building2', imageUrl: "https://www.eoffice.go.th/img/Logo-e-Office.png", 
    color: "text-indigo-600", bgColor: "bg-indigo-50 border-indigo-100", iconBg: "bg-indigo-100", isActive: true
  },
  { 
    id: 'oss', name: "ศูนย์บริการ OSS", description: "ศูนย์บริการร่วม / ศูนย์บริการเบ็ดเสร็จ (One Stop Service)",
    url: "https://www.dla.go.th/land/oss.do", icon: 'Globe', imageUrl: "https://www.dla.go.th/images/logo.png",
    color: "text-teal-600", bgColor: "bg-teal-50 border-teal-100", iconBg: "bg-teal-100", isActive: true
  },
  { 
    id: 'event', name: "กิจกรรมราไวย์", description: "ปฏิทินกิจกรรมและข่าวสารประชาสัมพันธ์ของเทศบาล",
    url: "https://www.rawai.go.th/event.php", icon: 'Calendar', imageUrl: "https://www.rawai.go.th/images/header-72-1/logo_0004.png", 
    color: "text-orange-600", bgColor: "bg-orange-50 border-orange-100", iconBg: "bg-orange-100", isActive: true
  },
  { 
    id: 'manual', name: "คู่มือประชาชนติดต่อราชการ", description: "ดาวน์โหลดคู่มือและขั้นตอนการเตรียมเอกสารติดต่อรับบริการต่างๆ",
    url: "https://rawaicity.app/document", icon: 'BookOpen', color: "text-emerald-600", bgColor: "bg-emerald-50 border-emerald-100", iconBg: "bg-emerald-100", isActive: true
  },
  { 
    id: 'vaccine', name: "ลงทะเบียนฉีดวัคซีนสุนัข-แมว", description: "บริการลงทะเบียนล่วงหน้าเพื่อรับวัคซีนป้องกันโรคพิษสุนัขบ้า",
    url: "#", icon: 'Syringe', color: "text-slate-500", bgColor: "bg-slate-100 border-slate-200", iconBg: "bg-slate-200",
    isActive: false, badge: "ไม่อยู่ในระยะเวลาโครงการ", badgeColor: "bg-red-100 text-red-700 border border-red-200"
  },
  { 
    id: 'neuter', name: "ลงทะเบียนทำหมันสุนัข-แมว", description: "โครงการควบคุมประชากรสัตว์จรจัดและสัตว์เลี้ยงในพื้นที่",
    url: "#", icon: 'HeartPulse', color: "text-slate-500", bgColor: "bg-slate-100 border-slate-200", iconBg: "bg-slate-200",
    isActive: false, badge: "ปิดรับลงทะเบียนชั่วคราว", badgeColor: "bg-red-100 text-red-700 border border-red-200"
  },
  { 
    id: 'commerce', name: "แจ้งจดทะเบียนพาณิชย์", description: "ระบบรับเรื่องและตรวจสอบเอกสารการจดทะเบียนพาณิชย์",
    url: "#", icon: 'FileSignature', color: "text-slate-500", bgColor: "bg-slate-100 border-slate-200", iconBg: "bg-slate-200",
    isActive: false, badge: "กำลังพัฒนาระบบ", badgeColor: "bg-amber-100 text-amber-700 border border-amber-200"
  },
  { 
    id: 'garbage-bank', name: "ธนาคารขยะ", description: "ระบบสมุดบัญชีออนไลน์ ตรวจสอบราคาและยอดเงินฝากสะสม",
    url: "#", icon: 'Recycle', color: "text-slate-500", bgColor: "bg-slate-100 border-slate-200", iconBg: "bg-slate-200",
    isActive: false, badge: "เร็วๆ นี้", badgeColor: "bg-slate-800 text-white"
  },
  { 
    id: 'tourism-promo', name: "พื้นที่โปรโมทธุรกิจท้องถิ่น", description: "ลงทะเบียนประชาสัมพันธ์ร้านค้า ห้างร้าน และแหล่งท่องเที่ยว",
    url: "#", icon: 'Store', color: "text-slate-500", bgColor: "bg-slate-100 border-slate-200", iconBg: "bg-slate-200",
    isActive: false, badge: "Coming Soon", badgeColor: "bg-slate-800 text-white"
  }
];

// Map ชื่อไอคอน (String) กลับเป็น Component ของ Lucide
export const ICON_MAP: Record<string, any> = {
  Video, Megaphone, MapPinned, Building2, Globe, Calendar, BookOpen, Syringe, HeartPulse, FileSignature, Recycle, Store
};
