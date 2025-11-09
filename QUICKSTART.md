# Quick Start Guide

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Owner Number

Edit `index.js` and set your phone number:

```javascript
const OWNER_NUMBER = process.env.OWNER_NUMBER || 'YOUR_NUMBER_HERE';
```

Replace `YOUR_NUMBER_HERE` with your phone number (with country code, no + or spaces).

Example: `1234567890` for US number +1 (234) 567-890

## Step 3: Run the Bot

```bash
npm start
```

## Step 4: Scan QR Code

1. A QR code will appear in your terminal
2. Open WhatsApp on your phone
3. Go to Settings > Linked Devices
4. Tap "Link a Device"
5. Scan the QR code

## Step 5: Test the Bot

Send `.help` or `.menu` to any chat to see all available commands.

## Optional: Set API Keys

For advanced features, set these environment variables:

```bash
# Windows (PowerShell)
$env:OPENAI_API_KEY="your_key_here"
$env:GEMINI_API_KEY="your_key_here"
$env:WEATHER_API_KEY="your_key_here"

# Linux/Mac
export OPENAI_API_KEY="your_key_here"
export GEMINI_API_KEY="your_key_here"
export WEATHER_API_KEY="your_key_here"
```

Or create a `.env` file (if using dotenv package):

```
OWNER_NUMBER=1234567890
OPENAI_API_KEY=your_key_here
GEMINI_API_KEY=your_key_here
WEATHER_API_KEY=your_key_here
```

## Common Commands

- `.help` - Show all commands
- `.ping` - Check bot latency
- `.joke` - Get a random joke
- `.sticker` - Convert image to sticker (reply to image)
- `.neko` - Get neko image
- `.meme` - Get random meme

## Troubleshooting

**QR Code not showing?**
- Check your internet connection
- Make sure port 8080 is not blocked

**Commands not working?**
- Check if bot mode is set to 'public' (owner command: `.mode public`)
- Make sure you're using the correct command prefix (`.`)

**Bot not responding?**
- Check console for errors
- Make sure WhatsApp is connected on your phone
- Try restarting the bot

## Need Help?

Check the main README.md for detailed documentation.

