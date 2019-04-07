import request from 'request-promise-native';

const TelegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
const ChatId = process.env.TELEGRAM_CHAT_ID;

interface SendMessageOption {
  format?: 'Markdown' | 'HTML';
  disableNotification?: boolean;
}

export function sendMessage(
  message: string,
  { format, disableNotification }: SendMessageOption = {}
) {
  return request({
    uri: `https://api.telegram.org/bot${TelegramBotToken}/sendMessage`,
    method: 'POST',
    body: {
      chat_id: ChatId,
      text: message,
      parse_mode: format,
      disable_notification: disableNotification
    },
    json: true
  });
}
