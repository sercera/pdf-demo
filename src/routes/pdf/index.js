const express = require('express');

const router = express.Router();
const puppeteer = require('puppeteer');

router.get('/generate-image', async (req, res) => {
  const { url } = req.query;
  let browser = null;
  try {
    browser = await puppeteer.launch({ headless: true, args: ['--window-size=1980,1024'] });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle0' });

    const pdfName = (url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/) || [])[1];

    // await page.waitFor(30000);
    const image = await page.screenshot({ fullPage: true });
    res.setHeader('Content-Length', image.length);
    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Content-Disposition', `inline; filename=${pdfName || 'site'}.png`);
    return res.send(image);
  } catch (e) {
    if (browser) {
      console.log(e);
      await browser.close();
    }
  }
});

router.get('/generate-pdf', async (req, res) => {
  const { url } = req.query;
  let browser = null;
  try {
    browser = await puppeteer.launch({ headless: true, args: ['--window-size=1980,1024'] });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle0' });

    const pdfName = (url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:/\n?]+)/) || [])[1];
    const pdfData = await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,

    });
    await browser.close();
    res.setHeader('Content-Length', pdfData.length);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${pdfName || 'site'}.pdf`);
    return res.send(pdfData);
  } catch (e) {
    if (browser) {
      console.log(e);
      await browser.close();
    }
  }
});

module.exports = router;
