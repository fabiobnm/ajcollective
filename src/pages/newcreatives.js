import { useState } from 'react';
import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_POSTS } from '../lib/queries';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTS, { client });
  const [selectedCreative, setSelectedCreative] = useState(null); // Stato per tracciare il creative cliccato

  if (loading) return <p>Loading...</p>;
  if (error) {
    alert('err');
    console.error('Errore nella query:', error.message);
    return <p>Error: {error.message}</p>;
  }

  const handleClick = (creativeId) => {
    if (selectedCreative === creativeId) {
      // Se l'elemento è già selezionato, lo chiudiamo
      setSelectedCreative(null);
    } else {
      // Se è selezionato un altro elemento, chiudiamo quello attuale prima
      setSelectedCreative(null);
      setTimeout(() => {
        setSelectedCreative(creativeId); // Apriamo il nuovo elemento
      }, 500); // Tempo corrispondente alla durata della transizione
    }
  };

  return (
    <main style={{ marginTop: '125px', background: '' }}>
      <div style={{ display: 'block', color: 'black', width: 'max-content', paddingLeft: '0px' }}>
        {data.creatives.map((creative) => (
          <div key={creative.id} style={{ height: 'auto', width:'100vW' }}>
            {/* Cliccando su h1 si aggiorna il selectedCreative */}
            <h1 onClick={() => handleClick(creative.id)} style={{ cursor: 'pointer', marginLeft:'45px' }}>
              {creative.name}
            </h1>
            
            {/* Mostra il div con l'immagine solo se questo creative è stato selezionato */}
            
              <div  style={{
            maxHeight: selectedCreative === creative.id ? '400px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.5s',
            marginTop: '10px',
            display: 'grid',
            gridTemplateRows: 'repeat(2, auto)', // Due righe
            gridAutoFlow: 'column', // Scorrimento automatico in colonne
            gap: '0px', 
            columnGap:'5px',
            overflowX: 'scroll',
            scrollbarWidth: 'thin',
             }}
             className="custom-scroll">
              

{Array.from({ length: 29 }).map((_, index) => (
        <img
          key={index} // Chiave unica per ogni immagine
          src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEUb-LZS9jS9Hy8Kl_VRk_3aoS02cyYsJ0g&s'} // URL esterno
          alt={`Image ${index + 1}`}
          style={{ width: '250px' ,maxWidth:'fit-content', height: 'fit-content', marginBottom: '0px' }}
        />
      ))}
              </div>
              
            
          </div>
        ))}
      </div>
      <Sidebar />
    </main>
  );
}

