const BASE_URL = 'https://anastasiiakupriianets.pl';

export async function generateMetadata({
  params,
}: {
  params: Promise<{locale: string}>;
}): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'meta'});
  const isEn = locale === 'en';
  const canonical = isEn ? `${BASE_URL}/en` : BASE_URL;

  return {
    title: {
      default: t('title'),
      template: `%s | Anastasiia – Front-End Developer`
    },
    description: t('description'),
    alternates: {
      canonical,
      languages: {
        pl: BASE_URL,
        en: `${BASE_URL}/en`,
        'x-default': BASE_URL,
      }
    }
  };
}