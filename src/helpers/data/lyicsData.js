// lyricsData.js

import axios from 'axios';

const dbUrl = 'https://api.lyrics.ovh/v1';

const getLyrics = (songObj) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/${songObj.artist}/${songObj.title}`).then((response) => {
    if (response.data) {
      resolve(response.data);
    } else {
      resolve([]);
    }
  }).catch((error) => reject(error));
});

export default getLyrics;
