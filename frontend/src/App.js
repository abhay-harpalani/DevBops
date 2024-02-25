import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Playlists from './Playlists';
import Quiz from './Quiz';
import Playback from './Playback';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/playback" element={<Playback />} />
      </Routes>
    </Router>
  );
}

export default App;

