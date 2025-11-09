// Express server for health checks and deployment platforms
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5001;

// Store QR code for cloud access
let qrCodeData = null;
let botStatus = 'initializing';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS for cloud platforms
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Health check endpoint (required by Render, Railway, etc.)
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        message: 'MR.TK Bot is running',
        botStatus: botStatus
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        name: 'MR.TK Bot',
        version: '2.2.2',
        status: 'online',
        botStatus: botStatus,
        author: 'MR•TOKYO',
        endpoints: {
            health: '/health',
            status: '/status',
            qr: '/qr'
        }
    });
});

// Status endpoint
app.get('/status', (req, res) => {
    res.json({
        bot: 'MR.TK Bot',
        version: '2.2.2',
        status: 'running',
        botStatus: botStatus,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        node: process.version,
        platform: process.platform,
        env: process.env.NODE_ENV || 'development'
    });
});

// QR Code endpoint (for cloud platforms)
app.get('/qr', (req, res) => {
    if (qrCodeData) {
        res.json({
            qr: qrCodeData,
            message: 'Scan this QR code with WhatsApp',
            instructions: [
                '1. Open WhatsApp on your phone',
                '2. Go to Settings → Linked Devices',
                '3. Tap "Link a Device"',
                '4. Scan the QR code'
            ]
        });
    } else {
        res.json({
            qr: null,
            message: 'QR code not available yet. Bot may already be connected.',
            botStatus: botStatus
        });
    }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌐 Health check server running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`📱 QR Code: http://localhost:${PORT}/qr`);
    
    // Log public URL if available
    if (process.env.RENDER_EXTERNAL_URL) {
        console.log(`🌍 Public URL: ${process.env.RENDER_EXTERNAL_URL}`);
        console.log(`📱 Public QR: ${process.env.RENDER_EXTERNAL_URL}/qr`);
    } else if (process.env.RAILWAY_PUBLIC_DOMAIN) {
        console.log(`🌍 Public URL: https://${process.env.RAILWAY_PUBLIC_DOMAIN}`);
        console.log(`📱 Public QR: https://${process.env.RAILWAY_PUBLIC_DOMAIN}/qr`);
    }
});

// Export functions to update bot status and QR code
module.exports = {
    app,
    setQRCode: (qr) => {
        qrCodeData = qr;
    },
    setBotStatus: (status) => {
        botStatus = status;
    }
};

