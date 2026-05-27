'use client';

import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useLocale } from 'next-intl';
import { sendEmail } from '@/lib/sendEmail';

type QuoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const locale = useLocale();
  const isEn = locale === 'en';
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    websiteType: '',
    message: '',
  });

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    const result = await sendEmail({
      name: form.name,
      email: form.email,
      site_type: form.websiteType,
      budget: '',
      message: form.message,
      locale,
    });

    if (result.ok) {
      setStatus('success');
      setForm({ name: '', email: '', websiteType: '', message: '' });
      setTimeout(() => {
        window.location.href = isEn ? '/en/thank-you' : '/pl/thank-you';
      }, 500);
    } else {
      setStatus('error');
    }
  };

  const inp = 'w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/10';
  const lbl = 'mb-1 block text-xs font-medium text-slate-700';

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0b1220]/55 backdrop-blur-sm p-4">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div
        className="relative z-10 w-full max-w-lg rounded-[20px] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.2)]"
        style={{ maxHeight: '88dvh', overflowY: 'auto', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 rounded-t-[20px] bg-white px-5 pb-2 pt-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f7ff] text-[#1e293b] transition hover:bg-[#e8f0ff]"
            aria-label={isEn ? 'Close' : 'Zamknij'}
          >
            <FiX className="h-4 w-4" />
          </button>
          <span className="mb-1.5 inline-flex rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-medium text-[#007aff]">
            {isEn ? 'Free quote' : 'Bezpłatna wycena'}
          </span>
          <h2 className="pr-8 text-base font-semibold tracking-[-0.02em] text-[#0f172a] sm:text-lg">
            {isEn ? 'Tell me about your project' : 'Opowiedz mi o swoim projekcie'}
          </h2>
        </div>

        {/* Form */}
        <div className="px-5 pb-5 pt-2 sm:px-6 sm:pb-6">
          {status === 'error' && (
            <div className="mb-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {isEn ? 'Oops… something went wrong. Please try again.' : 'Ups… nie udało się wysłać. Spróbuj ponownie.'}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-2.5">
            <div className="grid gap-2.5 sm:grid-cols-2">
              <div>
                <label className={lbl}>{isEn ? 'Name' : 'Imię i nazwisko'}</label>
                <input type="text" name="name" required value={form.name} onChange={handleChange}
                  placeholder={isEn ? 'Your name' : 'Twoje imię'} className={inp} />
              </div>
              <div>
                <label className={lbl}>E-mail</label>
                <input type="email" name="email" required value={form.email} onChange={handleChange}
                  placeholder="twoj@email.com" className={inp} />
              </div>
            </div>

            <div>
              <label className={lbl}>{isEn ? 'Type of website' : 'Typ strony'}</label>
              <select name="websiteType" value={form.websiteType} onChange={handleChange} className={inp}>
                <option value="">{isEn ? 'Choose...' : 'Wybierz...'}</option>
                <option value="Landing page">Landing page</option>
                <option value="Strona firmowa">{isEn ? 'Company website' : 'Strona firmowa'}</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Sklep internetowy">{isEn ? 'Online store' : 'Sklep internetowy'}</option>
                <option value="Nie wiem jeszcze">{isEn ? 'Not sure yet' : 'Nie wiem jeszcze'}</option>
              </select>
            </div>

            <div>
              <label className={lbl}>{isEn ? 'Project description' : 'Opis projektu'}</label>
              <textarea name="message" required rows={3} value={form.message} onChange={handleChange}
                placeholder={isEn ? 'Briefly describe what you need.' : 'Napisz krótko, czego potrzebujesz.'}
                className={`${inp} resize-none`} />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full min-h-[44px] rounded-full bg-[#007aff] px-6 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#006ae0] disabled:opacity-60"
            >
              {status === 'sending'
                ? isEn ? 'Sending...' : 'Wysyłanie...'
                : isEn ? 'Send request' : 'Wyślij zapytanie'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}