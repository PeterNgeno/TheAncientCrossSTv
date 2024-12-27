const { google } = require('googleapis');

// YouTube API Key from environment variable
const API_KEY = process.env.YOUTUBE_API_KEY;
const youtube = google.youtube({
  version: 'v3',
  auth: API_KEY
});

// YouTube Channel ID and Playlist ID
const channelId = 'UC8JdZ3eC6Yv9pIhCSYOZLwQ'; // Replace with your channel ID
const playlistId = 'PL358U6AJ8gNHH_ZP-2MHXZHVP0fIcZieG'; // Replace with your playlist ID

// Function to get live stream from the channel
async function getLiveStream() {
  try {
    const res = await youtube.search.list({
      part: 'snippet',
      channelId: channelId,
      eventType: 'live',
      type: 'video'
    });

    if (res.data.items.length > 0) {
      return res.data.items[0].id.videoId;
    } else {
      return null;
    }
  } catch (err) {
    console.error('Error fetching live stream:', err);
  }
}

// Function to get videos from the playlist
async function getPlaylistVideos() {
  try {
    const res = await youtube.playlistItems.list({
      part: 'snippet',
      playlistId: playlistId
    });

    return res.data.items.map(item => item.snippet.resourceId.videoId);
  } catch (err) {
    console.error('Error fetching playlist videos:', err);
  }
}

module.exports = { getLiveStream, getPlaylistVideos };
