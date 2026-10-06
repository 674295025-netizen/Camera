import React, { useState, useEffect } from 'react';
import { X, Camera, PlusCircle, Edit3 } from 'lucide-react';

export default function CRUDModal({ editingGear, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    brand: 'Sony',
    category: 'Camera',
    mount: 'E-Mount',
    serial: '',
    dailyRate: 1000,
    deposit: 5000,
    status: 'AVAILABLE',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
    specs: ''
  });

  useEffect(() => {
    if (editingGear) {
      setFormData({
        name: editingGear.name || '',
        brand: editingGear.brand || 'Sony',
        category: editingGear.category || 'Camera',
        mount: editingGear.mount || 'E-Mount',
        serial: editingGear.serial || '',
        dailyRate: editingGear.dailyRate || 1000,
        deposit: editingGear.deposit || 5000,
        status: editingGear.status || 'AVAILABLE',
        image: editingGear.image || '',
        specs: editingGear.specs || ''
      });
    } else {
      setFormData({
        name: '',
        brand: 'Sony',
        category: 'Camera',
        mount: 'E-Mount',
        serial: 'SN-' + Math.floor(10000 + Math.random() * 90000),
        dailyRate: 1200,
        deposit: 6000,
        status: 'AVAILABLE',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
        specs: ''
      });
    }
  }, [editingGear]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'dailyRate' || name === 'deposit' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...(editingGear ? { id: editingGear.id, rentalCount: editingGear.rentalCount } : {}),
      ...formData
    });
  };

  const setPresetImage = (type) => {
    let url = '';
    if (type === 'sony') url = 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80';
    if (type === 'canon') url = 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=600&q=80';
    if (type === 'lens') url = 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?auto=format&fit=crop&w=600&q=80';
    if (type === 'fuji') url = 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=600&q=80';
    setFormData((prev) => ({ ...prev, image: url }));
  };

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="glass-panel p-6 sm:p-8 rounded-3xl max-w-xl w-full space-y-5 border-slate-700 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="border-b border-slate-800 pb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            {editingGear ? (
              <>
                <Edit3 className="w-5 h-5 text-cyan-400" /> แก้ไขข้อมูลอุปกรณ์: {editingGear.name}
              </>
            ) : (
              <>
                <PlusCircle className="w-5 h-5 text-blue-400" /> เพิ่มกล้อง / อุปกรณ์ใหม่
              </>
            )}
          </h3>
          <p className="text-xs text-slate-400">กรอกข้อมูลอุปกรณ์สำหรับลงในระบบเช่า</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                ชื่อรุ่นอุปกรณ์ (Model Name) *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="เช่น Sony A7S III"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                ยี่ห้อ (Brand) *
              </label>
              <select
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
              >
                <option value="Sony">Sony</option>
                <option value="Canon">Canon</option>
                <option value="Fujifilm">Fujifilm</option>
                <option value="Nikon">Nikon</option>
                <option value="DJI">DJI</option>
                <option value="Panasonic">Panasonic</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                หมวดหมู่ (Category) *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
              >
                <option value="Camera">กล้องถ่ายภาพ (Camera)</option>
                <option value="Lens">เลนส์ (Lens)</option>
                <option value="Accessory">อุปกรณ์เสริม / กิมบอล (Accessory)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Lens Mount / ระบบเมาท์ *
              </label>
              <select
                name="mount"
                value={formData.mount}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
              >
                <option value="E-Mount">Sony E-Mount</option>
                <option value="RF-Mount">Canon RF-Mount</option>
                <option value="X-Mount">Fuji X-Mount</option>
                <option value="Z-Mount">Nikon Z-Mount</option>
                <option value="Universal">Universal / Accessory</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Serial Number (S/N) *
              </label>
              <input
                type="text"
                name="serial"
                value={formData.serial}
                onChange={handleChange}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                ค่าเช่า / วัน (฿) *
              </label>
              <input
                type="number"
                name="dailyRate"
                value={formData.dailyRate}
                onChange={handleChange}
                required
                min="100"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                เงินมัดจำ (฿) *
              </label>
              <input
                type="number"
                name="deposit"
                value={formData.deposit}
                onChange={handleChange}
                required
                min="500"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              สถานะเริ่มต้น (Status) *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
            >
              <option value="AVAILABLE">พร้อมเช่า (AVAILABLE)</option>
              <option value="RENTED">ถูกเช่าอยู่ (RENTED)</option>
              <option value="MAINTENANCE">ซ่อมบำรุง (MAINTENANCE)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              ลิงก์รูปภาพ (Image URL) *
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-white"
            />
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[11px] text-slate-400">รูปภาพสำเร็จรูป (คลิกเลือก):</span>
              <button
                type="button"
                onClick={() => setPresetImage('sony')}
                className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 hover:text-white"
              >
                Sony
              </button>
              <button
                type="button"
                onClick={() => setPresetImage('canon')}
                className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 hover:text-white"
              >
                Canon
              </button>
              <button
                type="button"
                onClick={() => setPresetImage('lens')}
                className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 hover:text-white"
              >
                Lens
              </button>
              <button
                type="button"
                onClick={() => setPresetImage('fuji')}
                className="px-2 py-1 rounded bg-slate-800 text-[10px] text-slate-300 hover:text-white"
              >
                Fuji
              </button>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-lg shadow-blue-600/30"
            >
              บันทึกข้อมูลอุปกรณ์
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
