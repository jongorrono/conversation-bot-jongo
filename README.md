# Conversational Chat Bot by Jon

An AI-powered conversational bot that helps users learn about Jon's experience, projects, and how well he fits for specific roles.

## Features

- **Local Knowledge Base**: Comprehensive information about Jon's experience, projects, and skills
- **ChatGPT API Integration**: AI-powered responses for general questions
- **Company Fit Analysis**: Intelligent role matching with fit scores
- **Project Showcase**: Detailed case studies and project information
- **Hybrid System**: Combines local knowledge with AI capabilities

## Quick Start

1. **Clone or download** this repository
2. **Open `index.html`** in your web browser
3. **Start chatting** with the bot!

## Fixing "No Answer Available" Issue

If you're getting "No answer available" responses, it means the ChatGPT API is not configured. Here's how to fix it:

### Option 1: Console Command (Quick Fix)
1. Open your browser's Developer Console (F12)
2. Run: `setChatGPTKey("your-actual-api-key-here")`
3. Replace "your-actual-api-key-here" with your OpenAI API key

### Option 2: Update Configuration File
1. Open `js/config.js`
2. Replace `'your-openai-api-key-here'` with your actual OpenAI API key
3. Save the file and refresh the page

### Option 3: Get Setup Instructions
1. Open your browser's Developer Console (F12)
2. Run: `configureChatGPT()`
3. Follow the detailed instructions provided

## Getting Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the generated key
5. Use it in one of the configuration methods above

## System Commands

Once the page is loaded, you can use these console commands:

- `checkHybridStatus()` - Check system status and ChatGPT API configuration
- `configureChatGPT()` - Get detailed setup instructions
- `setChatGPTKey("your-key")` - Set your API key
- `testHybridSystem()` - Test the hybrid system functionality

## How It Works

### Local Mode (Default)
- ✅ Works immediately without configuration
- ✅ Answers questions about Jon's experience from local knowledge base
- ✅ Provides company fit analysis
- ✅ Shows projects and case studies
- ❌ Cannot answer general questions (requires ChatGPT API)

### Full AI Mode (With API Key)
- ✅ All local mode features
- ✅ AI-powered responses for general questions
- ✅ Hybrid system combining local knowledge with AI
- ✅ Intelligent fallbacks and context-aware responses

## File Structure

```
conversational-chat/
├── index.html          # Main application
├── js/
│   ├── config.js       # Configuration (API keys, settings)
│   └── script.js       # Main application logic
├── css/
│   └── chat-style.css  # Styling
├── data/               # Knowledge base files
└── img/                # Images and assets
```

## Troubleshooting

### "No answer available" Error
- **Cause**: ChatGPT API not configured
- **Solution**: Follow the configuration steps above

### API Key Not Working
- **Check**: Your API key is valid and has credits
- **Verify**: The key is properly set in config.js or via console
- **Test**: Run `checkHybridStatus()` to verify configuration

### Local Development Issues
- **Port conflicts**: The system will automatically prompt for API key on localhost
- **CORS issues**: Run from a local server (e.g., `python -m http.server 8000`)

## Support

If you're still experiencing issues:

1. Check the browser console for error messages
2. Run `checkHybridStatus()` to diagnose the problem
3. Ensure your OpenAI API key is valid and has available credits
4. Try refreshing the page after configuration changes

## License

This project is for personal use and portfolio demonstration.
