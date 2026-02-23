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
    <div className="min-h-screen bg-[#f8fafc] font-sans selection:bg-blue-100 text-slate-900 pb-20 overflow-hidden">
      
      {showLoginModal && (
        <AdminLogin 
          onLogin={handleAdminLogin} 
          onGoogleLogin={handleGoogleLogin} 
          onCancel={() => setShowLoginModal(false)} 
        />
      )}

      <HeroBanner />

      <div className="max-w-7xl mx-auto px-3 md:px-8 -mt-16 md:-mt-24 relative z-20">
        
        {isLoading ? (
          // ✨ Skeleton Screen: แสดงโครงสร้างการ์ดหลอกๆ 6 อันระหว่างรอโหลด
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white/80 rounded-3xl p-4 md:p-6 shadow-sm border border-slate-100 animate-pulse">
                {/* วงกลมไอคอน */}
                <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-200 rounded-2xl mb-4"></div>
                {/* เส้นหัวข้อ */}
                <div className="h-4 bg-slate-200 rounded-full w-3/4 mb-3"></div>
                {/* เส้นเนื้อหา */}
                <div className="h-3 bg-slate-200 rounded-full w-full mb-2"></div>
                <div className="h-3 bg-slate-200 rounded-full w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {displayServices.length > 0 ? (
              displayServices.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))
            ) : (
              <div className="col-span-full text-center py-10 text-slate-400">
                ไม่พบข้อมูลเมนูในขณะนี้
              </div>
            )}
          </div>
        )}
      </div>
      <div className="max-w-4xl mx-auto px-6 mt-16 md:mt-32 text-center relative z-10">
        <div className="flex flex-col items-center justify-center space-y-3 md:space-y-4">
          <div className="flex items-center gap-2 md:gap-3 text-slate-400">
            <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
            <p className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-center">Smart City Portal • Data Privacy</p>
          </div>
          <p className="text-[8px] md:text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center px-4 flex items-center justify-center gap-2">
            พัฒนาโดย ทีมฝ่ายนโยบายและแผน เทศบาลตำบลราไวย์
            <button onClick={() => setShowLoginModal(true)} className="p-1 hover:bg-slate-200 rounded-full transition-colors opacity-30 hover:opacity-100" title="Admin Login">
              <Lock className="w-3 h-3" />
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}