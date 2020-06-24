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
    for (let i = 1; i < arr.length; i++) {
      scrappedData += `title: ${
        arr[i].innerText
      }\n link: https://www.missycoupons.com/zero/${arr[i].childNodes[2]
        .querySelector('a')
        .getAttribute('href')}\n`;
    }
    return scrappedData;
  });
  await browser.close();
  return itemList;
};

bot.on(/\/get (.+)$/, async (msg, props) => {
  console.log(props.match[1]);
  const info = await missyInfo();
  console.log('ready?');
  msg.reply.text(info);
});

bot.on(/\/start/, (msg) => {
  console.log(msg, 'msg');
  msg.reply.text('hello world!');
});

// const chatId = 626949459;
// //1070543363
// const text = "Nice, it's working!";
// bot.sendMessage(chatId, text);

bot.start();
