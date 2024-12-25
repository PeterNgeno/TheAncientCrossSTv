require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Environment variables for RTMP URL and Stream Key
const RTMP_URL = process.env.RTMP_URL;
const RTMP_STREAM_KEY = process.env.RTMP_STREAM_KEY;

// Serve static files for the front-end
app.use(express.static('public'));

// Endpoint to fetch RTMP stream configuration
app.get('/api/stream-config', (req, res) => {
    try {
        // Return the RTMP URL and Stream Key for the client or internal services
        res.json({
            rtmpUrl: RTMP_URL,
            streamKey: RTMP_STREAM_KEY,
            fullRtmpUrl: `${RTMP_URL}/${RTMP_STREAM_KEY}`,
        });
    } catch (error) {
        console.error('Error fetching stream configuration:', error);
        res.status(500).json({ error: 'Failed to fetch stream configuration' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
