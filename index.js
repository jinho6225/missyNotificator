const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.missycoupons.com/zero/board.php#id=hotdeals');
  await page.waitFor(5000);
  const itemList = await page.evaluate(() => {
    let scrappedData = [];
    let arr = Array.from(
      document.querySelector('.rp-list-table').childNodes
    ).slice(2);

    for (let i = 1; i < arr.length; i++) {
      scrappedData.push({
        title: arr[i].innerText,
        link:
          'https://www.missycoupons.com/zero/' +
          arr[i].childNodes[2].querySelector('a').getAttribute('href'),
      });
    }
    return scrappedData;
  });

  const fs = require('fs');
  fs.writeFile(
    './Docs/listItem.json',
    JSON.stringify(itemList, null, 2),
    (err) =>
      err
        ? console.error('!!Failed writing file', err)
        : console.log('Successfuly file created!')
  );

  await browser.close();
})();
