import { useState, useEffect } from 'react';
import ConnectionScreen from './components/ConnectionScreen';
import ChatInterface from './components/ChatInterface';
import EncryptionDemo from './components/EncryptionDemo';
import SyncScreen from './components/SyncScreen';

export default function App() {
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState('Laptop-B');
  const [showEncryption, setShowEncryption] = useState(false);
  const [online, setOnline] = useState(false);
  const [showSync, setShowSync] = useState(false);

  // Simulate online/offline toggle for demo only
  useEffect(() => {
    const handler = () => setOnline(navigator.onLine);
    window.addEventListener('online', handler);
    window.addEventListener('offline', handler);
    handler();
    return () => {
      window.removeEventListener('online', handler);
      window.removeEventListener('offline', handler);
    };
  }, []);

  useEffect(() => {
    if (connected && online) {
      const t = setTimeout(() => setShowSync(true), 800);
      return () => clearTimeout(t);
    } else {
      setShowSync(false);
    }
  }, [connected, online]);

  return (
    <div className="font-inter">
      {!connected ? (
        <ConnectionScreen
          onConnect={(d) => { setDevice(d); setConnected(true); }}
          onGuestContinue={() => setConnected(true)}
          bluetoothConnected={connected}
          connectedDevice={device}
        />
      ) : (
        <>
          <ChatInterface
            deviceName={device}
            onOpenEncryption={() => setShowEncryption(true)}
            isOnline={online}
          />
          <EncryptionDemo open={showEncryption} onClose={() => setShowEncryption(false)} sampleText="Hi" />
          <SyncScreen open={showSync} onOpenWhatsApp={() => window.open('https://web.whatsapp.com', '_blank')} />
        </>
      )}
    </div>
  );
}
