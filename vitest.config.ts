import { getViteConfig } from 'astro/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, mergeConfig, type ViteUserConfig } from 'vitest/config';

export default defineConfig(async (env) => {
  const astroViteConfigFn = getViteConfig({
    plugins: [
      tsconfigPaths(),
    ],
  });

  const astroViteConfig = await astroViteConfigFn(env);

  return mergeConfig(astroViteConfig, {
    test: {
      name: 'unit',
      include: [
        '**/*.(test).?(c|m)[jt]s?(x)',
      ],
      globals: true,
      environment: 'happy-dom',
    },
  } satisfies ViteUserConfig);
});
