/**
 * Handler for the /start command
 */
function handleStart(bot, msg) {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name || 'there';

    const welcomeMessage = `Hello ${firstName}! 👋\n\nI'm your Healthy Food Bot. I can help you prepare nutritious meals with ingredients you already have or suggest random healthy meal ideas.\n\nHere's what I can do:\n\n/ingredients [list your ingredients] - Get healthy meal suggestions based on what you have\n/feelinglucky - Get a random healthy meal idea\n/help - Show all available commands`;

    bot.sendMessage(chatId, welcomeMessage);
}

module.exports = { handleStart };