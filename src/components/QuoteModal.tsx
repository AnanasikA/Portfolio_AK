'use client';

import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

type QuoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
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
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0b1220]/55 px-4 backdrop-blur-sm">
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-2xl rounded-[28px] bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.2)] sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f3f7ff] text-[#1e293b] transition hover:bg-[#e8f0ff]"
          aria-label="Zamknij formularz"
        >
          <FiX />
        </button>

        <div className="max-w-xl">
          <p className="mb-3 inline-flex rounded-full bg-[#eef5ff] px-3 py-1 text-xs font-medium text-[#007aff]">
            Bezpłatna wycena
          </p>

          <h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#0f172a] sm:text-3xl">
            Opowiedz krótko o swoim projekcie
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
            Wypełnij krótki formularz, a wrócę do Ciebie z informacją o możliwym
            zakresie, terminie i wstępnej wycenie.
          </p>
        </div>

        <form
          action="https://formsubmit.co/kontakt@anastasiiakupriianets.pl"
          method="POST"
          className="mt-8 grid gap-4"
        >
          <input type="hidden" name="_subject" value="Nowe zapytanie o wycenę ze strony portfolio" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Imię
              </label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/10"
                placeholder="Twoje imię"
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
                Typ strony
              </label>
              <select
                name="websiteType"
                value={form.websiteType}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/10"
              >
                <option value="">Wybierz</option>
                <option value="Landing page">Landing page</option>
                <option value="Strona firmowa">Strona firmowa</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Sklep / rozbudowana strona">Sklep / rozbudowana strona</option>
                <option value="Nie wiem jeszcze">Nie wiem jeszcze</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">
                Budżet
              </label>
              <input
                type="text"
                name="budget"
                value={form.budget}
                onChange={handleChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/10"
                placeholder="np. 3000–5000 zł"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Termin
            </label>
            <input
              type="text"
              name="timeline"
              value={form.timeline}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/10"
              placeholder="np. w ciągu 2–3 tygodni"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-800">
              Opis projektu
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#007aff] focus:ring-4 focus:ring-[#007aff]/10"
              placeholder="Napisz krótko, czego potrzebujesz, jaki ma być cel strony i co jest dla Ciebie ważne."
            />
          </div>

          <button
            type="submit"
            className="mt-2 inline-flex min-h-[54px] items-center justify-center rounded-full bg-[#007aff] px-6 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#006ae0]"
          >
            Wyślij zapytanie
          </button>
        </form>
      </div>
    </div>
  );
}