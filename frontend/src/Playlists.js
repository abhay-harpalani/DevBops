import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <button onClick={redirectToQuiz}>Take the Quiz</button> {/* Add this button */}å
       {/* <button onClick={redirectToRecommendation}>View Recommendations</button> */}
      <h2>Your Playlists</h2>
      {error && <p>Error: {error}</p>}
      {playlists.map((playlist) => (
        <div key={playlist.id} onClick={() => fetchPlaylistTracks(playlist.id)}>
          <h3>{playlist.name}</h3>
        </div>
      ))}
      <div>
        <h2>Your Playlists</h2>
        {playlists.map(playlist => (
          <div key={playlist.id}>
            <h3>{playlist.name}</h3>
            <button onClick={() => fetchPlaylistTracks(playlist.id)}>View Tracks</button>
          </div>
        ))}
      </div>

      {/* track part here */}
        <div>
          <h2>Tracks</h2>
          {selectedTracks.map((trackItem, index) => {
            const { track } = trackItem;

            return (
              <div key={index}>
                <p>
                  <strong>ID:</strong> {track.id} <br />
                  localStorage.setItem('track_ids', token);
                  <strong>Track:</strong> {track.name} <br />
                  <strong>Artists:</strong> {track.artists.map(artist => artist.name).join(', ')}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PlaylistsWithTracks;
