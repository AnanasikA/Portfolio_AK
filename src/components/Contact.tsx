'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>('idle');

  const sendForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current || status === 'sending') return;
    setStatus('sending');

    try {
      const formData = new FormData(formRef.current);

      // honeypot
      if ((formData.get('_honey') as string)?.trim()) {
        setStatus('success');
        formRef.current.reset();
        return;
      }

      const res = await fetch('https://formsubmit.co/ajax/kontakt@anastasiiakupriianets.pl', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: formData,
      });

      if (res.ok) {
        setStatus('success');
        formRef.current.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#f3f7ff] text-gray-900 py-24 px-6 sm:px-10 overflow-hidden"
    >
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#007aff]/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Tekst po lewej */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-4xl sm:text-5xl font-light font-serif">
            Masz pomysł na stronę?
          </h2>
          <p className="text-lg opacity-80 leading-relaxed">
            Wypełnij krótki formularz – odezwę się, by porozmawiać o Twoim projekcie i
            zaproponować najlepsze rozwiązanie. Tworzę strony, które nie tylko dobrze
            wyglądają, ale i działają.
          </p>
        </motion.div>

        {/* Prawy panel: formularz lub ekran potwierdzenia */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white border border-[#e0e7ff] shadow-lg rounded-3xl p-8"
        >
          {status === 'success' ? (
            // --- Ekran "Dziękuję" ---
            <div
              role="status"
              aria-live="polite"
              className="text-center px-2 py-6"
            >
              <h3 className="text-2xl font-semibold mb-2">Dziękuję za wiadomość</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                Formularz został wysłany poprawnie. Odpowiem najczęściej w ciągu 24 godzin
                w dni robocze.
              </p>

              <div className="mt-8 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="px-5 py-3 rounded-full border border-gray-300 text-gray-800 hover:bg-gray-50 transition"
                >
                  Wyślij kolejną wiadomość
                </button>
                <a
                  href="mailto:kontakt@anastasiiakupriianets.pl"
                  className="px-5 py-3 rounded-full bg-[#007aff] text-white hover:bg-[#0062cc] transition"
                >
                  Napisz maila
                </a>
              </div>
            </div>
          ) : (
            // --- Formularz ---
            <form ref={formRef} onSubmit={sendForm} className="space-y-5">
              {/* ukryte pola FormSubmit */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Nowa wiadomość z portfolio" />
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

              {status === 'error' && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  Nie udało się wysłać formularza. Spróbuj ponownie lub napisz na{' '}
                  <a className="underline" href="mailto:kontakt@anastasiiakupriianets.pl">
                    kontakt@anastasiiakupriianets.pl
                  </a>.
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Imię i nazwisko
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007aff] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007aff] focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Wiadomość
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#007aff] focus:outline-none"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full font-light transition
                    ${status === 'sending'
                      ? 'bg-[#7fb6ff] cursor-not-allowed text-white'
                      : 'bg-[#007aff] hover:bg-[#0062cc] text-white'}
                  `}
                >
                  <FiSend className="text-xl" />
                  {status === 'sending' ? 'Wysyłanie…' : 'Wyślij wiadomość'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#007aff]/5 rounded-tl-[80px] blur-2xl" />
    </section>
  );
}
