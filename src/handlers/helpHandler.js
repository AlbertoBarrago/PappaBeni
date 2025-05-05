/**
 * Handler for the /help command
 */
function handleHelp(bot, msg) {
    const chatId = msg.chat.id;

    const helpMessage = `*Healthy Food Bot - Help*\n\nHere are the available commands:\n\n/ingredients [list your ingredients] - Get healthy meal suggestions based on what you have in your fridge\nExample: /ingredients chicken, broccoli, rice\n\n/feelinglucky - Get a random healthy meal idea when you're not sure what to cook\n\n/start - Show the welcome message\n\n/help - Show this help message`;

    bot.sendMessage(chatId, helpMessage, { parse_mode: 'Markdown' });
}

module.exports = { handleHelp };