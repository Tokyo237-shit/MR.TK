// Utility functions for MR.TK Bot
const fs = require('fs');
const path = require('path');
const axios = require('axios');
// For media compatibility with handlers, use local compat layer when needed

// Store game states
const gameStates = {
    tictactoe: {},
    hangman: {},
    trivia: {}
};

// Store group settings
const groupSettings = {};

// Store warnings
const warnings = {};

// Helper functions
async function isOwner(message, ownerNumber) {
    try {
        const contact = await message.getContact();
        const senderNumber = (contact.number || '').replace('@c.us', '').replace('@s.whatsapp.net', '');
        return senderNumber === ownerNumber;
    } catch (error) {
        return false;
    }
}

async function isAdmin(message) {
    try {
        const chat = await message.getChat();
        if (!chat.isGroup) return false;
        const participants = chat.participants || [];
        const me = participants.find(p => p?.id === message.from || p?.id?.split(':')[0] === message.from);
        return !!(me && me.admin);
    } catch (error) {
        return false;
    }
}

function extractYouTubeUrl(text) {
    const urlRegex = /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = text.match(urlRegex);
    return match ? (match[1] ? match[0] : 'https://' + match[0]) : null;
}

function getGroupId(chat) {
    return chat.id._serialized || chat.id;
}

function getUserId(contact) {
    return contact.id._serialized || contact.id;
}

// Textmaker API helper
async function generateTextEffect(text, effect) {
    try {
        const effects = {
            metallic: 1,
            ice: 2,
            snow: 3,
            impressive: 4,
            matrix: 5,
            light: 6,
            neon: 7,
            devil: 8,
            purple: 9,
            thunder: 10,
            leaves: 11,
            '1917': 12,
            arena: 13,
            hacker: 14,
            sand: 15,
            blackpink: 16,
            glitch: 17,
            fire: 18
        };
        
        const effectId = effects[effect.toLowerCase()];
        if (!effectId) return null;
        
        const response = await axios.post(`https://api.textpro.me/api/v1/${effectId}`, {
            text: text
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        
        return response.data.image_url;
    } catch (error) {
        console.error('Text effect error:', error);
        return null;
    }
}

// Image manipulation helpers
async function blurImage(imageBuffer) {
    const sharp = require('sharp');
    return await sharp(imageBuffer)
        .blur(10)
        .toBuffer();
}

async function removeBackground(imageBuffer) {
    // This would require a background removal API
    // For now, return original image
    return imageBuffer;
}

// Meme generator helper
async function generateMemeImage(template, topText, bottomText) {
    // This would use a meme API or canvas
    // Placeholder implementation
    return null;
}

// Download helpers
async function downloadInstagram(url) {
    try {
        // Using a public Instagram downloader API
        const response = await axios.get(`https://api.saveig.app/api/ajaxSearch`, {
            params: {
                q: url,
                t: 'media',
                lang: 'en'
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
}

async function downloadTikTok(url) {
    try {
        const response = await axios.get(`https://api.tiklydown.eu.org/api/download`, {
            params: {
                url: url
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
}

async function downloadFacebook(url) {
    try {
        const response = await axios.get(`https://api.saveig.app/api/ajaxSearch`, {
            params: {
                q: url,
                t: 'media',
                lang: 'en'
            }
        });
        return response.data;
    } catch (error) {
        return null;
    }
}

// Screenshot helper
async function takeScreenshot(url) {
    try {
        const puppeteer = require('puppeteer');
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        const screenshot = await page.screenshot({ type: 'png', fullPage: true });
        await browser.close();
        return screenshot;
    } catch (error) {
        console.error('Screenshot error:', error);
        return null;
    }
}

// Character card generator
async function generateCharacterCard(userInfo) {
    // This would use canvas to create a character card
    // Placeholder
    return null;
}

module.exports = {
    gameStates,
    groupSettings,
    warnings,
    isOwner,
    isAdmin,
    extractYouTubeUrl,
    getGroupId,
    getUserId,
    generateTextEffect,
    blurImage,
    removeBackground,
    generateMemeImage,
    downloadInstagram,
    downloadTikTok,
    downloadFacebook,
    takeScreenshot,
    generateCharacterCard
};

