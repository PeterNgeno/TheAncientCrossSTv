require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Endpoint to check if the live stream is on
app.get('/api/check-live-stream', async (req, res) => {
    try {
        const channelId = 'UCj0u9K7p0VZ29S_k7pCZ7QA';  // replace with actual channel ID
        const apiKey = process.env.YOUTUBE_API_KEY;
        
        // YouTube API call to check live stream status
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
            params: {
                part: 'snippet',
                channelId: channelId,
                eventType: 'live',
                type: 'video',
                key: apiKey
            }
        });
        
        if (response.data.items.length > 0) {
            const videoId = response.data.items[0].id.videoId;
            res.json({ liveStreamStatus: true, videoId: videoId });
        } else {
            res.json({ liveStreamStatus: false });
        }
    } catch (error) {
        console.error('Error fetching YouTube API:', error);
        res.status(500).json({ error: 'Failed to check live stream status' });
    }
});

// Serve static files for the front-end
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
