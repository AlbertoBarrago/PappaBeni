const geminiService = require('../services/geminiService');

/**
 * Handler for the /feelinglucky command
 * Generates a random healthy meal suggestion
 */
async function handleFeelingLucky(bot, msg) {
    const chatId = msg.chat.id;

    // Send typing indicator
    bot.sendChatAction(chatId, 'typing');

    // Inform user that we're generating a random meal
    const processingMsg = await bot.sendMessage(
        chatId,
        'Generating a random healthy meal suggestion for you...\nThis may take a moment.'
    );

    try {
        // Get random meal suggestion from Gemini
        const randomMeal = await geminiService.generateRandomMeal();

        // Send the suggestion
        await bot.sendMessage(chatId, randomMeal, { parse_mode: 'Markdown' });

        // Delete the processing message
        bot.deleteMessage(chatId, processingMsg.message_id).catch(() => {
            // Ignore errors if message can't be deleted
        });
    } catch (error) {
        console.error('Error in feeling lucky handler:', error);
        bot.sendMessage(chatId, 'Sorry, I encountered an error while generating a random meal suggestion. Please try again later.');
    }
}

module.exports = { handleFeelingLucky };