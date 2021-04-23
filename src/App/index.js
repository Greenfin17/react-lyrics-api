import React, { useState } from 'react';
import './App.scss';
import getLyrics from '../helpers/data/lyicsData';

function App() {
  const [songArtist, setSongArtist] = useState('');
  const [songTitle, setSongTitle] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [found, setFound] = useState(false);
  const [initial, setInitial] = useState(true);

  const handleClick = (e) => {
    setInitial(false);
    e.preventDefault();
    const artist = e.target.form[0].value;
    const title = e.target.form[1].value;
    setSongArtist(artist);
    setSongTitle(title);
    const songObj = {
      artist,
      title
    };
    console.warn(songObj);
    if (artist && title) {
      getLyrics(songObj).then((song) => {
        if (song) {
          setLyrics(song.lyrics);
          setFound(true);
        } else {
          setFound(false);
        }
      });
    } else {
      setFound(false);
    }
  };

  return (
    <div className='App'>
    <h1>Lyrics</h1>
      <div className='lyrics-form-container'>
        <div className='lyrics'>
          <form className='lyrics-form' style={{ width: '25em' }}>
          <div className='form-label'><h5>Search Lyrics</h5></div>
            <div className='form-group'>
              <label htmlFor='artist'>Artist</label>
              <input type="text" className='form-control' id="artist" />
            </div>
            <div className='form-group'>
              <label htmlFor="song-title">Song title:</label>
              <input type="text" className='form-control' id="song-title" />
            </div>
            <button type="submit" className='btn btn-primary' id="btn-lyrics-submit"
              onClick={handleClick}>Submit</button>
          </form>
        </div>
      </div>
      { found
      && <div className='lyrics-container'>
        <h4 className='song-title'>{songTitle}</h4>
        <h6 className='song-artist'>By: {songArtist}</h6>
        <div className='song-lyrics'>{lyrics}</div>
      </div> }
      { !found && !initial
      && <div className='lyrics-container'>
        <h4 className='song-title'>Song not found</h4>
      </div>}
    </div>
  );
}

export default App;
