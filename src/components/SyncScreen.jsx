import { motion, AnimatePresence } from 'framer-motion';
import { Check, Wifi, ExternalLink } from 'lucide-react';

export default function SyncScreen({ open, onOpenWhatsApp }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-[min(92vw,720px)] rounded-2xl border border-white/10 bg-slate-950 p-6 text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
          >
            <div className="flex items-center gap-2 text-emerald-400">
              <Wifi className="w-5 h-5" />
              <span className="text-sm tracking-wide uppercase">Syncing Messages…</span>
            </div>
            <p className="mt-2 text-slate-300">Internet detected. Syncing pending chats to WhatsApp Web…</p>

            <div className="mt-6 flex items-center gap-4">
              <motion.div
                className="w-10 h-10 rounded-full border-2 border-emerald-500/40 border-t-emerald-400"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-400/30 px-3 py-2"
              >
                <Check className="w-4 h-4 text-emerald-400" /> Synced
              </motion.div>
            </div>

            <div className="mt-6">
              <button onClick={onOpenWhatsApp} className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 text-sm">
                <img alt="WhatsApp" src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-4 h-4" />
                Open in WhatsApp Web
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
