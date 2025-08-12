'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';

const pricingData = [
  {
    icon: '/landing-icon.png',
    title: 'Strona wizytówka / Landing Page',
    priceLabel: 'od 1 500 zł',
    priceValue: '1500',
    description:
      'Prosta, estetyczna i responsywna strona prezentująca Twoją ofertę — idealna na start.',
    features: [
      'Układ one-page lub krótka strona główna',
      'Formularz kontaktowy',
      'Podstawowa optymalizacja SEO',
    ],
  },
  {
    icon: '/firma-icon.png',
    title: 'Rozbudowana strona firmowa',
    priceLabel: 'od 3 000 zł',
    priceValue: '3000',
    description:
      'Wielosekcyjna strona z kilkoma podstronami, dopasowana do Twojej marki i branży.',
    features: [
      '2–6 podstron (np. O nas, Oferta, Kontakt)',
      'Indywidualny projekt graficzny',
      'Optymalizacja wydajności i SEO',
    ],
  },
];

export default function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ESC + blokowanie scrolla jak modal otwarty
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsModalOpen(false);
    if (isModalOpen) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative w-full bg-[#007aff] text-white py-20 sm:py-24 px-6 sm:px-10"
    >
      <div className="mx-auto max-w-[1220px] xl:max-w-[1320px] 2xl:max-w-[1440px]">
        {/* Nagłówek */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 id="pricing-heading" className="text-4xl sm:text-5xl mb-4 font-light font-serif">
            Ile kosztuje strona?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Każdy projekt wyceniam indywidualnie — poniższe kwoty są orientacyjne i pomagają oszacować budżet.
          </p>
        </div>

        {/* Kafelki + obraz */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Kafelki po lewej */}
          <div className="flex flex-col gap-8">
            {pricingData.map((item, i) => (
              <motion.article
                key={item.title}
                itemScope
                itemType="https://schema.org/Service"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.12 }}
                className="border border-white/20 bg-white/5 rounded-3xl p-8 shadow-sm hover:bg-white/10 hover:border-white/30 transition"
              >
                <meta itemProp="serviceType" content={item.title} />
                <div className="mb-5 flex items-center gap-4">
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <Image src={item.icon} alt="" width={36} height={36} aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-medium font-serif" itemProp="name">
                    {item.title}
                  </h3>
                </div>

                <p className="mb-4 opacity-90 text-sm leading-relaxed" itemProp="description">
                  {item.description}
                </p>

                <ul className="space-y-2 mb-5 text-sm" aria-label="Co zawiera pakiet">
                  {item.features.map((feature, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span aria-hidden="true">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className="text-base flex items-center gap-2 font-semibold"
                  itemProp="offers"
                  itemScope
                  itemType="https://schema.org/Offer"
                >
                  <Image src="/price-tag.png" alt="" width={20} height={20} aria-hidden="true" />
                  <span aria-label={`Cena ${item.priceLabel}`}>{item.priceLabel}</span>
                  <meta itemProp="priceCurrency" content="PLN" />
                  <meta itemProp="price" content={item.priceValue} />
                </div>
              </motion.article>
            ))}
          </div>

          {/* Obraz po prawej */}
          <div className="flex justify-center md:justify-end md:items-end">
            <div
              className="
                relative w-full md:w-[92%] lg:w-[95%]
                h-[40vh] sm:h-[48vh] md:h-[56vh] lg:h-[60vh] xl:h-[64vh] 2xl:h-[68vh]
                max-h-[760px]
                md:translate-y-3 lg:translate-y-5 xl:translate-y-7
                transition-transform
              "
            >
              <Image
                src="/pricing-illustration.png"
                alt="Przykładowe elementy projektu strony — layout, typografia, sekcje"
                fill
                className="object-contain rounded-3xl"
                priority
                sizes="(min-width:1280px) 50vw, (min-width:768px) 50vw, 100vw"
              />
            </div>
          </div>
        </div>

        {/* CTA – spójny outline + strzałka */}
        <div className="text-center pt-12">
          <button
            onClick={() => setIsModalOpen(true)}
            aria-haspopup="dialog"
            aria-controls="pricing-modal"
            className="group inline-flex items-center gap-2 rounded-full
                       bg-transparent text-white border border-white/70
                       px-7 py-3 text-base sm:text-lg font-light
                       hover:bg-white/10 active:scale-[0.99]
                       transition focus:outline-none
                       focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#cfe3ff]"
          >
            Zapytaj o indywidualną wycenę
            <FiArrowRight className="opacity-90 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Modal (minimalistyczny, spójny) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setIsModalOpen(false);
            }}
          >
            <motion.div
              id="pricing-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="pricing-modal-title"
              initial={{ y: 60, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 60, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="bg-white text-gray-900 rounded-3xl w-full max-w-2xl border border-slate-200 shadow-lg"
              onMouseDown={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start gap-3 px-6 pt-5 pb-3 border-b border-slate-200">
                <div className="flex-1">
                  <h3 id="pricing-modal-title" className="text-xl sm:text-2xl font-serif font-light leading-snug">
                    Krótkie zapytanie ofertowe
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Daj znać, czego potrzebujesz — wrócę z wstępną wyceną i realnym terminem.
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-full p-2 hover:bg-slate-100 text-slate-700"
                  aria-label="Zamknij formularz"
                >
                  <FiX className="text-2xl" />
                </button>
              </div>

              {/* Formularz */}
              <div className="px-6 pb-6 pt-4">
                <form
                  action="https://formsubmit.co/kontakt@anastasiiakupriianets.pl"
                  method="POST"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_subject" value="Nowe zapytanie o wycenę" />
                  <input type="hidden" name="_template" value="table" />

                  <div className="col-span-1">
                    <label className="block mb-1 text-xs text-slate-600">Imię i nazwisko</label>
                    <input
                      type="text"
                      name="Imię i nazwisko"
                      required
                      autoComplete="name"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none
                                 focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block mb-1 text-xs text-slate-600">Email</label>
                    <input
                      type="email"
                      name="Email"
                      required
                      autoComplete="email"
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none
                                 focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block mb-1 text-xs text-slate-600">Rodzaj strony</label>
                    <select
                      name="Rodzaj strony"
                      required
                      defaultValue=""
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none
                                 focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                    >
                      <option value="" disabled>Wybierz...</option>
                      <option value="Strona wizytówka / Landing Page">Strona wizytówka / Landing Page</option>
                      <option value="Rozbudowana strona firmowa">Rozbudowana strona firmowa</option>
                    </select>
                  </div>

                  <div className="col-span-1">
                    <label className="block mb-1 text-xs text-slate-600">Budżet</label>
                    <select
                      name="Budżet"
                      required
                      defaultValue=""
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none
                                 focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                    >
                      <option value="" disabled>Wybierz...</option>
                      <option value="1500–3000 zł">1500–3000 zł</option>
                      <option value="3000–5000 zł">3000–5000 zł</option>
                      <option value="5000+ zł">5000+ zł</option>
                    </select>
                  </div>

                  <div className="col-span-1 sm:col-span-2">
                    <label className="block mb-1 text-xs text-slate-600">Opis projektu</label>
                    <textarea
                      name="Opis projektu"
                      rows={4}
                      required
                      className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none
                                 focus:border-[#007aff] focus:ring-2 focus:ring-[#007aff]/30"
                    />
                  </div>

                  <div className="col-span-1 sm:col-span-2 mt-2 flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      className="group inline-flex items-center gap-2 rounded-full
                                 px-5 py-2.5 text-sm font-light text-white transition active:scale-[0.99]"
                      style={{ backgroundColor: '#007aff' }}
                    >
                      Wyślij brief
                      <FiArrowRight className="opacity-90 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
