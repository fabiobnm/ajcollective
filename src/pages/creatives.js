import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_POSTSOrderCreatives } from '../lib/queries';
import Sidebar from '../components/Sidebar';
import Layout from '@/components/layout';

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTSOrderCreatives, { client });
  const [selectedCreative, setSelectedCreative] = useState(null);
  const [hoveredCreativeId, setHoveredCreativeId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(null); // Stato per l'indice dell'immagine fullscreen
  const [projectsLength, setProjectsLength] = useState(0);
  const [dragged, setDragged] = useState(false); // Stato per il drag


  // Ref per il div che vogliamo scrollare
    const divRefs = useRef([]); // ✅ Aggiunto array di ref
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    
  
    const handleMouseLeave = (e) => {
      isDragging.current = false;
      
    };
    
    const handleMouseDown = (index, e) => {
      if (!divRefs.current[index]) return;
      isDragging.current = true;
      startX.current = e.clientX - divRefs.current[index].offsetLeft;
      scrollLeft.current = divRefs.current[index].scrollLeft;
      setDragged(false); // Resettiamo il flag
    };
    
    const handleMouseMove = (index, e) => {
      if (!isDragging.current || !divRefs.current[index]) return;
      setDragged(true); // Se il mouse si muove, è un drag
      e.preventDefault();
      const x = e.clientX - divRefs.current[index].offsetLeft;
      const scroll = x - startX.current;
      divRefs.current[index].scrollLeft = scrollLeft.current - scroll;
    };
    
    const handleMouseUp = (e) => {
      isDragging.current = false;
      setTimeout(() => setDragged(false), 100); // Ritardo per prevenire il click
    };
    

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (fullscreenImageIndex !== null) {
        if (event.key === "ArrowRight") {
          handleNextImage();
        } else if (event.key === "ArrowLeft") {
          handlePrevImage();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fullscreenImageIndex]); 
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

  

  const handleClick = (creativeId) => {
    console.log('parte');
    
    if (selectedCreative === creativeId) {
      setSelectedCreative(null);
      console.log('uguale');
      
    } else {
      console.log('diverso');
      
      setSelectedCreative(null);
      setTimeout(() => {
        setSelectedCreative(creativeId);
      }, 500);
    }
  };

  const handleMouseMove2 = (event) => {
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
    <Layout >
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
    VIEW MOOD FILM
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
          onMouseMove={handleMouseMove2}
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
             ref={(el) => (divRefs.current[creativeIndex] = el)} // ✅ Assegna il ref giusto
             onMouseDown={(e) => handleMouseDown(creativeIndex, e)}
             onMouseLeave={handleMouseLeave}
             onMouseUp={handleMouseUp}
             onMouseMove={(e) => handleMouseMove(creativeIndex, e)}
              style={{
                opacity: selectedCreative === creativeIndex ? '1' : '0',
                maxHeight: selectedCreative === creativeIndex ? '400px' : '0',
                overflow: 'hidden',
                transition: selectedCreative === creativeIndex
    ? 'max-height 0.5s, opacity 0s'  // Nessuna transizione quando si apre
    : 'max-height 0.5s, opacity 1s', // Transizione di 1s quando si chiude
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

              {(creative.info?.html && creative.info?.html.trim() !== '')?<div className='separatorInfo'>
<div className='infoCreative' dangerouslySetInnerHTML={{ __html: creative.info?.html }}></div>
  </div>:''

              }

              {creative.projects.map((project, index) => (
                <div style={{position:'relative'}}>
  <img
    className="projectsImage"
    key={index}
    src={project.cover.url}
    alt={`Image ${index + 1}`}
    onClick={(e) => {
      if (dragged) {
        e.stopPropagation(); // Impedisce il click se c'è stato un drag
        return;
      }
      else if(project.fileVideo){
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
 ?<div className='separatorDiv'>
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
    onClick={(e) => {
      if (dragged) {
        e.stopPropagation(); // Impedisce il click se c'è stato un drag
        return;
      }
      else if(project.fileVideo){
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
      <img className="ajImg2" src="/AJCOLLECTIVE_LOGO.png" />

    </main>
    </Layout>
  );
}
