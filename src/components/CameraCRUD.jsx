import React, { useState } from 'react';
import {
  Database,
  PlusCircle,
  Edit3,
  Trash2,
  RefreshCw,
  Search
} from 'lucide-react';

export default function CameraCRUD({
  gears,
  onOpenAdd,
  onOpenEdit,
  onToggleStatus,
  onDelete
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [catFilter, setCatFilter] = useState('ALL');

  const filteredGears = gears.filter(g => {
    const matchSearch =
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.serial.toLowerCase().includes(searchTerm.toLowerCase());
    const matchBrand = brandFilter === 'ALL' || g.brand === brandFilter;
    const matchStatus = statusFilter === 'ALL' || g.status === statusFilter;
    const matchCat = catFilter === 'ALL' || g.category === catFilter;
    return matchSearch && matchBrand && matchStatus && matchCat;
  });

  return (
    <div className="space-y-6">
      
      {/* CRUD Top Bar */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/20 text-purple-400 border border-purple-500/30 uppercase tracking-wider">
                Admin CRUD System
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-white mt-1 flex items-center gap-2">
              <Database className="w-7 h-7 text-cyan-400" /> จัดการฐานข้อมูลกล้องและอุปกรณ์ (Equipment CRUD)
            </h2>
            <p className="text-xs text-slate-400">
              เพิ่มรายการกล้องใหม่, แก้ไขราคา/ข้อมูลสเปก, ปรับสถานะ, และลบรายการจากระบบ
            </p>
          </div>
          <button
            onClick={onOpenAdd}
            className="px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition shadow-lg shadow-blue-500/25"
          >
            <PlusCircle className="w-5 h-5" /> เพิ่มกล้อง / อุปกรณ์ใหม่
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-slate-800">
          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="🔍 ค้นหาชื่อรุ่น หรือ Serial No..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">ทุกยี่ห้อ (All Brands)</option>
              <option value="Sony">Sony</option>
              <option value="Canon">Canon</option>
              <option value="Fujifilm">Fujifilm</option>
              <option value="Nikon">Nikon</option>
              <option value="DJI">DJI</option>
            </select>
          </div>
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">ทุกสถานะ (All Status)</option>
              <option value="AVAILABLE">พร้อมเช่า (AVAILABLE)</option>
              <option value="RENTED">ถูกเช่าอยู่ (RENTED)</option>
              <option value="MAINTENANCE">ซ่อมบำรุง (MAINTENANCE)</option>
            </select>
          </div>
          <div>
            <select
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">ทุกหมวดหมู่ (All Categories)</option>
              <option value="Camera">กล้องถ่ายภาพ (Camera)</option>
              <option value="Lens">เลนส์ (Lens)</option>
              <option value="Accessory">อุปกรณ์เสริม / กิมบอล</option>
            </select>
          </div>
        </div>
      </div>

      {/* Equipment Table */}
      <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">รูปภาพ</th>
                <th className="py-3.5 px-4">ชื่อรุ่นและยี่ห้อ</th>
                <th className="py-3.5 px-4">Serial Number</th>
                <th className="py-3.5 px-4">หมวดหมู่ / Mount</th>
                <th className="py-3.5 px-4">ค่าเช่า / วัน</th>
                <th className="py-3.5 px-4">เงินมัดจำ</th>
                <th className="py-3.5 px-4">สถานะอุปกรณ์</th>
                <th className="py-3.5 px-4 text-center">จัดการ (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 font-sans">
              {filteredGears.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-slate-500">
                    ไม่พบรายการกล้องที่ตรงตามเงื่อนไข
                  </td>
                </tr>
              ) : (
                filteredGears.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/60 transition">
                    <td className="py-3 px-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-800 bg-slate-900"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-white text-xs">{item.name}</div>
                      <div className="text-[10px] text-slate-400">{item.brand}</div>
                    </td>
                    <td className="py-3 px-4 font-mono font-semibold text-slate-300 text-[11px]">
                      {item.serial}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-xs text-slate-300 block">{item.category}</span>
                      <span className="text-[10px] text-cyan-400">{item.mount}</span>
                    </td>
                    <td className="py-3 px-4 font-bold text-white">
                      ฿{item.dailyRate.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-blue-400 font-semibold">
                      ฿{item.deposit.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      {item.status === 'AVAILABLE' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          พร้อมเช่า (AVAILABLE)
                        </span>
                      ) : item.status === 'RENTED' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-cyan-400 border border-blue-500/30">
                          ถูกเช่าอยู่ (RENTED)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          ซ่อมบำรุง (MAINTENANCE)
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onOpenEdit(item)}
                          title="แก้ไขข้อมูล (Update)"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600/40 text-blue-400 hover:text-white transition"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onToggleStatus(item.id)}
                          title="สลับสถานะ ว่าง/ซ่อม"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-amber-600/40 text-amber-400 hover:text-white transition"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(item.id)}
                          title="ลบรายการ (Delete)"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600/40 text-rose-400 hover:text-white transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 bg-slate-900/50 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>แสดง {filteredGears.length} จากทั้งหมด {gears.length} รายการ</span>
          <span className="text-[11px] text-slate-500">รองรับระบบบันทึกแบบ LocalStorage อัตโนมัติ</span>
        </div>
      </div>

    </div>
  );
}
