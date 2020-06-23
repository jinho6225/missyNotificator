require('dotenv').config();
const TeleBot = require('telebot');

const bot = new TeleBot(process.env.TOKEN, { polling: true });

bot.on('text', (msg) => {
  console.log(msg);
  msg.reply.text(msg.text);
});

bot.start();
