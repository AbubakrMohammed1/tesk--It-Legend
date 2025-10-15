'use client';

import {useLocale} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import {useSearchParams} from 'next/navigation';

export default function LocaleToggle({className}: {className?: string}) {
  const locale = useLocale();
  const next = locale === 'ar' ? 'en' : 'ar';

  const pathname = usePathname();
  console.log(pathname)
  const searchParams = useSearchParams();
  const query = Object.fromEntries(searchParams.entries());
  return (
    <Link
      href={{pathname, query}}
      locale={next}
      replace
      prefetch={false}
      className={className || 'px-3 py-1 rounded bg-black/40 border border-white/10'}
    >
      {next.toUpperCase()}
    </Link>
  );
}
