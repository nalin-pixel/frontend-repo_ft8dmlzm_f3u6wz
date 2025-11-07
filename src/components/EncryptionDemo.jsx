import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';

export default function EncryptionDemo({ open, onClose, sampleText = 'Hi' }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-[min(92vw,720px)] rounded-2xl border border-white/10 bg-slate-950 p-6 text-white relative"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 text-sky-400">
              <Shield className="w-5 h-5" />
              <span className="text-sm tracking-wide uppercase">Message Encryption</span>
            </div>
            <h3 className="mt-2 text-xl font-semibold">Your message '{sampleText}' is encrypted using AES and sent securely over Bluetooth.</h3>

            <div className="mt-6 relative h-48 rounded-xl border border-white/10 bg-gradient-to-r from-sky-900/30 to-emerald-900/30 overflow-hidden">
              <svg viewBox="0 0 800 220" className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#34d399" />
                  </linearGradient>
                </defs>
                <g fill="none" stroke="url(#g)" strokeWidth="3">
                  <motion.path
                    d="M80 110 C 220 40, 420 40, 720 110"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.8 }}
                  />
                </g>
                <g>
                  <circle cx="80" cy="110" r="18" fill="#38bdf8" />
                  <circle cx="720" cy="110" r="18" fill="#10b981" />
                  <g transform="translate(388,96)">
                    <rect width="28" height="28" rx="8" fill="#0f172a" stroke="#94a3b8" />
                    <Lock className="w-4 h-4" color="#94a3b8" />
                  </g>
                </g>
              </svg>
              <div className="absolute inset-0 p-4 text-xs text-slate-300 flex items-end justify-between">
                <span>Laptop‑A</span>
                <span>AES‑256</span>
                <span>Laptop‑B</span>
              </div>
            </div>

            <div className="mt-6 text-right">
              <button onClick={onClose} className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-sm">Close</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
