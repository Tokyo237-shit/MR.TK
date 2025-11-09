// Baileys adapter to make handlers compatible with Baileys API
const { downloadMediaMessage, getContentType } = require('@whiskeysockets/baileys');

class MessageAdapter {
    constructor(sock, msg, jid) {
        this.sock = sock;
        this.msg = msg;
        this.jid = jid;
        // actual sender in groups is participant, otherwise remoteJid
        this.sender = msg.key.participant || jid;
        this.from = this.sender;
        this.key = msg.key;
        this.fromMe = msg.key.fromMe;
        
        // Extract message content
        const message = msg.message;
        this.message = message;
        
        // Get text content
        this.body = this._getText(message) || '';
        this.content = this.body.toLowerCase().trim();
        
        // Check if has media
        this.hasMedia = !!(
            message.imageMessage ||
            message.videoMessage ||
            message.audioMessage ||
            message.documentMessage ||
            message.stickerMessage
        );
        
        // Check message type
        this.type = getContentType(message) || 'text';
        
        // Check if view once
        this.isViewOnce = !!(
            message.viewOnceMessage ||
            message.viewOnceMessageV2
        );
        
        // Check if has quoted message
        this.hasQuotedMsg = !!(
            message.extendedTextMessage?.contextInfo?.quotedMessage
        );
        
        // Cache for async operations
        this._chat = null;
        this._contact = null;
        this._quotedMsg = null;
    }
    
    _getText(message) {
        if (!message) return '';
        if (message.conversation) return message.conversation;
        if (message.extendedTextMessage?.text) return message.extendedTextMessage.text;
        if (message.imageMessage?.caption) return message.imageMessage.caption;
        if (message.videoMessage?.caption) return message.videoMessage.caption;
        return '';
    }
    
    async reply(text, options = {}) {
        try {
            await this.sock.sendMessage(this.jid, { text: text }, options);
        } catch (error) {
            console.error('Error replying:', error);
        }
    }
    
    async getChat() {
        if (this._chat) return this._chat;
        
        const isGroup = this.jid.endsWith('@g.us');
        const metadata = isGroup ? await this.sock.groupMetadata(this.jid).catch(() => null) : null;
        
        this._chat = {
            id: this.jid,
            isGroup: isGroup,
            name: metadata?.subject || 'Private Chat',
            description: metadata?.desc || '',
            participants: metadata?.participants || [],
            createdAt: metadata?.creation || null
        };
        
        return this._chat;
    }
    
    async getContact() {
        if (this._contact) return this._contact;
        
        try {
            const jid = this.sender;
            const [result] = await this.sock.onWhatsApp(jid);
            const profile = await this.sock.profilePictureUrl(jid, 'image').catch(() => null);
            
            this._contact = {
                id: jid,
                number: jid.split('@')[0],
                pushname: result?.name || jid.split('@')[0],
                profilePicUrl: profile
            };
        } catch (error) {
            this._contact = {
                id: this.sender,
                number: this.sender.split('@')[0],
                pushname: this.sender.split('@')[0],
                profilePicUrl: null
            };
        }
        
        return this._contact;
    }
    
    async getQuotedMessage() {
        if (this._quotedMsg) return this._quotedMsg;
        
        if (!this.hasQuotedMsg) return null;
        
        const quoted = this.message.extendedTextMessage?.contextInfo?.quotedMessage;
        const quotedKey = this.message.extendedTextMessage?.contextInfo?.stanzaId;
        const quotedJid = this.message.extendedTextMessage?.contextInfo?.participant || this.jid;
        
        if (!quoted) return null;
        
        // Create a mock quoted message
        this._quotedMsg = {
            key: { remoteJid: quotedJid, id: quotedKey },
            message: quoted,
            hasMedia: !!(
                quoted.imageMessage ||
                quoted.videoMessage ||
                quoted.audioMessage ||
                quoted.documentMessage ||
                quoted.stickerMessage
            ),
            body: this._getText(quoted),
            downloadMedia: async () => {
                try {
                    const buffer = await downloadMediaMessage(
                        { key: { remoteJid: quotedJid, id: quotedKey }, message: quoted },
                        'buffer',
                        {},
                        { logger: this.sock.logger, reuploadRequest: this.sock.updateMediaMessage }
                    );
                    return {
                        data: buffer.toString('base64'),
                        mimetype: quoted.imageMessage?.mimetype || quoted.videoMessage?.mimetype || 'image/jpeg'
                    };
                } catch (error) {
                    return null;
                }
            }
        };
        
        return this._quotedMsg;
    }
    
    async getMentions() {
        const mentions = this.message.extendedTextMessage?.contextInfo?.mentionedJid || [];
        const result = [];
        
        for (const jid of mentions) {
            try {
                const [contact] = await this.sock.onWhatsApp(jid);
                result.push({
                    id: jid,
                    number: jid.split('@')[0],
                    pushname: contact?.name || jid.split('@')[0]
                });
            } catch (error) {
                result.push({
                    id: jid,
                    number: jid.split('@')[0],
                    pushname: jid.split('@')[0]
                });
            }
        }
        
        return result;
    }
    
    async downloadMedia() {
        if (!this.hasMedia) return null;
        
        try {
            const buffer = await downloadMediaMessage(
                this.msg,
                'buffer',
                {},
                { logger: this.sock.logger, reuploadRequest: this.sock.updateMediaMessage }
            );
            
            const mimetype = 
                this.message.imageMessage?.mimetype ||
                this.message.videoMessage?.mimetype ||
                this.message.audioMessage?.mimetype ||
                this.message.documentMessage?.mimetype ||
                this.message.stickerMessage?.mimetype ||
                'image/jpeg';
            
            return {
                data: buffer.toString('base64'),
                mimetype: mimetype
            };
        } catch (error) {
            console.error('Error downloading media:', error);
            return null;
        }
    }
    
    delete() {
        return this.sock.sendMessage(this.jid, { delete: this.key });
    }
}

module.exports = MessageAdapter;

