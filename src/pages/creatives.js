import { useState } from 'react';
import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_POSTSOrderCreatives } from '../lib/queries';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTSOrderCreatives, { client });
  const [selectedCreative, setSelectedCreative] = useState(null);
  const [hoveredCreativeId, setHoveredCreativeId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null); // Stato per l'indice dell'immagine fullscreen

  if (loading) return <p>Loading...</p>;
  if (error) {
    alert('err');
    console.error('Errore nella query:', error.message);
    return <p>Error: {error.message}</p>;
  }

  const handleClick = (creativeId) => {
    if (selectedCreative === creativeId) {
      setSelectedCreative(null);
    } else {
      setSelectedCreative(null);
      setTimeout(() => {
        setSelectedCreative(creativeId);
      }, 500);
    }
  };

  const handleMouseMove = (event) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleImageClick = (index) => {
    setFullscreenImageIndex(index); // Imposta l'indice dell'immagine cliccata
  };

  const closeFullscreen = () => {
    setFullscreenImageIndex(null); // Chiudi l'immagine a schermo intero
  };

  const handleNextImage = (images) => {
    setFullscreenImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Passa all'immagine successiva
  };

  const handlePrevImage = (images) => {
    setFullscreenImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); // Torna all'immagine precedente
  };

  return (
    <main style={{ marginTop: '180px', background: '' }}>
      {fullscreenImageIndex !== null && ( // Mostra l'overlay solo se fullscreenImageIndex è impostato
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1001,
          }}
          onClick={closeFullscreen} // Chiudi l'overlay al clic
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevImage(data.creativesOrders[0].creative[selectedCreative].projects);
            }}
            style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.5)',
              border: 'none',
              cursor: 'pointer',
              padding: '10px',
              zIndex: 1002,
            }}
          >
            prev
          </button>

          <img
            src={
              data.creativesOrders[0].creative[selectedCreative].projects[fullscreenImageIndex].cover.url
            }
            alt="Fullscreen"
            style={{ maxWidth: '90%', maxHeight: '90%' }}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage(data.creativesOrders[0].creative[selectedCreative].projects);
            }}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.5)',
              border: 'none',
              cursor: 'pointer',
              padding: '10px',
              zIndex: 1002,
            }}
          >
            next
          </button>
        </div>
      )}

      <div style={{ display: 'block', color: 'black', width: 'max-content', paddingLeft: '0px',paddingBottom:'140px' }}>
        {data.creativesOrders[0].creative.map((creative, creativeIndex) => (
          <div  onMouseEnter={() => setHoveredCreativeId(creative.id)}
          onMouseLeave={() => setHoveredCreativeId(null)}
          onMouseMove={handleMouseMove}
          style={{
            paddingBottom: selectedCreative === creativeIndex ? '30px' : '0',
            height: 'auto', width: '100vw' ,transition:'padding-bottom 0.4s'
          }}
          key={creative.id}>
            <h1
              className='nameCreative'
              onClick={() => handleClick(creativeIndex)}
             
              style={{ cursor: 'pointer', marginLeft: '45px' }}
            >
              {creative.name}
            </h1>

            {creative.gif?.url && hoveredCreativeId === creative.id && selectedCreative !== creativeIndex && (
              <img
                className="magicGif"
                src={creative.gif.url}
                alt="Preview GIF"
                style={{
                  position: 'absolute',
                  top: `${mousePosition.y - 50}px`,
                  left: `${mousePosition.x + 60}px`,
                  width: '150px',
                  transform: 'translate(10px, -50%)',
                  pointerEvents: 'none',
                  zIndex: 1000,
                }}
              />
            )}

            <div
              style={{
                maxHeight: selectedCreative === creativeIndex ? '400px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.5s',
                marginTop: '10px',
                display: 'flex',
                gridTemplateRows: 'repeat(1, auto)',
                gridAutoFlow: 'column',
                gap: '0px',
                columnGap: '5px',
                overflowX: 'scroll',
              }}
              className="custom-scroll"
            >
              {creative.projects.map((project, index) => (
                <img
                  className="projectsImage"
                  key={index}
                  src={project.cover.url}
                  alt={`Image ${index + 1}`}
                  onClick={() => handleImageClick(index)} // Imposta l'indice per il fullscreen
                  style={{
                    height: '300px',
                    width: 'auto',
                    marginBottom: '0px',
                    paddingBottom:'15px',
                    cursor: 'pointer', // Mostra che l'immagine è cliccabile
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Sidebar />
      <img className="ajImg2" src="/AJCOLLECTIVE_LOGO.png" />

    </main>
  );
}
