import { useQuery } from '@apollo/client';
import client from '../lib/apolloClient';
import { GET_POSTS } from '../lib/queries';
import Sidebar from '../components/Sidebar';
import FooterContact from '@/components/footerContact';


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
      <div style={{display:'flex', width:'max-content'}}>
      {data.creatives.map((creatives) => (
        <div style={{height:'auto', margin:'10px'}} key={creatives.id}>
                    
                     

          
        </div>
      ))}
      </div>

      <Sidebar />
      <img className='ajImg' src="/ajImage.png"/>
    </main>
  );
}

