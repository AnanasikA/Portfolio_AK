'use client';

import { useEffect, useState } from 'react';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('cookie-accepted');
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-accepted', 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-blue-100/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 text-blue-900">
        <h2 className="text-lg font-semibold mb-3">Zgoda na pliki cookies</h2>

        <p className="text-sm leading-relaxed mb-4">
          Korzystając z tej strony, wyrażasz zgodę na używanie plików cookies do celów statystycznych i funkcjonalnych. Szczegóły znajdziesz w&nbsp;
          <a
            href="/polityka-prywatnosci"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline hover:text-blue-900"
          >
            polityce prywatności
          </a>{' '}
          i&nbsp;
          <a
            href="/regulamin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 underline hover:text-blue-900"
          >
            regulaminie
          </a>
          .
        </p>

        <div className="flex justify-end">
          <button
            onClick={handleAccept}
            className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-md text-sm font-medium transition"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}
