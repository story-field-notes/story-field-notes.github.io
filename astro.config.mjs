// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import remarkMath from 'remark-math';
import rehypeMathjax from 'rehype-mathjax';
// https://astro.build/config
export default defineConfig({
  // Organization の user site として公開するためルート配信。base の指定は不要。
  site: "https://story-field-notes.github.io",
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkMath],
    // MathJax(SVG) でビルド時に数式を描画。TeX 純正フォントで本に近い矢印になる。
    rehypePlugins: [rehypeMathjax],
  },
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 300,
      },
    },
  },
  server: {
    host: '127.0.0.1'
  }
});
