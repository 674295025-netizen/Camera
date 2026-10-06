import React, { useState } from 'react';
import { Users, UserPlus, ShieldCheck, Trash2, ShieldAlert } from 'lucide-react';

const PROTECTED_ADMINS = [
  '674295025@parichat.skru.ac.th',
  'seree999@gmail.com'
];

export default function AdminManagement({ adminEmails, onAddAdmin, onRemoveAdmin }) {
  const [newEmail, setNewEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newEmail.trim()) return;
    onAddAdmin(newEmail.trim());
    setNewEmail('');
  };

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl max-w-4xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 uppercase tracking-wider">
              Security Access Control
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1 flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-400" /> จัดการสิทธิ์ผู้ดูแลระบบ (Admin Access Control)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            เฉพาะผู้ดูแลระบบปัจจุบันเท่านั้นที่สามารถเพิ่มหรือเพิกถอนสิทธิ์ Admin ได้
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-xl text-xs font-bold border border-emerald-500/20">
          <ShieldCheck className="w-4 h-4" /> สิทธิ์ใช้งานระดับสูงสุด
        </div>
      </div>

      {/* Add New Admin Form */}
      <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-cyan-400" /> เพิ่มอีเมล Admin ใหม่
        </h3>
        <p className="text-xs text-slate-400">
          กรอกอีเมล Google ของผู้ที่ต้องการมอบสิทธิ์ Admin (เมื่อเข้าสู่ระบบด้วยอีเมลนี้ จะเห็น Dashboard และระบบหลังบ้านทั้งหมด)
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 pt-1">
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
            placeholder="ตัวอย่าง: newadmin@gmail.com หรือ @parichat.skru.ac.th"
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 font-mono"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-purple-600/25 shrink-0"
          >
            <UserPlus className="w-4 h-4" /> เพิ่มสิทธิ์ Admin
          </button>
        </form>
      </div>

      {/* Admin List */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          รายชื่อผู้ดูแลระบบที่ได้รับอนุญาต ({adminEmails.length} ท่าน)
        </h3>

        <div className="grid grid-cols-1 gap-2.5">
          {adminEmails.map((email) => {
            const isProtected = PROTECTED_ADMINS.some(
              (p) => p.toLowerCase() === email.toLowerCase()
            );

            return (
              <div
                key={email}
                className="glass-card p-4 rounded-xl flex items-center justify-between gap-4 border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                    👑
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs font-mono flex items-center gap-2">
                      {email}
                      {isProtected ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
                          Admin หลัก (Owner)
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                          Admin เพิ่มเติม
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400">
                      สิทธิ์เต็ม: แดชบอร์ด, จัดการกล้อง CRUD, ตรวจรับคืนอุปกรณ์, จัดการสิทธิ์
                    </span>
                  </div>
                </div>

                <div>
                  {isProtected ? (
                    <span className="text-[10px] text-slate-500 font-medium px-2 py-1 bg-slate-900 rounded-lg">
                      สงวนสิทธิ์ถาวร
                    </span>
                  ) : (
                    <button
                      onClick={() => onRemoveAdmin(email)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 text-xs transition flex items-center gap-1.5"
                      title="เพิกถอนสิทธิ์ Admin"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="hidden sm:inline">ลบสิทธิ์</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Advisory */}
      <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong>ระบบความปลอดภัย:</strong> บัญชี Google อื่นๆ ที่ไม่ได้อยู่ในรายชื่อข้างต้นนี้ เมื่อล็อกอินเข้าสู่ระบบจะได้รับสิทธิ์เป็น <strong>User ทั่วไป (ลูกค้า)</strong> เท่านั้น และจะไม่สามารถมองเห็นหรือเข้าถึงหน้า Dashboard และการจัดการหลังบ้านได้โดยเด็ดขาด
        </span>
      </div>

    </div>
  );
}
