const express = require('express');

const router = express.Router();
const puppeteer = require('puppeteer');

router.get('/generate', async (req, res) => {
  const { url } = req.query;
  let browser = null;
  try {
    browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(url, { waitUntil: 'networkidle2' });

    const title = await page.title();

    const pdfData = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();
    res.setHeader('Content-Length', pdfData.length);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${title}.pdf`);
    return res.send(pdfData);
  } catch (e) {
    if (browser) {
      console.log(e);
      await browser.close();
    }
  }
});

module.exports = router;
