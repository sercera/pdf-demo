const express = require('express');

const router = express.Router();
const path = require('path');
const puppeteer = require('puppeteer');

router.get('/', async (req, res) => {
  res.sendFile(path.join(`${__dirname}/../../views/index.html`));
});
router.post('/generate', async (req, res) => {
  const { url } = req.body;
  console.log(url);
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  const pdfData = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

  await browser.close();
  res.setHeader('Content-Length', pdfData.length);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'inline; filename=checklist.pdf');
  return res.send(pdfData);
});

module.exports = router;
