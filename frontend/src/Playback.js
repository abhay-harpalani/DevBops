import React, { useEffect, useState } from 'react';

const Playback = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [energyLevel, setEnergyLevel] = useState(null); // State for energy level

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!energyLevel) return; // Don't fetch until an energy level is selected

      const token = localStorage.getItem('spotify_access_token');
      const instrumentalness = 0.35;
      const loudness = -5.0; // Assuming a more typical value for loudness
      
      let target_energy;
      if (energyLevel === 'low') target_energy = 0.33;
      else if (energyLevel === 'mid') target_energy = 0.66;
      else if (energyLevel === 'high') target_energy = 1;

      try {
        const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_tracks=0KLg44cKiJb8SVmIwsjL8u&target_instrumentalness=${instrumentalness}&target_loudness=${loudness}&target_energy=${target_energy}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) throw new Error('Failed to fetch recommendations');
        const data = await response.json();
        setRecommendations(data.tracks);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, [energyLevel]); // Dependency on energyLevel to re-fetch when it changes

  return (
    <div>
      <h2>Recommended Tracks</h2>
      {/* Buttons to select energy level */}
      <button onClick={() => setEnergyLevel('low')}>Chill / Docs</button>
      <button onClick={() => setEnergyLevel('mid')}>Middle Energy / Ideating</button>
      <button onClick={() => setEnergyLevel('high')}>High Energy / Coding</button>
      <ul>
        {recommendations.map(track => (
          <li key={track.id}>
            {track.name} by {track.artists.map(artist => artist.name).join(', ')} - 
            <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">Listen on Spotify</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playback;
