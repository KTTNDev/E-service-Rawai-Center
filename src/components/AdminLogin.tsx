import React, { useState } from 'react';
import { X } from 'lucide-react';

export const AdminLogin = ({ onLogin, onGoogleLogin, onCancel }: { onLogin: (e: string, p: string) => void, onGoogleLogin: () => void, onCancel: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-[2rem] shadow-2xl w-full max-w-md animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-slate-800">Admin Login</h3>
          <button onClick={onCancel} className="p-2 hover:bg-slate-100 rounded-full text-slate-400">
            <X className="w-5 h-5"/>
          </button>
        </div>
        <p className="text-sm text-slate-500 mb-6">เข้าสู่ระบบเพื่อจัดการเมนูและบริการออนไลน์</p>
        
        {/* แบบ Email/Password เดิม */}
        <form onSubmit={(e) => { e.preventDefault(); onLogin(email, password); }} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" />
          </div>
          <button type="submit" className="w-full py-3 mt-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold transition-colors">
            เข้าสู่ระบบด้วย Email
          </button>
        </form>

        {/* เส้นคั่น */}
        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">หรือ</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {/* ปุ่มเข้าสู่ระบบด้วย Gmail */}
        <button 
          type="button" 
          onClick={onGoogleLogin} 
          className="w-full py-3 bg-white border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 text-slate-700 rounded-xl font-bold transition-all flex items-center justify-center gap-3 shadow-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          เข้าสู่ระบบด้วย Gmail
        </button>
      </div>
    </div>
  );
};
