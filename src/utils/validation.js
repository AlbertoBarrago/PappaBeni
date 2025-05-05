/**
 * Validates that all required environment variables are set
 */
function validateEnv() {
    const requiredEnvVars = [
        'TELEGRAM_BOT_TOKEN',
        'GEMINI_API_KEY'
    ];

    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

    if (missingEnvVars.length > 0) {
        console.error('Error: Missing required environment variables:');
        missingEnvVars.forEach(envVar => {
            console.error(`- ${envVar}`);
        });
        console.error('Please set these variables in your .env file');
        process.exit(1);
    }
}

module.exports = { validateEnv };