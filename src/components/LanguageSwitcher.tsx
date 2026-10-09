import type { MouseEvent } from 'react';
import type { Locale } from '../i18n/translations';

type Props = { locale: Locale; label: string };

export default function LanguageSwitcher({ locale, label }: Props) {
  function preserveSection(event: MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.hash = window.location.hash;
  }

  return (
    <nav aria-label={label} className="flex gap-1 text-sm">
      {(['es', 'en'] as const).map((language) => (
        <a
          key={language}
          href={`/${language}/`}
          hrefLang={language}
          lang={language}
          aria-current={locale === language ? 'page' : undefined}
          onClick={preserveSection}
          className={`rounded-full px-4 py-3 transition-colors ${
            locale === language ? 'bg-ink text-paper' : 'text-muted hover:bg-line hover:text-ink'
          }`}
        >
          {language === 'es' ? 'Español' : 'English'}
        </a>
      ))}
    </nav>
  );
}
