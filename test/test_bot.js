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

// const chatId = 626949459;
const chatId = '-1001491829951';
const text = 'love you?';
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

// https://api.telegram.org/bot1155303534:AAHCNIREMWmFJ8_oV8nlJ0tnP3e4zm3VuWY/sendMessage?chat_id=@jinho6225&text=안녕
// `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=@${channerId}&text=안녕`;
