export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://anastasiiakupriianets.pl').replace(/\/$/, '');
export const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '');

export const locales = ['pl', 'en'] as const;

export function url(locale: string, path = '') {
  const p = path && !path.startsWith('/') ? `/${path}` : path;
  return `${SITE_URL}/${locale}${p === '/' ? '' : p}`;
}

export function alternates(locale: string, path = '', enPath?: string) {
  const plUrl = url('pl', path);
  const enUrl = url('en', enPath ?? path);
  return {
    canonical: locale === 'en' ? enUrl : plUrl,
    languages: { pl: plUrl, en: enUrl, 'x-default': plUrl },
  };
}
