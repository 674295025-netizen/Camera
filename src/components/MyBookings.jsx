import React from 'react';
import { ShoppingBag } from 'lucide-react';

export default function MyBookings({ bookings }) {
  const myBookings = bookings.filter(
    b => b.customerName.includes('สมชาย') || b.customerName.includes('Admin')
  );

  return (
    <div className="glass-panel p-6 rounded-2xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" /> รายการจองของฉัน (My Rentals & Orders)
          </h2>
          <p className="text-xs text-slate-400">
            ตรวจสอบประวัติการจอง สถานะการส่งมอบ และเอกสารยืนยัน
          </p>
        </div>
        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-xl text-xs font-bold border border-blue-500/20">
          Customer Portal
        </span>
      </div>

      <div className="space-y-3 pt-2">
        {myBookings.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            คุณยังไม่มีประวัติการจองอุปกรณ์ในขณะนี้
          </div>
        ) : (
          myBookings.map((b) => (
            <div
              key={b.id}
              className="glass-card p-5 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-white text-sm">{b.id}</span>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      b.status === 'COMPLETED'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : b.status === 'RENTED'
                        ? 'bg-blue-500/20 text-cyan-400'
                        : 'bg-amber-500/20 text-amber-400'
                    }`}
                  >
                    {b.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white">{b.gearName}</h4>
                <div className="text-xs text-slate-400">
                  ระยะเวลาเช่า:{' '}
                  <span className="text-slate-200 font-semibold">{b.days} วัน</span> ({b.bookingDate} ถึง{' '}
                  {b.returnDate})
                </div>
              </div>
              <div className="text-right space-y-1">
                <span className="text-xs text-slate-400 block">ยอดชำระแล้วสุทธิ</span>
                <div className="text-lg font-extrabold text-cyan-400">
                  ฿{b.totalFee.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-500 block">
                  (ค่าเช่า ฿{b.rentFee.toLocaleString()} + มัดจำ ฿{b.deposit.toLocaleString()})
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
