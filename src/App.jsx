import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import CameraCRUD from './components/CameraCRUD.jsx';
import CameraCatalog from './components/CameraCatalog.jsx';
import MyBookings from './components/MyBookings.jsx';
import StaffInspection from './components/StaffInspection.jsx';
import EKYCVerification from './components/EKYCVerification.jsx';
import BookingModal from './components/BookingModal.jsx';
import CRUDModal from './components/CRUDModal.jsx';
import {
  DEFAULT_GEARS,
  DEFAULT_BOOKINGS,
  DEFAULT_ACTIVITIES
} from './data/mockData.js';
import { ShieldAlert } from 'lucide-react';

export default function App() {
  const [gears, setGears] = useState(() => {
    const saved = localStorage.getItem('lensflow_gears');
    return saved ? JSON.parse(saved) : DEFAULT_GEARS;
  });

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('lensflow_bookings');
    return saved ? JSON.parse(saved) : DEFAULT_BOOKINGS;
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('lensflow_activities');
    return saved ? JSON.parse(saved) : DEFAULT_ACTIVITIES;
  });

  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('lensflow_user_role') || 'admin';
  });

  const [currentTab, setCurrentTab] = useState(() => {
    const role = localStorage.getItem('lensflow_user_role') || 'admin';
    return role === 'admin' ? 'dashboard' : 'catalog';
  });

  const [bookingModalGear, setBookingModalGear] = useState(null);
  const [crudModalOpen, setCrudModalOpen] = useState(false);
  const [editingGear, setEditingGear] = useState(null);
  const [showAccessDenied, setShowAccessDenied] = useState(false);

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem('lensflow_gears', JSON.stringify(gears));
  }, [gears]);

  useEffect(() => {
    localStorage.setItem('lensflow_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('lensflow_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('lensflow_user_role', currentRole);
  }, [currentRole]);

  // Log activity helper
  const logActivity = (text, type = 'info') => {
    setActivities((prev) => [
      { text, time: 'เมื่อสักครู่', type },
      ...prev.slice(0, 19)
    ]);
  };

  // Role switching
  const handleSwitchRole = (newRole) => {
    setCurrentRole(newRole);
    setShowAccessDenied(false);
    if (newRole === 'admin') {
      setCurrentTab('dashboard');
    } else {
      setCurrentTab('catalog');
    }
  };

  // Tab switching with STRICT ROLE PROTECTION
  const handleSelectTab = (tabId) => {
    const adminOnlyTabs = ['dashboard', 'crud', 'staff'];
    if (currentRole !== 'admin' && adminOnlyTabs.includes(tabId)) {
      setShowAccessDenied(true);
      setCurrentTab('catalog');
      return;
    }
    setShowAccessDenied(false);
    setCurrentTab(tabId);
  };

  // CRUD Actions
  const handleSaveGear = (gearData) => {
    if (gearData.id) {
      // Edit
      setGears((prev) =>
        prev.map((g) => (g.id === gearData.id ? { ...g, ...gearData } : g))
      );
      logActivity(`Admin แก้ไขข้อมูลกล้อง: ${gearData.name} (S/N: ${gearData.serial})`, 'update');
    } else {
      // Create
      const newGear = {
        ...gearData,
        id: 'g_' + Date.now(),
        rentalCount: 0
      };
      setGears((prev) => [newGear, ...prev]);
      logActivity(`Admin เพิ่มกล้องใหม่เข้าสู่ระบบ: ${newGear.name} (฿${newGear.dailyRate}/วัน)`, 'create');
    }
    setCrudModalOpen(false);
    setEditingGear(null);
    alert(`🎉 บันทึกข้อมูลกล้อง "${gearData.name}" สำเร็จเรียบร้อย!`);
  };

  const handleToggleGearStatus = (gearId) => {
    setGears((prev) =>
      prev.map((g) => {
        if (g.id === gearId) {
          if (g.status === 'RENTED') {
            alert('กล้องกำลังถูกเช่าอยู่ ไม่สามารถสลับสถานะโดยตรงได้ กรุณาทำรายการตรวจรับคืนในหน้า Staff Check-in');
            return g;
          }
          const nextStatus = g.status === 'AVAILABLE' ? 'MAINTENANCE' : 'AVAILABLE';
          logActivity(`Admin สลับสถานะกล้อง ${g.name} เป็น ${nextStatus}`, 'status');
          return { ...g, status: nextStatus };
        }
        return g;
      })
    );
  };

  const handleDeleteGear = (gearId) => {
    const target = gears.find((g) => g.id === gearId);
    if (!target) return;
    if (target.status === 'RENTED') {
      alert('⚠️ ไม่สามารถลบอุปกรณ์นี้ได้ เนื่องจากกำลังถูกเช่าอยู่ (RENTED)');
      return;
    }
    if (!window.confirm(`คุณต้องการลบกล้อง "${target.name}" ออกจากระบบอย่างถาวรใช่หรือไม่?`)) {
      return;
    }
    setGears((prev) => prev.filter((g) => g.id !== gearId));
    logActivity(`Admin ลบกล้องออกจากระบบ: ${target.name}`, 'delete');
    alert(`🗑️ ลบกล้อง "${target.name}" เรียบร้อยแล้ว`);
  };

  // Booking Actions
  const handleConfirmBooking = (gear, days, rentFee, deposit, totalFee) => {
    const orderId = 'LF-' + Math.floor(1000 + Math.random() * 9000);
    const customerName = currentRole === 'admin' ? 'Admin Booking' : 'สมชาย สายถ่ายภาพ';

    const newBooking = {
      id: orderId,
      customerName,
      gearId: gear.id,
      gearName: gear.name,
      days,
      totalFee,
      rentFee,
      deposit,
      status: 'PENDING',
      bookingDate: new Date().toISOString().split('T')[0],
      returnDate: new Date(Date.now() + days * 86400000).toISOString().split('T')[0]
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Update gear status to RENTED
    setGears((prev) =>
      prev.map((g) =>
        g.id === gear.id
          ? { ...g, status: 'RENTED', rentalCount: (g.rentalCount || 0) + 1 }
          : g
      )
    );

    logActivity(`${customerName} จองอุปกรณ์ ${gear.name} (${days} วัน - ยอดรวม ฿${totalFee.toLocaleString()})`, 'booking');
    setBookingModalGear(null);

    alert(`🎉 จองอุปกรณ์สำเร็จ! รหัสการจอง: ${orderId}\nระบบบันทึกรายการเรียบร้อยและส่งต่อให้แอดมินเตรียมส่งมอบ`);

    if (currentRole === 'user') {
      setCurrentTab('mybookings');
    } else {
      setCurrentTab('dashboard');
    }
  };

  const handleApproveHandover = (bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'RENTED' } : b))
    );

    setGears((prev) =>
      prev.map((g) => (g.id === booking.gearId ? { ...g, status: 'RENTED' } : g))
    );

    logActivity(`Admin อนุมัติส่งมอบอุปกรณ์ ${booking.gearName} ให้แก่ ${booking.customerName} (Order: ${booking.id})`, 'handover');
    alert(`✅ อนุมัติส่งมอบอุปกรณ์ ${booking.gearName} สำเร็จ! สถานะเปลี่ยนเป็น RENTED`);
  };

  const handleCancelBooking = (bookingId) => {
    if (!window.confirm(`ยืนยันการยกเลิกรายการจอง ${bookingId} หรือไม่?`)) return;
    const booking = bookings.find((b) => b.id === bookingId);
    if (!booking) return;

    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'CANCELLED' } : b))
    );

    setGears((prev) =>
      prev.map((g) =>
        g.id === booking.gearId && g.status === 'RENTED'
          ? { ...g, status: 'AVAILABLE' }
          : g
      )
    );

    logActivity(`Admin ยกเลิกรายการจอง ${booking.id} (${booking.gearName})`, 'cancel');
  };

  const handleStaffReturn = (gearId, refundAmount) => {
    const gear = gears.find((g) => g.id === gearId);
    if (!gear) return;

    // Reset gear status to available
    setGears((prev) =>
      prev.map((g) => (g.id === gearId ? { ...g, status: 'AVAILABLE' } : g))
    );

    // Mark matching rented booking as completed
    setBookings((prev) =>
      prev.map((b) =>
        b.gearId === gearId && b.status === 'RENTED'
          ? { ...b, status: 'COMPLETED' }
          : b
      )
    );

    logActivity(`Staff ตรวจรับคืนอุปกรณ์ ${gear.name} คืนเงินมัดจำ ฿${refundAmount.toLocaleString()}`, 'return');
    alert(`✅ ตรวจรับคืนอุปกรณ์สำเร็จ! ระบบปลดล็อกกล้องกลับเป็นสถานะพร้อมเช่า (AVAILABLE) และคืนเงินมัดจำ ฿${refundAmount.toLocaleString()} เรียบร้อยแล้ว`);
    setCurrentTab('dashboard');
  };

  // Reset Demo Data
  const handleResetDemo = () => {
    if (!window.confirm('ต้องการคืนค่าข้อมูลตัวอย่าง (Reset Demo Data) ทั้งหมดหรือไม่?')) return;
    localStorage.removeItem('lensflow_gears');
    localStorage.removeItem('lensflow_bookings');
    localStorage.removeItem('lensflow_activities');
    setGears(DEFAULT_GEARS);
    setBookings(DEFAULT_BOOKINGS);
    setActivities(DEFAULT_ACTIVITIES);
    alert('🔄 คืนค่าข้อมูลตัวอย่างตั้งต้นเรียบร้อยแล้ว');
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen selection:bg-blue-500 selection:text-white pb-16">
      
      {/* Top Navbar */}
      <Navbar
        currentRole={currentRole}
        onSwitchRole={handleSwitchRole}
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
      />

      {/* Access Denied Warning Banner */}
      {showAccessDenied && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
          <div className="bg-rose-950/80 border border-rose-500/40 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-rose-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-600/30 text-rose-400 flex items-center justify-center shrink-0 border border-rose-500/30">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base">403 Forbidden: สิทธิ์การเข้าถึงถูกจำกัด</h4>
                <p className="text-xs text-rose-300">
                  หน้าแดชบอร์ดและระบบจัดการหลังบ้าน สงวนสิทธิ์เฉพาะผู้ดูแลระบบ (Admin) เท่านั้น บัญชีของคุณคือ <strong>User ทั่วไป</strong>
                </p>
              </div>
            </div>
            <button
              onClick={() => handleSwitchRole('admin')}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition shadow shrink-0"
            >
              สลับเป็นสิทธิ์ Admin ทันที
            </button>
          </div>
        </div>
      )}

      {/* Main Content Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {currentTab === 'dashboard' && currentRole === 'admin' && (
          <AdminDashboard
            gears={gears}
            bookings={bookings}
            activities={activities}
            onOpenAddCamera={() => {
              setEditingGear(null);
              setCrudModalOpen(true);
            }}
            onResetDemo={handleResetDemo}
            onApproveHandover={handleApproveHandover}
            onCancelBooking={handleCancelBooking}
            onQuickReturn={() => setCurrentTab('staff')}
          />
        )}

        {currentTab === 'crud' && currentRole === 'admin' && (
          <CameraCRUD
            gears={gears}
            onOpenAdd={() => {
              setEditingGear(null);
              setCrudModalOpen(true);
            }}
            onOpenEdit={(gear) => {
              setEditingGear(gear);
              setCrudModalOpen(true);
            }}
            onToggleStatus={handleToggleGearStatus}
            onDelete={handleDeleteGear}
          />
        )}

        {currentTab === 'catalog' && (
          <CameraCatalog
            gears={gears}
            onOpenBooking={(gear) => setBookingModalGear(gear)}
          />
        )}

        {currentTab === 'mybookings' && (
          <MyBookings bookings={bookings} />
        )}

        {currentTab === 'kyc' && (
          <EKYCVerification
            onVerified={(name) => logActivity(`ผู้เช่า ${name} ยืนยันตัวตน e-KYC สำเร็จ`, 'kyc')}
          />
        )}

        {currentTab === 'staff' && currentRole === 'admin' && (
          <StaffInspection
            gears={gears}
            onConfirmReturn={handleStaffReturn}
          />
        )}
      </main>

      {/* Booking Modal */}
      {bookingModalGear && (
        <BookingModal
          gear={bookingModalGear}
          onClose={() => setBookingModalGear(null)}
          onConfirm={handleConfirmBooking}
        />
      )}

      {/* CRUD Modal */}
      {crudModalOpen && (
        <CRUDModal
          editingGear={editingGear}
          onClose={() => {
            setCrudModalOpen(false);
            setEditingGear(null);
          }}
          onSave={handleSaveGear}
        />
      )}

    </div>
  );
}
