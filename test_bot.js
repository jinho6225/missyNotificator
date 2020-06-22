const TelegramBot = require('node-telegram-bot-api');
require('dotenv/config');

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

bot.onText(/\/echo (.+)/, (msg, match) => {
  console.log(msg, 'msg');
  console.log(match, 'match');
  const chatId = msg.chat.id;
  const resp = `주인님, ${match[1]}`;

  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  let answer = null;
  if (msg.text === '반갑다') {
    answer = '반갑습니다.';
  }

  bot.sendMessage(chatId, `${answer}`);
});
