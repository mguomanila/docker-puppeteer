const puppeteer = require('puppeteer')

let browser, page
async function test(){
  browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
  })
  const version = await browser.version()
  console.log(`started ${version}`)
}

test()