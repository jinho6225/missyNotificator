require('dotenv').config();
const TeleBot = require('telebot');

const bot = new TeleBot(process.env.TOKEN, { polling: true });

bot.on('text', (msg) => {
  msg.reply.text(msg.text);
});

bot.on(/\/start/, (msg) => {
  msg.reply.text('hello world!');
});

bot.on(/^\/echo (.+)$/, (msg, props) => {
  const text = props.match[1];
  console.log(props, 'props');
  console.log(msg);
  return msg.reply.text(text);
});

bot.on(/\/m (.+)$/, async (msg, props) => {
  const info = await fn(props.match[1]);
  msg.reply.text(info);
});

bot.start();
