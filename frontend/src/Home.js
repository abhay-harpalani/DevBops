import React from 'react';
import './Home.css'; // Ensure this points to the correct path of your CSS file
import arrowIcon from './assets/images/arrow-icon.png'; // Adjust the path as necessary


const Home = () => {
  return (
    <div className="centered-div text-align-center">
  <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>DevBops | Custom Playlists for Developers</title>
      <link rel="stylesheet" href="https://use.typekit.net/clj0cwu.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="./Home.css" />
      <script src="%PUBLIC_URL%/script.js" type="text/javascript"></script>
    </head>

      <div className="joly-regular font-large">
        <h1>Dev Bops</h1>
      </div>
      <div className="joly-italic-thin font-medium">
        <p>Custom playlists for today's developers</p>
      </div>
      <div id="main-center-button-wrapper" className="joly-regular font-small">
        <div id="main-center-button">
          {/* Update this href to point to your backend's login route */}
          <a href="http://localhost:8888/login">Log in through Spotify</a>
          <div id="a-logo-wrapper">
            <div id="a-logo-img-wrapper">
              {/* Adjust the path to your image as necessary */}
              <img src={arrowIcon} alt="arrow icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
