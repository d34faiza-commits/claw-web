// Render SVG lapisan adegan ke PNG transparan 3840×2160 (dipanggil oleh build.py).
// Butuh Playwright + Chromium (tidak masuk dependency situs): `npx playwright install chromium` bila belum ada.
const { chromium } = require("playwright");
const path = require("node:path");

(async () => {
  const [dir, ...names] = process.argv.slice(2);
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 3840, height: 2160 } });
  for (const name of names) {
    const svg = path.resolve(dir, `${name}.svg`);
    await page.goto(`file://${svg}`);
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.resolve(dir, `${name}.png`), omitBackground: true });
    console.log("rendered", name);
  }
  await browser.close();
})();
