// @ts-check

import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

const env = loadEnv(process.env.NODE_ENV || 'development', process.cwd(), '');

/**
 * remark plugin: Convert literal "\\n" sequences in text to hard line breaks.
 * Skips code/inlineCode/math nodes.
 */
function remarkLiteralBreaks() {
  return (tree) => {
    const SKIP = new Set(['code', 'inlineCode', 'math', 'inlineMath']);
    /** @param {any} node */
    function transform(node) {
      if (!node || SKIP.has(node.type)) return;
      if (Array.isArray(node.children)) {
        let mutated = false;
        const next = [];
        for (const child of node.children) {
          if (child && child.type === 'text' && typeof child.value === 'string') {
            const v = child.value;
            if (v.includes('\\n') || v.includes('¥n')) {
              let buffer = '';
              for (let i = 0; i < v.length; i++) {
                const ch = v[i];
                const nx = v[i + 1];
                if ((ch === '\\' || ch === '¥') && nx === 'n') {
                  if (buffer) next.push({ type: 'text', value: buffer });
                  next.push({ type: 'break' });
                  buffer = '';
                  i++; // skip 'n'
                } else {
                  buffer += ch;
                }
              }
              if (buffer) next.push({ type: 'text', value: buffer });
              mutated = true;
              continue;
            }
          }
          transform(child);
          next.push(child);
        }
        if (mutated) node.children = next;
      }
    }
    transform(tree);
  };
}

export default defineConfig({
  site: env.DEV ? 'http://localhost:4321' : 'https://lp.memot.app',
  integrations: [
    sitemap(),
    mdx({
      remarkPlugins: [remarkLiteralBreaks],
    }),
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
});
