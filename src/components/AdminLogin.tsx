import React, { useState } from 'react';
import { Lock, ShieldCheck, ArrowLeft, Loader2, AlertCircle, Mail, Building2 } from 'lucide-react';

export const AdminLogin = ({ onLogin, onGoogleLogin, onCancel, loading, error }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const brandGradient = "linear-gradient(90deg, hsla(222, 51%, 34%, 1) 0%, hsla(119, 37%, 45%, 1) 100%)";

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm font-sans">
      <div className="w-full max-w-md animate-in zoom-in-95 duration-300 relative">
        
        <button onClick={onCancel} className="absolute -top-12 left-0 inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-bold group">
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> กลับหน้าหลัก
        </button>

        <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="p-10 text-center bg-slate-50/50 border-b border-slate-100">
            <div className="w-20 h-20 rounded-3xl bg-white shadow-md border border-slate-100 flex items-center justify-center mx-auto mb-6 text-blue-900">
              <Building2 className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Staff Access</h2>
            <p className="text-slate-500 text-[10px] font-black mt-1 uppercase tracking-[0.2em] opacity-70">ระบบจัดการดิจิทัลราไวย์</p>
          </div>

          <div className="p-10 space-y-6">
            {/* 🚨 แจ้งเตือน Error กรณีอีเมลไม่อยู่ใน Whitelist หรือรหัสผิด */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3 text-red-600 text-xs font-bold animate-in shake">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="leading-relaxed">{error}</p>
              </div>
            )}

            {/* 🔴 ปุ่ม Login ด้วย Google */}
            <button 
              type="button"
              onClick={onGoogleLogin}
              disabled={loading}
              className="w-full py-4 bg-white border-2 border-slate-100 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95 disabled:opacity-50 shadow-sm"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              <span className="font-bold text-slate-700">เข้าใช้งานด้วย Gmail</span>
            </button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-slate-100"></div>
              <span className="flex-shrink mx-4 text-[10px] font-black text-slate-300 uppercase">หรือใช้รหัสผ่าน</span>
              <div className="flex-grow border-t border-slate-100"></div>
            </div>

            {/* ฟอร์ม Email/Password */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">อีเมลเจ้าหน้าที่</label>
                <div className="relative group">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                  <input required type="email" disabled={loading} className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none transition-all font-bold text-slate-700 disabled:opacity-50" placeholder="admin@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-2">รหัสผ่าน</label>
                <div className="relative group">
                  <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 w-5 h-5 group-focus-within:text-blue-600 transition-colors" />
                  <input required type="password" disabled={loading} className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:bg-white outline-none transition-all font-bold text-slate-700 tracking-widest disabled:opacity-50" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full py-5 rounded-2xl text-white font-black text-lg shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 mt-4" style={{ background: brandGradient }}>
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <ShieldCheck className="w-6 h-6" />}
                {loading ? 'กำลังตรวจสอบ...' : 'เข้าสู่ระบบ'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};