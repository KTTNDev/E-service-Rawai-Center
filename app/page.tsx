'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { ShieldCheck, Lock, Globe } from 'lucide-react';

// 🔥 Firebase Logic คงเดิมจากของจารย์
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signOut, signInWithCustomToken, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

import { DEFAULT_SERVICES } from '../src/lib/constants';
import { HeroBanner } from '../src/components/HeroBanner';
import { ServiceCard } from '../src/components/ServiceCard';
import { AdminLogin } from '../src/components/AdminLogin';
import { AdminDashboard } from '../src/components/AdminDashboard';

// --- ตั้งค่า Firebase (ใช้ค่าเดิมของจารย์) ---
const getFirebaseConfig = () => {
  if (typeof window !== 'undefined' && typeof (window as any).__firebase_config !== 'undefined') {
    return JSON.parse((window as any).__firebase_config);
  }
  return {
    apiKey: "AIzaSyB4Fu7zxZAxq5EsKM_7iul3im8YPpX-PD0",
    authDomain: "rawaieservice-center.firebaseapp.com",
    projectId: "rawaieservice-center",
    storageBucket: "rawaieservice-center.firebasestorage.app",
    messagingSenderId: "629835352412",
    appId: "1:629835352412:web:1385b6e8b0c0d2cf179999",
    measurementId: "G-351755H668"
  };
};

const app = initializeApp(getFirebaseConfig());
const auth = getAuth(app);
const db = getFirestore(app);

const getDbPath = () => {
  if (typeof window !== 'undefined' && typeof (window as any).__app_id !== 'undefined') {
    return `artifacts/${(window as any).__app_id}/public/data/eservice_config`;
  }
  return 'rawai_eservice'; 
};

const cleanBrokenUrls = (url: string) => {
  if (!url) return ""; 
  const match = url.match(/\[.*?\]\((.*?)\)/);
  return match ? match[1] : url;
};

export default function App() {
  const [services, setServices] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isAdminView, setIsAdminView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // --- Logic การจัดการข้อมูล (คงเดิมทั้งหมดเพื่อให้ระบบไม่พัง) ---
  const displayServices = useMemo(() => {
    if (!services || services.length === 0) return [];
    return [...services].sort((a, b) => {
      if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
      if (a.isHighlight !== b.isHighlight) return a.isHighlight ? -1 : 1;
      return 0;
    });
  }, [services]);

  useEffect(() => {
    document.title = "ศูนย์รวม E-Service ราไวย์";
    const initAuth = async () => {
      try {
        const globalWindow = window as any;
        if (typeof globalWindow.__initial_auth_token !== 'undefined' && globalWindow.__initial_auth_token) {
          await signInWithCustomToken(auth, globalWindow.__initial_auth_token);
        } else if (!auth.currentUser) { await signInAnonymously(auth); }
      } catch (error) { console.error("Auth error:", error); }
    };
    initAuth();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser && !currentUser.isAnonymous) {
        const userEmail = currentUser.email?.toLowerCase() || '';
        try {
          const adminDocRef = doc(db, getDbPath(), 'admin_config');
          const adminSnap = await getDoc(adminDocRef);
          let allowedEmails: string[] = adminSnap.exists() ? adminSnap.data().emails || [] : ['rawai.cctv@gmail.com', 'kittinanpolrob@gmail.com'];
          if (!adminSnap.exists()) await setDoc(adminDocRef, { emails: allowedEmails });
          if (userEmail && !allowedEmails.includes(userEmail)) {
            await signOut(auth);
            setIsAdminView(false);
            alert(`❌ ไม่อนุญาตให้เข้าใช้งาน\nอีเมล ${currentUser.email} ไม่ได้รับสิทธิ์ผู้ดูแลระบบ`);
            return;
          }
          setIsAdminView(true);
          setShowLoginModal(false);
        } catch (error) { await signOut(auth); }
      } else { setIsAdminView(false); }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    setIsLoading(true);
    const docRef = doc(db, getDbPath(), 'menu_config');
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const dbItems = docSnap.data().items.map((item: any) => ({
          ...item,
          url: cleanBrokenUrls(item.url),
          imageUrl: cleanBrokenUrls(item.imageUrl)
        }));
        setServices(dbItems);
      } else { setDoc(docRef, { items: DEFAULT_SERVICES }); }
      setIsLoading(false);
    }, () => setIsLoading(false));
    return () => unsubscribe();
  }, [user]);

  if (isAdminView) {
    return <AdminDashboard services={services} onToggle={(id: any) => {}} onAdd={(s: any) => {}} onEdit={(s: any) => {}} onDelete={(id: any) => {}} onLogout={async () => { await signOut(auth); await signInAnonymously(auth); setIsAdminView(false); }} />;
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 pb-20 relative overflow-x-hidden">
      
      {/* 🚀 Modern Navbar (แบบโปร่งใส ลอยอยู่บน Banner) */}
      <nav className="absolute top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            {/* Logo & Branding */}
            <div className="flex items-center gap-4 group">
              <div className="p-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl transition-all group-hover:bg-white/20">
                <img src="https://www.rawai.go.th/images/header-72-1/logo_0004.png" alt="Rawai Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-white font-black text-xl md:text-2xl tracking-tighter leading-none drop-shadow-lg">
                  E-SERVICE <span className="text-emerald-300">RAWAI</span>
                </h1>
                <p className="text-[10px] text-white/70 font-bold uppercase tracking-[0.2em] drop-shadow-sm">Smart City Portal</p>
              </div>
            </div>

            {/* Admin Login Button (ย้ายมาไว้ตรงนี้เพื่อให้กดติดชัวร์ๆ) */}
            <button 
              onClick={() => setShowLoginModal(true)}
              className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white/80 hover:bg-white/30 hover:text-white transition-all shadow-xl group"
              title="Admin Login"
            >
              <Lock className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

     {showLoginModal && (
  <AdminLogin 
    // ✅ ระบุ Type เป็น string ให้กับ parameter e และ p
    onLogin={async (e: string, p: string) => { 
      try { 
        await signInWithEmailAndPassword(auth, e, p); 
      } catch { 
        alert("ผิดพลาด!"); 
      } 
    }} 
    onGoogleLogin={async () => { 
      const provider = new GoogleAuthProvider(); 
      await signInWithPopup(auth, provider); 
    }} 
    onCancel={() => setShowLoginModal(false)} 
  />
)}
      <HeroBanner />

      {/* Grid ของเมนูที่ลอยเกยขึ้นไปบน Banner */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 md:-mt-32 relative z-20">
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 animate-pulse">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/50 h-48 rounded-[2.5rem]"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {displayServices.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto px-6 mt-24 text-center opacity-40">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
          พัฒนาโดย ทีมฝ่ายนโยบายและแผน เทศบาลตำบลราไวย์
        </p>
      </div>
    </div>
  );
}