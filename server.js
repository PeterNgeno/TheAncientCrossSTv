require('dotenv').config();  // Load environment variables from .env
const express = require('express');
const path = require('path');
const { getLiveStream, getPlaylistVideos } = require('./youtube');
const { streamToRestream } = require('./stream');

const app = express();
const port = 3000;

// Serve static files like images from the /public directory
app.use(express.static(path.join(__dirname, 'public')));

// Interval time in milliseconds (e.g., 60,000ms = 1 minute)
const checkInterval = 60000; // 1 minute

// Function to start auto-streaming
async function startAutoStreaming() {
  setInterval(async () => {
    let liveVideoId = await getLiveStream();

    if (liveVideoId) {
      console.log(`Live stream found: ${liveVideoId}`);
      streamToRestream(liveVideoId);
    } else {
      console.log('No live stream found. Fallback to playlist.');
      const playlistVideos = await getPlaylistVideos();

      if (playlistVideos.length > 0) {
        console.log(`Streaming video from playlist: ${playlistVideos[0]}`);
        streamToRestream(playlistVideos[0]);
      } else {
        console.log('No videos found in playlist.');
      }
    }
  }, checkInterval); // Check every minute
}

// Serve the profile picture
app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'images', '20241226_184553.jpg'));
});

// Start the server and begin auto-streaming
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  startAutoStreaming(); // Start the auto-streaming loop
});
