const https = require('https');
const util = require('util');
const TOKEN = process.env.TOKEN;
const puppeteer = require("puppeteer"); // 설치된 puppeteer 모듈

exports.handler = async (event) => {
    console.log('hey')
    const info = await lgDisplayInfo();
    const chatId = 626949459;
    const content = {
        "chat_id": chatId,
        "text": info
    };
    sendMessage(content);
};

function sendMessage(content) {
    const options = {
        method: 'POST',
        hostname: 'api.telegram.org',
        port: 443,
        headers: {"Content-Type": "application/json"},
        path: "/bot" + TOKEN + "/sendMessage"
    };

    const req = https.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            console.log('hello')
        });
    });

    req.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });

    req.write(util.format("%j", content));
    req.end();
}

const lgDisplayInfo = async () => {  
    const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']}); // headless 브라우저 실행
  
    const page = await browser.newPage();  // 새로운 페이지 열기
  
    await page.goto("https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=lg+디스플레이");
    await page.waitFor(5000);
  
    // evaluate() 함수를 이용해 element 선택하고 반복문으로 내용을 빈배열에 추가한다
    const lgDisInfo = await page.evaluate(() => {
      let scrappedData = ''; // 스크래핑 내용 담을 빈 배열
      const a = document.querySelector(".spt_con > strong").innerText
      const b = document.querySelector(".dtcon_lst > .lst").querySelectorAll('li')
  
      scrappedData += `현재가: ${a} \n`
      for (let i = 0; i < b.length; i++) {
          let key = b[i].querySelector('dt').textContent
          let value = b[i].querySelector('dd').textContent
          scrappedData += `${key}: ${value} \n`
      }
      return scrappedData;
    });
    // 모든 스크래핑 작업을 마치고 브라우저 닫기
    await browser.close();
    return lgDisInfo;
  }