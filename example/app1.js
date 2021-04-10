const express = require('express')
const puppeteer = require('puppeteer')
const app = express()

const userAgent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/76.0.3809.100 Chrome/76.0.3809.100 Safari/537.36'

app.get('/:s/:q', async(req, res) => {
  const base = `https://${req.params['s']}.com`
  const url = `${base}/?q=${req.params['q']}`
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })
  try{
    const page = await browser.newPage()
    await page.setUserAgent(userAgent)
    await page.setExtraHTTPHeaders({
        'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
        'cache-control': 'max-age=1',
        'content-type': 'text/html; charset=UTF-8',
        //'x-duckduckgo-locale': 'en_US',
        'Referer': base,
    })
    await page.goto(url, {waitUntil: 'networkidle2'})
    const content = await page.content()
    res.send(content)
  }
  catch(e){ throw e }
  finally{ await browser.close() }
})

app.listen(3000, () => console.log(`listening on port 3000`))