import React, { useState } from 'react';
import { ShieldCheck, CreditCard, UserCheck } from 'lucide-react';

export default function EKYCVerification({ onVerified }) {
  const [fullName, setFullName] = useState('สมชาย สายถ่ายภาพ');
  const [idCard, setIdCard] = useState('1-1004-99887-12-3');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onVerified) onVerified(fullName);
  };

  return (
    <div className="glass-panel p-8 rounded-2xl max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mx-auto border border-blue-500/30">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">ระบบยืนยันตัวตนผู้เช่า (e-KYC Verification)</h2>
        <p className="text-slate-400 text-xs max-w-lg mx-auto">
          ตามกฎระเบียบความปลอดภัย BR-01 ผู้เช่าต้องผ่านการยืนยันตัวตนด้วยบัตรประชาชนก่อนทำรายการจองครั้งแรก
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">
              ชื่อ-นามสกุล ตามบัตรประชาชน
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2">
              เลขบัตรประชาชน 13 หลัก
            </label>
            <input
              type="text"
              value={idCard}
              onChange={(e) => setIdCard(e.target.value)}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-white"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border-2 border-dashed border-slate-700 rounded-2xl p-6 text-center hover:border-blue-500 transition-all cursor-pointer bg-slate-900/50">
            <CreditCard className="w-10 h-10 text-slate-500 mx-auto mb-2" />
            <span className="text-xs text-slate-300 font-semibold block">
              อัปโหลดรูปหน้าบัตรประชาชน
            </span>
            <span className="text-[10px] text-slate-500 block">
              รองรับ JPG/PNG ไม่เกิน 5MB (Encrypted AES-256)
            </span>
          </div>
          <div className="border-2 border-dashed border-slate-700 rounded-2xl p-6 text-center hover:border-blue-500 transition-all cursor-pointer bg-slate-900/50">
            <UserCheck className="w-10 h-10 text-slate-500 mx-auto mb-2" />
            <span className="text-xs text-slate-300 font-semibold block">
              อัปโหลดรูป Selfie ถือคู่กับบัตร
            </span>
            <span className="text-[10px] text-slate-500 block">
              ใบหน้าเห็นชัดเจน ไม่สวมหมวก/แว่นดำ
            </span>
          </div>
        </div>

        {submitted && (
          <div className="p-4 rounded-xl text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            ✅ ส่งข้อมูล e-KYC เรียบร้อย! แอดมินทำการอนุมัติผลอัตโนมัติ สิทธิ์การเช่าใช้งานได้แล้ว
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all text-xs"
        >
          ส่งข้อมูลยืนยันตัวตน (Submit e-KYC)
        </button>
      </form>
    </div>
  );
}
