import React, { useEffect, useRef, useState } from 'react';
import { LogOut, ShieldAlert, User, CheckCircle } from 'lucide-react';

const GOOGLE_CLIENT_ID = "482046455757-3edjun9vdcvtjrla85dvs9kb3e5fkrhp.apps.googleusercontent.com";
const ADMIN_EMAILS = [
  "674295025@parichat.skru.ac.th",
  "admin@lensflow.com"
];

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default function GoogleAuthButton({ currentUser, onLogin, onLogout }) {
  const googleBtnRef = useRef(null);
  const [showSimulateModal, setShowSimulateModal] = useState(false);

  useEffect(() => {
    // If user is already logged in with Google, no need to render button
    if (currentUser?.isGoogle) return;

    const initGoogle = () => {
      if (window.google?.accounts?.id && googleBtnRef.current) {
        try {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (response) => {
              const payload = parseJwt(response.credential);
              if (payload) {
                const isAdmin =
                  ADMIN_EMAILS.some((e) => e.toLowerCase() === payload.email.toLowerCase()) ||
                  payload.email.toLowerCase().includes('admin');
                
                onLogin({
                  name: payload.name,
                  email: payload.email,
                  picture: payload.picture,
                  role: isAdmin ? 'admin' : 'user',
                  isGoogle: true
                });
              }
            }
          });

          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'filled_black',
            size: 'medium',
            shape: 'pill',
            text: 'signin_with',
            locale: 'th'
          });
        } catch (err) {
          console.warn('Google GSI init notice:', err);
        }
      }
    };

    // Retry a few times in case script is loading
    initGoogle();
    const timer = setTimeout(initGoogle, 1000);
    return () => clearTimeout(timer);
  }, [currentUser, onLogin]);

  // Fallback simulator for easy testing without origin issues
  const handleSimulateLogin = (email, name, role) => {
    onLogin({
      name,
      email,
      picture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      role,
      isGoogle: true
    });
    setShowSimulateModal(false);
  };

  if (currentUser?.isGoogle) {
    return (
      <div className="flex items-center gap-2.5 bg-slate-900/90 p-1.5 pr-2.5 rounded-2xl border border-slate-800 text-xs">
        <img
          src={currentUser.picture}
          alt={currentUser.name}
          className="w-8 h-8 rounded-xl object-cover border border-slate-700 shadow"
        />
        <div className="text-left hidden sm:block">
          <div className="font-bold text-white text-xs leading-tight flex items-center gap-1">
            {currentUser.name}
            {currentUser.role === 'admin' ? (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-400 font-bold border border-purple-500/30">
                ADMIN
              </span>
            ) : (
              <span className="text-[9px] px-1.5 py-0.2 rounded bg-blue-500/20 text-cyan-400 font-bold border border-blue-500/30">
                USER
              </span>
            )}
          </div>
          <div className="text-[10px] text-slate-400 truncate max-w-[130px] font-mono">
            {currentUser.email}
          </div>
        </div>
        <button
          onClick={onLogout}
          title="ออกจากระบบ Google"
          className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 transition"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {/* Real Google GSI Button Container */}
      <div ref={googleBtnRef} className="min-h-[36px] flex items-center"></div>

      {/* Simulator / Quick Login Button */}
      <button
        onClick={() => setShowSimulateModal(true)}
        className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border border-slate-700"
      >
        <User className="w-3 h-3 text-cyan-400" /> บัญชี Google
      </button>

      {/* Modal for Google Account Simulation */}
      {showSimulateModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl max-w-sm w-full space-y-4 border-slate-700 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> เลือกบัญชีทดสอบ Google
              </h4>
              <button
                onClick={() => setShowSimulateModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-slate-400 text-[11px]">
              เลือกบัญชีที่ต้องการทดสอบ หรือล็อกอินผ่านปุ่ม Google ด้านบนได้ทันที:
            </p>

            <div className="space-y-2">
              <button
                onClick={() =>
                  handleSimulateLogin(
                    '674295025@parichat.skru.ac.th',
                    'Anisa (Admin SKRU)',
                    'admin'
                  )
                }
                className="w-full p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 hover:border-purple-400 flex items-center justify-between transition text-left"
              >
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    Anisa (Admin SKRU)
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/30 text-purple-300 font-bold">
                      สิทธิ์ ADMIN
                    </span>
                  </div>
                  <div className="text-[10px] text-purple-300 font-mono">
                    674295025@parichat.skru.ac.th
                  </div>
                </div>
              </button>

              <button
                onClick={() =>
                  handleSimulateLogin(
                    'customer.somchai@gmail.com',
                    'สมชาย สายถ่ายภาพ',
                    'user'
                  )
                }
                className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500/50 flex items-center justify-between transition text-left"
              >
                <div>
                  <div className="font-bold text-white flex items-center gap-1.5">
                    สมชาย สายถ่ายภาพ
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-300 font-bold">
                      สิทธิ์ USER (ลูกค้า)
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    customer.somchai@gmail.com
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowSimulateModal(false)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold transition"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
