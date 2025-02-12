import { useEffect, useState } from 'react';
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
  const [projectsLength, setProjectsLength] = useState(0);

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

  console.log(data);
  

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

  const handleImageClick = (index, projectsLength) => {
    setFullscreenImageIndex(index);
    setProjectsLength(projectsLength); // Salva il valore della lunghezza
    console.log('length'+projectsLength);
    
  };

  const closeFullscreen = () => {
    setFullscreenImageIndex(null); // Chiudi l'immagine a schermo intero
  };

  const handleNextImage = (images, images2) => {
    setFullscreenImageIndex((prevIndex) => (prevIndex + 1) % (data.creativesOrders[0].creative[selectedCreative].projects.length + data.creativesOrders[0].creative[selectedCreative].moodFilms.length) ); // Passa all'immagine successiva
  console.log('numerillo'+fullscreenImageIndex);
  
};

  const handlePrevImage = (images) => {
    setFullscreenImageIndex((prevIndex) => (prevIndex - 1 + (data.creativesOrders[0].creative[selectedCreative].projects.length + data.creativesOrders[0].creative[selectedCreative].moodFilms.length)) % (data.creativesOrders[0].creative[selectedCreative].projects.length + data.creativesOrders[0].creative[selectedCreative].moodFilms.length)); // Torna all'immagine precedente
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
              background: 'none',
              color:'white',              
              border: 'none',
              cursor: 'pointer',
              padding: '10px',
              zIndex: 1002,
            }}
          >
            prev
          </button>

          <img className='popUpImg'
                src={fullscreenImageIndex < projectsLength
                ? data.creativesOrders[0].creative[selectedCreative].projects[fullscreenImageIndex].cover.url
                : data.creativesOrders[0].creative[selectedCreative].moodFilms[fullscreenImageIndex - projectsLength].thumbnail.url
                }
               alt="Fullscreen"
              style={{ maxWidth: '90%', maxHeight: '90%' }}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextImage(fullscreenImageIndex <  data.creativesOrders[0].creative[selectedCreative].projects.length
                ?(data.creativesOrders[0].creative[selectedCreative].projects, data.creativesOrders[0].creative[selectedCreative].moodFilms )
                :(data.creativesOrders[0].creative[selectedCreative].moodFilms, data.creativesOrders[0].creative[selectedCreative].projects)
            );
            }}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              color:'white',
              border: 'none',
              cursor: 'pointer',
              padding: '10px',
              zIndex: 1002,
            }}
          >
            next
          </button>
         
          { (fullscreenImageIndex < projectsLength
                ? data.creativesOrders[0].creative[selectedCreative].projects[fullscreenImageIndex].urlLink
                : data.creativesOrders[0].creative[selectedCreative].moodFilms[fullscreenImageIndex - projectsLength].urlLink) && (
  <button 
    onClick={() => {
      window.open(
        (fullscreenImageIndex < projectsLength
            ?data.creativesOrders[0].creative[selectedCreative].projects[fullscreenImageIndex].urlLink
            : data.creativesOrders[0].creative[selectedCreative].moodFilms[fullscreenImageIndex - projectsLength].urlLink
        ),
        '_blank'
      ); // Reindirizza al link
    }}
    
    style={{
      background: fullscreenImageIndex < projectsLength
        ?'white'
        :'#ffa3d7',
      position: 'fixed',
      bottom: '20px',
      right: '20px'
    }}
  > {fullscreenImageIndex < projectsLength
    ?'VIEW INTERACTIVE TREATMENT'
    :'VIEW MOOD FILM'}
  </button>
)}

{ ((fullscreenImageIndex >= projectsLength &&  data.creativesOrders[0].creative[selectedCreative].moodFilms[fullscreenImageIndex - projectsLength]?.fileVideo?.url)) ? (
    <button 
    onClick={() => {
      window.open(
        data.creativesOrders[0].creative[selectedCreative].moodFilms[fullscreenImageIndex - projectsLength].fileVideo.url,
        '_blank'
      ); // Reindirizza al link
    }}
    style={{
      background: '#ffa3d7',
      position: 'fixed',
      bottom: '20px',
      left: '20px'
    }}
  >
    VIEW MOOD FILMPIOUFIKJFH
  </button>
): ''}


        </div>
      )}

      <div style={{ display: 'block', color: 'black', width: 'max-content', paddingLeft: '0px',paddingBottom:'140px' }}>
        {data.creativesOrders[0].creative.map((creative, creativeIndex) => (
          <div  
          style={{
            paddingBottom: selectedCreative === creativeIndex ? '30px' : '0',
            height: 'auto', width: '100vw' ,transition:'padding-bottom 0.4s'
          }}
          key={creative.id}>
            <h1 onMouseEnter={() => setHoveredCreativeId(creative.id)}
          onMouseLeave={() => setHoveredCreativeId(null)}
          onMouseMove={handleMouseMove}
              className='nameCreative'
              onClick={() => handleClick(creativeIndex)}>
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
                <div style={{position:'relative'}}>
  <img
    className="projectsImage"
    key={index}
    src={project.cover.url}
    alt={`Image ${index + 1}`}
    onClick={() => {
      if(project.fileVideo){
        window.open(project.fileVideo.url, '_blank');// Reindirizza al link
      }
      else if (project.urlLink) {
        window.open(project.urlLink, '_blank');// Reindirizza al link
      } else {
        handleImageClick(index, creative.projects.length ); // Esegui l'azione esistente
      }
    }}
  />

  </div>
))}
{ creative.moodFilms.length>0 
 ?<div style={{minWidth:'325px',height:'286px',position:'relative'}}>
  <h1 className='treatmentVertical'>TREATMENTS</h1>
  <h1 className='moodFilmVertical'>MOOD FILMS</h1>
  </div>
  :''

}

  {creative.moodFilms.map((project, index) => (
                <div style={{position:'relative'}}>
  <img
    className="projectsImage"
    key={index+creative.projects.length}
    src={project.thumbnail.url}
    alt={`Image ${index + creative.projects.length + 1}`}
    onClick={() => {
      if(project.fileVideo){
        window.open(project.fileVideo.url, '_blank');// Reindirizza al link
      }
       else {
        handleImageClick(index + creative.projects.length, creative.projects.length  ); // Esegui l'azione esistente
      }
    }}
  />

  </div>
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
