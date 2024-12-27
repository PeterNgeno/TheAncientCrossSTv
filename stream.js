const { exec } = require('child_process');

// Restream.io RTMP URL and key from environment variable
const restreamUrl = 'rtmp://live.restream.io/live';
const restreamStreamKey = process.env.RESTREAM_STREAM_KEY;  // From .env file

// Function to stream to Restream.io using FFmpeg
function streamToRestream(videoId) {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const command = `ffmpeg -i "yt-dlp ${youtubeUrl}" -c:v libx264 -preset fast -f flv ${restreamUrl}/${restreamStreamKey}`;

  exec(command, (err, stdout, stderr) => {
    if (err) {
      console.error('Error streaming to Restream:', err);
      return;
    }
    console.log('Streaming to Restream:', stdout);
  });
}

module.exports = { streamToRestream };
