import type { HTMLAttributes } from 'astro/types';
import { checkURL } from '~/utils/url';

type LinkOptions =
  | Pick<HTMLAttributes<'a'>, 'href'>
  | Pick<HTMLAttributes<'a'>, 'href' | 'target' | 'rel'>;

export function prepareLinkOptions(
  href: HTMLAttributes<'a'>['href'],
): LinkOptions {
  const url = href instanceof URL ? href.href : href || '';
  const result = checkURL(url);

  if (!result.isURL) {
    console.error('Invalid URL:', href);
    return {
      href: '#',
    };
  }

  if (result.isExternal) {
    return {
      href,
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }

  return {
    href,
  };
}
