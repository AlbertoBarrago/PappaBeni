const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Service for interacting with Google's Gemini API
 */
class GeminiService {
    constructor() {
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        // Update model name to match the correct format for the current API version
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    }

    /**
     * Generate healthy meal suggestions based on ingredients
     * @param {string[]} ingredients - List of available ingredients
     * @returns {Promise<string>} - Meal suggestions
     */
    async suggestMealFromIngredients(ingredients) {
        try {
            const prompt = `Given these ingredients: ${ingredients.join(', ')}\n\n
        Please suggest 2-3 healthy meal options that can be prepared using some or all of these ingredients.
        For each meal suggestion, include:\n
        1. A name for the dish
        2. A brief description of why it's healthy
        3. A simple list of ingredients needed (marking which ones from the provided list are used)
        4. Brief preparation instructions (3-5 steps maximum)
        
        Focus on nutritionally balanced, healthy options. If the ingredients list is missing essential components for a healthy meal, suggest minimal additional ingredients that would complement what's available.`;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Error generating meal suggestions:', error);
            return 'Sorry, I had trouble generating meal suggestions. Please try again later.';
        }
    }

    /**
     * Generate a random healthy meal suggestion
     * @returns {Promise<string>} - Random meal suggestion
     */
    async generateRandomMeal() {
        try {
            const prompt = `Generate a random healthy meal idea with the following information:\n
        1. A creative name for the dish
        2. A brief description of why it's nutritionally balanced and healthy
        3. A list of main ingredients (8-10 items)
        4. Brief preparation instructions (3-5 steps maximum)
        
        Make it interesting, delicious, and genuinely healthy. Focus on whole foods and balanced nutrition.`;

            const result = await this.model.generateContent(prompt);
            const response = await result.response;
            return response.text();
        } catch (error) {
            console.error('Error generating random meal:', error);
            return 'Sorry, I had trouble generating a random meal suggestion. Please try again later.';
        }
    }
}

// Export a singleton instance
module.exports = new GeminiService();