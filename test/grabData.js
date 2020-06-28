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
    let targetArr = ['생활용품', '출산육아'];
    for (let i = 0; i < arr.length; i++) {
      if (targetArr.includes(arr[i].dataset.category)) {
        scrappedData += `
        category: ${arr[i].dataset.category}\n
        title: ${arr[i].dataset.subject}\n
        link: https://www.missycoupons.com/zero/board.php#id=hotdeals&no=${arr[i].dataset.no}\n
        `;
      }
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

  // 모든 스크래핑 작업을 마치고 브라우저 닫기
  await browser.close();
})();
