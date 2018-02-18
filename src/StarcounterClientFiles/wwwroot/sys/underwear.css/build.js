const express = require('express');
const fs = require('fs');
const puppeteer = require('puppeteer');

/**
 * host src directory
 */
var host = '127.0.0.1';
var port = 5000;

var app = express();
app.use('/', express.static(__dirname + '/'));
const server = app.listen(port, host);

/**
 * Launch puppeteer and navigate to /src
 */
puppeteer.launch().then(async browser => {
  const page = await browser.newPage();

  await page.goto('http://127.0.0.1:5000/src');

  // inject the script that parses the CSS and populates the table
  const scriptElement = await page.addScriptTag({ url: '/assets/utils.js' });

  // remove the script again
  await page.evaluate(() => {
    for (const script of document.querySelectorAll('script')) script.remove();
  });

  // get the generated HTML
  let html = await page.evaluate('document.documentElement.outerHTML'); 

  // fix the paths
  html = '<!DOCTYPE html>\n' + html;
  html = html.replace(/\.\.\/assets\//g, 'assets/');
  html = html.replace(/\.\.\/underwear/g, 'underwear');

  //save it
  fs.writeFileSync('index.html', html);
  await browser.close();

  // kill express
  server.close(() => process.exit(0));
});
