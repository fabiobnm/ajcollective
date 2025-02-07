import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_GIGI } from '../lib/queries';
import Sidebar from '../components/Sidebar';
import React, { useState } from 'react';

export default function Home() {
  const { loading, error, data } = useQuery(GET_GIGI, { client });
  const [selectedVideo, setSelectedVideo] = useState(null); // Stato per il video selezionato

  if (loading) return <p>Loading...</p>;
  if (error) {
    alert('err');
    console.error('Errore nella query:', error.message);
    return <p>Error: {error.message}</p>;
  }

  console.log('DATI:' + data.MoodFilmOlds[0].vimeoUrl);
  
  // Funzione per gestire il clic sulle immagini
  const handleImageClick = (videoUrl) => {
    setSelectedVideo(videoUrl); // Imposta l'URL del video selezionato
    console.log('video url:'+videoUrl)
  };

  // Funzione per chiudere il player
  const closePlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <main style={{ marginTop: '125px' }}>
      <div className='moodFilmsList'>
        {data.moodFilmOld.map((moodFilms) => (
          <div key={moodFilmOlds.id} style={{ marginBottom: '20px' }}>
            <img
              className='coverMoodFilm'
              src={moodFilms.cover.url}
              alt={moodFilms.title}
              onClick={() => handleImageClick(moodFilms.vimeoUrl)} // Passa l'URL Vimeo
            />
            <h1>{moodFilms.title}</h1>
            <h1>{moodFilms.editor}</h1>
          </div>
        ))}
      </div>

      <Sidebar />

      {/* Player Overlay */}
      {selectedVideo && (
        <div style={overlayStyles} onClick={closePlayer}>
          <div style={iframeContainerStyles} onClick={(e) => e.stopPropagation()}>
            <button style={closeButtonStyles} onClick={closePlayer}>✕</button>
            <iframe
              src={selectedVideo}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </main>
  );
}

// Stili per l'overlay del player
const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

// Stili per il container dell'iframe
const iframeContainerStyles = {
  position: 'relative',
  width: '80%',
  height: '80%'
};

// Stili per il pulsante di chiusura
const closeButtonStyles = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  fontSize: '24px',
  color: 'white',
  background: 'none',
  border: 'none',
  cursor: 'pointer'
};
