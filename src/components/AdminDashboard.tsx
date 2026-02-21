import React, { useState } from 'react';
import { Settings, LogOut, Power, Plus, Globe, Trash2, Edit2, X } from 'lucide-react';
import { ICON_MAP, COLOR_PRESETS } from '../lib/constants';

const BADGE_COLORS = [
  { label: 'ไม่มี (ซ่อนป้าย)', value: '' },
  { label: 'แดง (ปิดรับ/หมดเขต)', value: 'bg-red-100 text-red-700 border border-red-200' },
  { label: 'ส้ม/เหลือง (กำลังพัฒนา)', value: 'bg-amber-100 text-amber-700 border border-amber-200' },
  { label: 'น้ำเงิน (ทั่วไป)', value: 'bg-blue-100 text-blue-700 border border-blue-200' },
  { label: 'น้ำเงินเด่น (กระพริบ)', value: 'bg-blue-600 text-white animate-pulse' },
  { label: 'เขียว (เปิดใหม่/สำเร็จ)', value: 'bg-emerald-100 text-emerald-700 border border-emerald-200' },
  { label: 'เทาดำ (เร็วๆ นี้)', value: 'bg-slate-800 text-white' },
];

export const AdminDashboard = ({ services, onToggle, onAdd, onEdit, onDelete, onLogout }: any) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const initialFormState = { id: '', name: '', description: '', url: '', icon: 'Globe', imageUrl: '', colorIndex: 0, badge: '', badgeColor: '' };
  const [formData, setFormData] = useState(initialFormState);

  const openAddForm = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setIsFormOpen(true);
  };

  const openEditForm = (service: any) => {
    // หา Index ของสีเพื่อเอามาโชว์ใน Dropdown
    const cIndex = COLOR_PRESETS.findIndex(c => c.color === service.color);
    setFormData({
      id: service.id,
      name: service.name || '',
      description: service.description || '',
      url: service.url || '',
      icon: service.icon || 'Globe',
      imageUrl: service.imageUrl || '',
      colorIndex: cIndex >= 0 ? cIndex : 0,
      badge: service.badge || '',
      badgeColor: service.badgeColor || ''
    });
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // ดึงเฉพาะค่าสีออกมา ป้องกันไม่ให้ property 'name' ของสีไปทับ 'name' ของบริการ
    const selectedColor = COLOR_PRESETS[formData.colorIndex];
    const existingService = isEditing ? services.find((s:any) => s.id === formData.id) : null;
    
    const finalService = {
      ...(existingService || {}), // ดึงค่าเดิมมาผสานก่อน ป้องกัน property พิเศษหายไป
      id: isEditing ? formData.id : 'service_' + Date.now(),
      name: formData.name.trim(), // อัปเดตชื่อใหม่ให้ชัวร์
      description: formData.description,
      url: formData.url,
      icon: formData.icon,
      imageUrl: formData.imageUrl,
      color: selectedColor.color,
      bgColor: selectedColor.bgColor,
      iconBg: selectedColor.iconBg,
      isActive: isEditing ? existingService?.isActive : false, 
      badge: formData.badge,
      badgeColor: formData.badgeColor
    };

    if (isEditing) {
      onEdit(finalService);
    } else {
      onAdd(finalService);
    }
    setIsFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-100 pb-10">
        
        <div className="bg-slate-900 text-white p-6 md:p-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl"><Settings className="w-6 h-6" /></div>
            <div>
              <h2 className="text-xl md:text-2xl font-black tracking-tight">E-Service Configurator</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Rawai Portal Admin</p>
            </div>
          </div>
          <button onClick={onLogout} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-sm font-bold transition-colors">
            <LogOut className="w-4 h-4" /> <span className="hidden md:inline">ออกจากระบบ</span>
          </button>
        </div>

        <div className="p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">จัดการสถานะและเมนู</h3>
            {!isFormOpen && (
              <button onClick={openAddForm} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md transition-all">
                <Plus className="w-4 h-4" /> เพิ่มเมนูใหม่
              </button>
            )}
          </div>

          {/* ฟอร์มเพิ่ม/แก้ไขข้อมูล */}
          {isFormOpen && (
            <form onSubmit={handleSave} className="mb-8 bg-slate-50 p-6 rounded-2xl border border-blue-100 shadow-inner animate-in fade-in zoom-in-95">
              <div className="flex justify-between items-center mb-4">
                <h4 className="font-bold text-slate-800 text-lg">{isEditing ? '✏️ แก้ไขเมนูบริการ' : '✨ สร้างเมนูบริการใหม่'}</h4>
                <button type="button" onClick={() => setIsFormOpen(false)} className="p-2 text-slate-400 hover:bg-slate-200 rounded-full"><X className="w-5 h-5"/></button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div><label className="block text-xs font-bold text-slate-500 mb-1">ชื่อระบบ</label><input required value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-500" /></div>
                <div><label className="block text-xs font-bold text-slate-500 mb-1">ลิงก์ URL</label><input required value={formData.url} onChange={e=>setFormData({...formData, url: e.target.value})} className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-500" /></div>
                <div className="md:col-span-2"><label className="block text-xs font-bold text-slate-500 mb-1">คำอธิบายสั้นๆ</label><input required value={formData.description} onChange={e=>setFormData({...formData, description: e.target.value})} className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-500" /></div>
                <div><label className="block text-xs font-bold text-slate-500 mb-1">ลิงก์รูปภาพโลโก้ (ถ้ามี)</label><input value={formData.imageUrl} onChange={e=>setFormData({...formData, imageUrl: e.target.value})} placeholder="https://..." className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-500" /></div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 mb-1">เลือกโทนสีการ์ด</label>
                  <select value={formData.colorIndex} onChange={e=>setFormData({...formData, colorIndex: Number(e.target.value)})} className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-500">
                    {COLOR_PRESETS.map((c, i) => <option key={i} value={i}>{c.name}</option>)}
                  </select>
                </div>
                
                {/* ส่วนจัดการ ป้ายกำกับ (Badge) */}
                <div className="md:col-span-2 border-t border-slate-200 pt-4 mt-2">
                  <h5 className="text-sm font-bold text-slate-700 mb-3">🏷️ ตั้งค่าป้ายสถานะหมายเหตุ (Badge)</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">ข้อความหมายเหตุ (เช่น เร็วๆ นี้, ปิดปรับปรุง)</label>
                      <input value={formData.badge} onChange={e=>setFormData({...formData, badge: e.target.value})} placeholder="เว้นว่างถ้าไม่ต้องการแสดงป้าย" className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">เลือกสีของป้ายหมายเหตุ</label>
                      <select value={formData.badgeColor} onChange={e=>setFormData({...formData, badgeColor: e.target.value})} className="w-full p-2.5 rounded-lg border border-slate-200 outline-none focus:border-blue-500">
                        {BADGE_COLORS.map((bc, i) => <option key={i} value={bc.value}>{bc.label}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={()=>setIsFormOpen(false)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-200 rounded-lg transition-colors">ยกเลิก</button>
                <button type="submit" className="px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-colors">
                  {isEditing ? 'บันทึกการแก้ไข' : 'เพิ่มเมนู'}
                </button>
              </div>
            </form>
          )}

          <div className="space-y-4">
            {services.map((service: any) => {
              const ServiceIcon = ICON_MAP[service.icon] || Globe;
              return (
                <div key={service.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-5 rounded-2xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-colors gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${service.isActive ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                      {service.imageUrl ? <img src={service.imageUrl} alt={service.name} className="w-8 h-8 object-contain" /> : <ServiceIcon className="w-6 h-6" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className={`font-bold ${service.isActive ? 'text-slate-800' : 'text-slate-400 line-through'}`}>{service.name}</h4>
                        {service.badge && (
                           <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${service.badgeColor || 'bg-slate-800 text-white'}`}>{service.badge}</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{service.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 justify-end">
                    {/* ปุ่มแก้ไข */}
                    <button onClick={() => openEditForm(service)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="แก้ไขข้อมูล">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    {/* ปุ่มลบ */}
                    <button onClick={() => onDelete(service.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-colors" title="ลบเมนู">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    {/* สวิตช์ เปิด-ปิด */}
                    <div className="w-px h-6 bg-slate-200 mx-1"></div>
                    <button onClick={() => onToggle(service.id)} className={`relative w-14 h-8 rounded-full transition-colors duration-300 shrink-0 border-2 ${service.isActive ? 'bg-emerald-500 border-emerald-500' : 'bg-slate-200 border-slate-200'}`}>
                      <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 flex items-center justify-center ${service.isActive ? 'translate-x-6' : 'translate-x-0.5'}`}>
                        <Power className={`w-3 h-3 ${service.isActive ? 'text-emerald-500' : 'text-slate-400'}`} />
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
