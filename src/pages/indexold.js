import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_POSTS } from '../lib/queries';
import Sidebar from '../components/Sidebar';


export default function Home() {
  const { loading, error, data } = useQuery(GET_POSTS, { client });

  if (loading) return <p>Loading...</p>;
  if (error) {
    alert('err')
    console.log('ciaoooo')
    console.log(data)
    
    console.error('Errore nella query:', error.message);
    console.error('Dettagli dell\'errore:', error.graphQLErrors);
    console.error('Dettagli della risposta:', error.networkError);
    return <p>Error: {error.message}</p>;
  }

  console.log('Dati ricevuti:', data);

  return (
    <main style={{marginTop:'125px',background:''}}>
      {data.progettis.map((progetto) => (
        <div style={{height:'auto', margin:'0px'}} key={progetto.id}>
                      <h1 style={{color:'red'}}>{progetto.nome}</h1>

          <div className='caros'>
            {progetto.galleria.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`${progetto.nome} galleria ${index}`}
                style={{  height: '20vH', marginLeft: '10px' }} // Stile per le immagini della galleria
              />
            ))}
          </div>
        </div>
      ))}

      <Sidebar />
    </main>
  );
}

