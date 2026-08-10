#!/usr/bin/env node
// Pixel — captura screenshot full-page + medicoes DOM simples (contraste, touch target) via Playwright.
// Uso: node scripts/pixel-screenshot.mjs <url> <outDir> [--headed]
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const [, , url, outDirArg, ...rest] = process.argv;
const headed = rest.includes('--headed');

if (!url || !outDirArg) {
  console.error('Uso: node scripts/pixel-screenshot.mjs <url> <outDir> [--headed]');
  process.exit(1);
}

const outDir = path.resolve(outDirArg);
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: !headed });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

await page.goto(url, { waitUntil: 'networkidle' });

const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const screenshotPath = path.join(outDir, `pixel-${stamp}.png`);
await page.screenshot({ path: screenshotPath, fullPage: true });

// Medicoes deterministicas simples: alvos de toque < 44px e pares de cor com contraste baixo.
const measurements = await page.evaluate(() => {
  function luminance(r, g, b) {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      const v = c / 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }
  function parseRgb(str) {
    const m = str.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
  }
  function contrastRatio(fg, bg) {
    const l1 = luminance(...fg) + 0.05;
    const l2 = luminance(...bg) + 0.05;
    return l1 > l2 ? l1 / l2 : l2 / l1;
  }

  const smallTargets = [];
  document.querySelectorAll('button, a, [role="button"], input, select, textarea').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width > 0 && r.height > 0 && (r.width < 44 || r.height < 44)) {
      smallTargets.push({
        tag: el.tagName.toLowerCase(),
        text: (el.textContent || '').trim().slice(0, 40),
        width: Math.round(r.width),
        height: Math.round(r.height),
      });
    }
  });

  const lowContrast = [];
  document.querySelectorAll('body *').forEach((el) => {
    if (!(el.textContent || '').trim()) return;
    const style = getComputedStyle(el);
    const fg = parseRgb(style.color);
    const bg = parseRgb(style.backgroundColor);
    if (!fg || !bg || style.backgroundColor === 'rgba(0, 0, 0, 0)') return;
    const ratio = contrastRatio(fg, bg);
    if (ratio < 4.5) {
      lowContrast.push({
        tag: el.tagName.toLowerCase(),
        text: (el.textContent || '').trim().slice(0, 40),
        ratio: Math.round(ratio * 100) / 100,
      });
    }
  });

  return {
    smallTargets: smallTargets.slice(0, 30),
    lowContrast: lowContrast.slice(0, 30),
    title: document.title,
  };
});

await browser.close();

console.log(JSON.stringify({ screenshotPath, url, ...measurements }, null, 2));
