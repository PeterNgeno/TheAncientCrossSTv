require('dotenv').config();
const express = require('express');
const { exec } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

const RTMP_URL = process.env.RTMP_URL;
const RTMP_STREAM_KEY = process.env.RTMP_STREAM_KEY;
const FULL_RTMP_URL = `${RTMP_URL}/${RTMP_STREAM_KEY}`;
const VIDEO_PATH = '/path/to/video.mp4'; // Replace this with your video file or playlist path

// Function to start FFmpeg streaming
const startStreaming = () => {
    const command = `ffmpeg -re -stream_loop -1 -i ${VIDEO_PATH} -c:v libx264 -preset veryfast -maxrate 3000k -bufsize 6000k -g 50 -c:a aac -b:a 128k -f flv ${FULL_RTMP_URL}`;
    console.log(`Starting streaming to: ${FULL_RTMP_URL}`);
    const process = exec(command);

    process.stdout.on('data', (data) => console.log(`FFmpeg Output: ${data}`));
    process.stderr.on('data', (data) => console.error(`FFmpeg Error: ${data}`));
    process.on('exit', (code) => console.log(`FFmpeg Process Exited with Code: ${code}`));
};

// Automatically start streaming when the server starts
startStreaming();

// Serve static files for the front-end
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
