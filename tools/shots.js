// Step 4 — reference screenshots: full page + each section at 1440 and 390, the revealed sticky nav,
// and the hidden overlays (tour, amenities, lightbox) forced open. Output: docs/design-references/sections/.
const { open } = require('./lib');
const fs = require('fs');
const { SHOTS_DIR: OUT } = require('./config');

const flow = {
  'site-header': 'header._Ugwssa',
  'listing-title': 'section._DbxOEt',
  'photo-gallery': 'section._Zndiww',
  'listing-details-column': 'div._joiPBF',
  'booking-sidebar': 'aside._iJTxKe ._bUsxCi',
  'reviews-section': 'div._SPYgTj > section:nth-of-type(1)',
  'location-section': 'div._SPYgTj > section:nth-of-type(2)',
  'host-section': 'div._SPYgTj > section:nth-of-type(3)',
  'things-to-know': 'div._SPYgTj > section:nth-of-type(4)',
  'nearby-stays': 'div._SPYgTj > section:nth-of-type(5)',
};

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  for (const w of [1440, 390]) {
    const viewport = w === 1440 ? 'desktop' : 'mobile';
    const { browser, page } = await open(w);
    // show every lazy image (SingleFile left real bitmaps as background-image under placeholder svgs)
    await page.evaluate(() => document.querySelectorAll('img').forEach(img => {
      const bg = getComputedStyle(img).backgroundImage;
      if (bg && bg.includes('url(') && (img.getAttribute('src') || '').startsWith('data:image/svg+xml')) img.src = bg.slice(bg.indexOf('url(') + 5, bg.lastIndexOf('"'));
    }));
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${OUT}/full-page-${viewport}.png`, fullPage: true });
    for (const [name, sel] of Object.entries(flow)) {
      const el = await page.$(sel);
      if (!el || !(await el.isVisible())) continue;
      await el.screenshot({ path: `${OUT}/${name}-${viewport}.png` });
    }
    // Sticky nav: reveal
    await page.addStyleTag({ content: '._JXzroy{transform:none!important;opacity:1!important}' });
    await page.evaluate(() => scrollTo(0, 1200));
    await page.waitForTimeout(400);
    await page.screenshot({ path: `${OUT}/sticky-navigation-${viewport}.png`, clip: { x: 0, y: 0, width: w, height: 90 } });
    await page.addStyleTag({ content: '._JXzroy{display:none!important}' });
    // Overlays
    const overlays = { 'photo-tour': '._KpcKWX', 'amenities-modal': '._yBjuYG', 'photo-lightbox': '._zFbfbh' };
    for (const [name, sel] of Object.entries(overlays)) {
      await page.addStyleTag({ content: `${sel}{opacity:1!important;visibility:visible!important;transform:none!important} ${sel} ._mdAcnz{transform:none!important}` });
      if (name === 'lightbox') {
        await page.evaluate(() => {
          const st = document.querySelector('#lbStage');
          st.innerHTML = '<img style="max-width:100%;max-height:100%;object-fit:contain" src="' + document.querySelector('._GXrMIo img').src + '">';
        });
      }
      await page.waitForTimeout(500);
      await page.screenshot({ path: `${OUT}/${name}-${viewport}.png` });
      if (name === 'photo-tour') {
        await page.evaluate(() => document.querySelector('#tourScroll').scrollTo(0, 900));
        await page.waitForTimeout(300);
        await page.screenshot({ path: `${OUT}/photo-tour-scrolled-${viewport}.png` });
      }
      await page.addStyleTag({ content: `${sel}{display:none!important}` });
    }
    await browser.close();
  }
  console.log(fs.readdirSync(OUT).join('\n'));
})();
