# MR•TK BOT 🩸

Advanced WhatsApp Bot by MR•TOKYO

Version: 2.2.2

## Features

- 🌐 General Commands (help, ping, joke, quote, fact, weather, etc.)
- 👮‍♂️ Admin Commands (ban, promote, demote, mute, etc.)
- 🔒 Owner Commands (mode, settings, autoreact, etc.)
- 🎨 Image/Sticker Commands (blur, sticker, meme, etc.)
- 🖼️ Pies Commands (country-based images)
- 🎮 Game Commands (tictactoe, hangman, trivia, etc.)
- 🤖 AI Commands (GPT, Gemini, image generation)
- 🎯 Fun Commands (compliment, insult, flirt, etc.)
- 🔤 Textmaker (metallic, ice, neon, etc.)
- 📥 Downloader (YouTube, Instagram, TikTok, etc.)
- 🧩 MISC Commands (meme generators, effects)
- 🖼️ Anime Commands (neko, waifu, kiss, hug, etc.)

## Installation

### Local Installation

1. Clone or download this repository
2. Install Node.js (version 18 or higher)
3. Install dependencies:
```bash
npm install
```

4. Set up environment variables (optional):
```bash
# Create a .env file or set environment variables
OWNER_NUMBER=your_phone_number
OPENAI_API_KEY=your_openai_key (for GPT and image generation)
GEMINI_API_KEY=your_gemini_key (for Gemini)
WEATHER_API_KEY=your_weather_key (for weather command)
NEWS_API_KEY=your_news_key (for news command)
```

5. Run the bot:
```bash
npm start
```

6. Scan the QR code with your WhatsApp to authenticate

### Cloud Deployment

This bot is ready to deploy on:
- ✅ **Render.com** - See `render.yaml` and `DEPLOYMENT.md`
- ✅ **Bot-Hosting.net** - See `DEPLOYMENT.md`
- ✅ **Katabump.com** - See `DEPLOYMENT.md`
- ✅ **Railway.app** - See `railway.json` and `DEPLOYMENT.md`
- ✅ **Heroku** - See `Procfile` and `app.json`
- ✅ **Replit** - See `DEPLOYMENT.md`

**Quick Deploy:**
1. Push code to GitHub/GitLab
2. Connect repository to your chosen platform
3. Set environment variables (especially `OWNER_NUMBER`)
4. Deploy!

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

**Health Check:** The bot includes a health check endpoint at `/health` for monitoring.

## Configuration

### Owner Number
Set your phone number in the environment variable `OWNER_NUMBER` or edit `index.js`:
```javascript
const OWNER_NUMBER = process.env.OWNER_NUMBER || 'YOUR_NUMBER_HERE';
```

### Bot Mode
- **Public**: Everyone can use the bot
- **Private**: Only owner can use the bot

Change mode with: `.mode public` or `.mode private` (owner only)

## Commands

### General Commands
- `.help` or `.menu` - Show command menu
- `.ping` - Check bot latency
- `.alive` - Check if bot is running
- `.tts <text>` - Convert text to speech
- `.joke` - Get a random joke
- `.quote` - Get a random quote
- `.fact` - Get a random fact
- `.weather <city>` - Get weather information
- `.news` - Get top news
- `.lyrics <song>` - Get song lyrics
- `.8ball <question>` - Ask the magic 8-ball
- `.groupinfo` - Get group information
- `.staff` or `.admins` - List group admins
- `.jid` - Get JID
- `.url` - Get group invite link

### Admin Commands
- `.ban @user` - Ban a user
- `.kick @user` - Kick a user
- `.promote @user` - Promote user to admin
- `.demote @user` - Demote admin
- `.mute <minutes>` - Mute group
- `.unmute` - Unmute group
- `.warn @user` - Warn a user
- `.warnings @user` - Check user warnings
- `.tagall` - Tag all members
- `.setgdesc <description>` - Set group description
- `.setgname <name>` - Set group name
- `.setgpp` - Set group picture (reply to image)

### Owner Commands
- `.mode <public/private>` - Set bot mode
- `.settings` - View bot settings
- `.autoreact <on/off>` - Toggle auto react
- `.autostatus <on/off>` - Toggle auto status
- `.anticall <on/off>` - Toggle anti call
- `.pmblocker <on/off>` - Toggle PM blocker
- `.cleartmp` - Clear temporary files
- `.setpp` - Set bot profile picture

### Image/Sticker Commands
- `.sticker` - Convert image to sticker (reply to image)
- `.blur` - Blur image (reply to image)
- `.meme` - Get random meme
- `.crop` - Crop image (reply to image)

### Game Commands
- `.tictactoe @user` - Start tic-tac-toe game
- `.hangman` - Start hangman game
- `.guess <letter>` - Guess in hangman
- `.trivia` - Start trivia game
- `.answer <answer>` - Answer trivia
- `.truth` - Get truth question
- `.dare` - Get dare challenge

### AI Commands
- `.gpt <question>` - Ask GPT (requires OpenAI API key)
- `.gemini <question>` - Ask Gemini (requires Gemini API key)
- `.imagine <prompt>` - Generate image (requires OpenAI API key)

### Fun Commands
- `.compliment @user` - Compliment a user
- `.insult @user` - Insult a user (playful)
- `.flirt` - Get a flirt line
- `.shayari` - Get shayari
- `.ship @user1 @user2` - Ship two users
- `.simp @user` - Check simp level

### Textmaker Commands
- `.metallic <text>` - Metallic text effect
- `.ice <text>` - Ice text effect
- `.neon <text>` - Neon text effect
- `.fire <text>` - Fire text effect
- And many more...

### Downloader Commands
- `.play <song>` - Search and play song
- `.ytmp4 <url>` - Download YouTube video
- `.instagram <url>` - Download Instagram media
- `.tiktok <url>` - Download TikTok video

### Anime Commands
- `.neko` - Get neko image
- `.waifu` - Get waifu image
- `.kiss` - Get kiss GIF
- `.hug` - Get hug GIF
- `.pat` - Get pat GIF
- And more...

## Requirements

- Node.js 18+
- WhatsApp account
- Internet connection
- (Optional) API keys for advanced features:
  - OpenAI API key for GPT and image generation
  - Google Gemini API key for Gemini
  - Weather API key for weather command
  - News API key for news command

## Notes

- Some features require API keys
- Make sure to set your owner number
- The bot uses WhatsApp Web, so keep your phone connected
- Some commands may require specific permissions

## Troubleshooting

1. **QR Code not showing**: Make sure you have a stable internet connection
2. **Commands not working**: Check if bot mode is set correctly
3. **API errors**: Make sure API keys are set correctly
4. **Permission errors**: Some commands require admin/owner permissions

## License

MIT License

## Credits

Created by MR•TOKYO
YT: Mr Unique Hacker

## Support

For issues and questions, please check the code or create an issue.

---

**Disclaimer**: This bot is for educational purposes. Use responsibly and in accordance with WhatsApp's Terms of Service.

