const SITE_URL = import.meta.env.SITE;
/** @todo 実際のURLにする */
const WEBAPP_URL = 'https://lp.memot.app';

export const SITE = {
  title: 'めもっと',
  /** @todo 儚いめもから。もっと自分らしさを。 */
  description: 'あなたの暮らしを分かち合う、しずかで優しい空間を。',
  url: SITE_URL,
  /** @todo OG画像の更新 */
  image: `${SITE_URL}/og-image.png`,
  /** @todo 実際のXアカウントにする */
  twitterHandle: '@memot_app',
  releaseDate: '2025年',
  /** @todo 実際のURLにする */
  appUrl: {
    web: WEBAPP_URL,
    app_store: 'https://www.apple.com/jp/app-store',
    google_play: 'https://play.google.com/store/games?hl=ja',
  },
  /** @todo 実際のURLにする */
  sitemap: [
    {
      title: 'coming',
      url: `${WEBAPP_URL}/#めもっと`,
    },
    {
      title: 'in',
      url: `${WEBAPP_URL}/#是非`,
    },
    {
      title: '2025',
      url: `${WEBAPP_URL}/#使ってね！`,
    },
  ],
} as const;
