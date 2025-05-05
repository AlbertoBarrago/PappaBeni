# "PAPPA BENI 🤖"

A Telegram bot that helps users prepare healthy meals by suggesting recipes based on available ingredients or generating random meal ideas. Powered by Google's Gemini AI.

## Features

- **Ingredient-based Suggestions**: Get healthy meal ideas based on ingredients you already have
- **Random Meal Generator**: Get a random healthy meal suggestion with the "I Feel Lucky" feature
- **Detailed Recipes**: Each suggestion includes meal name, health benefits, ingredients, and preparation steps

## Project Structure

The project follows a modular architecture with clear separation of concerns:

```
health_food_bot/
├── .env.example        # Example environment variables
├── package.json        # Project dependencies and scripts
├── README.md           # Project documentation
└── src/                # Source code
    ├── index.js        # Main entry point
    ├── handlers/       # Command handlers
    │   ├── startHandler.js
    │   ├── helpHandler.js
    │   ├── ingredientsHandler.js
    │   └── feelingLuckyHandler.js
    ├── services/       # External service integrations
    │   └── geminiService.js
    └── utils/          # Utility functions
        └── validation.js
```

## Setup and Installation

1. Clone the repository

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example` and add your API keys:
   ```
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the bot:
   ```
   npm start
   ```

   For development with auto-restart:
   ```
   npm run dev
   ```

## Getting API Keys

- **Telegram Bot Token**: Talk to [BotFather](https://t.me/botfather) on Telegram to create a new bot and get a token
- **Gemini API Key**: Get an API key from the [Google AI Studio](https://makersuite.google.com/app/apikey)

## Available Commands

- `/start` - Welcome message and bot introduction
- `/help` - Show available commands and usage instructions
- `/ingredients [list]` - Get meal suggestions based on provided ingredients
- `/feelinglucky` - Get a random healthy meal suggestion

## License

MIT