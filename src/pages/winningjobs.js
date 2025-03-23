import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_POSTSWinningJob } from '../lib/queries';
import Sidebar from '../components/Sidebar';
import React, { useEffect,useState } from 'react';
import Layout from '@/components/layout';

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTSWinningJob, { client });
  const [selectedVideo, setSelectedVideo] = useState(null); // Stato per il video selezionato

     // ✅ Usa useEffect per cambiare il background
      useEffect(() => {
        document.documentElement.style.background = "white"; // Cambia background di <html>
    
        return () => {
          document.documentElement.style.background = ""; // Resetta quando il componente si smonta
        };
      }, []);

  if (loading) return <p>Loading...</p>;
  if (error) {
    alert('err');
    console.error('Errore nella query:', error.message);
    return <p>Error: {error.message}</p>;
  }

  console.log('DATI:' + data.winningJobs[0]);
  
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
    <Layout>
    <main style={{ marginTop: '125px' }}>
      <div className='moodFilmsList'>
        {data.winningJobs.map((winningJob) => (
          <div key={winningJob.id} style={{ marginBottom: '20px' }}>
            <img
              className='coverMoodFilm'
              src={winningJob.thumbnail.url}
              alt={winningJob.title}
              onClick={() => handleImageClick(winningJob.urlLink)} // Passa l'URL Vimeo
            />
            <h1>{winningJob.title}</h1>
            <h1>{winningJob.editor}</h1>
          </div>
        ))}
      </div>


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
    </Layout>
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
