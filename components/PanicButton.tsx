'use client';

import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function PanicButton() {
  const router = useRouter();
  const [pressed, setPressed] = useState(false);

  const handlePress = () => {
    if (!pressed) {
      setPressed(true);
      // Navigate to emergency page
      router.push('/emergency');
    }
  };

  return (
    <button
      onClick={handlePress}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      className="fixed bottom-8 right-8 w-20 h-20 rounded-full bg-gradient-to-br from-red-600 to-red-700 shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-110 active:scale-95 flex items-center justify-center z-50 border-4 border-white"
      aria-label="Emergency Panic Button"
    >
      <AlertTriangle className="w-10 h-10 text-white" />
    </button>
  );
}


