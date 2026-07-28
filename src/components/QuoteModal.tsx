'use client';

import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useLocale } from 'next-intl';
import { sendEmail } from '@/lib/sendEmail';
import { trackEvent } from '@/lib/gtag';

type QuoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  borderRadius: 12,
  border: '1px solid var(--line)',
  background: '#fff',
  padding: '10px 14px',
  fontSize: '.9rem',
  fontFamily: 'var(--fb)',
  color: 'var(--ink)',
  outline: 'none',
  transition: 'border-color .2s, box-shadow .2s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 6,
  fontSize: '.78rem',
  fontFamily: 'var(--fd)',
  fontWeight: 600,
  color: 'var(--muted)',
  letterSpacing: '.02em',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <label style={labelStyle}>{label}</label>
      {children}
    </div>
  );
}

export default function QuoteModal({ isOpen, onClose }: QuoteModalProps) {
  const locale = useLocale();
  const isEn = locale === 'en';
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({
    name: '',
    email: '',
    websiteType: '',
    budget: '',
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
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'var(--brand)';
    e.currentTarget.style.boxShadow = '0 0 0 3px var(--brand-tint)';
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = 'var(--line)';
    e.currentTarget.style.boxShadow = 'none';
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
      message: form.message,
      locale,
    });

    if (result.ok) {
      trackEvent('form_submit', { form_name: 'quote_modal', site_type: form.websiteType || 'unspecified' });
      setStatus('success');
      setForm({ name: '', email: '', websiteType: '', budget: '', message: '' });
      setTimeout(() => {
        window.location.href = isEn ? '/en/thank-you' : '/pl/thank-you';
      }, 500);
    } else {
      setStatus('error');
    }
  };

  const budgetOptions = isEn ? [
    { value: '', label: 'Choose...' },
    { value: 'under-500', label: 'Under €500' },
    { value: '500-1000', label: '€500 – €1,000' },
    { value: '1000-2000', label: '€1,000 – €2,000' },
    { value: '2000-5000', label: '€2,000 – €5,000' },
    { value: 'over-5000', label: 'Over €5,000' },
    { value: 'unknown', label: "I'm not sure yet" },
  ] : [
    { value: '', label: 'Wybierz...' },
    { value: 'under-2000', label: 'Do 2 000 zł' },
    { value: '2000-4000', label: '2 000 – 4 000 zł' },
    { value: '4000-8000', label: '4 000 – 8 000 zł' },
    { value: '8000-15000', label: '8 000 – 15 000 zł' },
    { value: 'over-15000', label: 'Powyżej 15 000 zł' },
    { value: 'unknown', label: 'Nie wiem jeszcze' },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(11,18,32,.55)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      padding: 'clamp(12px,3vw,24px)',
    }}>
      <div style={{ position: 'absolute', inset: 0 }} onClick={onClose} aria-hidden="true" />

      <div style={{
        position: 'relative', zIndex: 10,
        width: '100%', maxWidth: 520,
        maxHeight: '88dvh', overflowY: 'auto',
        borderRadius: 'var(--r-xl)',
        background: '#fff',
        boxShadow: 'var(--sh-l)',
      }}>
        {/* Header */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 10,
          background: '#fff',
          borderRadius: 'var(--r-xl) var(--r-xl) 0 0',
          padding: 'clamp(18px,3vw,24px) clamp(18px,3vw,24px) 12px',
          borderBottom: '1px solid var(--line)',
        }}>
          <button
            type="button"
            onClick={onClose}
            aria-label={isEn ? 'Close' : 'Zamknij'}
            style={{
              position: 'absolute', top: 16, right: 16,
              width: 32, height: 32, borderRadius: '50%',
              background: 'var(--surface)', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--ink)', transition: 'background .2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--brand-tint)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface)')}
          >
            <FiX size={16} />
          </button>

          <span style={{
            display: 'inline-flex', alignItems: 'center',
            fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.72rem',
            letterSpacing: '.14em', textTransform: 'uppercase',
            color: 'var(--brand)', background: 'var(--brand-tint)',
            border: '1px solid var(--brand-tint-2)',
            borderRadius: 99, padding: '.3em .9em', marginBottom: 10,
          }}>
            {isEn ? 'Free quote' : 'Bezpłatna wycena'}
          </span>

          <h2 style={{
            fontFamily: 'var(--fd)', fontWeight: 700,
            fontSize: 'clamp(1rem,2.5vw,1.2rem)',
            letterSpacing: '-.02em', color: 'var(--ink)',
            paddingRight: 36, margin: 0,
          }}>
            {isEn ? 'Tell me about your project' : 'Opowiedz mi o swoim projekcie'}
          </h2>
        </div>

        {/* Form */}
        <div style={{ padding: 'clamp(16px,3vw,24px)' }}>
          {status === 'error' && (
            <div style={{
              marginBottom: 16, borderRadius: 12,
              border: '1px solid #fecaca', background: '#fef2f2',
              padding: '10px 14px', fontSize: '.85rem',
              fontFamily: 'var(--fb)', color: '#b91c1c',
            }}>
              {isEn ? 'Oops… something went wrong. Please try again.' : 'Ups… nie udało się wysłać. Spróbuj ponownie.'}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>

            {/* Name + Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Field label={isEn ? 'Name' : 'Imię i nazwisko'}>
                <input
                  type="text" name="name" required
                  value={form.name} onChange={handleChange}
                  onFocus={handleFocus} onBlur={handleBlur}
                  placeholder={isEn ? 'Your name' : 'Twoje imię'}
                  style={inputStyle}
                />
              </Field>
              <Field label="E-mail">
                <input
                  type="email" name="email" required
                  value={form.email} onChange={handleChange}
                  onFocus={handleFocus} onBlur={handleBlur}
                  placeholder="twoj@email.com"
                  style={inputStyle}
                />
              </Field>
            </div>

            {/* Website type */}
            <Field label={isEn ? 'Type of website' : 'Typ strony'}>
              <select
                name="websiteType"
                value={form.websiteType} onChange={handleChange}
                onFocus={handleFocus} onBlur={handleBlur}
                style={inputStyle}
              >
                <option value="">{isEn ? 'Choose...' : 'Wybierz...'}</option>
                <option value="Landing page">Landing page</option>
                <option value="Strona firmowa">{isEn ? 'Company website' : 'Strona firmowa'}</option>
                <option value="Portfolio">Portfolio</option>
                <option value="Sklep internetowy">{isEn ? 'Online store' : 'Sklep internetowy'}</option>
                <option value="Nie wiem jeszcze">{isEn ? 'Not sure yet' : 'Nie wiem jeszcze'}</option>
              </select>
            </Field>

            {/* Budget */}
            <Field label={isEn ? 'Approximate budget' : 'Orientacyjny budżet'}>
              <select
                name="budget"
                value={form.budget} onChange={handleChange}
                onFocus={handleFocus} onBlur={handleBlur}
                style={inputStyle}
              >
                {budgetOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>

            {/* Message */}
            <Field label={isEn ? 'Project description' : 'Opis projektu'}>
              <textarea
                name="message" required rows={3}
                value={form.message} onChange={handleChange}
                onFocus={handleFocus} onBlur={handleBlur}
                placeholder={isEn ? 'Briefly describe what you need.' : 'Napisz krótko, czego potrzebujesz.'}
                style={{ ...inputStyle, resize: 'none', lineHeight: 1.55 }}
              />
            </Field>

            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                width: '100%', minHeight: 48,
                borderRadius: 99, border: 'none', cursor: 'pointer',
                background: 'var(--brand)', color: '#fff',
                fontFamily: 'var(--fd)', fontWeight: 600, fontSize: '.95rem',
                transition: 'transform .2s, box-shadow .2s, opacity .2s',
                opacity: status === 'sending' ? .6 : 1,
              }}
              onMouseEnter={e => {
                if (status !== 'sending') {
                  (e.currentTarget).style.transform = 'translateY(-2px)';
                  (e.currentTarget).style.boxShadow = '0 14px 30px rgba(29,78,216,.38)';
                }
              }}
              onMouseLeave={e => {
                (e.currentTarget).style.transform = '';
                (e.currentTarget).style.boxShadow = '';
              }}
            >
              {status === 'sending'
                ? isEn ? 'Sending…' : 'Wysyłanie…'
                : isEn ? 'Send request →' : 'Wyślij zapytanie →'}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}