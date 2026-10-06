import React from 'react';
import {
  Camera,
  LayoutDashboard,
  Database,
  ClipboardCheck,
  Search,
  ShoppingBag,
  ShieldCheck,
  User,
  ShieldAlert
} from 'lucide-react';
import GoogleAuthButton from './GoogleAuthButton.jsx';

export default function Navbar({
  currentRole,
  onSwitchRole,
  currentTab,
  onSelectTab,
  currentUser,
  onGoogleLogin,
  onGoogleLogout
}) {
  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => onSelectTab(currentRole === 'admin' ? 'dashboard' : 'catalog')}
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold bg-gradient-to-r from-white via-slate-100 to-blue-400 bg-clip-text text-transparent">
                LENSFLOW
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-semibold border border-blue-500/30">
                v2.0 Pro
              </span>
            </div>
            <span className="text-[11px] text-cyan-400 font-medium block tracking-wider uppercase">
              Camera Rental Platform
            </span>
          </div>
        </div>

        {/* Navigation Bar - ROLE PROTECTED */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800/80">
          {currentRole === 'admin' ? (
            <>
              <button
                onClick={() => onSelectTab('dashboard')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentTab === 'dashboard'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" /> แดชบอร์ด (Dashboard)
              </button>
              <button
                onClick={() => onSelectTab('crud')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentTab === 'crud'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Database className="w-3.5 h-3.5" /> จัดการอุปกรณ์ (CRUD)
              </button>
              <button
                onClick={() => onSelectTab('staff')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentTab === 'staff'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ClipboardCheck className="w-3.5 h-3.5" /> ตรวจรับคืน (Return)
              </button>
              <button
                onClick={() => onSelectTab('catalog')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentTab === 'catalog'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Search className="w-3.5 h-3.5" /> หน้าร้าน (Catalog)
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onSelectTab('catalog')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentTab === 'catalog'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Search className="w-3.5 h-3.5" /> ค้นหากล้อง & จอง
              </button>
              <button
                onClick={() => onSelectTab('mybookings')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentTab === 'mybookings'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" /> รายการจองของฉัน
              </button>
              <button
                onClick={() => onSelectTab('kyc')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  currentTab === 'kyc'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" /> e-KYC ยืนยันตัวตน
              </button>
            </>
          )}
        </nav>

        {/* Right Section: Google Sign-In & Role Widget */}
        <div className="flex items-center gap-3">
          
          {/* Google Sign-In Component */}
          <GoogleAuthButton
            currentUser={currentUser}
            onLogin={onGoogleLogin}
            onLogout={onGoogleLogout}
          />

          {/* Quick Role Switcher (Simulator) */}
          <div className="hidden sm:flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800">
            <button
              onClick={() => onSwitchRole('user')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentRole === 'user'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" /> User
            </button>
            <button
              onClick={() => onSwitchRole('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentRole === 'admin'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5" /> Admin
            </button>
          </div>

        </div>

      </div>

      {/* Mobile Nav */}
      <div className="flex md:hidden items-center justify-around bg-slate-900/95 py-2.5 border-t border-slate-800 px-2 overflow-x-auto">
        {currentRole === 'admin' ? (
          <>
            <button
              onClick={() => onSelectTab('dashboard')}
              className={`px-3 py-1 rounded-xl text-xs font-bold ${
                currentTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onSelectTab('crud')}
              className={`px-3 py-1 rounded-xl text-xs font-bold ${
                currentTab === 'crud' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              CRUD
            </button>
            <button
              onClick={() => onSelectTab('staff')}
              className={`px-3 py-1 rounded-xl text-xs font-bold ${
                currentTab === 'staff' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              Return
            </button>
            <button
              onClick={() => onSelectTab('catalog')}
              className={`px-3 py-1 rounded-xl text-xs font-bold ${
                currentTab === 'catalog' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              Catalog
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onSelectTab('catalog')}
              className={`px-3 py-1 rounded-xl text-xs font-bold ${
                currentTab === 'catalog' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              Catalog
            </button>
            <button
              onClick={() => onSelectTab('mybookings')}
              className={`px-3 py-1 rounded-xl text-xs font-bold ${
                currentTab === 'mybookings' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              My Bookings
            </button>
            <button
              onClick={() => onSelectTab('kyc')}
              className={`px-3 py-1 rounded-xl text-xs font-bold ${
                currentTab === 'kyc' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              e-KYC
            </button>
          </>
        )}
      </div>
    </header>
  );
}
