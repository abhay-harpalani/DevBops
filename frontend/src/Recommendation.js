async function getRecommendationsAndCreatePlaylist(accessToken, userId, playlistName, seedGenres, seedArtists, seedTracks) {
    // Step 1: Create a new playlist
    const playlist = await createPlaylist(accessToken, userId, playlistName);
    const playlistId = playlist.id;

    // Step 2: Get recommendations based on seeds
    const recommendationsEndpoint = `https://api.spotify.com/v1/recommendations?limit=20&seed_genres=${seedGenres.join(',')}&seed_artists=${seedArtists.join(',')}&seed_tracks=${seedTracks.join(',')}`;
    const recommendationsResponse = await fetch(recommendationsEndpoint, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    });
    const recommendationsData = await recommendationsResponse.json();
    const trackUris = recommendationsData.tracks.map(track => track.uri);

    // Step 3: Add recommended tracks to the new playlist
    const addTracksEndpoint = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
    const addTracksResponse = await fetch(addTracksEndpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            uris: trackUris
        })
    });

    const addTracksData = await addTracksResponse.json();
    console.log(addTracksData); // Handle the response
}

async function createPlaylist(accessToken, userId, playlistName) {
    const endpoint = `https://api.spotify.com/v1/users/${userId}/playlists`;
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: playlistName,
            public: false // Set to true if you want the playlist to be public
        })
    });

    const data = await response.json();
    return data; // Contains playlist ID and other details
}