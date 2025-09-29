export const SITE = {
  title: 'めもっと',
  description: 'あなたの暮らしを分かち合う、しずかで優しい空間を。',
  url: 'https://lp.memot.app',
  image: 'https://lp.memot.app/og-image.png',
  twitterHandle: '@memot_app',
  releaseDate: '2025年',
  appUrl: {
    web: '/',
    app_store: 'https://www.apple.com/jp/app-store',
    google_play: 'https://play.google.com/store/games?hl=ja',
  },
  sitemap: [
    {
      title: 'お知らせ',
      url: `/news`,
    },
    {
      title: '',
      url: `/#是非`,
    },
  ],
} as const;
