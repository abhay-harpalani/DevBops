import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QuizProvider } from './QuizContext'; // Import your QuizProvider
import Home from './Home';
import Playlists from './Playlists';
import Playback from './Playback'; // Assuming this is your component that uses useQuizResults
import Quiz from './Quiz';

function App() {
  return (
    <QuizProvider> {/* Wrap your app or relevant part with QuizProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/playback" element={<Playback />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;


