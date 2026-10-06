import React, { useState } from 'react';
import {
  SlidersHorizontal,
  RotateCcw,
  CalendarPlus
} from 'lucide-react';

export default function CameraCatalog({ gears, onOpenBooking }) {
  const [brandFilter, setBrandFilter] = useState('ALL');
  const [mountFilter, setMountFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [startDate, setStartDate] = useState('2026-10-10');
  const [endDate, setEndDate] = useState('2026-10-12');

  const filteredGears = gears.filter(g => {
    const matchBrand = brandFilter === 'ALL' || g.brand === brandFilter;
    const matchMount = mountFilter === 'ALL' || g.mount === mountFilter;
    const matchCat = categoryFilter === 'ALL' || g.category === categoryFilter;
    return matchBrand && matchMount && matchCat;
  });

  const resetFilters = () => {
    setBrandFilter('ALL');
    setMountFilter('ALL');
    setCategoryFilter('ALL');
  };

  return (
    <div className="space-y-6">
      
      {/* Search & Filter Bar */}
      <div className="glass-panel p-6 rounded-2xl shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-blue-400" /> ค้นหาอุปกรณ์ตามวันใช้งาน & Lens Mount
            </h2>
            <p className="text-xs text-slate-400">
              เลือกรุ่นกล้อง ตรวจสอบวันว่างแบบ Real-time ล็อกคิวอัตโนมัติ 15 นาที
            </p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">วันเช่า:</span>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
            <span className="text-slate-500 text-xs">ถึง</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Filter Selects */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-slate-800">
          <select
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200"
          >
            <option value="ALL">ทุกยี่ห้อ (All Brands)</option>
            <option value="Sony">Sony</option>
            <option value="Canon">Canon</option>
            <option value="Fujifilm">Fujifilm</option>
            <option value="Nikon">Nikon</option>
            <option value="DJI">DJI</option>
          </select>
          <select
            value={mountFilter}
            onChange={(e) => setMountFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200"
          >
            <option value="ALL">ทุก Lens Mount</option>
            <option value="E-Mount">Sony E-Mount</option>
            <option value="RF-Mount">Canon RF-Mount</option>
            <option value="X-Mount">Fuji X-Mount</option>
            <option value="Z-Mount">Nikon Z-Mount</option>
            <option value="Universal">Universal / Accessory</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200"
          >
            <option value="ALL">ทุกประเภทอุปกรณ์</option>
            <option value="Camera">กล้องถ่ายภาพ (Camera Body)</option>
            <option value="Lens">เลนส์ (Lens)</option>
            <option value="Accessory">อุปกรณ์เสริม / กิมบอล</option>
          </select>
          <button
            onClick={resetFilters}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl py-2.5 text-xs transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> ล้างตัวกรอง
          </button>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGears.length === 0 ? (
          <div className="col-span-3 text-center py-12 text-slate-500">
            ไม่พบอุปกรณ์ที่ตรงตามเงื่อนไขการค้นหา
          </div>
        ) : (
          filteredGears.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl overflow-hidden transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-950/80 backdrop-blur-md text-cyan-400 border border-slate-700">
                    {item.mount}
                  </span>
                  <span
                    className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      item.status === 'AVAILABLE'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : item.status === 'RENTED'
                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {item.status === 'AVAILABLE'
                      ? 'พร้อมเช่า (Available)'
                      : item.status === 'RENTED'
                      ? 'ถูกเช่าอยู่ (Rented)'
                      : 'ซ่อมบำรุง (Maintenance)'}
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <div className="text-[10px] text-slate-400 font-mono font-semibold">
                    S/N: {item.serial}
                  </div>
                  <h3 className="text-base font-bold text-white">{item.name}</h3>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-400">
                      ค่าเช่ารายวัน:{' '}
                      <strong className="text-white">
                        {item.dailyRate.toLocaleString()} ฿/วัน
                      </strong>
                    </span>
                    <span className="text-slate-400">
                      เงินมัดจำ:{' '}
                      <strong className="text-blue-400">
                        {item.deposit.toLocaleString()} ฿
                      </strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => onOpenBooking(item)}
                  disabled={item.status !== 'AVAILABLE'}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                    item.status === 'AVAILABLE'
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <CalendarPlus className="w-4 h-4" />{' '}
                  {item.status === 'AVAILABLE' ? 'จองอุปกรณ์ออนไลน์' : 'ไม่พร้อมใช้งาน'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
