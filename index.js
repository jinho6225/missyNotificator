const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.missycoupons.com/zero/board.php#id=hotdeals');
  await page.waitFor(5000);
  const itemList = await page.evaluate(() => {
    let scrappedData = '';
    let arr = Array.from(
      document.querySelector('.rp-list-table').childNodes
    ).slice(2);

    for (let i = 1; i < arr.length; i++) {
      scrappedData += `title: ${
        arr[i].innerText
      }\n link: https://www.missycoupons.com/zero/${arr[i].childNodes[2]
        .querySelector('a')
        .getAttribute('href')}\n`;
    }
    console.log(scrappedData);
    return scrappedData;
  });

  await browser.close();
  return itemList;
})();
