const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  }); // headless 브라우저 실행
  const page = await browser.newPage(); // 새로운 페이지 열기
  // `https://en.wikipedia.org/wiki/React_(web_framework)` URL에 접속
  await page.goto('https://www.missycoupons.com/zero/board.php#id=hotdeals');
  await page.waitFor(10000);
  // evaluate() 함수를 이용해 History table을 선택하고 반복문으로 내용을 빈배열에 추가한다
  const reactHistory = await page.evaluate(() => {
    let scrappedData = []; // 스크래핑 내용 담을 빈 배열
    // const tbodyChilds = document.querySelector('.rp-list-table').childNodes[3]
    //   .children; // history 테이블의 <tbody> 내용

    let arr = Array.from(
      document.querySelector('.rp-list-table').childNodes
    ).slice(2);

    // 반복문으로 <tbody> 내용 객체 형식으로 빈 배열에 추가
    for (let i = 1; i < arr.length; i++) {
      scrappedData.push({
        i: arr[i].innerText,
      });
    }
    return scrappedData;
  });

  const fs = require('fs'); // 내장된 `file system` 모듈
  // 스크래핑된 내용 json 파일로 원하는 경로에 생성
  fs.writeFile(
    './Docs/listItem.json',
    JSON.stringify(reactHistory, null, 2),
    (err) =>
      err
        ? console.error('!!Failed writing file', err)
        : console.log('Successfuly file created!')
  );

  // 모든 스크래핑 작업을 마치고 브라우저 닫기
  await browser.close();
})();