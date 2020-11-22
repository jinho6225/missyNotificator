require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TOKEN, { polling: true });

bot.on('message', (msg) => {
  var hi = "hi";
  if (msg.text.toString().toLowerCase().indexOf(hi) === 0) {
  bot.sendMessage(msg.chat.id,"Hello dear user");
  }   
  var bye = "bye";
  if (msg.text.toString().toLowerCase().includes(bye)) {
  bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
  }   
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg, match) => {
  console.log(match, 'match')
  const chatId = msg.chat.id;
  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});

const chatId = 626949459;
// const chatId = '-1001491829951'; //it might be group chatId
const text = 'love you?';
bot.sendMessage(
  chatId,
  text

);

