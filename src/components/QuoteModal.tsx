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
    budget: '',
    timeline: '',
    message: '',
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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
      budget: form.budget,
      message: `${form.message}${form.timeline ? `\n\nTermin: ${form.timeline}` : ''}`,
      locale,
    });

    if (result.ok) {
      setStatus('success');
      setForm({ name: '', email: '', websiteType: '', budget: '', timeline: '', message: '' });
      setTimeout(() => {
        window.location.href = isEn ? '/en/thank-you' : '/pl/thank-you';
      }, 500);
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0b1220]/55 px-4 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.2)] sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f7ff] text-[#1e293b] transition hover:bg-[#e8f0ff]"
          aria-label={isEn ? 'Close form' : 'Zamknij formularz'}
        >
          <FiX />
        </button>

        <div className="max-w-xl">
          <p className="mb-3 inline-flex rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-medium text-[#007aff]">
            {isEn ? 'Free quote' : 'Bezpłatna wycena'}
          </p>

          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#0f172a] sm:text-3xl">
            {isEn ? 'Tell me about your project' : 'Opowiedz krótko o swoim projekcie'}
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            {isEn
              ? 'Fill in the form and I will get back to you with an initial scope, timeline and estimate.'
              : 'Wypełnij krótki formularz, a wrócę do Ciebie z informacją o możliwym zakresie, terminie i wstępnej wycenie.'}
          </p>
        </div>

        {status === 'error' && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {isEn
              ? 'Oops… something went wrong. Please try again in a moment.'
              : 'Ups… nie udało się wysłać. Spróbuj ponownie za chwilę.'}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                {isEn ? 'Name' : 'Imię'}
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/10"
                placeholder={isEn ? 'Your name' : 'Twoje imię'}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                E-mail
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/10"
                placeholder="twoj@email.com"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                {isEn ? 'Type of website' : 'Typ strony'}
              </label>
              <select
                name="websiteType"
                value={form.websiteType}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/10"
              >
                <option value="">{isEn ? 'Choose...' : 'Wybierz'}</option>
                <option value="Landing page">Landing page</option>
                <option value="Strona firmowa">{isEn ? 'Company website' : 'Strona firmowa'}</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Sklep / rozbudowana strona">{isEn ? 'Store / advanced site' : 'Sklep / rozbudowana strona'}</option>
                <option value="Nie wiem jeszcze">{isEn ? "Not sure yet" : 'Nie wiem jeszcze'}</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                {isEn ? 'Budget' : 'Budżet'}
              </label>
              <input
                type="text"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/10"
                placeholder={isEn ? 'e.g. €700–1200' : 'np. 3000–5000 zł'}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              {isEn ? 'Timeline' : 'Termin'}
            </label>
            <input
              type="text"
              name="timeline"
              value={form.timeline}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/10"
              placeholder={isEn ? 'e.g. within 2–3 weeks' : 'np. w ciągu 2–3 tygodni'}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              {isEn ? 'Project description' : 'Opis projektu'}
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/10"
              placeholder={
                isEn
                  ? 'Briefly describe what you need, the goal of the site and what matters most to you.'
                  : 'Napisz krótko, czego potrzebujesz, jaki ma być cel strony i co jest dla Ciebie ważne.'
              }
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="mt-2 inline-flex min-h-[54px] items-center justify-center rounded-full bg-[#007aff] px-6 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#006ae0] disabled:opacity-60"
          >
            {status === 'sending'
              ? isEn ? 'Sending...' : 'Wysyłanie...'
              : isEn ? 'Send request' : 'Wyślij zapytanie'}
          </button>
        </form>
      </div>
    </div>
  );
}