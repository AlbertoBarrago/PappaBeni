require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const { handleStart } = require('./handlers/startHandler');
const { handleHelp } = require('./handlers/helpHandler');
const { handleIngredients } = require('./handlers/ingredientsHandler');
const { handleFeelingLucky } = require('./handlers/feelingLuckyHandler');
const { validateEnv } = require('./utils/validation');

// Validate environment variables
validateEnv();

// Create a bot instance
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

console.log('Bot is running...');

// Command handlers
bot.onText(/\/start/, (msg) => handleStart(bot, msg));
bot.onText(/\/help/, (msg) => handleHelp(bot, msg));
bot.onText(/\/ingredients (.+)/, (msg, match) => handleIngredients(bot, msg, match));
bot.onText(/\/feelinglucky/, (msg) => handleFeelingLucky(bot, msg));

// Handle unknown commands
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // Skip messages that are handled by specific command handlers
    if (msg.text && (
        msg.text.startsWith('/start') ||
        msg.text.startsWith('/help') ||
        msg.text.startsWith('/ingredients') ||
        msg.text.startsWith('/feelinglucky')
    )) {
        return;
    }

    // Handle unknown commands or regular messages
    if (msg.text && msg.text.startsWith('/')) {
        bot.sendMessage(chatId, 'Unknown command. Type /help to see available commands.');
        return;
    }

    // For regular messages, suggest using a command
    bot.sendMessage(chatId,
        'Please use one of the available commands:\n' +
        '/ingredients [list of ingredients] - Get healthy meal suggestions based on your ingredients\n' +
        '/feelinglucky - Get a random healthy meal suggestion\n' +
        '/help - Show available commands'
    );
});