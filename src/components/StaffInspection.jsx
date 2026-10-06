import React, { useState } from 'react';
import { ClipboardCheck, CheckCircle } from 'lucide-react';

export default function StaffInspection({ gears, onConfirmReturn }) {
  const [selectedGearId, setSelectedGearId] = useState(gears[0]?.id || '');
  const [lateHours, setLateHours] = useState('0');
  const [dmgLens, setDmgLens] = useState(false);
  const [dmgCap, setDmgCap] = useState(false);

  const selectedGear = gears.find(g => g.id === selectedGearId) || gears[0];
  const rate = selectedGear?.dailyRate || 1000;
  const deposit = selectedGear?.deposit || 5000;

  const hours = parseFloat(lateHours);
  let lateFee = 0;
  if (hours > 1 && hours <= 4) {
    lateFee = Math.ceil(hours) * (rate * 0.10);
  } else if (hours > 4) {
    lateFee = rate + (rate * 0.50);
  }

  const damageFee = (dmgLens ? 1500 : 0) + (dmgCap ? 400 : 0);
  const totalDeduction = lateFee + damageFee;
  const refundAmount = Math.max(0, deposit - totalDeduction);

  const handleReturn = () => {
    if (!selectedGear) return;
    onConfirmReturn(selectedGear.id, refundAmount);
  };

  return (
    <div className="glass-panel p-8 rounded-2xl max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ClipboardCheck className="w-6 h-6 text-cyan-400" /> Staff Return Check-in & Deposit Calculator
          </h2>
          <p className="text-xs text-slate-400">
            จำลองการตรวจรับคืนกล้อง คิดค่าปรับคืนสาย (BR-04) และคำนวณเงินมัดจำคืนสุทธิ (BR-05)
          </p>
        </div>
        <span className="px-3 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-lg text-xs font-bold">
          Staff Portal
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/80 p-6 rounded-2xl border border-slate-800">
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            1. กำหนดเวลาและข้อมูลเช่า
          </h3>
          <div>
            <label className="block text-xs text-slate-400 mb-1">อุปกรณ์ที่คืน:</label>
            <select
              value={selectedGearId}
              onChange={(e) => setSelectedGearId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            >
              {gears.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name} (ค่าเช่า {g.dailyRate.toLocaleString()} บ./วัน | มัดจำ {g.deposit.toLocaleString()} บ.)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              ระยะเวลาคืนสาย (Late Return Hours):
            </label>
            <select
              value={lateHours}
              onChange={(e) => setLateHours(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            >
              <option value="0">ตรงเวลา (On Time - Grace Period)</option>
              <option value="2.5">คืนสาย 2.5 ชั่วโมง (คิด 3 ชม. x 10%)</option>
              <option value="6">คืนสาย 6 ชั่วโมง (คิดราคา 1 วัน + ค่าปรับ 50%)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">
              ความเสียหายอุปกรณ์ (Damage Inspection):
            </label>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dmgLens}
                  onChange={(e) => setDmgLens(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-0"
                />
                <span className="text-slate-300">
                  รอยขีดข่วนชิ้นเลนส์ (Lens Element Scratch) - หัก 1,500 ฿
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dmgCap}
                  onChange={(e) => setDmgCap(e.target.checked)}
                  className="rounded bg-slate-950 border-slate-700 text-blue-600 focus:ring-0"
                />
                <span className="text-slate-300">
                  ฝาปิดเลนส์หาย (Missing Lens Cap) - หัก 400 ฿
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Real-time Settlement Result Card */}
        <div className="glass-card p-5 rounded-2xl flex flex-col justify-between border-slate-700/60">
          <div>
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3">
              สรุปผลการหักเงิน & คืนเงินมัดจำ
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>เงินมัดจำตั้งต้น:</span>
                <span className="font-semibold text-white">฿{deposit.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-amber-400">
                <span>ค่าปรับคืนสาย (Late Fee):</span>
                <span className="font-semibold">฿{lateFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-rose-400">
                <span>ค่าเสียหายอุปกรณ์:</span>
                <span className="font-semibold">฿{damageFee.toLocaleString()}</span>
              </div>
              <div className="border-t border-slate-700 pt-2 flex justify-between text-sm font-bold text-emerald-400">
                <span>เงินมัดจำโอนคืนลูกค้า:</span>
                <span className="text-base">฿{refundAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleReturn}
            className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/20 text-xs flex items-center justify-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" /> ยืนยัน Check-in & คืนเงินมัดจำ
          </button>
        </div>
      </div>
    </div>
  );
}
