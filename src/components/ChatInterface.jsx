import { useEffect, useRef, useState } from 'react';
import { Lock, Send, WifiOff, Bluetooth, CheckCheck, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Bubble({ text, mine }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10 }}
      className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm shadow-sm ${
        mine
          ? 'bg-emerald-600/30 text-emerald-100 border border-emerald-500/30 ml-auto'
          : 'bg-slate-800/80 text-slate-100 border border-white/10'
      }`}
    >
      {text}
      <div className="mt-1 text-[10px] opacity-60 flex items-center gap-1">
        <CheckCheck className="w-3 h-3" /> via Bluetooth
      </div>
    </motion.div>
  );
}

export default function ChatInterface({ deviceName = 'Laptop-B', onOpenEncryption, isOnline, onSync }) {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Bluetooth link established.', mine: false },
    { id: 2, text: 'Hi! This is an offline encrypted chat.', mine: true },
  ]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async () => {
    if (!input.trim()) return;
    setSending(true);
    const newMsg = { id: Date.now(), text: input.trim(), mine: true };
    setMessages((m) => [...m, newMsg]);
    setInput('');
    // Simulate peer echo after a short delay
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, text: 'Echo: ' + newMsg.text, mine: false },
      ]);
      setSending(false);
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-[#0B0F14] text-white flex">
      <aside className="hidden md:flex w-[320px] border-r border-white/10 flex-col bg-slate-950/60">
        <div className="p-4 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-emerald-500" />
          <div>
            <p className="font-medium">{deviceName}</p>
            <p className="text-xs text-slate-400 inline-flex items-center gap-1">
              <Bluetooth className="w-3 h-3 text-sky-400" /> Offline via Bluetooth
            </p>
          </div>
        </div>

        <div className="p-4 text-xs text-slate-400 space-y-3">
          <p className="inline-flex items-center gap-2"><Lock className="w-3 h-3" /> End‑to‑end encrypted</p>
          <p className="inline-flex items-center gap-2"><WifiOff className="w-3 h-3" /> Wi‑Fi off: messages route over BT</p>
          <button
            onClick={onOpenEncryption}
            className="mt-2 w-full text-left rounded-lg border border-white/10 px-3 py-2 hover:bg-white/5"
          >
            View encryption demo
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-14 border-b border-white/10 px-4 flex items-center justify-between bg-slate-950/60">
          <div className="text-sm text-slate-300">
            <span className="font-medium text-white">Whisper Voice</span> • Encrypted Offline Chat
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-300">
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline">Encrypted Offline Chat</span>
          </div>
        </header>

        <div ref={listRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3 bg-[radial-gradient(1200px_500px_at_10%_-10%,rgba(56,189,248,0.1),transparent),radial-gradient(900px_500px_at_110%_110%,rgba(16,185,129,0.08),transparent)]">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <Bubble key={m.id} text={m.text} mine={m.mine} />
            ))}
          </AnimatePresence>
        </div>

        <div className="border-t border-white/10 p-3 bg-slate-950/60">
          <div className="max-w-3xl mx-auto flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Type a message…"
              className="flex-1 rounded-xl bg-slate-900 border border-white/10 px-4 py-3 text-sm placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            />
            <button
              onClick={send}
              disabled={sending}
              className="inline-flex items-center gap-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/30 px-4 py-3 text-sm disabled:opacity-50"
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />} Send
            </button>
          </div>
          <div className="max-w-3xl mx-auto pt-2 text-xs text-slate-400">
            {isOnline ? 'Online detected. You can sync your chat.' : 'Messages delivered via Bluetooth'}
          </div>
        </div>
      </main>
    </div>
  );
}
