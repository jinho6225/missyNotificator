const puppeteer = require("puppeteer"); // 설치된 puppeteer 모듈
require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TOKEN, { polling: true });
const schedule = require('node-schedule');

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


var j = schedule.scheduleJob('0 30 1,7,23 * * ?', async () => {
//var j = schedule.scheduleJob('0 0/5 * * * ?', async () => {
	try {
		console.log('try')
        	const info = await lgDisplayInfo();
        	console.log('ready?');
        	const chatId = 626949459;
        	bot.sendMessage(chatId, info);
	} catch(err) {
		console.log(err)
	}

});
