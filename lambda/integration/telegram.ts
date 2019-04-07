import request from 'request-promise-native';

const TelegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const ChatId = process.env.TELEGRAM_CHAT_ID;

export function sendMessage(message: string) {
  return request({
    uri: `https://api.telegram.org/bot${TelegramBotToken}/sendMessage`,
    method: 'POST',
    body: {
      chat_id: ChatId,
      text: message
    },
    json: true
  });
}
