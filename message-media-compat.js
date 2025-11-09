// MessageMedia compatibility layer for Baileys
// This mimics whatsapp-web.js MessageMedia API

class MessageMedia {
    constructor(mimetype, data, filename = null) {
        this.mimetype = mimetype;
        this.data = data;
        this.filename = filename;
    }
    
    static fromFilePath(filePath) {
        const fs = require('fs');
        const path = require('path');
        const buffer = fs.readFileSync(filePath);
        const mimetype = this._getMimeType(filePath);
        return new MessageMedia(mimetype, buffer.toString('base64'), path.basename(filePath));
    }
    
    static async fromUrl(url) {
        const axios = require('axios');
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);
        const mimetype = response.headers['content-type'] || 'image/jpeg';
        return new MessageMedia(mimetype, buffer.toString('base64'));
    }
    
    static _getMimeType(filePath) {
        const ext = filePath.split('.').pop().toLowerCase();
        const mimeTypes = {
            'jpg': 'image/jpeg',
            'jpeg': 'image/jpeg',
            'png': 'image/png',
            'gif': 'image/gif',
            'webp': 'image/webp',
            'mp4': 'video/mp4',
            'mp3': 'audio/mpeg',
            'ogg': 'audio/ogg',
            'pdf': 'application/pdf',
            'doc': 'application/msword',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        };
        return mimeTypes[ext] || 'application/octet-stream';
    }
}

module.exports = { MessageMedia };

