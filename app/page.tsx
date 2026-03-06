'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { ShieldCheck, Lock, Loader2 } from 'lucide-react'; // นำเข้า Loader2 มาทำ icon หมุนๆ

// 🔥 นำเข้าวิชา Firebase
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, onAuthStateChanged, signOut, signInWithCustomToken, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

// 🧩 นำเข้า Components (ปรับ Path ให้ถูกต้อง)
import { DEFAULT_SERVICES } from '../src/lib/constants';
import { HeroBanner } from '../src/components/HeroBanner';
import { ServiceCard } from '../src/components/ServiceCard';
import { AdminLogin } from '../src/components/AdminLogin';
import { AdminDashboard } from '../src/components/AdminDashboard';

// --- ตั้งค่า Firebase ---
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
  
  // ⏳ เพิ่ม State สำหรับการโหลด
  const [isLoading, setIsLoading] = useState(true);

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
        } else if (!auth.currentUser) {
          await signInAnonymously(auth);
        }
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
          
          let allowedEmails: string[] = [];
          if (adminSnap.exists()) {
            allowedEmails = adminSnap.data().emails || [];
          } else {
            allowedEmails = ['rawai.cctv@gmail.com', 'kittinanpolrob@gmail.com'];
            await setDoc(adminDocRef, { emails: allowedEmails });
          }

          if (userEmail && !allowedEmails.includes(userEmail)) {
            await signOut(auth);
            setIsAdminView(false);
            alert(`❌ ไม่อนุญาตให้เข้าใช้งาน\nอีเมล ${currentUser.email} ไม่ได้รับสิทธิ์ผู้ดูแลระบบ`);
            return;
          }

          setIsAdminView(true);
          setShowLoginModal(false);
        } catch (error) {
          console.error("Error checking admin auth:", error);
          await signOut(auth);
        }
      } else {
        setIsAdminView(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    
    // เริ่มต้นโหลดข้อมูล
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
      } else {
        setDoc(docRef, { items: DEFAULT_SERVICES });
      }
      // โหลดเสร็จแล้ว ปิด Loading
      setIsLoading(false);
    }, (error) => {
      console.error("Snapshot error:", error);
      setIsLoading(false); // ปิด Loading แม้จะ error เพื่อไม่ให้ค้าง
    });

    return () => unsubscribe();
  }, [user]);

  const handleAdminLogin = async (email: string, pass: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } catch (err) {
      alert("อีเมล หรือ รหัสผ่านไม่ถูกต้อง!");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    try {
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        alert("เกิดข้อผิดพลาดในการเชื่อมต่อกับ Google");
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    await signInAnonymously(auth);
    setIsAdminView(false);
  };

  const saveToDatabase = async (newServicesData: any[]) => {
    const sanitizedData = newServicesData.map(item => {
      const cleanItem = { ...item };
      Object.keys(cleanItem).forEach(key => {
        if (cleanItem[key] === undefined) delete cleanItem[key];
      });
      return cleanItem;
    });

    setServices(sanitizedData);
    const docRef = doc(db, getDbPath(), 'menu_config');
    await updateDoc(docRef, { items: sanitizedData });
  };

  const toggleServiceStatus = (serviceId: string) => {
    const updated = services.map(s => s.id === serviceId ? { ...s, isActive: !s.isActive } : s);
    saveToDatabase(updated);
  };

  const addNewService = (newService: any) => {
    const updated = [...services, newService];
    saveToDatabase(updated);
  };

  const deleteService = (serviceId: string) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบเมนูนี้?')) {
      const updated = services.filter(s => s.id !== serviceId);
      saveToDatabase(updated);
    }
  };

  const editService = (updatedService: any) => {
    const updated = services.map(s => s.id === updatedService.id ? updatedService : s);
    saveToDatabase(updated);
  };

  if (isAdminView) {
    return (
      <AdminDashboard 
        services={services} 
        onToggle={toggleServiceStatus} 
        onAdd={addNewService} 
        onEdit={editService}       
        onDelete={deleteService}   
        onLogout={handleLogout} 
      />
    );
  }
return (
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-emerald-100 text-slate-900 pb-20 relative overflow-x-hidden">
      
      {/* พื้นหลังลายตาราง (Grid Pattern) */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2v-4h4v-2h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2v-4h4v-2H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}>
      </div>

      {showLoginModal && (
        <AdminLogin 
          onLogin={handleAdminLogin} 
          onGoogleLogin={handleGoogleLogin} 
          onCancel={() => setShowLoginModal(false)} 
        />
      )}

      <HeroBanner />

      {/* ส่วนเนื้อหาหลัก ปรับลบระยะขอบให้ขยับขึ้นไปเกยกับ Banner มากขึ้น */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 md:-mt-32 relative z-20">
        
        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="glass-card rounded-[2.5rem] p-6 md:p-8 animate-pulse">
                <div className="w-16 h-16 bg-slate-200 rounded-3xl mb-6"></div>
                <div className="h-5 bg-slate-200 rounded-full w-3/4 mb-4"></div>
                <div className="h-3 bg-slate-200 rounded-full w-full mb-2"></div>
                <div className="h-3 bg-slate-200 rounded-full w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10">
            {displayServices.length > 0 ? (
              displayServices.map((service, index) => (
                // เพิ่ม wrapper เพื่อให้แต่ละการ์ดขยับไม่พร้อมกันเล็กน้อย (Fake Parallax)
                <div key={service.id} className="transition-transform duration-500 hover:-translate-y-2">
                   <ServiceCard service={service} index={index} />
                </div>
              ))
            ) : (
              <div className="col-span-full glass-card rounded-3xl py-20 text-center text-slate-400 font-bold">
                ไม่พบข้อมูลเมนูในขณะนี้
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer ที่ดูเบาบางลง */}
      <div className="max-w-4xl mx-auto px-6 mt-24 text-center relative z-10">
        <div className="inline-flex flex-col items-center p-8 rounded-[3rem] bg-white/30 backdrop-blur-sm border border-white/20">
          <div className="flex items-center gap-3 text-slate-400 mb-4">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Secure Gateway</p>
          </div>
          <p className="text-[9px] md:text-[11px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-3">
            ฝ่ายนโยบายและแผน เทศบาลตำบลราไวย์
            <button onClick={() => setShowLoginModal(true)} className="p-2 hover:bg-emerald-100 hover:text-emerald-600 rounded-full transition-all opacity-40 hover:opacity-100 shadow-sm">
              <Lock className="w-4 h-4" />
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}