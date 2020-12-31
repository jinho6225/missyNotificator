require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TOKEN, { polling: true });

const chatId = 626949459;
console.log(chatId, 'chatId')
// send a message to the chat acknowledging receipt of their message
bot.sendMessage(chatId, 'LG Display - how much this stock is?');

// const chatId = 626949459;
// bot.sendMessage(chatId, info);
            
// 626949459 chatId
// {
//     message_id: 4,
//     from: {
//       id: 626949459,
//       is_bot: false,
//       first_name: 'Jinho',
//       language_code: 'ko'
//     },
//     chat: { id: 626949459, first_name: 'Jinho', type: 'private' },
//     date: 1609194738,
//     text: 'Hello'
//   } msg