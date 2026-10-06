import React, { useState, useEffect } from 'react';
import { X, Clock, Check } from 'lucide-react';

export default function BookingModal({ gear, onClose, onConfirm }) {
  const [days, setDays] = useState(2);
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          alert('หมดเวลาล็อกคิว 15 นาที ระบบปลดล็อกอุปกรณ์กลับสู่สถานะว่าง');
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onClose]);

  if (!gear) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timerDisplay = `${minutes < 10 ? '0' : ''}${minutes}:${
    seconds < 10 ? '0' : ''
  }${seconds}`;

  const rentFee = gear.dailyRate * days;
  const deposit = gear.deposit;
  const totalFee = rentFee + deposit;

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-panel p-6 rounded-3xl max-w-md w-full space-y-4 border-slate-700 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center space-y-1">
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full text-xs font-bold inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 animate-spin" />
            ระบบล็อกคิวอุปกรณ์ชั่วคราว:{' '}
            <span className="font-mono text-white font-extrabold">{timerDisplay}</span>
          </span>
          <h3 className="text-base font-bold text-white pt-2">
            ยืนยันการจอง & ชำระเงินมัดจำ
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            {gear.name} (S/N: {gear.serial})
          </p>
        </div>

        {/* Days selector */}
        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
          <span className="text-slate-300">จำนวนวันเช่า:</span>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1 text-white font-bold"
          >
            <option value={1}>1 วัน</option>
            <option value={2}>2 วัน</option>
            <option value={3}>3 วัน</option>
            <option value={5}>5 วัน</option>
            <option value={7}>7 วัน (1 สัปดาห์)</option>
          </select>
        </div>

        {/* PromptPay QR */}
        <div className="bg-white p-4 rounded-2xl text-center shadow-inner space-y-2">
          <div className="text-[10px] font-bold text-blue-900 tracking-widest uppercase">
            Thai QR Payment / PromptPay
          </div>
          <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=00020101021229370016A000000677010111"
            alt="PromptPay QR"
            className="w-36 h-36 mx-auto border-4 border-slate-100 rounded-xl"
          />
          <span className="text-[11px] text-slate-600 block font-mono">
            พร้อมเพย์: 081-998-7766 (บจก. เลนส์โฟลว์)
          </span>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-1 text-xs border-t border-slate-800 pt-2.5">
          <div className="flex justify-between text-slate-400">
            <span>ค่าเช่าอุปกรณ์ ({days} วัน):</span>
            <span className="font-semibold text-white">฿{rentFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>ค่ามัดจำประกันอุปกรณ์:</span>
            <span className="font-semibold text-white">฿{deposit.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-cyan-400 pt-1 border-t border-slate-800/60">
            <span>ยอดชำระสุทธิ:</span>
            <span className="text-base">฿{totalFee.toLocaleString()}</span>
          </div>
        </div>

        <button
          onClick={() => onConfirm(gear, days, rentFee, deposit, totalFee)}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-500/25 text-xs flex items-center justify-center gap-1.5"
        >
          <Check className="w-4 h-4" /> ยืนยันชำระเงิน & สร้างรายการจอง
        </button>
      </div>
    </div>
  );
}
