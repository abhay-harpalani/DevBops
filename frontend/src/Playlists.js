import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Playlist.css'; 

const PlaylistsWithTracks = () => {
  const [playlists, setPlaylists] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate


  const token = new URLSearchParams(window.location.search).get('access_token');
  localStorage.setItem('spotify_access_token', token);

  // Function to fetch playlists
  const fetchPlaylists = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch playlists: ${response.statusText}`);
      }

      const data = await response.json();
      setPlaylists(data.items);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (token) fetchPlaylists();
  }, [token]);

  const redirectToQuiz = () => {
    navigate('/quiz'); // Use navigate to change the route to /quiz
  };


  // Function to fetch tracks for a selected playlist
  const fetchPlaylistTracks = async (playlistId) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch tracks: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Tracks data:', data); // Log the fetched tracks data
      setSelectedTracks(data.items); // Each item represents a track
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Your Playlists</h2>
        <button onClick={redirectToQuiz} className="button">Take the Quiz</button>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="playlist-list">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-item" onClick={() => fetchPlaylistTracks(playlist.id)}>
            <h3>{playlist.name}</h3>
            <button className="button" onClick={() => fetchPlaylistTracks(playlist.id)}>View Tracks</button>
          </div>
        ))}
      </div>

      <div className="track-list">
        <h2>Tracks</h2>
        {selectedTracks.map((trackItem, index) => (
          <div key={index} className="track-item">
            <p>
              {/* <strong>Track:</strong> {trackItem.track.name} <br /> */}
              <strong>Artists:</strong> {trackItem.track.artists.map(artist => artist.name).join(', ')} <br />
              <strong>Album:</strong> <a href={trackItem.track.album.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="album-link">{trackItem.track.album.name}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaylistsWithTracks;
