const geminiService = require('../services/geminiService');

/**
 * Handler for the /ingredients command
 * Processes user-provided ingredients and generates meal suggestions
 */
async function handleIngredients(bot, msg, match) {
    const chatId = msg.chat.id;

    // Extract ingredients from the command
    const ingredientsText = match[1].trim();

    if (!ingredientsText) {
        bot.sendMessage(chatId, 'Please provide a list of ingredients. Example: /ingredients chicken, rice, broccoli');
        return;
    }

    // Parse ingredients into an array
    const ingredients = ingredientsText
        .split(',')
        .map(item => item.trim())
        .filter(item => item.length > 0);

    if (ingredients.length === 0) {
        bot.sendMessage(chatId, 'Please provide valid ingredients. Example: /ingredients chicken, rice, broccoli');
        return;
    }

    // Send typing indicator
    bot.sendChatAction(chatId, 'typing');

    // Inform user that we're generating suggestions
    const processingMsg = await bot.sendMessage(
        chatId,
        `Generating healthy meal suggestions based on: ${ingredients.join(', ')}...\nThis may take a moment.`
    );

    try {
        // Get meal suggestions from Gemini
        const mealSuggestions = await geminiService.suggestMealFromIngredients(ingredients);

        // Send the suggestions
        await bot.sendMessage(chatId, mealSuggestions, { parse_mode: 'Markdown' });

        // Delete the processing message
        bot.deleteMessage(chatId, processingMsg.message_id).catch(() => {
            // Ignore errors if message can't be deleted
        });
    } catch (error) {
        console.error('Error in ingredients handler:', error);
        bot.sendMessage(chatId, 'Sorry, I encountered an error while generating meal suggestions. Please try again later.');
    }
}

module.exports = { handleIngredients };