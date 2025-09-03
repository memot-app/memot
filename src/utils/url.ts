import { SITE } from '~/constants/metadata';

type URLCheckResult =
  | {
      isURL: false;
    }
  | {
      isURL: true;
      isExternal: boolean;
    };

export function checkURL(url: string): URLCheckResult {
  try {
    if (url.startsWith('/')) {
      return {
        isURL: true,
        isExternal: false,
      };
    }

    const parsedUrl = new URL(url);

    if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
      return {
        isURL: true,
        isExternal: parsedUrl.hostname !== new URL(SITE.url).hostname,
      };
    }

    return {
      isURL: false,
    };
  } catch {
    return {
      isURL: false,
    };
  }
}
