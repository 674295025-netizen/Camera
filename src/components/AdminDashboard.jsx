import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  RotateCcw,
  DollarSign,
  Camera,
  CheckCircle,
  Clock,
  Shield,
  Wrench,
  TrendingUp,
  BarChart3,
  PieChart,
  Award,
  Activity
} from 'lucide-react';

export default function AdminDashboard({
  gears,
  bookings,
  activities,
  onOpenAddCamera,
  onResetDemo,
  onApproveHandover,
  onCancelBooking,
  onQuickReturn
}) {
  // Compute KPIs
  const availableCount = gears.filter(g => g.status === 'AVAILABLE').length;
  const activeRentals = gears.filter(g => g.status === 'RENTED').length;
  const maintenanceCount = gears.filter(g => g.status === 'MAINTENANCE').length;

  let totalRevenue = 185000;
  let totalEscrowDeposit = 0;
  let pendingCount = 0;

  bookings.forEach(b => {
    if (b.status === 'COMPLETED' || b.status === 'RENTED') {
      totalRevenue += (b.rentFee || 0);
    }
    if (b.status === 'RENTED') {
      totalEscrowDeposit += (b.deposit || 0);
    }
    if (b.status === 'PENDING') {
      pendingCount++;
    }
  });

  const totalGears = gears.length || 1;
  const availPct = Math.round((availableCount / totalGears) * 100);
  const rentPct = Math.round((activeRentals / totalGears) * 100);
  const maintPct = Math.round((maintenanceCount / totalGears) * 100);

  // Top 3 popular gears
  const sortedGears = [...gears].sort((a, b) => (b.rentalCount || 0) - (a.rentalCount || 0)).slice(0, 3);

  // Revenue monthly mock bars
  const monthlyData = [
    { month: 'พ.ค.', value: 135, target: 120 },
    { month: 'มิ.ย.', value: 152, target: 140 },
    { month: 'ก.ค.', value: 178, target: 160 },
    { month: 'ส.ค.', value: 162, target: 170 },
    { month: 'ก.ย.', value: 184, target: 180 },
    { month: 'ต.ค.', value: 248, target: 200 }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 uppercase tracking-wider">
              Admin Exclusive Portal
            </span>
            <span className="text-xs text-slate-400">อัปเดตข้อมูล Real-time</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1 flex items-center gap-2">
            <LayoutDashboard className="w-7 h-7 text-blue-400" /> แดชบอร์ดภาพรวมระบบเช่ากล้อง
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            ติดตามรายได้, ตรวจสอบสถานะอุปกรณ์, อนุมัติคิวจอง และวิเคราะห์แนวโน้มธุรกิจ
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={onOpenAddCamera}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 transition shadow-lg shadow-blue-600/25"
          >
            <PlusCircle className="w-4 h-4" /> เพิ่มกล้องใหม่ (CRUD)
          </button>
          <button
            onClick={onResetDemo}
            className="px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" /> คืนค่า Demo Data
          </button>
        </div>
      </div>

      {/* 6 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        
        {/* Total Revenue */}
        <div className="glass-card p-4 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">รายได้รวมสะสม</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-white">฿{totalRevenue.toLocaleString()}</div>
          <span className="text-[10px] text-emerald-400 font-semibold block mt-1 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> +18.5% จากเป้าหมาย
          </span>
        </div>

        {/* Active Rentals */}
        <div className="glass-card p-4 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">กำลังถูกเช่า</span>
            <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-cyan-400">{activeRentals} รายการ</div>
          <span className="text-[10px] text-slate-400 font-medium block mt-1">อยู่ในมือลูกค้า</span>
        </div>

        {/* Available Inventory */}
        <div className="glass-card p-4 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">พร้อมให้เช่า</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-emerald-400">{availableCount} รายการ</div>
          <span className="text-[10px] text-slate-400 font-medium block mt-1">พร้อมรับออเดอร์ทันที</span>
        </div>

        {/* Pending Bookings */}
        <div className="glass-card p-4 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">รออนุมัติส่งมอบ</span>
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-amber-400">{pendingCount} รายการ</div>
          <span className="text-[10px] text-amber-400/90 font-medium block mt-1">ต้องตรวจเช็คคิว</span>
        </div>

        {/* Escrow Deposit */}
        <div className="glass-card p-4 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">เงินมัดจำคงค้าง</span>
            <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-indigo-300">฿{totalEscrowDeposit.toLocaleString()}</div>
          <span className="text-[10px] text-slate-400 font-medium block mt-1">คืนเมื่ออุปกรณ์กลับมา</span>
        </div>

        {/* Maintenance */}
        <div className="glass-card p-4 rounded-2xl relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">ส่งซ่อมบำรุง</span>
            <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl font-extrabold text-rose-400">{maintenanceCount} รายการ</div>
          <span className="text-[10px] text-rose-400/80 font-medium block mt-1">Out of Service</span>
        </div>

      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Revenue Trends */}
        <div className="glass-panel p-6 rounded-2xl lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-400" /> แนวโน้มรายได้และจำนวนครั้งการเช่า (Monthly Revenue)
              </h3>
              <p className="text-xs text-slate-400">สถิติเปรียบเทียบย้อนหลัง 6 เดือนและเป้าหมาย</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
              สถานะ: เติบโตต่อเนื่อง
            </span>
          </div>

          <div className="h-56 flex items-end justify-between gap-3 pt-6 px-2">
            {monthlyData.map((d, i) => {
              const heightPct = Math.round((d.value / 260) * 100);
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-bold text-cyan-400 font-mono">฿{d.value}k</span>
                  <div className="w-full max-w-[48px] bg-slate-800 rounded-xl overflow-hidden flex flex-col justify-end h-40 p-1">
                    <div
                      style={{ height: `${heightPct}%` }}
                      className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-lg transition-all duration-500"
                    />
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">{d.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart 2: Inventory Status Distribution */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PieChart className="w-5 h-5 text-cyan-400" /> สัดส่วนสถานะอุปกรณ์
            </h3>
            <p className="text-xs text-slate-400">Inventory Distribution (พร้อมเช่า/เช่า/ซ่อม)</p>
          </div>

          <div className="space-y-4 pt-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">พร้อมเช่า (Available)</span>
                <span className="text-emerald-400 font-bold">{availPct}% ({availableCount} ตัว)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full transition-all" style={{ width: `${availPct}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">ถูกเช่าอยู่ (Rented)</span>
                <span className="text-cyan-400 font-bold">{rentPct}% ({activeRentals} ตัว)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full transition-all" style={{ width: `${rentPct}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">ส่งซ่อมบำรุง (Maintenance)</span>
                <span className="text-rose-400 font-bold">{maintPct}% ({maintenanceCount} ตัว)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full transition-all" style={{ width: `${maintPct}%` }}></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs pt-4 border-t border-slate-800">
            <div>
              <span className="block text-slate-400 text-[10px]">พร้อมเช่า</span>
              <strong className="text-emerald-400 font-bold">{availableCount}</strong>
            </div>
            <div>
              <span className="block text-slate-400 text-[10px]">ถูกเช่า</span>
              <strong className="text-cyan-400 font-bold">{activeRentals}</strong>
            </div>
            <div>
              <span className="block text-slate-400 text-[10px]">ส่งซ่อม</span>
              <strong className="text-rose-400 font-bold">{maintenanceCount}</strong>
            </div>
          </div>
        </div>

      </div>

      {/* Live Booking Queue */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-indigo-400" /> คิวการจองอุปกรณ์ล่าสุด (Live Rental Queue & Approvals)
            </h3>
            <p className="text-xs text-slate-400">อนุมัติการส่งมอบกล้อง, ตรวจสอบสถานะการชำระเงิน, และส่งต่อรับคืน</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">Real-time Data Sync</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">รหัสการจอง (Order ID)</th>
                <th className="py-3 px-4">ผู้เช่า (Customer)</th>
                <th className="py-3 px-4">อุปกรณ์ (Camera / Gear)</th>
                <th className="py-3 px-4">ระยะเวลาเช่า</th>
                <th className="py-3 px-4">ยอดรวม (ค่าเช่า+มัดจำ)</th>
                <th className="py-3 px-4">สถานะคำสั่งซื้อ</th>
                <th className="py-3 px-4 text-center">การจัดการ (Action)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-slate-500">
                    ยังไม่มีรายการจองในระบบ
                  </td>
                </tr>
              ) : (
                bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-900/50 transition">
                    <td className="py-3 px-4 font-mono font-bold text-white">{b.id}</td>
                    <td className="py-3 px-4 text-slate-300 font-medium">{b.customerName}</td>
                    <td className="py-3 px-4 text-white font-semibold">{b.gearName}</td>
                    <td className="py-3 px-4 text-slate-400">
                      {b.days} วัน ({b.bookingDate} ~ {b.returnDate})
                    </td>
                    <td className="py-3 px-4 font-bold text-cyan-400">
                      ฿{b.totalFee.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      {b.status === 'PENDING' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          รอส่งมอบ (PENDING)
                        </span>
                      ) : b.status === 'RENTED' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-cyan-400 border border-blue-500/30">
                          กำลังใช้งาน (RENTED)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          คืนสำเร็จ (COMPLETED)
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {b.status === 'PENDING' ? (
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => onApproveHandover(b.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] transition"
                          >
                            อนุมัติส่งมอบ
                          </button>
                          <button
                            onClick={() => onCancelBooking(b.id)}
                            className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-rose-900/60 text-slate-400 hover:text-rose-300 text-[10px] transition"
                          >
                            ยกเลิก
                          </button>
                        </div>
                      ) : b.status === 'RENTED' ? (
                        <button
                          onClick={() => onQuickReturn(b.id)}
                          className="px-2.5 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] transition"
                        >
                          ตรวจรับคืน
                        </button>
                      ) : (
                        <span className="text-slate-500 text-[10px]">- เสร็จสิ้น -</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popular Gear & Audit Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Popular List */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" /> อุปกรณ์ยอดนิยม 3 อันดับแรก (Top Rented Gear)
          </h3>
          <div className="space-y-3">
            {sortedGears.map((g, idx) => (
              <div
                key={g.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-lg ${
                      idx === 0
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-slate-800 text-slate-400'
                    } flex items-center justify-center font-bold text-xs`}
                  >
                    #{idx + 1}
                  </span>
                  <img src={g.image} alt={g.name} className="w-10 h-10 rounded-lg object-cover bg-slate-800" />
                  <div>
                    <h4 className="font-bold text-white text-xs">{g.name}</h4>
                    <span className="text-[10px] text-slate-400">
                      {g.brand} • {g.mount} • ฿{g.dailyRate.toLocaleString()}/วัน
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-cyan-400 block">
                    {g.rentalCount || 0} ครั้ง
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">★ 4.9 (ยอดนิยม)</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Logs */}
        <div className="glass-panel p-6 rounded-2xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" /> บันทึกกิจกรรมของระบบ (System Activity Log)
          </h3>
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
            {activities.map((act, i) => (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800/80 flex items-start justify-between gap-2 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0 mt-1" />
                  <span className="text-slate-300 leading-snug">{act.text}</span>
                </div>
                <span className="text-[10px] text-slate-500 shrink-0 font-mono">{act.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
