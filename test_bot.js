require('dotenv').config();
const TeleBot = require('telebot');

const bot = new TeleBot(process.env.TOKEN, { polling: true });

bot.on('text', (msg) => {
  msg.reply.text(msg.text);
});

bot.on(/\/start/, (msg) => {
  console.log(msg);
  msg.reply.text('hello world!');
});

bot.on(/^\/echo (.+)$/, (msg, props) => {
  const text = props.match[1];
  return msg.reply.text(text);
});

const chatId = 626949459;
const text = "Nice, it's working!";
bot.sendMessage(
  chatId,
  text
  // {
  //   parseMode,
  //   replyToMessage,
  //   replyMarkup,
  //   notification,
  //   webPreview,
  // }
);

bot.start();
