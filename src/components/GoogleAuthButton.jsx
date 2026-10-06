import React, { useEffect, useRef } from 'react';
import { LogOut } from 'lucide-react';

const GOOGLE_CLIENT_ID = "482046455757-3edjun9vdcvtjrla85dvs9kb3e5fkrhp.apps.googleusercontent.com";

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

export default function GoogleAuthButton({ currentUser, adminEmails, onLogin, onLogout }) {
  const googleBtnRef = useRef(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    // If logged in, do not render Google button
    if (currentUser) return;

    const initGoogle = () => {
      if (window.google?.accounts?.id && googleBtnRef.current && !initializedRef.current) {
        try {
          initializedRef.current = true;
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (response) => {
              const payload = parseJwt(response.credential);
              if (payload) {
                const cleanEmail = payload.email.toLowerCase().trim();
                const isAdmin = (adminEmails || []).some(
                  (e) => e.toLowerCase().trim() === cleanEmail
                );

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

          // Render only once with explicit Thai locale
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'filled_black',
            size: 'medium',
            shape: 'pill',
            text: 'signin_with',
            locale: 'th',
            width: 220
          });
        } catch (err) {
          console.warn('Google GSI notice:', err);
        }
      }
    };

    // Check if script is loaded
    if (window.google?.accounts?.id) {
      initGoogle();
    } else {
      const interval = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(interval);
          initGoogle();
        }
      }, 300);
      return () => clearInterval(interval);
    }
  }, [currentUser, adminEmails, onLogin]);

  if (currentUser) {
    return (
      <div className="flex items-center gap-2.5 bg-slate-900/90 p-1.5 pr-2.5 rounded-2xl border border-slate-800 text-xs">
        <img
          src={currentUser.picture || `https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser.name}`}
          alt={currentUser.name}
          className="w-8 h-8 rounded-xl object-cover border border-slate-700 shadow"
        />
        <div className="text-left hidden sm:block">
          <div className="font-bold text-white text-xs leading-tight flex items-center gap-1.5">
            <span className="truncate max-w-[120px]">{currentUser.name}</span>
            {currentUser.role === 'admin' ? (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-400 font-bold border border-purple-500/30">
                ADMIN
              </span>
            ) : (
              <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-cyan-400 font-bold border border-blue-500/30">
                USER
              </span>
            )}
          </div>
          <div className="text-[10px] text-slate-400 truncate max-w-[140px] font-mono">
            {currentUser.email}
          </div>
        </div>
        <button
          onClick={onLogout}
          title="ออกจากระบบ"
          className="p-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 transition ml-1"
        >
          <LogOut className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {/* Real Google Sign-in button with locked Thai language */}
      <div
        ref={googleBtnRef}
        className="min-h-[36px] flex items-center justify-center overflow-hidden"
      ></div>
    </div>
  );
}
