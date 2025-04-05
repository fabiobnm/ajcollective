import { useEffect, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_POSTSOrderCreatives } from '../lib/queries';
import Layout from '@/components/layout';
import { useSpring, animated } from '@react-spring/web';


export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTSOrderCreatives, { client });
  const [selectedCreative, setSelectedCreative] = useState(null);
  const [hoveredCreativeId, setHoveredCreativeId] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dragged, setDragged] = useState(false); // Stato per il drag
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentGallery, setCurrentGallery] = useState([]);
  const [projectsLength, setProjectsLength] = useState(0);



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
    

  const modalAnimation = useSpring({
    opacity: isModalOpen ? 1 : 0,
    transform: isModalOpen ? 'scale(1)' : 'scale(0.8)',
    config: { tension: 300, friction: 25 },
  });


    useEffect(() => {
        const handleKeyDown = (event) => {
          if (isModalOpen) {
            if (event.key === 'ArrowRight') navigateCarousel(1);
            else if (event.key === 'ArrowLeft') navigateCarousel(-1);
            else if (event.key === 'Escape') closeModal();
          }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
      }, [isModalOpen]);


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


  const openModal = (gallery, videos, index, projectsLength) => {
    const fullGallery = [...gallery, ...videos];
    setCurrentGallery(fullGallery);
    setProjectsLength(projectsLength); // Salva il valore della lunghezza
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const navigateCarousel = (direction) => {
    setCurrentImageIndex((prevIndex) => {
      const newIndex = prevIndex + direction;
      if (newIndex < 0) return currentGallery.length - 1;
      if (newIndex >= currentGallery.length) return 0;
      return newIndex;
    });
  };



  return (
    <Layout >
    <main style={{ marginTop: '180px', background: '' }}>
      

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
                : 'max-height 0.5s, opacity 10s', // Transizione di 1s quando si chiude
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
        openModal(creative.projects, creative.moodFilms, index,creative.projects) // Esegui l'azione esistente
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
        
        openModal(creative.projects, creative.moodFilms, index + creative.projects.length)
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

    {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <animated.div style={modalAnimation} className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}></button>
            {currentGallery[currentImageIndex]?.url ? (
              <button className="nav-btn prev-btn" onClick={() => navigateCarousel(-1)}></button>
            ) : (
              <button className="nav-btn prev-btnVideo"   onClick={() => navigateCarousel(-1)}><p className='carosButt'>prev</p></button>
            )}

            
            {currentGallery[currentImageIndex]?.cover ? (
              <img src={currentGallery[currentImageIndex]?.cover.url} alt="Gallery item" className="carousel-image" />
            ) : (
              <video controls className="carousel-video">
                <source src={currentGallery[currentImageIndex]?.fileVideo?.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {currentGallery[currentImageIndex]?.url ? (
              <button className="nav-btn next-btn" onClick={() => navigateCarousel(1)}></button>
            ) : (
              <button className="nav-btn next-btnVideo"  onClick={() => navigateCarousel(1)}><p className='carosButt'>next</p></button>
            )}  
            
          </animated.div>
        </div>
      )}



    </Layout>
  );
}
