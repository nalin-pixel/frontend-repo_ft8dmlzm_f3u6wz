import { useState } from 'react';
import { Bluetooth, Laptop, Shield, WifiOff, ArrowRight } from 'lucide-react';

export default function ConnectionScreen({ onConnect, onGuestContinue, bluetoothConnected, connectedDevice }) {
  const [showDevices, setShowDevices] = useState(false);
  const devices = ['Laptop-A', 'Laptop-B', 'Studio-Mac', 'ZenBook-14'];

  return (
    <div className="min-h-screen w-full bg-[#0B0F14] text-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-black border border-white/10">
          <div className="absolute inset-0 opacity-40 pointer-events-none" style={{
            background: 'radial-gradient(1200px 400px at 20% 0%, rgba(59,130,246,0.15), transparent 60%), radial-gradient(800px 300px at 100% 100%, rgba(16,185,129,0.15), transparent 60%)'
          }} />
          <div className="relative p-8 md:p-12">
            <div className="flex items-center gap-3 text-sky-400">
              <Shield className="w-5 h-5" />
              <span className="text-sm tracking-wide uppercase">Secure Prototype</span>
            </div>
            <h1 className="mt-4 text-3xl md:text-4xl font-semibold">Offline Chat Prototype</h1>
            <p className="mt-2 text-slate-300">Connect via Bluetooth to start secure chat</p>

            <div className="mt-8 grid gap-3">
              <div className="relative">
                <button
                  className="w-full inline-flex items-center justify-between gap-3 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 border border-sky-500/30 px-4 py-3 transition-colors"
                  onClick={() => setShowDevices((v) => !v)}
                >
                  <span className="inline-flex items-center gap-2"><Bluetooth className="w-5 h-5 text-sky-400" /> Pair Device</span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </button>
                {showDevices && (
                  <div className="absolute z-20 mt-2 w-full rounded-xl border border-white/10 bg-slate-900/90 backdrop-blur p-2 shadow-xl">
                    {devices.map((d) => (
                      <button
                        key={d}
                        onClick={() => { setShowDevices(false); onConnect(d); }}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/5"
                      >
                        <Laptop className="w-4 h-4 text-slate-300" />
                        <span className="text-sm">{d}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                className="w-full rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 transition-colors"
                onClick={onGuestContinue}
              >
                Continue as Guest
              </button>
            </div>

            <div className="mt-6 text-sm text-slate-400 flex items-center gap-2">
              {bluetoothConnected ? (
                <>
                  <span className="text-sky-400">🔵</span> Connected to {connectedDevice}
                </>
              ) : (
                <>
                  <span className="opacity-80">⚪</span> Not Connected
                </>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-slate-900 to-black p-8 md:p-12">
          <div className="flex items-center gap-3 text-slate-300">
            <Laptop className="w-5 h-5" />
            <span>Two laptops communicate peer-to-peer via Bluetooth.</span>
          </div>
          <div className="mt-6 grid gap-4 text-slate-300">
            <Feature title="Offline messaging" desc="Send and receive texts with Wi‑Fi turned off." icon={<WifiOff className="w-4 h-4" />} />
            <Feature title="End‑to‑end encryption" desc="Messages are secured before leaving your device." icon={<Shield className="w-4 h-4" />} />
            <Feature title="Seamless restore" desc="When internet returns, sync to WhatsApp Web." icon={<Bluetooth className="w-4 h-4" />} />
          </div>

          <div className="mt-8">
            <div className="relative h-48 rounded-xl border border-white/10 bg-gradient-to-r from-sky-900/30 to-emerald-900/30 overflow-hidden">
              <svg viewBox="0 0 600 200" className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
                <g fill="none" stroke="url(#grad)" strokeWidth="3">
                  <path d="M60 100 C 150 20, 300 20, 520 100" opacity="0.6" />
                  <path d="M60 110 C 150 40, 300 40, 520 110" opacity="0.3" />
                  <path d="M60 90 C 150 0, 300 0, 520 90" opacity="0.3" />
                </g>
                <g>
                  <circle cx="60" cy="100" r="18" fill="#0ea5e9" />
                  <circle cx="520" cy="100" r="18" fill="#10b981" />
                  <g transform="translate(288,86)">
                    <rect width="24" height="24" rx="6" fill="#0f172a" stroke="#38bdf8" />
                    <path d="M6 12h12" stroke="#38bdf8" strokeWidth="2" />
                    <path d="M12 6v12" stroke="#38bdf8" strokeWidth="2" />
                  </g>
                </g>
              </svg>
              <div className="absolute inset-0 flex items-end justify-between p-4 text-xs text-slate-300">
                <span className="inline-flex items-center gap-2"><Laptop className="w-3 h-3" /> You</span>
                <span className="inline-flex items-center gap-2"><Laptop className="w-3 h-3" /> Peer</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({ title, desc, icon }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-sky-400">{icon}</div>
      <div>
        <p className="font-medium text-white">{title}</p>
        <p className="text-sm text-slate-400">{desc}</p>
      </div>
    </div>
  );
}
