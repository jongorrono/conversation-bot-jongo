// ChatGPT API Configuration
// Replace 'your-openai-api-key-here' with your actual OpenAI API key
// Get your API key from: https://platform.openai.com/api-keys

const CONFIG = {
    OPENAI_API_KEY: 'your-openai-api-key-here',
    OPENAI_API_URL: 'https://api.openai.com/v1/chat/completions',
    OPENAI_MODEL: 'gpt-3.5-turbo',
    OPENAI_MAX_TOKENS: 500,
    OPENAI_TEMPERATURE: 0.7
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

