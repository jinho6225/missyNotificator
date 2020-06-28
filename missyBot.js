const puppeteer = require('puppeteer');
require('dotenv').config();
const TeleBot = require('telebot');
const bot = new TeleBot(process.env.TOKEN, { polling: true });

const missyInfo = async () => {
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
        merchant: ${arr[i].dataset.merchant}\n
        subject: ${arr[i].dataset.subject}\n
        link: https://www.missycoupons.com/zero/board.php#id=hotdeals&no=${arr[i].dataset.no}\n
        `;
      }
    }
    return scrappedData;
  });
  await browser.close();
  return itemList;
};

bot.start();

var schedule = require('node-schedule');

var j = schedule.scheduleJob('0 15,20,25,30 * * * ?', async () => {
  console.log('try');
  const info = await missyInfo();
  console.log('ready?');
  const chatId = 626949459;
  bot.sendMessage(chatId, info);
});
